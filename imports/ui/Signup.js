import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import { Link } from 'react-router-dom';

export default class Signup extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if(password.length < 9){
            return this.setState({error: 'Password must be more than 8 characters long.'});
        }

        Accounts.createUser({email, password}, (err) => {
            if(err) {
                this.setState({error: err.reason});
            } else{
                this.setState({error: ''});
            }
        })
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__container">
                    <div className={"boxed-view__error-box boxed-view__error-box--" + (this.state.error ? 'show' : 'hide' )}>
                        {this.state.error ? <p>{this.state.error}</p> : undefined }
                    </div>
                    <div className="boxed-view__box">
                        <h1>Join</h1>

                        <form className="boxed-view__form" onSubmit={(e) => this.onSubmit(e)} noValidate>
                            <input type="email" ref="email" name="email" placeholder="Email" />
                            <input type="password" ref="password" name="password" placeholder="Password" />
                            <button className="button">Create Account</button>
                        </form>

                        <Link to="/">Already have an account?</Link>
                    </div>
                </div>
            </div>
        )
    }
}