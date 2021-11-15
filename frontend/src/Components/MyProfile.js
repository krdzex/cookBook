import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { closePopUp, openPopUp } from '../Actions';
import { softDelete, updateUser } from '../apiService/userApi';
import authHelper from '../auth/authHelper';

const MyProfile = () => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        userName: authHelper.isAuthentcated().user.userName,
        email: authHelper.isAuthentcated().user.email,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        redirect: false

    })
    const [errors, setErrors] = useState({})

    const visibilitChange = (vis) => {
        setVisibility({ ...visibility, [vis]: !visibility[vis] })
    }


    const [visibility, setVisibility] = useState({
        vis1: false,
        vis2: false,
        vis3: false
    })


    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const [firstTime, setFirstTime] = useState(true)
    const onSubmit = (e) => {
        e.preventDefault()
        let user = {
            userName: values.userName || undefined,
            email: values.email || undefined,
            oldPassword: values.oldPassword || undefined,
            newPassword: values.newPassword || undefined,
            confirmPassword: values.confirmPassword || undefined
        }
        updateUser(authHelper.isAuthentcated().user._id, user).then(response => {
            if (firstTime) {
                document.getElementById("ediForm").className += " afterFirst"
                setFirstTime(false)
            }
            if (response.message) {
                setErrors([])
                setValues({ ...values, redirect: true })
                dispatch(openPopUp("Successfuly Edited Profile!"))
                setTimeout(() => {
                    dispatch(closePopUp())
                }, 3000);
            } else {
                setErrors(response)
            }
        }).catch(err => console.log(err))
    }

    const onDeleteClick = () => {
        softDelete(authHelper.isAuthentcated().user._id).then(res => console.log(res)).catch(err => console.log(err))
        dispatch(openPopUp("Successfuly Deleted Profile!"))
        setTimeout(() => {
            authHelper.signOut();
            window.location.reload()
        }, 3000);
    }

    if (values.redirect) return <Redirect to={"/homePage"} />
    return (
        <div className="registrationWrapper">
            <div className="signUpCart" style={{ minHeight: "500px" }}>
                <div className="form" id="ediForm">
                    <h2>Edit Profile</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="inputBox">
                            <input type="text" placeholder="Username" className={errors.userName ? "error" : "success"} value={values.userName} onChange={onChange("userName")} />
                            <div className="icon"><Icon icon="bx:bxs-user" /></div>
                            {errors.userName && (<span>{errors.userName}</span>)}
                        </div>
                        <div className="inputBox">
                            <input type="text" placeholder="Email" className={errors.email ? "error" : "success"} disabled value={values.email} onChange={onChange("email")} style={{ background: "lightGray" }} />
                            <div className="icon"><Icon icon="ic:sharp-alternate-email" /></div>
                            {errors.email && (<span>{errors.email}</span>)}
                        </div>
                        <div className="inputBox">
                            <input type="password" type={visibility.vis1 ? "text" : "password"} placeholder="Old Password" className={errors.oldPassword ? "error" : "success"} value={values.oldPassword} onChange={onChange("oldPassword")} />
                            <div className="icon password"><Icon icon="ri:lock-password-fill" /></div>
                            <div className="eyeIcon" onClick={() => visibilitChange("vis1")}> {visibility.vis1 ? <Icon icon="bi:eye" /> : <Icon icon="bi:eye-slash" />}</div>
                            {errors.oldPassword && (<span>{errors.oldPassword}</span>)}
                        </div>
                        <div className="inputBox">
                            <input type="password" type={visibility.vis2 ? "text" : "password"} placeholder="New Password" className={errors.newPassword ? "error" : "success"} value={values.newPassword} onChange={onChange("newPassword")} />
                            <div className="icon password"><Icon icon="ri:lock-password-fill" /></div>
                            <div className="eyeIcon" onClick={() => visibilitChange("vis2")}> {visibility.vis2 ? <Icon icon="bi:eye" /> : <Icon icon="bi:eye-slash" />}</div>
                            {errors.newPassword && (<span>{errors.newPassword}</span>)}
                        </div>
                        <div className="inputBox">
                            <input type="password" type={visibility.vis3 ? "text" : "password"} placeholder="Confirm Password" className={errors.confirmPassword ? "error" : "success"} value={values.confirmPassword} onChange={onChange("confirmPassword")} />
                            <div className="icon password"><Icon icon="ri:lock-password-fill" /></div>
                            <div className="eyeIcon" onClick={() => visibilitChange("vis3")}> {visibility.vis3 ? <Icon icon="bi:eye" /> : <Icon icon="bi:eye-slash" />}</div>
                            {errors.confirmPassword && (<span>{errors.confirmPassword}</span>)}
                        </div>

                        <div className="inputBox">
                            <input type="submit" value="Edit" />

                        </div>
                        <p style={{ textAlign: "center" }}>Or</p>
                        <div className="inputBox">
                            <input type="button" value="Delete Account" style={{ background: "red", cursor: "pointer", color: "white", fontSize: "18px", border: "none" }} onClick={() => onDeleteClick()} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;