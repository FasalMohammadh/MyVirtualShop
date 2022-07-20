import React, { useState, useEffect } from "react";
import ProductBox from "../ProductBox";
import { Link } from "react-router-dom";
import { axiosCus } from "../commonFun";
import ProductInfoEdit from "./productInfoEdit";
import Model from "../model";
import ToastList from "../ToastList";

export default function () {
	const [shopProducts, setShopProducts] = useState([]);
	const [editFormProductId, setEditFormProductId] = useState(undefined);
	const [delModelProductId, setDelModelProductId] = useState(undefined);
	const [toasts, setToasts] = useState([]);

	const loadProducts = () =>
		axiosCus
			.post("/shopProducts")
			.then(({ data }) => setShopProducts(data))
			.catch((error) => console.log(error));

	useEffect(loadProducts, []);

	const handleDelModelConfirm = () => {
		axiosCus
			.post(`/shopProducts/del/${delModelProductId}`)
			.then(({ status, data }) => {
				status === 200 &&
					setToasts([
						{
							type: "success",
							title: "Deletion Success",
							message: data,
						},
					]);
				setDelModelProductId(undefined);
				loadProducts();
			})
			.catch((error) => {
				setToasts([
					{
						type: "error",
						title: "Something went wrong",
						message: "please try again later",
					},
				]);

				if (error.response) {
					const { status, data } = error.response;
					status === 400
						? setToasts([
								{
									type: "error",
									title: "Deletion Failed",
									message: data,
								},
						  ])
						: status === 500 &&
						  setToasts([
								{
									type: "error",
									title: "Deletion Failed",
									message: "Internal Server Error",
								},
						  ]);
				}
				setDelModelProductId(undefined);
			});
	};

	return (
		<div>
			{typeof shopProducts!="string" && shopProducts.length > 0 ? (
				shopProducts.map((product) => (
					<ProductBox {...product} key={product.product_id}>
						<div className="d-flex justify-content-end">
							<i
								role="button"
								className=" d-inline-block p-2 fa-solid fa-pencil fa-2x"
								data-productid={product.product_id}
								onClick={({ target }) =>
									setEditFormProductId(
										target.dataset.productid
									)
								}
							/>
							<i
								role="button"
								className="d-inline-block p-2 fa-solid fa-trash-can fa-2x"
								data-productid={product.product_id}
								onClick={({ target }) =>
									setDelModelProductId(
										target.dataset.productid
									)
								}
							/>
						</div>
					</ProductBox>
				))
			) : (
				<div className="d-flex flex-column align-items-center">
					<h3 className="text-center">
						Still not posted a product why are you waiting
					</h3>
					<Link
						to="/addProduct"
						className="w-50 btn btn-lg btn-primary text-nowrap"
					>
						Add Your Product Now
					</Link>
				</div>
			)}
			{editFormProductId && (
				<ProductInfoEdit
					productId={editFormProductId}
					closeFun={() => setEditFormProductId(undefined)}
					setParentToasts={(toast) => setToasts(toast)}
					triggerParentRefresh={loadProducts}
				/>
			)}
			{delModelProductId && (
				<Model
					title="Delete Product"
					message="Are you sure you want to delete this product?"
					onclickConfirm={handleDelModelConfirm}
					onclickCancel={() => setDelModelProductId(undefined)}
				/>
			)}
			{toasts.length>0 && <ToastList toasts={toasts} />}
		</div>
	);
}
