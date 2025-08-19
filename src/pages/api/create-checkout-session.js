const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { items, email } = req.body;

    // Check for required environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(500).json({ error: 'Stripe secret key not configured' });
    }

    if (!process.env.HOST && !process.env.NEXT_PUBLIC_HOST) {
        return res.status(500).json({ error: 'HOST environment variable not configured' });
    }

    if (!items?.length) {
        return res.status(400).json({ error: 'No items in the cart' });
    }

    try {
        const transformedItems = items.map(item => ({
            quantity: 1,
            price_data: {
                currency: 'CDF', // Changed back to USD as CDF might not be supported
                unit_amount: Math.round(item.price * 100), // Convert to cents
                product_data: {
                    name: item.title,
                    description: item.description,
                    images: [item.image]
                },
            },
        }));

        const hostUrl = process.env.HOST || process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB','CDF'], // Use supported countries
            },
            line_items: transformedItems,
            mode: 'payment',
            success_url: `${hostUrl}/success`,
            cancel_url: `${hostUrl}/checkout`,
            metadata: {
                email,
                images: JSON.stringify(items.map(item => item.image))
                },
        });

        res.status(200).json({ id: session.id });
    } catch (err) {
        console.error('Stripe error:', err);
        res.status(500).json({ 
            error: 'Error creating checkout session',
            details: err.message,
            code: err.code || 'unknown'
        });
    }

    console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY ? "[OK]" : "[NOT SET]");


};