import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import FastImage from "react-native-fast-image";
import api from '../../api/offline/api';
import {getDataOfflineMode, inValidateText} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import Styles from './style/styles';
import Styles_Two from './style/style_two';
import styles_three from './style/style_three';


export default class ListVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],

            changeTab: false,
            styles: Styles.getSheet(false),
        };
    }

    componentDidMount() {
        this.setState({
            data: api.data3,
        })
        this.changeStyle();
    }

    changeTabs(value) {
        this.setState({
            changeTab: value
        })

    }

    async changeStyle() {
        const rtl = await getDataOfflineMode(constants.isRTL)
        this.setState({
            isRTL: rtl
        })
        const change_style = await getDataOfflineMode(constants.CHANGE_STYLE);

        this.setState({
            changeStyle: change_style
        }, () => {
            if (inValidateText(change_style)) {
                this.setState({
                    styles: Styles.getSheet(this.state.isRTL)
                })


            } else if (this.state.changeStyle === 0) {
                this.setState({
                    styles: Styles.getSheet(this.state.isRTL)
                })
            } else if (this.state.changeStyle === 1) {
                this.setState({
                    styles: Styles_Two.getSheet(this.state.isRTL)
                })
            } else if (this.state.changeStyle === 2) {
                this.setState({
                    styles: styles_three.getSheet(this.state.isRTL)
                })
            } else if (this.state.changeStyle === 3) {
                this.setState({
                    styles: Styles.getSheet(this.state.isRTL)
                })
            }

        }, console.log("change_style :" + change_style))
        this.setState({
            // styles: getStyleType()
        })
    }

    render() {
        const {navigate} = this.props.navigation;
        const styles = this.state.styles
        console.log("styles :" + JSON.stringify(styles))
        return (
            <View style={[styles.containerList]}>
                <View style={[styles.body]}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => navigate('VideoPlayerTV', {item: item, data: this.state.data})}
                                style={styles.touchall}>
                                <FastImage style={styles.imageview} source={{uri: item.image}}
                                           resizeMode={FastImage.resizeMode.contain}/>
                            </TouchableOpacity>
                        )}
                        numColumns={3}/>
                </View>
            </View>
        );
    }
}


