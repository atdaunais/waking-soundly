import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import TopRouter from "./TopRouter";
import Alerts from "./Alerts";

import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from "react-alert-template-basic";

import {Provider} from 'react-redux';
import store from "../store";

// Alert options
// const alertOptions = {
//     timeout: 3000,
//     position: 'top center'
// };

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                {/*<AlertProvider template={AlertTemplate} {...alertOptions}>*/}
                <TopRouter/>
                {/*</AlertProvider>*/}
            </Provider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));