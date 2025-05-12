import Stripe from 'stripe';

// redirects users to a checkout page to reload account
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export async function POST(req) {
  try {
    const { amount, userId } = await req.json();
    console.log("Received data:", { amount, userId });

    if (!amount || amount < 100 || !userId) {
      return new Response(JSON.stringify({ error: "Invalid request data" }), { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Account Reload" },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/addfunds?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/addfunds?canceled=true`,
      metadata: { userId },
      payment_intent_data: {
      metadata: { userId }, // Explicitly set metadata for the Payment Intent
      }
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
