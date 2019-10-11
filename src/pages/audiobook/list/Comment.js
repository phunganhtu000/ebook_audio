import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {styles} from '../style/style_Comment';
import HeaderComponent from '../../headerComponent/HeaderComponent';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon, Input} from 'native-base';
import {colors} from '../../../cores/styles/colors';
import {connect} from 'react-redux';
import {darkMode} from '../../../redux/actions/settingAction';
import {ThemeConstants} from '../../../cores/theme/Theme';
import Locales from '../../../cores/languages/languages';
// import { FlatList } from 'react-native-gesture-handler';
// import { TouchableOpacity } from 'react-native-gesture-handler';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {isDarkTheme} = this.props;
        const theme = isDarkTheme ? 'dark' : 'light';
        return (
            <View style={[styles.container, {backgroundColor: ThemeConstants[theme].backgroundColor2}]}>
                <View style={styles.body}>
                    <FlatList
                        data={this.props.data[0].user_comments}
                        renderItem={({item}) =>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 10,
                                width: '90%',
                            }}>
                                <FastImage
                                    source={{uri: 'https://yt3.ggpht.com/a/AGF-l799RR3CxLJyrEVhm8cplh4DLoB58UC3qfKqBQ=s900-mo-c-c0xffffffff-rj-k-no'}}
                                    style={styles.image}/>
                                <View style={{marginLeft: '2.5%', width: '80%'}}>
                                    <View style={styles.horizontal}>
                                        <TextComponent
                                            style={[styles.txtName, {color: ThemeConstants[theme].textColor}]}>{item.user_name}</TextComponent>
                                        <TextComponent
                                            style={{
                                                color: colors.color_text_second,
                                                fontSize: 13,
                                            }}>{item.dt_rate}</TextComponent>
                                    </View>
                                    <TextComponent
                                        style={{
                                            color: colors.color_text_second,
                                            fontSize: 14,
                                        }}>{item.comment_text}</TextComponent>
                                </View>
                            </View>}
                    />

                </View>
                <View style={[styles.viewallinput, {backgroundColor: ThemeConstants[theme].backgroundCard}]}>
                    <TextInput
                        style={[styles.input, {color: ThemeConstants[theme].textColor}]}
                        placeholderTextColor={ThemeConstants[theme].textColor}
                        placeholder={Locales.Comment2}
                    />
                    <TouchableOpacity style={styles.toucoment}>
                        <Icon style={styles.iconcomment} type="Ionicons" name="md-send"/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {

        isDarkTheme: state.settingReducers.currentValue,
    };
}

export default connect(mapStateToProps, {darkMode})(Comment);
