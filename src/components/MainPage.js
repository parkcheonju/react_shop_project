import React, { useState, useEffect } from "react";
import { API_URL } from "../config/constants";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const MainPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // const url = "https://41299568-5ca1-4334-9625-de91e428a2c9.mock.pstmn.io/products/";
    const url = `${API_URL}/products`;
    axios
      .get(url)
      .then((result) => {
        const products = result.data.product;
        setProducts(products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" alt="" />
        </div>
        <h1>Products</h1>
        <div id="product-list">
          {products.map((product, idx) => {
            console.log("product");
            return (
              <div className="product-card" key={idx}>
                <Link className="product-link" to={`/productPage/${product.id}`}>
                  <div>
                    <img className="product-img" src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="product-content">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price}</span>

                    <div className="product-footer">
                      <span className="product-seller">
                        <img src="images/icons/avatar.png" className="product-avatar" alt="{product.seller}" />
                        <span>{product.seller}</span>
                      </span>
                      <span className="product-date">{dayjs(product.createdAt).format("YYYY년MM월DD일HH:MM:ss")}</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MainPage;
