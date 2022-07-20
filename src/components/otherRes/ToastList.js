import React, { useState, useEffect } from "react";
import Toast from "./toast";

const ToastList = ({ toasts }) => {
	const [toastsArr, setToastsArr] = useState(toasts);

	useEffect(() => {
		setTimeout(() => {
			if (toastsArr.length > 0) 
				deleteToast();
		}, 2000);
	});

	useEffect(()=>{
		setToastsArr(toasts);
	},[toasts])

	const deleteToast=()=>{
		const tempToasts = [...toastsArr];
		tempToasts.splice(0, 1);
		setToastsArr(tempToasts);
	}
	
	return (
		<React.Fragment>
		{
			toastsArr.length>0 && 
			(<Toast
				type={toastsArr[0].type}
				title={toastsArr[0].title}
				message={toastsArr[0].message}
				onclickFun={deleteToast}
			/>)
		}
		</React.Fragment>
	);
};

export default ToastList;
