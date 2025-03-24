// src/app/api/checkout/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

// Named export for POST method
export async function POST(req) {
  try {
    const { amount, currency } = await req.json();

    if (!amount || !currency) {
      return new Response(
        JSON.stringify({ error: 'Missing amount or currency' }),
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
