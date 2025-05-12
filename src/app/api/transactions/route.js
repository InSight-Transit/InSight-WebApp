import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      console.error("❌ Missing userId in request");
      return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
    }

    console.log(`✅ Fetching transactions for userId: ${userId}`);

    // Fetch charges from Stripe
    const charges = await stripe.charges.list({
      limit: 100, // Adjust the limit as needed
    });

    console.log(`✅ Total charges fetched: ${charges.data.length}`);

    // Filter charges by metadata userId
    const userTransactions = charges.data.filter(
      (charge) => charge.metadata?.userId === userId
    );

    console.log(`✅ Transactions for userId ${userId}:`, userTransactions);

    return new Response(JSON.stringify(userTransactions), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}