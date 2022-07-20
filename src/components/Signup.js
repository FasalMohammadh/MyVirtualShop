import React, { useState } from "react";
import "./css/signup.css";
import Location from "./otherRes/locations";
import { axiosCus } from "./otherRes/commonFun";
import TextBox from "./otherRes/TextBox";
import PasswordBox from "./otherRes/PasswordBox";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";
import VerificationModel from "./otherRes/VerificationModel";

export default function (props) {
    const [details, setDetails] = useState({
        shopName: "",
        email: "",
        phoneNo: "",
        pass: "",
        repass: "",
        location: "Akkarepattu",
    });
    const [vrfModelShown, setVrfModelShown] = useState(false);

    const [errors, setErrors] = useState({
        shopName: "",
        email: "",
        phoneNo: "",
        pass: "",
        repass: "",
    });

    const handleChange = (event) => {
        let { name, value } = event.target;
        let tempDetails = { ...details };
        tempDetails[name] = value;
        setDetails(tempDetails);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let tempErrors = { ...errors };

        const errorSetFun = (elem, msg) => (tempErrors[elem] = msg);

        //shopName validation
        details.shopName !== ""
            ? errorSetFun("shopName", "")
            : errorSetFun("shopName", "Shop name is required");

        //email validation
        details.email !== ""
            ? details.email.includes("@") &&
              details.email.indexOf("@") !== 0 &&
              details.email.includes(".com") &&
              details.email.indexOf("@") < details.email.length - 9
                ? errorSetFun("email", "")
                : errorSetFun("email", "Email is not valid")
            : errorSetFun("email", "Email is required");

        //phone number validation
        const phoneRegex = /^((\u0030)|(\u0030\u0030\u0039\u0034))\d{9}$/;
        details.phoneNo === ""
            ? errorSetFun("phoneNo", "Phone Number is required")
            : phoneRegex.test(details.phoneNo)
            ? errorSetFun("phoneNo", "")
            : errorSetFun("phoneNo", "Not a valid phone number");

        //password validation
        if (details.pass !== "") {
            if (details.pass.length < 8) {
                errorSetFun("pass", "Password Must Be Atleast 8 Characters");
            } else {
                errorSetFun("pass", "");
                details.pass !== details.repass
                    ? errorSetFun("repass", "Passwords Do Not Match")
                    : errorSetFun("repass", "");
            }
        } else errorSetFun("pass", "Password is required");

        try {
            let response = await axiosCus.post("/signup/checkEmail", {
                email: details.email,
            });
            if (!response.data === "ok") errorSetFun("email", response.data);

            response = await axiosCus.post("/signup/checkPhone", {
                phoneNo: details.phoneNo,
            });
            if (!response.data === "ok") errorSetFun("phoneNo", response.data);

            let tempErrorsArr = Object.values(tempErrors);
            for (let item of tempErrorsArr) {
                if (item !== "") return setErrors(tempErrors);
            }

            setVrfModelShown("emailVerify");
        } catch (error) {
            console.log(error);

            if (error.response) {
                if (error.response.status === 500)
                    alert("Internal server error");
            }
        }
    };

    const signupFun = () =>
        axiosCus
            .post("/signup", details)
            .then(
                ({ status }) => status === 200 && props.history.push("/login")

                // let responseToArr = Object.entries(response.data)[0];
                // let [key, error] = responseToArr;
                // errorSetFun(key, error);
                // setErrors(tempErrors);
            )
            .catch((error) => console.log(error));

    return (
        <React.Fragment>
            <NavBar />
            <div className="col-md-10 SignupContainer row mx-auto rounded">
                <div className="text-center signupBox col-md-6 d-none d-md-flex flex-column justify-content-center p-5">
                    <h2 className="m-0">Welcome Back!</h2>
                    <div className="mt-2">
                        To stay connected with us please login with your
                        personal info
                    </div>
                    <Link
                        to="/login"
                        className="btn btn-lg btn-info mt-2 fw-bold align-self-center text-uppercase"
                        id="submitBtn"
                    >
                        Login
                    </Link>
                </div>
                <form
                    id="signupFrm"
                    className="signup col-12 col-md-6 text-dark"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-center mb-3">Register</h2>

                    <div>
                        <TextBox
                            type="text"
                            title="Shop Name"
                            name="shopName"
                            onchangeFun={handleChange}
                            value={details.shopName}
                            icon="fa-solid fa-store"
                        />
                        {errors.shopName && <small>{errors.shopName}</small>}
                    </div>

                    <div>
                        <TextBox
                            type="text"
                            title="Email"
                            name="email"
                            onchangeFun={handleChange}
                            value={details.email}
                            icon="fa-solid fa-envelope"
                        />
                        {errors.email && <small>{errors.email}</small>}
                    </div>

                    <div>
                        <TextBox
                            type="number"
                            title="Phone Number"
                            name="phoneNo"
                            onchangeFun={handleChange}
                            value={details.phoneNo}
                            icon="fa-solid fa-phone"
                        />
                        {errors.phoneNo && <small>{errors.phoneNo}</small>}
                    </div>

                    <div>
                        <PasswordBox
                            title="Password"
                            name="pass"
                            onchangeFun={handleChange}
                            value={details.pass}
                        />
                        {errors.pass && <small>{errors.pass}</small>}
                    </div>

                    <div>
                        <PasswordBox
                            title="Confirm Password"
                            name="repass"
                            onchangeFun={handleChange}
                            value={details.repass}
                        />
                        {errors.repass && <small>{errors.repass}</small>}
                    </div>

                    <Location
                        onchangeFun={handleChange}
                        value={details.location}
                    />

                    <button
                        className="btn btn-lg d-block mx-auto btn-primary text-uppercase fw-bold"
                        id="submitBtn"
                    >
                        Register
                    </button>
                </form>
                {vrfModelShown && (
                    <VerificationModel
                        closeVMFun={() => setVrfModelShown(false)}
                        email={details.email}
                        phoneNo={details.phoneNo}
                        signupFun={signupFun}
                    />
                )}
            </div>
        </React.Fragment>
    );
}
