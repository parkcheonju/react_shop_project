import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config/constants";
import axios from "axios";
import dayjs from "dayjs";
import { Carousel } from "antd";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const url = `${API_URL}/products`;
    axios
      .get(url)
      .then((result) => {
        const products = result.data.product;
        setProducts(products);
        console.log("data:", products);
      })
      .catch((error) => {
        console.log(error);
      });
    /* banners */
    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        const banners = result.data.banners;
        setBanners(banners);
        console.log("data:", banners);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div id="body">
        <Carousel autoplay>
          {banners.map((banner, index) => {
            return (
              <Link to={banner.href} key={index}>
                <div id="banner">
                  <img src={`${API_URL}/${banner.imageUrl}`} alt="" />
                </div>
              </Link>
            );
          })}
        </Carousel>
        <h1>Products</h1>
        <div id="product-list">
          {products.map((product, idx) => {
            console.log("product");
            return (
              <div className="product-card" key={idx}>
                {product.soldout === 1 ? <div className="product-blur" key={idx}></div> : null}

                <Link className="product-link" to={`/productPage/${product.id}`}>
                  <div>
                    <img className="product-img" src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
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