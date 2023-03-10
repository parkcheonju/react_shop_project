import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const MainPage = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		let url = "https://89e06b7a-d7f6-4161-97d5-99bd1e2387e3.mock.pstmn.io/products/";
		axios
			.get(url)
			.then((result) => {
				const products = result.data.products;
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
						return (
							<div className="product-card" key={idx}>
								<Link className="product-link" to={`/productPage/${product.id}`}>
									<div>
										<img className="product-img" src={product.imageUrl} alt={product.name} />
									</div>
									<div className="product-content">
										<span className="product-name">{product.name}</span>
										<span className="product-price">{product.price}</span>
										<span className="product-seller">
											<img src="images/icons/avatar.png" className="product-avatar" alt="{product.seller}" />
											<span>{product.seller}</span>
										</span>
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
