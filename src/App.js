import React, {Component} from 'react';
import {StatusBar, I18nManager, Platform} from 'react-native';
import {Provider} from 'react-redux';
import RoutesApp from './routers/Router';
import store from './redux/store';
import {getlanguage} from './utils/asyncStorage';
import Language from './cores/languages/languages';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        getlanguage().then(lang => {
            Language.setLanguage(lang);
            console.log('lang: ' + lang);
        });
    }

    render() {
        return (
            <Provider store={store}>
                <RoutesApp/>
            </Provider>
        );
    }
}
