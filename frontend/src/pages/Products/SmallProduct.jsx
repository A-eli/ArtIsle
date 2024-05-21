import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-full sm:w-[20rem] ml-4 sm:ml-4 p-4">
      <div className="relative" style={{ height: "15rem" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded"
        />
        <HeartIcon product={product} className="absolute top-0 right-0 m-3" />
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-crimson text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-crimson dark:text-white">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
