import React from 'react';
import SignIn from '../../components/sign-in/sign-in';
import './sign-in-sign-up.scss';
import SignUp from '../../components/sign-up/sign-up';

const SignInSignUpPage = () => {
    return (
        <div className='sign-in-and-sign-up'>
            <SignIn />
            <SignUp />
        </div>
    );
};

export default SignInSignUpPage;