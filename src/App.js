import React, {Component} from 'react';
import {StatusBar, I18nManager, Platform} from 'react-native';
import {Provider} from 'react-redux';
import RoutesApp from './routers/Router';
import store from './redux/store';
export default class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Provider store={store}>
                <RoutesApp/>
            </Provider>
        );
    }
}
