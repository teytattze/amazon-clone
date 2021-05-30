import { StarIcon } from '@heroicons/react/solid';
import * as React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
import Currency from 'react-currency-formatter';

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ product }) {
  const dispatch = useDispatch();
  const [rating] = React.useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING,
  );
  const [hasPrime] = React.useState(Math.random() < 0.5);

  const addItemToBasket = () => {
    const productData = { ...product, rating, hasPrime };
    dispatch(addToBasket(productData));
  };

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
        <Currency quantity={product.price} currency="MYR" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button className="mt-auto button" onClick={addItemToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
