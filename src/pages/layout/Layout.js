import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import HeaderComponent from '../headerComponent/HeaderComponent';
import {colors} from '../../cores/styles/colors';

export default class Layout extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent
                    title='Layouts'/>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.menuBox}>
                            <Image style={styles.icon}
                                   source={{uri: 'https://png.icons8.com/cell-phone/dusk/50/ffffff'}}/>
                            <Text style={styles.info}>Intro</Text>
                        </View>

                        <View style={styles.menuBox}>
                            <Image style={styles.icon}
                                   source={{uri: 'https://png.icons8.com/user-menu-male/color/50/ffffff'}}/>
                            <Text style={styles.info}>Sign In</Text>
                        </View>

                        <View style={styles.menuBox}>
                            <Image style={styles.icon}
                                   source={{uri: 'https://img.icons8.com/color/100/000000/pittsburgh-map.png'}}/>
                            <Text style={styles.info}>Map</Text>
                        </View>

                        <View style={styles.menuBox}>
                            <Image style={styles.icon}
                                   source={{uri: 'https://png.icons8.com/shopping-cart/color/50/ffffff'}}/>
                            <Text style={styles.info}>Cart</Text>
                        </View>

                        <View style={styles.menuBox}>
                            <Image style={styles.icon}
                                   source={{uri: 'https://png.icons8.com/product/nolan/50/ffffff'}}/>
                            <Text style={styles.info}>Product</Text>
                        </View>

                        <View style={styles.menuBox}>
                            <Image style={styles.icon}
                                   source={{uri: 'https://png.icons8.com/shopping-basket/color/50/ffffff'}}/>
                            <Text style={styles.info}>Order</Text>
                        </View>


                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background

    },
    body: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuBox: {
        backgroundColor: colors.white,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    icon: {
        width: 100,
        height: 100,
    },
    info: {
        fontSize: 22,
        color: "#696969",
    }
});
