const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function (req, res) {
  const { items, email } = req.body;
  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "myr",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_rates: ["shr_1JFCX4DhDoAzKPiHnkPgQ1BD"],
      shipping_address_collection: {
        allowed_countries: ["MY", "SG"],
      },
      line_items: transformedItems,
      mode: "payment",
      success_url: `${process.env.HOST_URL}/success`,
      cancel_url: `${process.env.HOST_URL}/checkout`,
      metadata: {
        email,
        images: JSON.stringify(items.map((item) => item.image)),
      },
    });
    res.status(200).json({ id: session.id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.response });
  }
}
