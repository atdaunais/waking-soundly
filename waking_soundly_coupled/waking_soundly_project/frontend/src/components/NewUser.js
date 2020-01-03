import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {register} from "../actions/auth";

class NewUser extends Component {
    state = {
      username: "",
      password: "",
      password2: ""
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    createNewUser = (e) => {
        e.preventDefault();
        const {username, password, password2} = this.state;
        if(password !== password2){
            console.log("passwords don't match")
        }
        else{
            const newUser = {
                username, password
            };
            this.props.register(newUser);
        }
    };

    changeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        if (this.props.isAuthenticated){
            return <Redirect to="/"/>;
        }
        const { username, password, password2 } = this.state;
        return (
            <div>
                <h1>New User</h1>
                <form onSubmit={this.createNewUser}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={username} onChange={this.changeValue}/>

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={this.changeValue}/>

                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={this.changeValue}/>
                    <button type="submit">Create Account</button>
                    <p>
                        Already have an account? <Link className="misc_links" to="/login/">Login</Link>
                    </p>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register})(NewUser);