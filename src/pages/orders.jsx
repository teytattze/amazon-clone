import * as React from "react";
import * as moment from "moment";
import { getSession, useSession } from "next-auth/client";
import Header from "../components/Header";
import { db } from "../../firebase";
import Order from "../components/Order";

export const getServerSideProps = async (context) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const session = await getSession(context);

  if (!session) return { props: { orders: [] } };

  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: { orders, session },
  };
};

function Orders({ orders }) {
  const [session] = useSession();
  console.log(orders);

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {session ? (
          orders ? (
            <div className="mt-5 space-y-4">
              {orders.map(
                ({ id, amount, amountShipping, items, timestamp, images }) => (
                  <Order
                    key={id}
                    id={id}
                    amount={amount}
                    amountShipping={amountShipping}
                    items={items}
                    timestamp={timestamp}
                    images={images}
                  />
                )
              )}
            </div>
          ) : (
            <h2>No order</h2>
          )
        ) : (
          <h2>Please sign in to see your order</h2>
        )}
      </main>
    </div>
  );
}

export default Orders;
