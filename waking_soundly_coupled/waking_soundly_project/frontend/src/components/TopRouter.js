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
import {logout} from "../actions/auth";
import About from "./About";

class TopRouter extends Component {
    constructor(props) {
        super(props);
        this.state={
            inSession: false
        }
    }


    componentDidMount() {
        store.dispatch(loadUser());
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    mouseOver = () => {
        if (document.getElementById("menu_logo").src === "http://127.0.0.1:8000/static/frontend/white_logo_no_tagline_transparent_background.png") {
            document.getElementById("menu_logo").src = "http://127.0.0.1:8000/static/frontend/logo_no_tagline_transparent_background.png"
        }
    };

    mouseOut = () => {
        if (document.getElementById("menu_logo").src === "http://127.0.0.1:8000/static/frontend/logo_no_tagline_transparent_background.png") {
            document.getElementById("menu_logo").src = "http://127.0.0.1:8000/static/frontend/white_logo_no_tagline_transparent_background.png"
        }
    };

    changeContainer = () => {
        if(document.getElementById("top_container")){
            this.setState({
                inSession: true
            });
            document.getElementById("top_container").id = "top_container_session";
        }
        else if(document.getElementById("top_container_session")){
            this.setState({
                inSession: false
            });
            document.getElementById("top_container_session").id = "top_container";
        }
    };

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <div id="link_menu">
                <div>
                    <Link to="/"><img src="../../static/frontend/white_logo_no_tagline_transparent_background.png"
                                      onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} id="menu_logo"
                                      alt="logo"/></Link>
                </div>
                <div className="menu_link_container">
                    <Link to="/about/" className="menu_links">About</Link>
                </div>
                <div className="menu_link_container">
                    <Link to="/addmusic/" className="menu_links">My Music</Link>
                </div>
                <div className="menu_link_container">
                    <Link to="/" onClick={this.props.logout} className="menu_links">Logout</Link>
                </div>
            </div>
        );

        const guestLinks = (
            <div id="link_menu">
                <div>
                    <Link to="/"><img src="../../static/frontend/white_logo_no_tagline_transparent_background.png"
                                      onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} id="menu_logo"
                                      alt="logo"/></Link>
                </div>
                <div className="menu_link_container">
                    <Link to="/about/" className="menu_links">About</Link>
                </div>
                <div className="menu_link_container">
                    <Link to="/login/" className="menu_links">Login</Link>
                </div>
                <div className="menu_link_container">
                    <Link to="/newuser/" className="menu_links">Create Account</Link>
                </div>
            </div>
        );

        return (
            <div>
                <Router>
                    {this.state.inSession ? "" : isAuthenticated ? authLinks : guestLinks}
                    <div id="top_container">
                        <Switch>
                            <Route path="/login/" render={(props) => <LoginPage {...props}/>}>

                            </Route>
                            <Route path="/newuser/" render={(props) => <NewUser {...props}/>}>

                            </Route>
                            <Route path="/addmusic/" render={(props) => <AddMusic {...props}/>}>

                            </Route>
                            <Route path="/about/" render={(props) => <About {...props}/>}>

                            </Route>
                            <Route path="/" render={(props) => <Home{...props} changeContainer={this.changeContainer}/>}>

                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(TopRouter);