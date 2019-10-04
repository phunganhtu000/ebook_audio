import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles/styles';
import api from '../../api/offline/api'

export default class ListItemTwoVertical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        this.setState({
            data: api.data,
        })
    }
    render() {
        const data = this.state.data;
        console.log("data" + JSON.stringify(data))
        const column1Data = data.filter((item, i) => i % 2 === 0);
        const column2Data = data.filter((item, i) => i % 2 === 1);
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.itemView}>
                            <View style={styles.column}>
                                <FlatList
                                    initialScrollIndex={false}
                                    data={column1Data}
                                    renderItem={({item}) => (
                                        <TouchableOpacity
                                            // onPress={() => navigate('Details', {item: item})}
                                            style={styles.item}>
                                            <FastImage style={styles.image} source={{uri: item.image}}/>
                                            <View>

                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>

                            <View style={styles.column}>
                                <FlatList
                                    initialScrollIndex={false}
                                    data={column2Data}
                                    renderItem={({item}) => (
                                        <TouchableOpacity
                                            // onPress={() => navigate('Details', {item: item})}
                                            style={styles.item}>
                                            <FastImage
                                                style={[styles.imageItemTwo]}
                                                source={{uri: item.image}}/>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

