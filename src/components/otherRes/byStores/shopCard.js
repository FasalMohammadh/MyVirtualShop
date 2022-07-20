import React from "react";

const ShopCard = ({
	shop_id,
	onClick,
	shop_name,
	email,
	location,
	phone_number,
}) => (
	<div className="box d-flex align-items-center border rounded px-4 py-2">
		<h3
			onClick={onClick}
			id={shop_id}
			role="button"
			className="flex-fill mb-0"
		>
			{shop_name}
		</h3>
		<div className="d-flex gap-3">
			<a
				href={`mailto:${email}`}
				title={email}
				className="title-text text-decoration-none fa-solid fa-envelope"
				style={{color:"rgb(130, 206, 250)"}}
			/>
			<i
				title={location}
				role="button"
				className="title-text fa-solid fa-location-dot"
				style={{color:"rgb(170, 222, 118)"}}
			/>
			<a
				href={`tel:${phone_number}`}
				role="button"
				className="title-text text-decoration-none fa-solid fa-phone-square"
				style={{color:"rgb(255, 203, 87)"}}
			/>
		</div>
	</div>
);

export default ShopCard;
