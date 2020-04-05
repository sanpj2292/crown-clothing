import React, { useState, useEffect } from 'react';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { auth, createUserProfileDocument } from '../../firebase/firebase-utils';
import './sign-up.scss';

const SignUp = (props) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (confirmPassword !== password) {
            alert('Passwords don\'t match');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });
            // Clean-up warning fix commit
            // setUserCredentials({
            //     displayName: '',
            //     email: '',
            //     password: '',
            //     confirmPassword: ''
            // });
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    // componentWillUnmount
    useEffect(() => {
        // Anyother function mentioned will be triggerred when the comp is first mounted
        // Similar to componentDidMount()

        // Return statement function will be clean-up code to prevent memory leakage
        // Similar to componentWillUnmount()
        return () => {
            setUserCredentials({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        }
    }, []);

    return (
        <div className='sign-up'>
            <h2 className='title'>I don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput type='text' name='displayName' value={displayName}
                    onChange={handleChange} label='DisplayName' required />
                <FormInput type='email' name='email' value={email}
                    onChange={handleChange} label='Email' required />
                <FormInput type='password' name='password' value={password}
                    onChange={handleChange} label='Password' required />
                <FormInput type='password' name='confirmPassword' value={confirmPassword}
                    onChange={handleChange} label='Confirm Password' required />
                <CustomButton type='submit' > SignUp</CustomButton>
            </form>
        </div>
    );
}

export default SignUp;