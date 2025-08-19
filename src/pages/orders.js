import React from 'react'
import Stripe from 'stripe';
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/react';
import moment from 'moment';
import db from "../../firebase"
import Order from '../components/Order';

function Orders({ orders }) {
    const { data: session } = useSession();

    console.log(orders)
  
    return (
        <div>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10 pt-[200px] '>
                <h1 className='text-3xl border-b mb-2 pb1 border-yellow-400'>
                    Vos Commandes
                </h1>

                {session ? (
                    <h2>{orders.length} Orders</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )}

                <div className='mt-5 space-y-4'>
                    {orders?.map(
                        ({ id, amount, amountShipping, items, timestamp, images}
                        ) => (
                        <Order 
                          key={id}
                          id={id}
                          amount={amount}
                          amountShipping={amountShipping}
                          items={items}
                          timestamp={timestamp}
                          images={images}
                        />
                    ))}
                </div>
            </main>

        </div>
    )
}

export default Orders  

export async function getServerSideProps(context) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    //get the users logged credentials...
    const session = await getSession(context);

    if (!session) {
        return {
            props: {},
        };
    }
 //From firebase db
    const stripeOrders = await db  
        .collection('users')
        .doc(session.user.email)
        .collection('orders')
        .orderBy('timestamp', 'desc')
        .get();

        // get stripe orders
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => {
            const data = order.data();
            return {
                id: order.id,
                amount: data.amount,
                amountShipping: data.amount_shipping,
                images: data.images,
                timestamp: moment(data.timestamp.toDate()).unix(),
                items: (
                    await stripe.checkout.sessions.listLineItems(order.id, {
                        limit: 100,
                    })
                ).data,
            };
        })
    );

    return {
        props: {
            orders,
        },
    };
}
