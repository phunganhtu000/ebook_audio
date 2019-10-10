import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, FlatList} from 'react-native';
import HeaderComponent from '../../headerComponent/HeaderComponent';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon, Input} from 'native-base';
import {colors} from '../../../cores/styles/colors';
import Styles from '../styles/style_Comment';
import {
    getDataOfflineMode,
    inValidateText,
    setHeight,
    setWidth,
} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';
import RatingBar from '../../../cores/viewComponents/ratingStar/RatingBar';
import {connect} from 'react-redux';
import {getDetail} from '../../../redux/actions/productAction';
import saveDownload from '../../../api/saveDownload/saveData';
import Constant from '../../../utils/Constant_Api';
import ButtonBottom from '../../button/ButtonBottom';
// import { FlatList } from 'react-native-gesture-handler';
// import { TouchableOpacity } from 'react-native-gesture-handler';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount() {
        const data = this.props.navigation.state.params.data;
        this.props.getDetail(data.id);
    }

    saveDownloadData() {
        const item = this.props.navigation.state.params.item;
        saveDownload(item);
    }

    async componentDidMount() {
        const rtl = await getDataOfflineMode(constants.isRTL);
        this.setState({
            isRTL: rtl,
        });
    }

    renderItem = ({item}) => {
        const styles = Styles.getSheet(this.state.isRTL);
        const image = `${Constant.images}`;
        // console.log("image: "+ JSON.stringify(image))
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.viewall}>
                <FastImage
                    source={{uri: 'https://yt3.ggpht.com/a/AGF-l799RR3CxLJyrEVhm8cplh4DLoB58UC3qfKqBQ=s900-mo-c-c0xffffffff-rj-k-no'}}
                    style={styles.image}/>
                <View style={styles.viewpepo}>
                    <View style={styles.horizontal}>
                        <TextComponent style={styles.txtName}>{item.user_name}</TextComponent>
                        <TextComponent style={styles.txtcontent}>{item.comment_text}</TextComponent>
                    </View>
                    {/*<View style={{width: '20%'}}>*/}
                    {/*</View>*/}

                    <TextComponent style={{
                        color: colors.color_text_second,
                        fontSize: 13,
                    }}>{item.dt_rate}</TextComponent>
                </View>
            </View>
        );
    };

    render() {
        const styles = Styles.getSheet(this.state.isRTL);
        const {data} = this.props;
        console.log('dataaaa: ' + JSON.stringify(data[0].user_comments));
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <FlatList data={data[0].user_comments} renderItem={this.renderItem}/>
                </View>
                <View style={styles.viewallinput}>
                    <View style={styles.viewinput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Comment..."
                        />
                        <TouchableOpacity style={styles.toucoment}>
                            <Icon style={styles.iconcomment} type="Ionicons" name="md-send"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.productReducers.detail,
    };
}

export default connect(mapStateToProps, {getDetail})(Comment);


