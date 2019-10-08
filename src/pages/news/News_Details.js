import React, {Component} from 'react';
import {
  View,
} from 'react-native';
import Styles from './styles/styles';
import HeaderComponent from '../headerComponent/HeaderComponent';
import {WebView} from 'react-native-webview';
import {getDataOfflineMode} from '../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../assets/constants';

export default class News_Details extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: true,
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
    const {navigation} = this.props;
    const item = this.props.navigation.state.params.item;
    console.log(item);
    return (
      <View style={styles.container}>
        <HeaderComponent
          iconLeft='ios-arrow-back'
          // iconRight='ios-search'
          left='back'
          title={item}
          onPressLeft={() => navigation.goBack()}
        />
        <WebView
          source={{uri: item}}
          style={{marginBottom: 20}}
        />
      </View>
    );
  }
}

