import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login} from "../actions/auth";

class LoginPage extends Component {
    state = {
        username: "",
        password: "",
    };

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    loginUser = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password)
    };

    changeValue = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>;
        }
        const { username, password } = this.state;
        return (
            <div>
                <h1>Login</h1>
                <div className="form_container">
                    <form onSubmit={this.loginUser}>
                        <label htmlFor="username">Username</label>
                        <input className="form_input_field" type="text" name="username" value={username} onChange={this.changeValue}/>
                        <br/>
                        <label htmlFor="password">Password</label>
                        <input className="form_input_field" type="password" name="password" value={password} onChange={this.changeValue}/>
                        <br/>
                        <div className="form_button">
                            <button type="submit">Login</button>
                        </div>

                        <div>
                            Don't have an account? <Link className="misc_links" to="/newuser/">Register Here</Link>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(LoginPage);