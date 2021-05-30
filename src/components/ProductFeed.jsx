import * as React from 'react';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { StarIcon } from '@heroicons/react/solid';

const MAX_RATING = 5;
const MIN_RATING = 1;

function ProductFeed({ products }) {
  return (
    <div className="mx-auto grid grid-flow-row-dense md:grid-cols-2 md:-mt-52 lg:grid-cols-3 xl:grid-cols-4">
      {products.slice(0, 4).map((product) => (
        <Product key={product.id} product={product} />
      ))}
      <img className="md:col-span-full" src="https://links.papareact.com/dyz" />
      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {products.slice(5, products.length).map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

function Product({ product }) {
  const [rating] = React.useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING,
  );

  const [hasPrime] = React.useState(Math.random() < 0.5);

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">{product.category}</p>
      <Image src={product.image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{product.title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, index) => (
            <StarIcon key={index} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{product.description}</p>
      <div className="mb-5">
        <Currency quantity={product.price} currency="GBP" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
}

export default ProductFeed;
