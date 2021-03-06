import React, { useState } from 'react';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import {auth} from '../../firebase/firebase.utils'
const SignIn = () => {

    const [creds, setCreds] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = creds;
        try {
            await auth.signInWithEmailAndPassword(email, password)
        } catch (error) {
            console.log(error)
            alert("Wrong credentials");
        }
        setCreds({
            email: '',
            password: ''
        });
    }

    const handleChange = event => {
        const { value, name } = event.target;

        setCreds((_creds) => {
            _creds[name] = value
            return { ..._creds }
        })
    }

    return (
        <div className='sign-in'>
            <h2 className='title'>I'm already a user</h2>
            <span>Sign in with your email and password</span>


            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    value={creds.email}
                    handleChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput
                    name="password"
                    type="password"
                    value={creds.password}
                    handleChange={handleChange}
                    label="Password"
                    required
                />
                <div className="buttons">
                    <CustomButton type="submit">
                        SIGN IN
                    </CustomButton>
                    <CustomButton type="submit" onClick={signInWithGoogle} isGoogleSignIn>
                        SIGN IN WITH GOOGLE
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn;