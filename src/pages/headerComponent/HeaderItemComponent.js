import React, {Component} from 'react';
import {View, Text, Image, StyleSheet,Platform,TouchableOpacity,FlatList} from 'react-native';
import {colors} from '../../cores/styles/colors';
import {setWidth} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
export default class HeaderItemComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <View style={[styles.container,styles.horizontal]}>
                <Text style={styles.titleLeft}>{this.props.titleLeft}</Text>
                <TouchableOpacity style ={styles.btnRight}>
                    <Text style={styles.titleRight}>{this.props.titleRight}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        // flex: 1,
        // backgroundColor:colors.white,
        // height: Platform.OS === 'ios' ? 85 : 50,
        width:setWidth(95)
    },
    horizontal:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    titleLeft:{
        fontSize:18,
        fontWeight:'600',
        color:'black'
    },
    btnRight:{
        backgroundColor:'#fff',
        borderRadius:15,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:2,
        paddingTop:2,
        borderColor:colors.lightGrey,
        // borderWidth:0.5
    },
    titleRight:{
        fontSize:14,
        color:'black',

    }

});
