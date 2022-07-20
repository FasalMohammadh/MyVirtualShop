import React, { useState, useEffect } from "react";
import "../css/ProductBox.css";

export default function ProductBox(props) {
    const calDurationAdPosted = () => {
        const current = new Date();
        const published = new Date(props.published_date);
        let diff, unit;
        if (Math.round(current - published) / 1000 > 0) {
            diff = (current - published) / 1000; //seconds
            unit = "Seconds";
            if (diff / 60 > 1) {
                diff = diff / 60; //minutes
                unit = "Minutes";
                if (diff / 60 === 1) {
                    unit = "Minute";
                }

                if (diff / 60 > 1) {
                    diff = diff / 60; //hours
                    unit = "Hours";
                    if (diff / 60 === 1) {
                        unit = "Hour";
                    }
                    if (diff / 24 > 1) {
                        diff = diff / 24; //days
                        unit = "Days";
                        if (diff / 24 === 1) {
                            unit = "Day";
                        }
                        if (diff / 30 > 1) {
                            diff = diff / 30; //months
                            unit = "Months";
                            if (Math.round(diff / 30) === 1) {
                                unit = "Month";
                            }
                        }
                    }
                }
            }
        } else return "Just now";

        return Math.floor(diff) + " " + unit + " Ago";
    };

    return (
        <div className="card">
            {props.children}
            <div className="row no-gutters">
                <div className="col-md-4 card-image-holder d-flex align-items-center">
                    <img
                        src={`http://localhost:3010/${
                            props.image_path.split("/")[1]
                        }`}
                        className="card-img"
                        alt="..."
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="d-flex flex-wrap gap-1">
                            <small className="card-category">
                                {props.category}
                            </small>
                            <small className="card-location">
                                {props.location}
                            </small>
                            <small className="card-price">
                                Rs:{props.price}
                            </small>
                        </div>

                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text card-desc">
                            {props.description}
                        </p>
                        <div className="d-flex">
                            <h5 className=" border flex-fill d-flex align-items-center rounded-3 p-2 shop-name">
                                <i className="p-2 rounded-circle fa-solid fa-shop" />
                                <div className="ms-2">
                                    <div className="card-title m-0">
                                        {props.shop_name}
                                    </div>
                                    <small className="text-muted card-published">
                                        {calDurationAdPosted()}
                                    </small>
                                </div>
                            </h5>
                            <div
                                className="d-flex align-items-center border rounded-3 p-2 wishlist"
                                style={{ marginBottom: "0.5em" }}
                            >
                                <i className=" fa-regular fa-heart fa-2x" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// import {axiosCus} from './otherRes/commonFun';
// let currentUrl = useRouteMatch().url;

// const [productData, setProductData] = useState({})

// useEffect(() => {
//    axiosCus.post('')
//    .then(response=>setProductData(response.data))
//    .catch(error=>console.log(error))
// }, [])
