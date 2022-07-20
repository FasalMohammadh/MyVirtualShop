import React, { useEffect, useState, Fragment } from "react";
import ProductMainDetails from "./otherRes/ProductMainDetails";
import ProductMainImageDisplay from "./otherRes/ProductMainImageDisplay";
import { axiosCus } from "./otherRes/commonFun";
import { useParams, useHistory } from "react-router-dom";
import LoadingScreen from "./otherRes/loadingScreen";
import './css/productMain.css';

export default function ProductMain() {
	const [details, setDetails] = useState({});
	const [loadingScrnVisib, setLoadingScrnVisib] = useState(true);

	let { productId } = useParams(),
		history = useHistory();

	useEffect(() => {
		productId &&
			axiosCus
				.post(`/products/${productId}`)
				.then(({ data }) =>
					setTimeout(() => {
						setDetails(data);
						setLoadingScrnVisib(false);
					}, 1000)
				)
				.catch((error) => {
					if (error.response) {
						error.response.status === 400 && setDetails({});
						setLoadingScrnVisib(false);
					}

					console.log(error);
				});
	}, []);

	const loadDetails = () => {
		let { image_paths, ...others } = details;

		return Object.values(details).length > 0 ? (
			<Fragment>
				<ProductMainImageDisplay images={image_paths} className="flex-fill"/>
				<ProductMainDetails {...others} className="flex-fill"/>
			</Fragment>
		) : (
			<h3 className="text-center m-auto">Product Not Found</h3>
		);
	};

	const handleClick = () => history.goBack();

	return (
		<div className="product-main-overlay overflow-auto">
			<div className="product-main-content-holder  overflow-auto bg-white col-11 col-md-10 px-md-5 py-md-3 d-flex flex-column rounded-3 ">
				<i
					className="fa-fw fa-solid fa-close fa-2x align-self-end text-center"
					onClick={handleClick}
					role="button"
				/>
				<div className="position-relative gap-3 d-md-flex" style={{minHeight:"300px",maxHeight:"80vh"}} >
					{loadingScrnVisib ? <LoadingScreen /> : loadDetails()}
				</div>
			</div>
		</div>
	);
}
