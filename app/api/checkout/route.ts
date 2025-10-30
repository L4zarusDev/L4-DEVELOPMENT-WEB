// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// ⚠️ IMPORTANTE
// No pasamos apiVersion porque la versión instalada del SDK
// ya trae su propia versión tipada. Si la pones "a mano" y es
// más vieja, Next+TS va a quejarse en el build.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion: '2022-08-01', // ❌ esto rompía el build
});

export async function POST(req: NextRequest) {
  try {
    const { priceId, successUrl, cancelUrl } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: 'Missing priceId' },
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', // o 'payment' según tu caso
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl ?? `${req.nextUrl.origin}/success`,
      cancel_url: cancelUrl ?? `${req.nextUrl.origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Error creating Stripe session:', err);
    return NextResponse.json(
      { error: 'Stripe session creation failed' },
      { status: 500 },
    );
  }
}
