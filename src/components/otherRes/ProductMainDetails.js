import React, { Fragment } from "react";
import "../css/ProductMainDetails.css";

export default function ProductMainDetails({
  title,
  price,
  description,
  published_date: published,
  className,
  shop_name,
  location,
  email,
  phone_number,
  ...props
}) {
  published = new Date(published);

  return (
    <Fragment>
      <div className={`product-main-details-holder overflow-auto ${className}`}>
        <h3>{title}</h3>
        <h5>Rs {price}</h5>
        {loadCatRelated(props)}
        <div className="product-main-desc border">
          <div className="border-bottom border-2 border-dark">Description</div>
          {description}
        </div>
        <div className="product-main-published text-muted">
          Published on {published.toDateString()}
        </div>
      </div>
      <div className="pmd-contact">
        <a href={`tel:${phone_number}`} className="fa-solid fa-phone fa-2x fa-fw" />
        <i className="fa-solid fa-message fa-2x fa-fw" />
        <a href={`mailto:${email}`} className="fa-solid fa-envelope fa-2x fa-fw" />
        <i className="fa-solid fa-location-dot fa-2x fa-fw"/>
      </div>
    </Fragment>
  );
}

function loadCatRelated(props) {
  switch (props.category) {
    case "SmartPhone":
      return <SmartPhone {...props} />;
    case "FeaturePhone":
      return <FeaturePhone {...props} />;
    case "Earphone":
      return <Earphone {...props} />;
    case "Charger":
      return <Charger {...props} />;
    default:
      break;
  }
}

const SmartPhone = (props) => (
  <div className="product-main-cat d-flex gap-2">
    <div>Brand: {props.brand}</div>
    <div>Model: {props.model}</div>
    <div>Memory: {props.memory}</div>
    <div>Storage: {props.storage}</div>
    <div>Front Camera: {props.front_camera}</div>
    <div>Rear Camera:{props.rear_camera}</div>
    <div>Battery: {props.battery_capacity}</div>
    {props.sensors.map((sensor) => (
      <div>{sensor}</div>
    ))}
  </div>
);

const FeaturePhone = ({ brand, standby_days, connectivity }) => (
  <div className="product-main-cat d-flex gap-2">
    <div>Brand: {brand}</div>
    <div>Standby Days: {standby_days}</div>
    {connectivity.map((con) => (
      <div>{con}</div>
    ))}
  </div>
);

const Earphone = ({ brand, type, connectivity }) => (
  <div className="product-main-cat d-flex gap-2">
    <div>Brand: {brand}</div>
    <div>Type: {type}</div>
    <div>Connectivity: {connectivity}</div>
  </div>
);

const Charger = ({ type, fast_charger, no_of_usb_ports, connectivity }) => (
  <div className="product-main-cat d-flex gap-2">
    <div>Type: {type}</div>
    <div>Fast Charging: {fast_charger}</div>
    <div>Usb Ports: {no_of_usb_ports}</div>
    <div>Connectivity: {connectivity}</div>
  </div>
);
