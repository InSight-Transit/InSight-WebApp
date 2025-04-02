import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export async function POST(req) {
  try {
    const { amount } = await req.json();
    console.log("Received data:", amount)

    if (!amount || amount < 100) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), { status: 400 });
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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/addfunds?success=true&amount=${amount}`, // TODO: change URL so it does not display amount
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/addfunds?canceled=true`,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
