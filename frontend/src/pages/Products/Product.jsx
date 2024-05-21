import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full sm:w-[30rem] ml-4 sm:ml-0 p-3 relative">
      <div className="relative" style={{ height: "20rem" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded"
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }} // Ensure the image fits within the container
        />
        <HeartIcon product={product} className="absolute top-0 right-0 m-3" />
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-crimson text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
