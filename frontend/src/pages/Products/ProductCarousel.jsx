import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaBox, FaClock, FaStar, FaShoppingCart } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="max-w-screen-lg mx-auto">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <Link to={`/product/${_id}`}>
                  <img
                    src={image}
                    alt={name}
                    className="w-full rounded-lg object-cover h-80 sm:h-96"
                  />
                </Link>

                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between">
                  <div className="sm:w-3/4 mr-4">
                    <h2 className="text-xl font-bold mb-2">{name}</h2>
                    <span className="bg-crimson text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
                      ${price}
                    </span>
                    <p className="text-gray-700">
                      {description.substring(0, 170)}...
                    </p>
                  </div>

                  <div className="sm:w-1/4">
                    <div className="mb-4">
                      <h1 className="flex items-center mb-2">
                        <FaClock className="mr-2 text-gray-600" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaStar className="mr-2 text-gray-600" /> Reviews:
                        {numReviews}
                      </h1>
                    </div>

                    <div>
                      <h1 className="flex items-center mb-2">
                        <FaStar className="mr-2 text-gray-600" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaShoppingCart className="mr-2 text-gray-600" />{" "}
                        Quantity: {quantity}
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaBox className="mr-2 text-gray-600" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
