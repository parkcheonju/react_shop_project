import React, { useState,useEffect } from "react";
import axios from "axios";
import "./MainPage.css";

const MainPage = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
	let url = "https://13f04872-0e30-4118-b385-33e5f5a21477.mock.pstmn.io/products";
  axios
    .get(url)
    .then((result) => {
      //console.log(results.data.products);
      const products = result.data.products;
      setProducts(products); //통신 결과값은 axios를 불러왔기때문에 나옴
    })
    .catch((error) => {
      console.log(error);
		});
  },[]);
	console.log(products);

  return (
    <div>
      <div id="header">
        <div id="header-area">
          <img src="images/icons/logo.png" alt="" />
        </div>
      </div>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" alt="" />
        </div>
        <h1>Products</h1>
        <div id="product-list">
					{products.map((product , idx) => {
					return(
						<div className="product-card" key={idx}>
            <div>
              <img className="product-img"  src={product.imageUrl}  alt="" />
            </div>
            <div className="product-content">
              <span className="product-name">{product.name}</span>
              <span className="product-price">{product.price}</span>
              <span className="product-seller">
                <img src="images/icons/avatar.png" className="product-avatar" alt="" />
                <span>{product.seller}</span>
              </span>
            </div>
          </div>
					);
					})}
        </div>
      </div>
      <div id="footer">
        <a href="#none">회사소개</a>
        <a href="#none">이용약관</a>
        <a href="#none">통신판매업신고번호:123-1234</a>
        <a href="#none">사업자등록번호:456-56-78951</a>
        <a href="#none">고객센터:456-78951</a>
      </div>
    </div>
  );
};
export default MainPage;
