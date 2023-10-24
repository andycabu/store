import { useProducts } from "../context/ProductContext";
import { Add, Cart, Heart, Substract } from "./Icon";

const Card = () => {
  const { filteredProducts } = useProducts();
  return (
    <div className="">
      <ul className="grid grid-cols-3 max-lg:grid-cols-2 gap-6 p-8">
        {filteredProducts?.map((product) => (
          <li className="flex flex-col justify-between " key={product.id}>
            <Heart
              className={
                "h-8 w-8 absolute text-red-600 cursor-pointer hover:text-red-700"
              }
            />
            <div>
              <img
                className="h-[22rem] w-full object-cover"
                src={product.image}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              <div>
                <strong className="text-gray-400 font-light text-xs ">
                  {product.category}
                </strong>
                <h2 className="">{product.name}</h2>
                <p className="">€{product.price}</p>
              </div>
              <div className=" flex">
                <button className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50  px-2 py-1 border-r border-gray-200">
                  <Substract />
                </button>
                <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100  px-4 py-1 select-none">
                  2
                </div>
                <button className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50  px-2 py-1 border-r border-gray-200">
                  <Add />
                </button>
              </div>

              <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50  w-full flex items-center justify-center">
                Add to order
                <Cart />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Card;
