import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,} from 'react-native';
import HeaderComponent from '../headerComponent/HeaderComponent';
import {styles} from './styles/styles';
import {Container, Header, Tab, Tabs, ScrollableTab, TabHeading} from 'native-base';
import Locales from '../../assets/languages/languages';
import api from '../../api/offline/api'
import Comment from './tabEbook/Comment';
import Infor from './tabEbook/Infor';

export default class Ebook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: [],
            data2: [],
            changeTab: false,
        };
    }

    componentDidMount() {
        this.setState({
            data1: api.data1,
            data2: api.data2,
        })
    }

    changeTabs(value) {
        this.setState({
            changeTab: value
        })

    }

    render() {
        const data_book = this.state.data1;
        const data_bookAudio = this.state.data2;
        const navigations = this.props.navigation;
        const {navigation} = this.props;

        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconRightStyle={{fontSize: 35}}
                    iconLeft='ios-arrow-back'
                    typeIconRight='EvilIcons'
                    title={Locales.EBook}
                    iconRight='share-apple'
                    onPressLeft={() => navigation.goBack()}
                />
                <Tabs tabBarUnderlineStyle={{backgroundColor: '#D0021B', height: 1,}}
                      renderTabBar={() => <ScrollableTab style={{backgroundColor: '#fff', borderBottomWidth: 0}}/>}>
                    <Tab tabStyle={{backgroundColor: '#fff'}}
                         activeTabStyle={{backgroundColor: '#fff'}}
                         textStyle={{color: '#C5C4C4'}}
                         activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.E_book}>
                        <Infor
                            navigation={this.props.navigation}/>
                    </Tab>
                    <Tab tabStyle={{backgroundColor: '#fff'}}
                         activeTabStyle={{backgroundColor: '#fff'}}
                         textStyle={{color: '#C5C4C4'}}
                         activeTextStyle={{color: '#D0021B', fontWeight: 'normal'}} heading={Locales.Comment}>
                        <Comment
                            navigation={this.props.navigation}/>
                    </Tab>
                </Tabs>
            </View>
        );
    }
}

{/*<Ebook  navigation={navigation} data={data_book}/>*/
}
