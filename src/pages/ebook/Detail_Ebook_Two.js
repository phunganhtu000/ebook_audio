import React, {Component} from 'react';
import {
    Platform,
    StyleSheet, Text, View
} from 'react-native';
import {styles} from './styles/style_Ebook_Two';
import Locales from '../../assets/languages/languages';
import HeaderComponent from '../headerComponent/HeaderComponent';
import {Icon, ScrollableTab, Tab, Tabs} from 'native-base';
import Infor from './tabEbook/Infor';
import InforEbook2 from './tabEbook/InforEbook2';
import api from '../../api/offline/api';
import Comment from '../video/tabTV/Comment';

export default class Detail_Ebook_Two extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: [],
    };
    }
    componentDidMount() {
        this.setState({
            data1: api.data1,
        })
    }
    render() {
        const {navigation} = this.props;
        const data = this.props.navigation.state.params.item;
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconRightStyle={{fontSize: 25}}
                    iconLeft='ios-arrow-back'
                    typeIconRight='FontAwesome'
                    title={Locales.Detail_EBook}
                    iconRight='heart-o'
                    onPressLeft={() => navigation.goBack()}
                />
                    <View style={styles.body}>
                        <Tabs   tabBarUnderlineStyle={{ backgroundColor: '#D0021B', height: 1, }} renderTabBar={() => <ScrollableTab scroll style={{ backgroundColor:'#fff', borderBottomWidth: 0 }} />}>
                            <Tab tabStyle={{ backgroundColor: '#fff' }}
                                 activeTabStyle={{ backgroundColor: '#fff' }}
                                 textStyle={{ color: '#C5C4C4' }}
                                 activeTextStyle={{ color: '#D0021B', fontWeight: 'normal' }} heading={Locales.E_book}>
                                <InforEbook2
                                    data={data}
                                    star={this.props.navigation.state.params.star}
                                    navigation={this.props.navigation} />
                            </Tab>
                            <Tab tabStyle={{ backgroundColor: '#fff' }}
                                 activeTabStyle={{ backgroundColor: '#fff' }}
                                 textStyle={{ color: '#C5C4C4' }}
                                 activeTextStyle={{ color: '#D0021B', fontWeight: 'normal' }} heading={Locales.Comment}>
                                <Comment
                                    navigation={this.props.navigation} />
                            </Tab>
                        </Tabs>

                    </View>

            </View>
        )
    }
}
