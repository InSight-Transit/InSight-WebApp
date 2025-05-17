/*
  webhook/route.js
  This route handles the Stripe webhook events.
  Verifies webhook signature and processing the `checkout.session.completed` event.
  It is required to update user's balance in Firestore based on the payment amount.
*/

import Stripe from "stripe";
import admin from "firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

export async function POST(req) {
  try {
    const payload = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return new Response(JSON.stringify({ error: "Webhook signature verification failed." }), { status: 400 });
    }

    console.log(`✅ Received event: ${event.type}`);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const amount = session.amount_total / 100;
      const userId = session.metadata?.userId;

      console.log(`✅ Payment success! User ID: ${userId}, Amount: $${amount}`);

      if (!userId) {
        console.error("❌ Missing userId in session metadata.");
        return new Response(JSON.stringify({ error: "Missing userId in session metadata." }), { status: 400 });
      }

      try {
        const userRef = db.collection("users").doc(userId);
        await userRef.update({
          balance: admin.firestore.FieldValue.increment(amount),
        });

        console.log(`✅ User ${userId} balance updated by $${amount}`);
      } catch (err) {
        console.error(`❌ Failed to update Firestore for user ${userId}:`, err.message);
        return new Response(JSON.stringify({ error: "Failed to update Firestore." }), { status: 500 });
      }
    } else {
      console.log(`ℹ️ Event type ${event.type} is not handled.`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
    return new Response(JSON.stringify({ error: "Webhook handler failed." }), { status: 400 });
  }
}