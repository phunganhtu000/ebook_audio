import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AudioBook from '../audiobook/list/AudioBook';
import AudioBookTwo from '../audiobook/list/Audio_Book_Two';
import AudioBookThree from '../audiobook/list/Audio_Book_Three';
import Tab_AudioBook from '../audiobook/Tab_AudioBook';
import Ebook from '../ebook/Ebook';
import Detail_Ebook_Two from '../ebook/Detail_Ebook_Two';

export default class Details extends Component {
    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const data = this.props.navigation.state.params.item;
        return (
            <View style={styles.container}>
                {data.type === 'book' ? <Ebook navigation={navigation}/> : <Tab_AudioBook navigation={navigation}/>}
                {/*<AudioBook/>*/}
                {/*<AudioBookTwo/>*/}
                {/*<AudioBookThree/>*/}
                {/*<Ebook/>*/}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
