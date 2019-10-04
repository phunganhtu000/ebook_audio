import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList,
    ScrollView, ActivityIndicator
} from 'react-native';
import HeaderComponent from '../headerComponent/HeaderComponent';
import FastImage from 'react-native-fast-image';
import TextComponent from '../../cores/viewComponents/text/TextComponent';
import {marginTop10, marginTop20} from '../../cores/styles/styleView';
import Locales from '../../assets/languages/languages';
import Styles from './styles/styles';
import api from '../../api/offline/api';
import {getDataOfflineMode, inValidateText} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';
import Styles_Two from './styles/style_two';
import styles_three from './styles/style_three';

export default class AllItem extends Component {
    constructor(props) {
        super();
        this.state = {
            isLoading: true,
            data: [],
            styles: Styles.getSheet(false)
        };
    }

    componentDidMount() {
        this.setState(
            {
                data: api.banner,
            }
        )
        this.changeStyle();
    }

    async changeStyle() {
        const rtl = await getDataOfflineMode(constants.isRTL)
        this.setState({
            isRTL: rtl
        })
        const change_style = await getDataOfflineMode(constants.CHANGE_STYLE);
        // switch (change_style) {
        //     case constants.STYLE_BORDER:
        //         this.setState(
        //             {styles:styles})
        //     case constants.STYLE_BOX_SHADOW:
        //         this.setState(
        //             {styles:styles_three})
        //     case constants.STYLE_NON_BORDER:
        //         this.setState(
        //             {styles:styles_two})
        //     case constants.STYLE_NON_LINED:
        //         this.setState(
        //             {styles:styles_four})
        // }

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
        const styles = this.state.styles
        console.log("styles :" + JSON.stringify(styles))
        const data = this.props.navigation.state.params.item;
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <HeaderComponent
                    iconLeft='left'
                    typeIconLeft='AntDesign'
                    onPressLeft={() => navigation.goBack()}
                    title={data.cate}/>
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
