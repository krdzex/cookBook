import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { createUser } from '../apiService/userApi';

const SignUp = () => {

    const [values, setValues] = useState({
        userName: "",
        password: "",
        email: "",
        confirmPassword: "",
        redirect: false
    })

    const [errors, setErrors] = useState({})

    const visibilitChange = (vis) => {
        setVisibility({ ...visibility, [vis]: !visibility[vis] })
    }


    const [visibility, setVisibility] = useState({
        vis1: false,
        vis2: false
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
            password: values.password || undefined,
            confirmPassword: values.confirmPassword || undefined
        }
        createUser(user).then(response => {
            if (firstTime) {
                document.getElementById("signForm").className += " afterFirst"
                setFirstTime(false)
            }
            if (response.message) {
                setErrors([])
                setValues({ ...values, redirect: true })
            } else {
                setErrors(response)
            }
        }).catch(err => console.log(err))
    }
    if (values.redirect) return <Redirect to={"/signin"} />
    return (
        <div className="registrationWrapper">
            <div className="signUpCart">
                <div className="form" id="signForm">
                    <h2>Sign up</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="inputBox">
                            <input type="text" placeholder="Username" className={errors.userName ? "error" : "success"} value={values.userName} onChange={onChange("userName")} />
                            <div className="icon"><Icon icon="bx:bxs-user" /></div>
                            {errors.userName && (<span>{errors.userName}</span>)}
                        </div>
                        <div className="inputBox">
                            <input type="text" placeholder="Email" className={errors.email ? "error" : "success"} value={values.email} onChange={onChange("email")} />
                            <div className="icon"><Icon icon="ic:sharp-alternate-email" /></div>
                            {errors.email && (<span>{errors.email}</span>)}
                        </div>
                        <div className="inputBox">
                            <input type="password" type={visibility.vis1 ? "text" : "password"} placeholder="Password" className={errors.password ? "error" : "success"} value={values.password} onChange={onChange("password")} />
                            <div className="icon password"><Icon icon="ri:lock-password-fill" /></div>
                            <div className="eyeIcon" onClick={() => visibilitChange("vis1")}> {visibility.vis1 ? <Icon icon="bi:eye" /> : <Icon icon="bi:eye-slash" />}</div>
                            {errors.password && (<span>{errors.password}</span>)}
                        </div>
                        <div className="inputBox">
                            <input type="password" type={visibility.vis2 ? "text" : "password"} placeholder="Confirm Password" className={errors.confirmPassword ? "error" : "success"} value={values.confirmPassword} onChange={onChange("confirmPassword")} />
                            <div className="icon password"><Icon icon="ri:lock-password-fill" /></div>
                            <div className="eyeIcon" onClick={() => visibilitChange("vis2")}> {visibility.vis2 ? <Icon icon="bi:eye" /> : <Icon icon="bi:eye-slash" />}</div>
                            {errors.confirmPassword && (<span>{errors.confirmPassword}</span>)}
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="Registration" />
                        </div>
                        <Link to="/signIn">
                            Already have account?
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;