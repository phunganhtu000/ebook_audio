import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import HeaderComponent from '../headerComponent/HeaderComponent';
import {styles} from './styles/styles';
import {Icon} from 'native-base';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {marginTop10} from '../../cores/styles/styleView';
import {getDataOfflineMode} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import getDowload from '../../api/saveDownload/getData';

export default class Ebook extends Component {
    constructor(props) {
        super();
        this.state = {
            data: []
        };
        this._carousel = {};

    }

    async componentDidMount(): void {
        getDowload().then(value => {
            this.setState({
                data: value
            },console.log("data" + JSON.stringify(value)))
        })

    }

    render() {
        console.log("data ahihi" + JSON.stringify(this.state.data))
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconLeft='ios-arrow-back'
                    onPressLeft={() => navigation.goBack()}
                    title='Downloads'/>
                <ScrollView>
                    <View style={styles.body}>
                        <FlatList
                            // horizontal
                            // numColumns={2}
                            data={this.state.data}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress={() => navigate('Details', {item: item})}
                                    style={styles.item}>
                                    <View style={styles.viewId}>
                                        <TextComponent>{item._id}</TextComponent>
                                    </View>
                                    <View style={styles.shadow}>
                                        <FastImage style={[styles.imageItem]}
                                                   source={{uri: item.image}}/>
                                    </View>
                                    <View style={styles.viewText}>
                                        <TextComponent style={styles.text}>{item.title}</TextComponent>
                                        <View style={styles.horizontal}>
                                            <View style={styles.row}><TextComponent
                                                style={[styles.textAuthor, {...marginTop10}]}>Published
                                                from </TextComponent><TextComponent
                                                style={[styles.texttag, {...marginTop10}]}>istudio</TextComponent>
                                            </View>
                                            {/*<TextComponent style={styles.textAuthor}>00:50</TextComponent>*/}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

