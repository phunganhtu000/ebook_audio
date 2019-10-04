import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getDataHome} from '../../redux/actions/productAction';
import Constant from '../../utils/Constant_Api';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDataHome();
    }

    renderItem = ({item}) => {
        const image = `${Constant.images}`;
        // console.log("image: "+ JSON.stringify(image))
        const {navigate} = this.props.navigation;
        return (
            <TouchableOpacity onPress={() => navigate('Detail', {data: item})}>
                <Image style={{width: 130, height: 130}} source={{uri: `${image}${item.book_cover_img}`}}/>
                <Text>{item.book_title}</Text>
            </TouchableOpacity>
        );
    };

    render() {
        const {getdatahome, isFetching} = this.props;
        // console.log("data: "+ JSON.stringify(getdatahome));
        console.log('isFetching: ' + isFetching);
        return (
            <View style={{flex: 1}}>
                {isFetching == true ?
                    <FlatList
                        data={getdatahome.featured_books || []}
                        renderItem={this.renderItem}
                    /> : <Text>ahihi</Text>}


            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        getdatahome: state.productReducers.gethome,
        isFetching: state.productReducers.isFetching,
    };
}

export default connect(mapStateToProps, {getDataHome})(Home);
