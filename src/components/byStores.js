import React, { useState, useEffect } from "react";
import ShopCard from "./otherRes/byStores/shopCard";
import ByStoresFilter from "./otherRes/byStores/byStoresFilter";
import { axiosCus } from "./otherRes/commonFun";
import ProductBox from "./otherRes/ProductBox";
import NavBar from "./Navbar";
import { Link, useRouteMatch, Route } from "react-router-dom";
import ProductMain from "./ProductMain";

const ByStores = () => {
	const [shops, setShops] = useState([]);
	const [products, setProducts] = useState([]);

	const { path } = useRouteMatch();

	useEffect(() => {
		handleClear();
		handleFilteredShops();
	}, []);

	const handleClear = () => {
		axiosCus
			.post("/products")
			.then(({data}) => setProducts(data))
			.catch((error) => {});
	};

	const handleFilteredShops = (filteredLocs) => {
		axiosCus
			.post("/shopsAll/filtered", { locs: filteredLocs })
			.then(({ data }) => setShops(data))
			.catch((error) => {});
	};

	const handleShopClick = ({ target }) => {
		let { id } = target;
		axiosCus
			.post(`/shopProducts/getProducts/${id}`)
			.then(({ data }) => setProducts(data))
			.catch((error) => {});
	};

	return (
		<React.Fragment>
			<Route exact path={`${path}/:productId`} component={ProductMain} />
			<NavBar />
			<div className="d-md-flex col-md-11 col-xxl-7 mx-auto box gap-4 p-5 mt-5">
				<div className="col-md-5">
					<ByStoresFilter updateParent={handleFilteredShops} />
					<div className="d-flex gap-3 flex-column mt-3">
						{shops.map((shop) => (
							<ShopCard {...shop} onClick={handleShopClick} />
						))}
					</div>
					<button className="mt-3 btn btn-warning w-100 btn-lg" onClick={handleClear}>
						Clear Selection
					</button>
				</div>
				<div className="col-md-7 d-flex gap-4 flex-column">
					{products.length ? (
						products.map((product) => (
							<Link
								key={product.product_id}
								className="text-decoration-none text-black"
								to={`${path}/${product.product_id}`}
							>
								<ProductBox {...product} />
							</Link>
						))
					) : (
						<h3 className="d-flex m-auto">No Products Found</h3>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default ByStores;


// axiosCus
		// 	.post("/shopsAll/filtered", { locs: filteredLocs })
		// 	.then((response) => setShops(response.data))
		// 	.catch((error) => {});