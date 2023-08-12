import { useParams } from "react-router-dom";
import { getData } from "../api";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState();

  const getProductDetail = async () => {
    setProduct(await getData(`/products/${id}`));
  };
  const getProductByCategory = async () => {
    setProducts(await getData(`/products?category=${id}`));
  };

  useEffect(() => {
    getProductDetail();
    getProductByCategory();
  }, [product, setProduct, products, setProducts]);

  return (
    <div className="">
      <div className="flex gap-5 items-start my-20">
        <img
          src={product?.image}
          className="h-96 border-2 shadow-lg p-10"
          alt=""
        />
        <div className="flex flex-col gap-5 mt-5">
          <p className="bg-secondary font-bold text-info px-2 py-1 text-xs rounded-full w-40 text-center">
            {product?.category}
          </p>
          <h1 className="text-2xl font-semibold text-header">
            {product?.title}
          </h1>
          <div className="">
            <p className="text-header font-semibold text-lg">Description</p>
            <p className="text-secondary tracking-wider leading-6 mt-1">
              {product?.description}
            </p>
          </div>
          <p className="flex gap-2 items-center">
            <AiFillStar className="text-xl text-danger" />
            <small className="text-secondary font-bold">
              ({product?.rating?.rate})
            </small>
          </p>
          <p className="text-header text-xl font-semibold">
            Price - {product?.price}
          </p>
          <div className="">
            <button className="bg-info text-primary py-2 rounded shadow-lg w-40 transform transition hover:scale-90">
              Add to cart
            </button>
            <button className="bg-header ml-3 text-primary py-2 rounded shadow-lg w-40 transform transition hover:scale-90">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className=" my-20">
        <h1 className="text-2xl font-semibold text-header">
          You may also like
        </h1>
        <div className="flex flex-wrap gap-7 my-10">
          {products?.map((item) => (
            <div key={item.id}>
              <img
                src={item.image}
                className="h-52 rounded border-2 shadow-lg p-10"
                alt=""
              />
              <p className="text-secondary font-semibold mt-1">
                ${item?.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
