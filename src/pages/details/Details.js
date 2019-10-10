import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AudioBook from '../audiobook/list/AudioBook';
import AudioBookTwo from '../audiobook/list/Audio_Book_Two';
import AudioBookThree from '../audiobook/list/Audio_Book_Three';
import Tab_AudioBook from '../audiobook/Tab_AudioBook';
import Ebook from '../ebook/Ebook';
import Detail_Ebook_Two from '../ebook/Detail_Ebook_Two';
import {connect} from 'react-redux';
import {getDetail} from '../../redux/actions/productAction';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentWillMount() {
    //     const data = this.props.navigation.state.params.data;
    //     this.props.getDetail(data.id);
    // }

    render() {
        const {navigate} = this.props.navigation;
        const {navigation} = this.props;
        const data = this.props.navigation.state.params.data;
        return (
            <View style={styles.container}>
                {data.category_name === 'Audio Book' ? <Tab_AudioBook navigation={navigation}/> :
                    <Ebook navigation={navigation}/>}
                {/*<AudioBook/>*/}
                {/*<AudioBookTwo/>*/}
                {/*<AudioBookThree/>*/}
                {/*<Ebook/>*/}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.productReducers.detail,
    };
}

export default connect(mapStateToProps, {getDetail})(Details);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
