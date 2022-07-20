import React, { useState, useEffect, useRef } from 'react';
import TextBox from '../TextBox';
import Location from '../locations';
import { axiosCus, handleChangeObjCloner, emailValidation } from '../commonFun';
import Model from '../model';
import Toast from '../toast';
import PasswordBox from '../PasswordBox';

export default function () {
    //hold the textbox values and selectbox values
    const [newInfo, setNewInfo] = useState({
        name: '',
        email: '',
        location: '',
    });

    const [errors, setErrors] = useState([]);

    //to hold the visibility of confirmation message model
    const [modelHidden, setModelHidden] = useState(true);

    //to hold the characters entered in confirm password box
    const [confirmPass, setConfirmPass] = useState('');

    //to hold the previous information of the shop so that when rollback is clicked it can be rollback with these values
    const values = useRef({});

    //will update states of textboxes when they change
    const handleChange = event =>
        setNewInfo(handleChangeObjCloner(event, { ...newInfo }));

    //called once when componentdidmount and update the textboxes with old values
    useEffect(
        () =>
            axiosCus
                .post('/shop/details')
                .then(response => {
                    let { shop_name: name, email, location } = response.data;
                    values.current = { name, email, location };
                    setNewInfo(values.current);
                })
                .catch(error => console.log(error)),
        []
    );

    //set the ref values to states
    const handleRollback = () => setNewInfo(values.current);

    const clearToast = () => {
        let tempErrors = [...errors];
        tempErrors.shift();
        setErrors(tempErrors);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setModelHidden(true);
        let tempErrors = [...errors];
        try {
            if (confirmPass) {
                let response = await axiosCus.post('/shop/newDetails', {
                    ...newInfo,
                    confirmPass,
                });
                if (response.status === 200) {
                    tempErrors.push({
                        message: 'Updated successfully',
                        type: 'success',
                    });
                    setErrors(tempErrors);
                }
            }
        } catch (error) {
            console.log({ ...error });

            if (error.response) {
                let { status } = error.response;
                status === 401 &&
                    tempErrors.push({
                        message: 'Unauthorized access denied',
                        type: 'error',
                    });

                status === 500 &&
                    tempErrors.push({
                        title: 'Internal error',
                        message: 'Please try again later',
                        type: 'error',
                    });

                status === 400 &&
                    tempErrors.push({
                        title: 'Bad request',
                        message: 'Did you missed any field',
                        type: 'error',
                    });

                setErrors(tempErrors);
            }
        }
    };

    const handleModelView = () => {
        let { name, email } = newInfo,
            tempErrors = [];

        name === '' &&
            tempErrors.push({
                title: 'Shop Name',
                message: 'Shop Name is missing',
                type: 'error',
            });

        let message = emailValidation(email);

        message &&
            tempErrors.push({
                title: 'Email',
                message,
                type: 'error',
            });

        tempErrors.length > 0
            ? setErrors(tempErrors)
            : setModelHidden(!modelHidden);
    };

    const loadToast = () => {
        if (errors.length > 0) {
            return <Toast {...errors[0]} onclickFun={clearToast} />;
        }
    };

    const textBoxArr = [
        {
            name: 'name',
            title: 'Shop Name',
            icon: 'fa-solid fa-store',
        },
        {
            name: 'email',
            title: 'Email',
            icon: 'fa-solid fa-envelope',
        },
    ];

    return (
        <React.Fragment>
            <SmallHeader
                title='Shop Information'
                info='In here you can view and edit your shop information'
                icon='fa-solid fa-shield'
            />
            <form className='container-fluid row m-0 gap-3'>
                {textBoxArr.map(textBox => (
                    <TextBox
                        key={textBox.name}
                        {...textBox}
                        value={newInfo[textBox.name]}
                        className='col-md-12 '
                        onchangeFun={handleChange}
                    />
                ))}

                <Location value={newInfo.location} onchangeFun={handleChange} />

                <div className='p-0 d-flex gap-3 flex-wrap'>
                    <button
                        className='btn btn-primary btn-lg'
                        type='button'
                        onClick={handleModelView}>
                        Save
                    </button>
                    <button
                        className='btn btn-warning btn-lg'
                        type='button'
                        onClick={handleRollback}>
                        RollBack
                    </button>
                </div>

                <Model
                    title='Change Information'
                    message='Are you sure want to apply these changes?'
                    hide={modelHidden}
                    onclickConfirm={handleSubmit}
                    onclickCancel={handleModelView}>
                    <PasswordBox
                        title='Confirm Password'
                        name='confirmPass'
                        onchangeFun={event =>
                            setConfirmPass(event.target.value)
                        }
                        value={confirmPass}
                        className='mb-3'
                    />
                </Model>

                {loadToast()}
            </form>
        </React.Fragment>
    );
}

const SmallHeader = props => {
    return (
        <div className='d-flex p-3'>
            <i className={`me-3 ${props.icon} fa-3x`} />
            <div>
                <h3 className='m-0'>{props.title}</h3>
                <div className='text-muted'>{props.info}</div>
            </div>
        </div>
    );
};
export { SmallHeader };

/* <Model
        title='Change Information'
        message='Are you sure want to apply these changes?'
        hide={modelHidden}
        onclickConfirm={handleSubmit}
        onclickCancel={handleModelView}
        type='confirm'
        handlePassword={event => setConfirmPass(event.target.value)}
        passVal={confirmPass}
    />
     can avoid passing props to multi level using containment */

/* <TextBox
                  value={newInfo.name:
                  name="name"
                  type="text"
                  title="Shop Name"
                  icon="fa-solid fa-store"
                  className="col-md-12"
                  onchangeFun={handleChange}
              />
              <TextBox
                  value={newInfo.email}
                  name="email"
                  type="text"
                  title="Email"
                  className="col-md-12"
                  icon="fa-solid fa-envelope"
                  onchangeFun={handleChange}
              /> */
