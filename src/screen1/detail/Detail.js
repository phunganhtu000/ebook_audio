import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {getDetail} from '../../redux/actions/productAction';
import Constant from '../../utils/Constant_Api';
import HTML from "react-native-render-html";

class Detail extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const data = this.props.navigation.state.params.data;
        this.props.getDetail(data.id);
    }

    renderItem = ({item}) => {
        const image = `${Constant.images}`;
        // console.log("image: "+ JSON.stringify(image))
        const {navigate} = this.props.navigation;
        return (
            <TouchableOpacity
                onPress={() => navigate('ReadPdf', {data: item.book_file_url})}
            >
                <Text>{item.author_name}</Text>
                <Image style={{width: 130, height: 130}}
                       source={{uri: `${image}${item.book_cover_img}`}}/>
                <HTML html={item.book_description} imagesMaxWidth={Dimensions.get('window').width}/>

            </TouchableOpacity>
        );
    };

    render() {
        const {data} = this.props;
        const image = `${Constant.images}`;
        // const item = this.props.navigation.state.params.data;
        console.log('detail: ' + JSON.stringify(data[0].book_file_url));
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                />


            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.productReducers.detail,
    };
}

export default connect(mapStateToProps, {getDetail})(Detail);
