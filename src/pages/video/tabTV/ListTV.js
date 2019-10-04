import React, { Component } from 'react';
import { View,TouchableOpacity, FlatList,StyleSheet } from 'react-native';
import FastImage from "react-native-fast-image";
export default class ListTV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTV:[],

        };
    }
    render() {
        const data = this.props.data;
        return (
            <View style={[styles.container]}>
                <FlatList
                    data={data}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                flex: 1,
                                alignItems: 'center',
                                height: 100,
                                margin: 5,
                            }}>
                            <FastImage style={{height: 100, width: '100%'}} source={{uri: item.image}}/>
                        </TouchableOpacity>
                    )}
                    numColumns={2}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    viewMagin10: {
        marginLeft: 10,
        marginRight: 10
    },
})
