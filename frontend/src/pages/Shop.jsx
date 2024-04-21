import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAllProductsQuery } from "../redux/api/productApiSlice";
import ProductCard from "./Products/ProductCard";
import Loader from "../components/Loader";

const Shop = () => {
  const dispatch = useDispatch();
  const { data: products, isLoading } = useAllProductsQuery();

  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (!isLoading && products) {
      setProductList(products);
    }
  }, [isLoading, products]);

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="p-3">
            <h2 className="h4 text-center mb-2">
              {productList.length} Products
            </h2>
            <div className="flex flex-wrap">
              {productList.length === 0 ? (
                <Loader />
              ) : (
                productList?.map((product) => (
                  <div className="p-3" key={product._id}>
                    <ProductCard p={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
