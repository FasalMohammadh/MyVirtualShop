import React, { useState, useEffect, useRef } from "react";
import { axiosCus } from "./commonFun";
import { useHistory } from "react-router-dom";
import Model from "./model";
import TextBox from "./TextBox";

const VerificationModel = ({ email, phoneNo, closeVMFun, signupFun }) => {
    const [emailCode, setEmailCode] = useState("");
    const [phoneNoCode, setPhoneNoCode] = useState("");
    // const [codeTimeout, setCodeTimeout] = useState(1000 * 60 * 2);
    // const [resendBtnDisabled, setResendBtnDisabled] = useState(true);
    const [modelShown, setModelShown] = useState("");
    // let countdownRepeat;

    const history = useHistory();

    useEffect(
        () =>
            axiosCus
                .post(`/signup/email/${email}`)
                .then(({ data }) => {
                    if (data === "ok") setModelShown("emailVrfMdl");
                })
                .catch((error) => console.log(error)),
        []
    );

    // const runCountdown = () => {
    //     countdownRepeat = setInterval(() => {
    //         setCodeTimeout((prevTime) => {
    //             if (prevTime !== 0) return prevTime - 1000;

    //             setCodeTimeout("Resend Code?");
    //             setResendBtnDisabled(false);
    //             clearInterval(countdownRepeat);
    //         });
    //     }, 1000);
    // };

    const verifyEmailOTP = async () => {
        try {
            const { data } = await axiosCus.post(
                `/signup/emailVerify/${email}/${emailCode}`
            );
            if (data === "ok") {
                const { data } = await axiosCus.post(
                    `/signup/phoneNo/${phoneNo}`
                );
                if (data === "ok") setModelShown("phoneNoVrfMdl");
                else alert(data);
            } else alert(data);
        } catch (error) {
            console.log(error);
        }
    };

    const verifyPhoneNoOTP = () => {
        axiosCus
            .post(`/signup/phoneNoVerify/${phoneNo}/${phoneNoCode}`)
            .then(({ data }) => (data === "ok" ? signupFun() : alert(data)))
            .catch((error) => console.log(error));
    };

    // const getTimeout = () => {
    //     if (typeof codeTimeout === "number") {
    //         let min, sec;
    //         min = Math.floor(codeTimeout / (1000 * 60)).toString();
    //         sec = ((codeTimeout % (1000 * 60)) / 1000).toString();
    //         if (min.length < 2) min = "0" + min;
    //         if (sec.length < 2) sec = "0" + sec;
    //         return min + ":" + sec;
    //     }
    //     return codeTimeout;
    // };

    return (
        <React.Fragment>
            {modelShown === "emailVrfMdl" && (
                <Model
                    title="Please enter OTP to verify your email"
                    message={`OTP has been sent to ${email}`}
                    onclickConfirm={verifyEmailOTP}
                    onclickCancel={closeVMFun}
                >
                    <TextBox
                        type="number"
                        value={emailCode}
                        onchangeFun={({ target }) => setEmailCode(target.value)}
                        name="txtCode"
                        title="Enter Code Here"
                        icon="fa-solid fa-hashtag"
                    />
                    {/* <button disabled={resendBtnDisabled} className="btn m-2">
                        {getTimeout()}
                    </button>*/}
                    <CountDown
                        time={2 * 60 * 1000}
                        step={1000}
                        timeoutMsg="Resend Code?"
                        className="btn m-2"
                    />
                </Model>
            )}
            {modelShown === "phoneNoVrfMdl" && (
                <Model
                    title="Please enter OTP to verify your phone number"
                    message={`OTP has been sent to ${phoneNo}`}
                    onclickConfirm={verifyPhoneNoOTP}
                    onclickCancel={closeVMFun}
                >
                    <TextBox
                        type="number"
                        value={phoneNoCode}
                        onchangeFun={({ target }) =>
                            setPhoneNoCode(target.value)
                        }
                        name="txtPhoneCode"
                        title="Enter Code Here"
                        icon="fa-solid fa-hashtag"
                    />
                    {/*<button disabled={resendBtnDisabled} className="btn m-2">
                        {getTimeout()}
                    </button>*/}
                    <CountDown
                        time={2 * 60 * 1000}
                        step={1000}
                        timeoutMsg="Resend Code?"
                        className="btn m-2"
                    />
                </Model>
            )}
        </React.Fragment>
    );
};

export default VerificationModel;

const CountDown = ({ time, step, timeoutMsg, className }) => {
    const [countDownTime, setCountDownTime] = useState(time); //millisec
    const [btnDisabled, setBtnDisabled] = useState(true);

    useEffect(() => {
        const intervalFun = setInterval(
            () =>
                setCountDownTime((prevTime) => {
                    console.log(prevTime);
                    if (prevTime !== 0) return prevTime - step;
                    clearInterval(intervalFun);
                    setBtnDisabled((prevState) => !prevState);
                    return timeoutMsg;
                }),
            1000
        );
    }, []);

    const milleToProperTime = () => {
        if (typeof countDownTime === "number") {
            let min, sec;
            min = Math.floor(countDownTime / (1000 * 60)).toString();
            sec = ((countDownTime % (1000 * 60)) / 1000).toString();;
            if (min.length === 1) min = "0" + min;
            if (sec.length === 1) sec = "0" + sec;
            return min + ":" + sec;
        }
        return countDownTime;
    };

    return (
        <button disabled={btnDisabled} className={className}>
            {milleToProperTime()}
        </button>
    );
};

export {CountDown};

{
    // const models = [
    //     {
    //         title: "Please enter OTP to verify your email",
    //         message: `OTP has been sent to ${email}`,
    //         onclickConfirm: verifyEmailOTP,
    //         txtbxValue: emailCode,
    //         txtbxOnchangeFun: ({ target }) => setEmailCode(target.value),
    //         txtbxName: "txtCode",
    //     },
    //     {
    //         title: "Please enter OTP to your phone number",
    //         message: `OTP has been sent to ${phoneNo}`,
    //         onclickConfirm: verifyPhoneNoOTP,
    //         txtbxValue: phoneNoCode,
    //         txtbxOnchangeFun: ({ target }) => setPhoneNoCode(target.value),
    //         txtbxName: "txtPhoneCode",
    //     },
    // ];
    /*<div className="pop-up-verify box p-5 bg-white position-fixed translate-middle start-50 top-50">
            <span
                className="fa-solid fa-xmark fa-2x fa-fw"
                onClick={handleModelCancel}
            />
            {subFormShown === "emailVerify" && (
                <React.Fragment>
                    <div className="text-center">
                        <h4>Please enter OTP to verify your email</h4>
                        <p>
                            OTP has been sent to&nbsp;
                            <strong>{email}</strong>
                            <span className="ms-1 fa-solid fa-pencil cur-point" />
                        </p>
                        <input
                            type="text"
                            value={emailCode}
                            onChange={handleChangeEmailCode}
                            maxlength="6"
                            className="form-control form-control-sm"
                        />
                        <div className="btn-group">
                            <input
                                className="btn btn-warning my-2 mx-auto d-block"
                                type="button"
                                value={otpRemTime}
                            />
                            <input
                                className="btn btn-primary my-2 mx-auto d-block"
                                type="button"
                                value="Submit"
                                onClick={verifyEmailOTP}
                            />
                        </div>
                    </div>
                    <button
                        disabled={nextButtonDisabled}
                        className="btn btn-primary"
                        onClick={() => setVrfModelShown("phoneNoVerify")}
                    >
                        Next
                    </button>
                </React.Fragment>
            )}
            {vrfModelShown === "phoneNoVerify" && (
                <React.Fragment>
                    <div className="mb-3 text-center">
                        <h4>Please enter OTP to verify your phone number</h4>
                        <p>
                            OTP has been sent to&nbsp;
                            <strong>{details.phoneNo}</strong>
                            <span className="ms-1 fa-solid fa-pencil cur-point" />
                        </p>
                        <input
                            type="text"
                            value={phoneNoCode}
                            onChange={handleChangePhoneNoCode}
                            maxlength="6"
                            className="form-control form-control-sm"
                        />
                        <div className="btn-group">
                            <input
                                className="btn btn-warning my-2 mx-auto d-block"
                                type="button"
                                value="Resend Code"
                            />
                            <input
                                className="btn btn-primary my-2 mx-auto d-block"
                                type="button"
                                value="Submit"
                                onClick={verifyPhoneNoOTP}
                            />
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div> */
}
