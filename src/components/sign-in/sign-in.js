import React, { useState } from 'react';
import './sign-in.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { connect } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../redux/user/user-actions";

const SignIn = (props) => {
    const { googleSignInStart } = props;

    const [userCredentials, setCredentials] = useState({ email: '', password: '' });

    const { email, password } = userCredentials;

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.emailSignInStart(email, password);
        // try {
        //     await auth.signInWithEmailAndPassword(email, password);
        //     setCredentials({
        //         email: '',
        //         password: ''
        //     });
        // } catch (error) {
        //     console.error(error);
        // }
    };

    const handleChange = e => {
        const { value, name } = e.target;
        setCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>SignIn with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name='email' type='email'
                    value={email}
                    required
                    handleChange={handleChange}
                    label='Email' />
                <FormInput
                    name='password' type='password'
                    value={password}
                    required
                    handleChange={handleChange}
                    label='Password' />
                <div className='buttons'>
                    <CustomButton type='submit'>SignIn</CustomButton>
                    <CustomButton
                        type='button'
                        onClick={googleSignInStart}
                        isGoogleSignIn>
                        Sign In With Google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);