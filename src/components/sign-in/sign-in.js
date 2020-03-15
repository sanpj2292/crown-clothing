import React from 'react';
import './sign-in.scss';
import FormInput from '../form-input/form-input';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            email: '',
            password: ''
        });
    }

    handleChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>SignIn with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' type='email'
                        value={this.state.email} required
                        handleChange={this.handleChange}
                        label='Email' />
                    <FormInput
                        name='password' type='password'
                        value={this.state.password} required
                        handleChange={this.handleChange}
                        label='Password' />
                    <input type='submit' value='Submit Form'></input>
                </form>
            </div>
        );
    }
}

export default SignIn;