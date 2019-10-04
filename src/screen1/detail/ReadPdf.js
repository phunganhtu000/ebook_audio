import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getDetail} from '../../redux/actions/productAction';
import Constant from '../../utils/Constant_Api';
import Pdf from 'react-native-pdf';

class Detail extends Component {
    constructor(props) {
        super(props);
    }

    // componentWillMount() {
    //     const data = this.props.navigation.state.params.data;
    //     this.props.getDetail(data.id);
    // }

    render() {
        // const {data} = this.props;
        // const image = `${Constant.images}`;
        const item = this.props.navigation.state.params.data;
        console.log('detail123: ' + JSON.stringify(item));
        // const source = {uri : ' http://samples.leanpub.com/thereactnativebook-sample.pdf ' , cache : true };
        return (
            <View style={{flex: 1}}>
                <Pdf
                    source={{uri: item, cache: true}}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    style={styles.pdf}/>
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});
