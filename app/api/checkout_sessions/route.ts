import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { getSession } from '@/lib/core/server';


export async function POST() {

    const userSession = await getSession();

    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const userRole = userSession?.user.role;

        // Select Price ID based on user role
        let priceId: string;

        if (userRole === "seeker") {
            priceId = process.env.STRIPE_SEEKER_PRICE_ID!;
        } else if (userRole === "recruiter") {
            priceId = process.env.STRIPE_RECRUITER_PRICE_ID!;
        } else {
            return NextResponse.json(
                { error: "Invalid user role" },
                { status: 400 }
            );
        }

        if (!priceId) {
            throw new Error("Stripe Price ID is missing");
        }

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            customer_email: userSession?.user.email,
            // Add user ID to metadata
            metadata: {
                userId: userSession?.user.id ?? null,
            },
            success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
            integration_identifier: 'hire_loop_web_101',
        });
        return NextResponse.redirect(session.url as string, 303)
    } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}