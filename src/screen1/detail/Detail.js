import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getDetail} from '../../redux/actions/productAction';
import Constant from '../../utils/Constant_Api';

class Detail extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const data = this.props.navigation.state.params.data;
        this.props.getDetail(data.id);
    }

    render() {
        const {data} = this.props;
        console.log('detail: '+ JSON.stringify(data))
        return (
            <View style={{flex: 1}}>

                <Text>ahihi</Text>

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
