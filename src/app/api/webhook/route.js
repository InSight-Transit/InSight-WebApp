import Stripe from "stripe";
import admin from "firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// Initialize Firebase Admin SDK with explicit credentials
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore(); // Access Firestore using the Admin SDK to write

export async function POST(req) {
  try {
    const payload = await req.text();
    const sig = req.headers.get("stripe-signature");

    const event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const amount = session.amount_total / 100; // Convert cents to dollars
      const userId = session.metadata?.userId; // Retrieve userId from metadata

      console.log(`✅ Payment success! Updating balance for user: ${userId}`);

      if (userId) {
        const userRef = db.collection("users").doc(userId);
        await userRef.update({
          balance: admin.firestore.FieldValue.increment(amount), // Increment the balance
        });

        console.log(`✅ User ${userId} balance updated by $${amount}`);
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
    return new Response(JSON.stringify({ error: "Webhook handler failed." }), { status: 400 });
  }
}
