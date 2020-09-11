import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './sign-up.styles.scss';

const SignUp = () => {
    const [signupData, setSignupData] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = signupData;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });
            setSignupData({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {

        }

        
    }
    const handleChange = event => {
        const { value, name } = event.target;
        setSignupData((_signupData) => {
            return { ..._signupData, [name]: value }
        })
    }

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={signupData.displayName}
                    handleChange={handleChange}
                    label='Display Name'
                    required
                />

                <FormInput
                    type='text'
                    name='email'
                    value={signupData.email}
                    handleChange={handleChange}
                    label='Email'
                    required
                />

                <FormInput
                    type='password'
                    name='password'
                    value={signupData.password}
                    handleChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={signupData.confirmPassword}
                    handleChange={handleChange}
                    label='Confirm Password'
                    required
                />

                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    );
};

export default SignUp;