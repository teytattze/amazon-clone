import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';
import Currency from 'react-currency-formatter';

function CheckoutProduct({ product }) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id: product.id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={product.image} height={200} width={200} objectFit="contain" />
      <div className="col-span-3 mx-5 self-center">
        <p>{product.title}</p>
        <div className="flex">
          {Array(product.rating)
            .fill()
            .map((_, index) => (
              <StarIcon key={index} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{product.description}</p>
        <Currency quantity={product.price} currency="MYR" />

        {product.hasPrime && (
          <div className="flex items-center space-x-2">
            <img className="w-12" src="https://links.papareact.com/fdw" alt="" isLoading="lazy" />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto jsutify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
