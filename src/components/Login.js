import React, { useState, useContext } from "react";
import "./css/login.css";
import TextBox from "./otherRes/TextBox";
import PasswordBox from "./otherRes/PasswordBox";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";
import { axiosCus } from "./otherRes/commonFun";
import { AuthContext } from "./PathNav";
import Model from "./otherRes/model";
import { CountDown } from "./otherRes/VerificationModel";

export default function Login(props) {
    const auth = useContext(AuthContext);

    //states
    const [forPassBtnVis, setForPassBtnVis] = useState(false);
    const [forPassMdlVis, setForPassMdlVis] = useState(false);
    const [forChngePassvis, setForChngePassvis] = useState(false);
    const [forPassEmailCode, setForPassEmailCode] = useState("");
    const [toasts, setToasts] = useState([]);
    const [newPass, setNewPass] = useState("");
    const [conPass, setConPass] = useState("");
    const [emailAndPassword, setEmailAndPassword] = useState({
        email: "",
        password: "",
    });
    const [errObj, setErrorObj] = useState({
        emailError: "",
        passwordError: "",
    });

    //event handlings
    let handleChange = (event) => {
        let { name, value } = event.target;
        let tempEmailAndPassword = { ...emailAndPassword };
        tempEmailAndPassword[name] = value;
        setEmailAndPassword(tempEmailAndPassword);
    };

    let handleSubmit = (event) => {
        event.preventDefault();
        let { email, password } = emailAndPassword;

        const tempErrors = { ...errObj };
        const errorSetFun = (elem, msg) => (tempErrors[elem] = msg);

        email === ""
            ? errorSetFun("emailError", "Email is required")
            : errorSetFun("emailError", "");
        password === ""
            ? errorSetFun("passwordError", "Password is required")
            : errorSetFun("passwordError", "");

        let tempErrorsArr = Object.values(tempErrors);

        for (let item of tempErrorsArr)
            if (item !== "") return setErrorObj(tempErrors);

        axiosCus
            .post("/login", emailAndPassword)
            .then((response) => {
                if (response.data === "user") {
                    localStorage.setItem("role", "user");
                    auth.setAuthRole("user");
                    props.history.push("/addproduct");
                } else {
                    // response.data === "admin"
                    localStorage.setItem("role", "admin");
                    auth.setAuthRole("admin");
                    props.history.push("/admin");
                }
            })
            .catch((error) => {
                //status code other than 2xx captured here as error
                if (error.response) {
                    const { data, status } = error.response;
                    if (status === 400) {
                        errorSetFun(
                            "emailError",
                            "Email or password Incorrect"
                        );
                        setErrorObj(tempErrors);
                        !(data === "invaild email") && setForPassBtnVis(true);
                    }
                }
            });
    };

    const handleForPassBtn = () =>
        axiosCus
            .post(`/login/forPass/${emailAndPassword.email}`)
            .then(({ status }) => status === 200 && setForPassMdlVis(true))
            .catch((error) => {
                if (error.response) {
                    const { status } = error.response;
                    status === 500 &&
                        setToasts([
                            {
                                type: "error",
                                title: "Internal Error",
                                message: "Please try again later",
                            },
                        ]);
                }
            });

    const handleForPassCodeVrf = () =>
        axiosCus
            .post(
                `/signup/emailVerify/${emailAndPassword.email}/${forPassEmailCode}`
            )
            .then(({ data }) => {
                if (data === "ok") {
                    setForPassMdlVis(false);
                    setForChngePassvis(true);
                }
            })
            .catch((error) => {});

    const handleNewPass = () => {
        if (newPass.length === 0)
            return setToasts([
                {
                    type: "error",
                    title: "Validation failed",
                    message: "New password is required",
                },
            ]);

        if (newPass.length < 8 || newPass.length > 20)
            return setToasts([
                {
                    type: "error",
                    title: "Validation failed",
                    message: "Must be 8-12 characters long",
                },
            ]);

        if (conPass.length === 0)
            return setToasts([
                {
                    type: "error",
                    title: "Validation failed",
                    message: "Confirm password is required",
                },
            ]);

        if (newPass !== conPass)
            return setToasts([
                {
                    type: "error",
                    title: "Validation failed",
                    message: "Passwords do not match!",
                },
            ]);

        axiosCus
            .post("/login/forPass/passChange", {
                newPass,
                conPass,
                email: emailAndPassword.email,
            })
            .then(({ status }) => {
                status === 200 &&
                    setToasts([
                        {
                            type: "success",
                            title: "Forgot Password",
                            message:
                                "Your password has been successfully updated.",
                        },
                    ]);
                setForChngePassvis(false);
            })
            .catch((error) => {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 400)
                        return setToasts([
                            {
                                type: "error",
                                title: "Email Error",
                                message:
                                    "We couldn't find an account associated with the entered email.",
                            },
                        ]);

                    // if (status === 500)
                    //     return setToasts([
                    //         {
                    //             type: "error",
                    //             title: "Internal Error",
                    //             message:
                    //                 "Something went wrong, please try again later.",
                    //         },
                    //     ]);
                }
                setToasts([
                    {
                        type: "error",
                        title: "Internal Error",
                        message:
                            "Something went wrong, please try again later.",
                    },
                ]);
            });
    };

    return (
        <React.Fragment>
            <NavBar />
            <form
                style={{ minHeight: "500px" }}
                onSubmit={handleSubmit}
                className="login d-flex col-10 p-0"
            >
                <div className="signupBox text-center col-md-6 p-3 d-none d-md-flex flex-column justify-content-center">
                    <h2 className="mb-0">Hello, Friend!</h2>
                    <div className="mt-2">
                        Enter your details and start your journey with us
                    </div>
                    <Link
                        to="/signup"
                        className="mt-2 btn btn-lg align-self-center btn-info  text-uppercase fw-bold"
                        id="submitBtn"
                    >
                        Sign up
                    </Link>
                </div>
                <div className="p-5 d-flex col-12 col-md-6 justify-content-center flex-column row mx-auto ">
                    <h2 className="text-center">Login</h2>
                    <div className="mb-3">
                        <TextBox
                            value={emailAndPassword.email}
                            onchangeFun={handleChange}
                            title="Email"
                            name="email"
                            icon="fa-solid fa-envelope"
                            type="text"
                        />
                        {errObj.emailError !== "" && (
                            <small className="d-block px-2">
                                {errObj.emailError}
                            </small>
                        )}
                    </div>
                    <div className="mb-3">
                        <PasswordBox
                            value={emailAndPassword.password}
                            onchangeFun={handleChange}
                            title="Password"
                            name="password"
                        />
                        {errObj.passwordError !== "" && (
                            <small className="mb-2 d-block px-2">
                                {errObj.passwordError}
                            </small>
                        )}
                    </div>
                    <div className="btn-group-vertical">
                        <button
                            className="btn btn-primary btn-lg mx-auto text-uppercase fw-bold"
                            type="submit"
                        >
                            Login
                        </button>
                        {forPassBtnVis && (
                            <button
                                className="btn btn-danger btn-lg mx-auto"
                                type="button"
                                onClick={handleForPassBtn}
                                disabled={emailAndPassword.email.length === 0}
                            >
                                Forgot Password?
                            </button>
                        )}
                    </div>
                </div>
            </form>
            {forPassMdlVis && (
                <Model
                    title="Forgot Passowrd"
                    message={`Email has been sent to ${emailAndPassword.email}`}
                    onclickConfirm={handleForPassCodeVrf}
                    onclickCancel={() => setForPassMdlVis(false)}
                >
                    <TextBox
                        className="mb-2"
                        value={forPassEmailCode}
                        type="number"
                        name="emailCode"
                        title="Enter Code here"
                        icon="fa-solid fa-hash"
                        onchangeFun={({ target }) =>
                            setForPassEmailCode(target.value)
                        }
                    />
                    <CountDown
                        time={1000 * 60 * 2}
                        step={1000}
                        timeoutMsg="Resend Code"
                        className="btn"
                    />
                </Model>
            )}
            {forChngePassvis && (
                <Model
                    title="Passowrd Change"
                    message="Enter your new password here to continue"
                    onclickConfirm={handleNewPass}
                    onclickCancel={() => setForChngePassvis(false)}
                >
                    <PasswordBox
                        className="mb-2"
                        value={newPass}
                        name="newPass"
                        title="New Password"
                        onchangeFun={({ target }) => setNewPass(target.value)}
                    />
                    <PasswordBox
                        className="mb-2"
                        value={conPass}
                        name="conPass"
                        title="Confirm Password"
                        onchangeFun={({ target }) => setConPass(target.value)}
                    />
                </Model>
            )}
        </React.Fragment>
    );
}
