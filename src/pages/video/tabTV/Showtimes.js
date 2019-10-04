import React, {Component} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import Styles from './style/style_Comment';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import {colors} from '../../../cores/styles/colors';
import {getDataOfflineMode} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';

export default class Showtime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: [
                {
                    content: 'Mon ',
                    content2: '  Thanks got you are here',
                    content3: ' :',
                },
                {
                    content: 'Tu    ',
                    content2: '  America gottalent',
                    content3: ' :',
                },
                {
                    content: 'Wes ',
                    content2: '  America gottalent',
                    content3: ' :',
                },
                {
                    content: 'Thu ',
                    content2: '  America gottalent',
                    content3: ' :',
                },
                {
                    content: 'Fri   ',
                    content2: '  Thanks got you are here',
                    content3: ' :',
                },
                {
                    content: 'Sat  ',
                    content2: '  America gottalent',
                    content3: ' :',
                },
                {
                    content: 'Sun ',
                    content2: '  Thanks got you are here',
                    content3: ' :',
                },
                {
                    content: 'Mon ',
                    content2: '  Thanks got you are here',
                    content3: ' :',
                },
                {
                    content: 'Tu    ',
                    content2: '  America gottalent',
                    content3: ' :',
                },
                {
                    content: 'Wes ',
                    content2: '  Thanks got you are here',
                    content3: ' :',
                },
                {
                    content: 'Thu ',
                    content2: '  America gottalent',
                    content3: ' :',
                },
                {
                    content: 'Fri   ',
                    content2: '  Thanks got you are here',
                    content3: ' :',
                },
                {
                    content: 'Sat ',
                    content2: '  America gottalent',
                    content3: ' :',
                },
                {
                    content: 'Sun ',
                    content2: '  Thanks got you are here',
                    content3: ' :',
                },

            ],

        };
    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl,
        });
    }

    render() {
        const styles = Styles.getSheet(this.state.isRTL);
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        <FlatList
                            data={this.state.comment}
                            renderItem={({item}) =>
                                <View style={styles.viewcontent}>
                                    <TextComponent style={{
                                        color: colors.color_text_second,
                                        fontSize: 15,
                                    }}>{item.content}</TextComponent>
                                    <TextComponent style={{
                                        color: colors.color_text_second,
                                        fontSize: 15,
                                    }}>{item.content3}</TextComponent>
                                    <TextComponent style={{
                                        color: colors.color_text_second,
                                        fontSize: 15,
                                    }}>{item.content2}</TextComponent>
                                </View>}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}


