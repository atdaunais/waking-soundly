import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {register} from "../actions/auth";

class NewUser extends Component {
    state = {
        username: "",
        password: "",
        password2: "",
        email: "",
        errorMsg: ""
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    createNewUser = (e) => {
        e.preventDefault();
        const {username, email, password, password2} = this.state;
        if (password !== password2) {
            console.log("passwords don't match");
            this.setState({
                errorMsg: "Your passwords do not match."
            })
        } else {
            const newUser = {
                username, email, password
            };
            this.setState({
               errorMsg: ""
            });
            this.props.register(newUser);
        }
    };

    changeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>;
        }
        const {username, password, password2} = this.state;
        return (
            <div>
                <h1>Start Your Journey</h1>
                <div className="form_container">
                    <form onSubmit={this.createNewUser}>
                        <label htmlFor="username">Username</label>
                        <input className="form_input_field" type="text" name="username" value={username} onChange={this.changeValue}/>
                        <br/>
                        <label htmlFor="password">Password</label>
                        <input className="form_input_field" type="password" name="password" value={password} onChange={this.changeValue}/>
                        <br/>
                        <label htmlFor="password2">Confirm Password</label>
                        <input className="form_input_field" type="password" name="password2" value={password2} onChange={this.changeValue}/>
                        <br/>
                        <div className="form_button">
                            <button type="submit">Create Account</button>
                        </div>
                    </form>
                </div>
                <div id="error_msg">{this.state.errorMsg}</div>
                <div>
                    Already have an account? <Link className="misc_links" to="/login/">Login</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register})(NewUser);