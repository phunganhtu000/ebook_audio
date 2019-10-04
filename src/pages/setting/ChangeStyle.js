import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import Locales from '../../assets/languages/languages';
import HeaderComponent from '../headerComponent/HeaderComponent';
import {colors} from '../../cores/styles/colors';
import {
    getDataOfflineMode,
    inValidateText,
    saveDataOfflineMode,
    setWidth
} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import FastImage from 'react-native-fast-image';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {horizontalView} from '../../cores/styles/styleView';
import {Icon} from "native-base";
import Styles from './styles/stylesStyle'

export default class ChangeStyle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            styles: [
                {
                    id: 0,
                    name: 'Theme 1',
                    image: 'http://hoanganhken97.000webhostapp.com//images/39131_1.JPEG'
                },
                {
                    id: 1,
                    name: 'Theme 2',
                    image: 'http://hoanganhken97.000webhostapp.com//images/55423_2.JPEG'
                },
                {
                    id: 2,
                    name: 'Theme 3',
                    image: 'http://hoanganhken97.000webhostapp.com//images/81783_3.JPEG'
                },
                {
                    id: 3,
                    name: 'Theme 4',
                    image: 'http://hoanganhken97.000webhostapp.com//images/10443_4.JPEG'
                }
            ],

        }
    }

    async componentWillMount() {
        this.getStyle();
    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl
        })
    }

    async getStyle() {
        const change_style = await getDataOfflineMode(constants.CHANGE_STYLE);
        console.log('change_style: ' + change_style)
        if (inValidateText(change_style)) {
            this.setState({id: 0})
        } else {
            this.setState({id: change_style})
        }

    }

    changeStyle(item) {
        this.setState({id: item})

    }

    save(id) {
        saveDataOfflineMode(constants.CHANGE_STYLE, id)
        this.props.navigation.goBack()
    }

    render() {
        const styles = Styles.getSheet(this.state.isRTL)
        const navigations = this.props.navigation;
        const {navigation} = this.props;
        console.log('data' + this.state.id)
        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconRightStyle={{fontSize: 35}}
                    iconLeft='ios-arrow-back'
                    // typeIconRight='EvilIcons'
                    title={Locales.Change_Style}
                    // iconRight='share-apple'
                    onPressLeft={() => navigation.goBack()}
                />
                <ScrollView>
                    <View style={styles.body}>
                        {this.state.styles.map((item, index) => (
                            <TouchableOpacity style={styles.touch} onPress={() => this.changeStyle(index)}>
                                <View style={{...horizontalView}}>
                                    <TextComponent style={styles.text1}>{item.name}</TextComponent>
                                    {index === this.state.id || inValidateText(this.state.id) ?
                                        <Icon name='checkcircle' type='AntDesign'
                                              style={{fontSize: 15, color: colors.froly, marginRight: 10}}/> :
                                        <Icon name='checkcircle' type='AntDesign'
                                              style={{fontSize: 15, color: colors.white, marginRight: 10}}/>}
                                </View>
                                <FastImage
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.theme}
                                    source={{uri: item.image}}/>
                            </TouchableOpacity>
                        ))}
                    </View>

                </ScrollView>
                <View style={styles.body2}>
                    <TouchableOpacity onPress={() => this.save(this.state.id)} style={{
                        width: '80%',
                        height: 50,
                        alignItems: 'center',
                        backgroundColor: colors.froly,
                        justifyContent: 'center',
                        borderRadius: 5
                    }}>
                        <TextComponent style={{color: colors.white}}>{Locales.Agree}</TextComponent>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

