import React from "react";

export default function LoadingScreen() {
	const styleBg = {
		position: "absolute",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		top: "0",
		right: "0",
		height: "100%",
		backgroundColor: "rgba(255,255,255,0.25)",
		backdropFilter: "blur(5px)",
	};

	return (
		<div class="w-100" style={styleBg}>
			<i class="spinner-loading fa-solid fa-spin fa-circle-notch fa-5x" />
		</div>
	);
}
