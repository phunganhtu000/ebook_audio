import React, {Component} from 'react';
import {

    View,
} from 'react-native';
import {styles} from './styles/styles';
import HeaderComponent from '../headerComponent/HeaderComponent';
import { WebView } from 'react-native-webview';
export default class WebViewComponent extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true
        };
    }



    render() {
        const {navigation} = this.props;
        const item = this.props.navigation.state.params.item;
        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconLeft='ios-close'
                    // iconRight='ios-search'
                    title={item}
                    onPressLeft={() => navigation.goBack()}
                />
                <WebView
                    source={{ uri: item }}
                    style={{ marginBottom: 20 }}
                />
            </View>
        );
    }
}
