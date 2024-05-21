import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center flex-wrap sm:flex-nowrap">
            <h1 className="ml-40 sm:ml-40 mt-4 sm:mt-10 text-2xl sm:text-3xl lg:text-4xl">
              Special Products
            </h1>
          </div>

          <div className="flex justify-center flex-wrap mt-4 sm:mt-8">
            {data.products.map((product) => (
              <div key={product._id} className="m-2 sm:m-4">
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
