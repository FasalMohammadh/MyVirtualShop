import React, {useState, Fragment, useRef} from "react";
import TextBox from "./otherRes/TextBox";
import NavBar from "./Navbar";
import FormRBCollection from "./otherRes/FormRBCollection";
import SmartPhoneRelated from "./otherRes/addProductRealated/SmartPhoneRelated";
import FeaturePhoneRelated from "./otherRes/addProductRealated/FeaturePhoneRelated";
import ChargerRelated from "./otherRes/addProductRealated/ChargerRelated";
import EarphoneRelated from "./otherRes/addProductRealated/EarphoneRelated";
import ImageUploadPreview from "./otherRes/addProductRealated/ImageUploadPreview";
import {axiosCus} from "./otherRes/commonFun";
import Model from "./otherRes/model";
import "./css/Category.css";

export default function AddProduct() {
    //category array to make create collection of radio buttons
    const category = [
        "SmartPhone",
        "FeaturePhone",
        "Charger",
        "Earphone",
        "Other",
    ];

    //to get all images from imageUploadPreview
    const imageUploadPreviewRef = useRef(null);

    //mutable non changing variables between renders
    const allSubForms = useRef(["common", "allImage", "desc"]);
    const childStateObj = useRef({});

    //state object hold common product data
    const [productInfo, setProductInfo] = useState({
        title: "",
        price: "",
        category: "",
        description: "",
    });

    //state to show and hide model
    const [modelHidden, setModelHidden] = useState(true);

    //state to handle the viewed form part
    const [formShown, setFormShown] = useState("common");

    let handleChange = event => {
        let tempProductInfo = {...productInfo}; //spread operator
        tempProductInfo[event.target.name] = event.target.value;
        setProductInfo(tempProductInfo);
    };

    //child will call these method whenever child state updates
    const getChildStateObj = childState => (childStateObj.current = childState);

    const handleSubmit = event => {
        event.preventDefault();

        let formData = new FormData(),
            images = imageUploadPreviewRef.current.giveImages();

        images.forEach(image => formData.append("images", image));

        //entry[0] will be key and entry[1] be value
        Object.entries(productInfo).forEach(entry =>
            formData.set(entry[0], entry[1])
        );
        Object.entries(childStateObj.current).forEach(entry =>
            formData.set(entry[0], entry[1])
        );

        const axiosConfig = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        axiosCus
            .post("/addproduct", formData, axiosConfig)
            .then(({status} )=> {
                status===200 && setModelHidden(true);
                alert("your product will be added soon");
            }
            )
            .catch(error => console.log(error));
    };

    const handleView = event => {
        if (productInfo.category === "Other")
            allSubForms.current.includes("catRelated") &&
                allSubForms.current.splice(1, 1);
        else
            !allSubForms.current.includes("catRelated") &&
                allSubForms.current.splice(1, 0, "catRelated");

        let {name} = event.target,
            currentIndex = allSubForms.current.indexOf(formShown);

        if (name === "prev" && currentIndex > 0)
            setFormShown(allSubForms.current[currentIndex - 1]);

        if (name === "next" && allSubForms.current.length - 1 > currentIndex)
            setFormShown(allSubForms.current[currentIndex + 1]);
    };

    // const handleNext=()=>{
    //     const tempErrors=[]
    //     Object.entries(productInfo).forEach(([key,value])=>{
    //         if(key==="description") return void;

    //         if(value==="") tempErrors.push(`${key} is Required`);
    //     })

    //     if(tempErrors.length>0) return;

    //     curentlyShown=allSubForms.current.indexOf(formShown);

    //     if(productInfo.category==="Other") && setFormShown(allSubForms.current);
    // }

    //clear button code set to defaul state
    const handleClear = () => {
        setProductInfo({
            title: "",
            price: "",
            category: "",
        });
        setFormShown("common");
    };

    const handleCancel = () => setModelHidden(true);

    const modelShow = event => {
        event.preventDefault();
        setModelHidden(false);
    };

    const loadComponentAsSel = () => {
        switch (productInfo.category) {
            case "SmartPhone":
                return <SmartPhoneRelated updateParent={getChildStateObj} />;
            case "FeaturePhone":
                return <FeaturePhoneRelated updateParent={getChildStateObj} />;
            case "Charger":
                return <ChargerRelated updateParent={getChildStateObj} />;
            case "Earphone":
                return <EarphoneRelated updateParent={getChildStateObj} />;
            default:
                break;
        }
    };

    const textBoxData = [
        {
            type: "text",
            title: "Product Title",
            icon: "fa-solid fa-tag",
            name: "title",
        },
        {
            type: "number",
            title: "Product Price",
            icon: "fa-solid fa-dollar-sign",
            name: "price",
        },
    ];

    const displayedState = component => formShown===component?"d-block":"d-none";

    return (
        <Fragment>
            <NavBar />
            <form className="row col-md-6 mx-auto login position-relative">
                <h3 className="text-center">
                    Add Your Product Now
                    <i className="ms-1 fa-solid fa-circle-plus" />
                </h3>
                <div className={`p-0 ${formShown==="common"?"d-flex":"d-none"} flex-column gap-3 mb-3`}>
                    {textBoxData.map(textBox => (
                        <TextBox
                            {...textBox}
                            onchangeFun={handleChange}
                            value={productInfo[textBox.name]}
                            className="w-100"
                        />
                    ))}

                    <FormRBCollection
                        items={category}
                        name="category"
                        title="Category"
                        value={productInfo.category}
                        onchangeFun={handleChange}
                        className="w-100"
                    />
                </div>
                
                <div className={`p-0 mb-3 ${displayedState("catRelated")}`}>
                {loadComponentAsSel()}
                </div>
                
                <div className={`p-0 mb-3 ${displayedState("allImage")}`}>
                    <ImageUploadPreview ref={imageUploadPreviewRef} />
                </div>
                
                <div className={`p-0 mb-3 ${displayedState("desc")}`}>
                    <h4 className="m-0 fw-normal">Description</h4>
                    <textarea
                        name="description"
                        value={productInfo.description}
                        onChange={handleChange}
                        style={{resize: "none"}}
                        spellCheck="false"
                        placeholder="Tell us more about your product"
                        className="form-control-plaintext form-control-lg"
                        cols="30"
                        rows="10"
                    />
                </div>
                <div className="p-0 btn-group">
                    <Button
                        name="prev"
                        icon="fa-backward"
                        onClick={handleView}
                        bgColor="#82CEFA"
                    />
                    <Button
                        name="prev"
                        icon="fa-plus"
                        onClick={modelShow}
                        bgColor="#AADE76"
                    />
                    <Button
                        name="prev"
                        icon="fa-broom"
                        onClick={handleClear}
                        bgColor="#FFDF6B"
                    />
                    <Button
                        name="next"
                        icon="fa-forward"
                        onClick={handleView}
                        bgColor="#82CEFA"
                    />
                </div>
                <Model
                    title="Did you check all the information"
                    message="product will be added soon"
                    hide={modelHidden}
                    onclickConfirm={handleSubmit}
                    onclickCancel={handleCancel}
                />
            </form>
        </Fragment>
    );
}

const Button = ({name, onClick, icon, bgColor}) => {
    const styleButton = {
        width: "fit-content",
        zIndex: "2",
        backgroundColor: bgColor,
    };

    return (
        <button
            name={name}
            style={styleButton}
            onClick={onClick}
            className="btn btn-lg"
            type="button"
        >
            <i className={`pe-none fa-solid ${icon}`} style={{width: "50px"}} />
        </button>
    );
};
