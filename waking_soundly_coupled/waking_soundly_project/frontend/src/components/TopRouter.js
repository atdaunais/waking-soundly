import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./Home";
import LoginPage from "./LoginPage";
import NewUser from "./NewUser";
import AddMusic from "./AddMusic";
import PrivateRoute from "./common/PrivateRoute";
import {loadUser} from "../actions/auth";
import store from "../store";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

class TopRouter extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <div>
                <Link to="/" className="menu_links">Home</Link>
                <Link to="/addmusic/" className="menu_links">Add Music</Link>
                <Link to="/" onClick={this.props.logout} className="menu_links">Logout</Link>
            </div>
        );

        const guestLinks = (
            <div>
                <Link to="/" className="menu_links">Home</Link>
                <Link to="/login/" className="menu_links">Login</Link>
                <Link to="/newuser/" className="menu_links">Create Account</Link>
            </div>
        );

        return (
            <div id="top_container">
                <Router>
                    { isAuthenticated ? authLinks : guestLinks }
                    <Switch>
                        <Route path="/login/" render={(props) => <LoginPage {...props}/>}>

                        </Route>
                        <Route path="/newuser/" render={(props) => <NewUser {...props}/>}>

                        </Route>
                        <Route path="/addmusic/" render={(props) => <AddMusic {...props}/>}>

                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(TopRouter);