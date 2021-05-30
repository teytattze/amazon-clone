import Product from './Product';

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

export default ProductFeed;
