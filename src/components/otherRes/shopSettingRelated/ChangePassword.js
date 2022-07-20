import React, { Fragment, useState } from "react";
import PasswordBox from "../PasswordBox";
import { handleChangeObjCloner, axiosCus } from "../commonFun";
import { SmallHeader } from "./EditInfo";
import Model from "../model";
import ToastList from "../ToastList";

const Changepassword = () => {
    const [values, setValues] = useState({
        currentPass: "",
        newPass: "",
        confirmPass: "",
    });

    const [modelShown, setModelShown] = useState(false);

    const [toasts, setToasts] = useState([]);

    const handleChange = (event) =>
        setValues(handleChangeObjCloner(event, { ...values }));

    const handleModel = () => setModelShown((state) => !state);

    const handleClear = () => {
        setValues({
            currentPass: "",
            newPass: "",
            confirmPass: "",
        });
    };

    const handleSubmit = (event) => {
        const { currentPass, newPass } = values;
        axiosCus({
            method: "POST",
            url: "/changePass",
            data: { currentPass, newPass },
        })
            .then((response) => {
                if (response.status === 200) {
                    setToasts([
                        {
                            type: "success",
                            title: "Password Change",
                            message: response.data,
                        },
                    ]);
                    handleModel();
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    const { response } = error;
                    response.status === 403 &&
                        setToasts([
                            {
                                type: "error",
                                title: "Password Change",
                                message: response.data,
                            },
                        ]);

                    response.status === 500 &&
                        setToasts([
                            {
                                type: "error",
                                title: "Internal Server Error",
                                message: "Please try again later",
                            },
                        ]);

                    response.status === 400 &&
                        setToasts([
                            {
                                type: "error",
                                title: "Password Change",
                                message: response.data,
                            },
                        ]);
                }

                handleModel();
            });
    };

    const handleModelPopup = () => {
        let errorsArr = [];
        let { currentPass, newPass, confirmPass } = values;

        currentPass.length === 0 &&
            errorsArr.push({
                type: "error",
                title: "Current Password",
                message: "Field is Required",
            });

        newPass.length === 0
            ? errorsArr.push({
                  type: "error",
                  title: "New Password",
                  message: "Field is Required",
              })
            : newPass.length < 8 && newPass.length > 20
            ? errorsArr.push({
                  type: "error",
                  title: "New Password",
                  message: "Is too long",
              })
            : confirmPass.length === 0
            ? errorsArr.push({
                  type: "error",
                  title: "Confirm Password",
                  message: "Field is Required",
              })
            : newPass !== confirmPass &&
              errorsArr.push({
                  type: "error",
                  title: "Passwords",
                  message: "Passwords does not match",
              });

        errorsArr.length === 0 ? handleModel() : setToasts(errorsArr);
    };

    const elementsArr = [
        {
            title: "Current Password",
            name: "currentPass",
        },
        {
            title: "New Password",
            name: "newPass",
        },
        {
            title: "Confirm Password",
            name: "confirmPass",
        },
    ];

    return (
        <Fragment>
            <SmallHeader
                title="Change Password"
                info="If you wish you can change your password here"
                icon="fa-solid fa-lock"
            />
            <form className="row gap-3 container-fluid mx-auto">
                {elementsArr.map((element) => (
                    <PasswordBox
                        key={element.name}
                        {...element}
                        onchangeFun={handleChange}
                        value={values[element.name]}
                    />
                ))}
                <div className="p-0 d-flex gap-3 flex-wrap">
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={handleClear}
                        type="button"
                    >
                        Clear
                    </button>
                    <button
                        className="btn btn-warning btn-lg"
                        onClick={handleModelPopup}
                        type="button"
                    >
                        Apply Changes
                    </button>
                </div>
                {modelShown && (
                    <Model
                        title="Password change confirmation"
                        message="Are you sure want to change the password"
                        onclickConfirm={handleSubmit}
                        onclickCancel={handleModel}
                    />
                )}
            </form>
            {toasts.length > 0 && <ToastList toasts={toasts} />}
        </Fragment>
    );
};

export default Changepassword;
