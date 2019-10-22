import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  AsyncStorage,
  Dimensions,
  FlatList, Image,
} from 'react-native';
import Styles from '../../details/styles/style';
import TextComponent from '../../../cores/viewComponents/text/TextComponent';
import FastImage from 'react-native-fast-image';
import {Icon, Toast} from 'native-base';
import {colors} from '../../../cores/styles/colors';
import ButtonBottom from '../../button/ButtonBottom';
import {getDataOfflineMode, saveDataOfflineMode} from '../../../cores/viewComponents/baseFunctions/BaseFunctions';
import constants from '../../../assets/constants';
import Locales from '../../../cores/languages/languages';
import saveDownload from '../../../api/saveDownload/saveData';
import Constant from '../../../utils/Constant_Api';
import HTML from 'react-native-render-html';
import HeaderComponent from '../../headerComponent/HeaderComponent';
import RatingBar from '../../../cores/viewComponents/ratingStar/RatingBar';
import {connect} from 'react-redux';
import {getDetail} from '../../../redux/actions/productAction';
import {darkMode} from '../../../redux/actions/settingAction';
import {ThemeConstants} from '../../../cores/theme/Theme';
import {addToFavorite, getDataFavorite, removeFavorite} from '../../../redux/actions/favoriteAction';
import {addToDownload, getDataDownload} from '../../../redux/actions/downloadAction';

class Infor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      check: false,
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

  addProductToCart() {
    // const isExist = this.state.cartArray.some(e => e.product.id === product.id);
    // if (isExist) return false;
    var item = this.props.navigation.state.params.item;

    AsyncStorage.getItem('@cart', (err, res) => {
      if (!res) {
        AsyncStorage.setItem('@cart', JSON.stringify([item]));
      } else {
        const isExist = JSON.parse(res).some(e => e.product.id === product.id);
        if (isExist) {
          return (
            Toast.show({
              text: 'Product added to your cart !',
              position: 'bottom',
              type: 'warning',
              buttonText: 'Dismiss',
              duration: 3000,
            })
          );
        } else {
          var items = JSON.parse(res);
          items.push(item);
          AsyncStorage.setItem('@cart', JSON.stringify(items));
          Toast.show({
            text: 'Product added to your cart !',
            position: 'bottom',
            type: 'success',
            buttonText: 'Dismiss',
            duration: 3000,
          });
        }
      }
    });
  }


  async componentDidMount() {
    this.props.getDataDownload();
    this.props.getDataFavorite();
    this.checkFavorite();
    const rtl = await getDataOfflineMode(constants.isRTL);
    this.setState({
      isRTL: rtl,
    });

  }

  checkFavorite() {
    const data = this.props.navigation.state.params.data;
    const {favorite} = this.props;
    const check = favorite.some(favorite => data.id === favorite.id);
    this.setState({
      check: check,
    });
    console.log('checkckekc: ' + JSON.stringify(check));
  }

  _favorite(data) {
    const {favorite} = this.props;
    const check = favorite.some(favorite => data.id === favorite.id);
    console.log('check: ' + JSON.stringify(check));
    if (check == false) {
      this.props.addToFavorite(data);
      this.setState({
        check: true,
      });

    } else {
      this.props.removeFavorite(data);
      this.setState({
        check: false,
      });
    }
  }

  addToDownload(product) {
    this.props.addToDownload(product);
  };

  renderItem = ({item}) => {
    const styles = Styles.getSheet(this.state.isRTL);
    const image = `${Constant.images}`;
    // console.log("image: "+ JSON.stringify(image))
    const {navigate} = this.props.navigation;
    const {isDarkTheme} = this.props;
    const theme = isDarkTheme ? 'dark' : 'light';
    return (
      <View>
        <ScrollView>
          <View style={styles.viewMagin10}>
            {/*<TextComponent style={styles.type}>{Locales.History}</TextComponent>*/}
            <TextComponent
              style={[styles.title, {color: ThemeConstants[theme].textColor}]}>{item.book_title}</TextComponent>
            <View style={[styles.time, styles.horizontal]}>
              <TextComponent style={styles.textTime}>{item.author_name}</TextComponent>
              <TextComponent style={styles.textTime}>23 Mar, 2019</TextComponent>
            </View>
          </View>
          <View style={styles.viewDetail}>
            <View style={styles.borderImage}>
              <FastImage style={styles.image}
                         source={{uri: `${image}${item.book_cover_img}`}}/>

            </View>
          </View>
          <View style={[styles.marginTop30, styles.viewMagin10]}>
            <View style={styles.row}>
              <TextComponent
                style={[styles.textReview, {color: ThemeConstants[theme].textColor}]}>{item.rate_avg}</TextComponent>
              <View style={[styles.row, {marginLeft: 10, paddingRight: 5}]}>
                <RatingBar
                  disabled={false}
                  maxStars={5}
                  // selectedStar={(rating)=>this.onStarRatingPress(rating)}
                  rating={item.rate_avg}
                  starSize={25}
                  fullStarColor={colors.orange}/>
              </View>
            </View>
            <TouchableOpacity style={[styles.horizontal, styles.time, {
              backgroundColor: ThemeConstants[theme].backgroundCard,
              borderRadius: 5,
              paddingHorizontal: 5,
            }]}>
              <TextComponent style={[styles.type, {fontSize: 22, paddingTop: 10}]}>Chapter
                list</TextComponent>
              <View style={styles.horizontal}>
                <TextComponent style={[styles.txtChapname, {color: ThemeConstants[theme].textColor}]}>Chap
                  35: Kia Sengoria</TextComponent>
                <Icon name='right' type='AntDesign'
                      style={[styles.iconright, {color: ThemeConstants[theme].textColor}]}/>
              </View>
            </TouchableOpacity>
            <View style={[styles.marginTop30]}>
              <HTML html={item.book_description}
                    baseFontStyle={{color: ThemeConstants[theme].textColor}}
                    style={[styles.text]}/>
            </View>
          </View>
        </ScrollView>

      </View>
    );
  };
  renderItem2 = ({item}) => {
    const styles = Styles.getSheet(this.state.isRTL);
    const image = `${Constant.images}`;
    // console.log("image: "+ JSON.stringify(image))
    const {navigate} = this.props.navigation;
    const {isDarkTheme} = this.props;
    const theme = isDarkTheme ? 'dark' : 'light';
    const {favorite} = this.props;
    return (

      <View
        style={[styles.container, styles.horizontal, {backgroundColor: ThemeConstants[theme].backgroundCard}]}>
        <TouchableOpacity
          // onPress={this.props.download}
          onPress={() => this.addToDownload(item)}
          style={styles.button}>
          <Icon name='cloud-download' type='SimpleLineIcons'
                style={{fontSize: 20, color: 'silver'}}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.props.onPressNotification}
          style={styles.button}>
          <Icon name='notifications-active' type='MaterialIcons'
                style={{fontSize: 20, color: 'silver'}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._favorite(item)}
                          style={styles.button}>
          {this.state.check ?
            <Icon name='heart' type='AntDesign' style={{fontSize: 20, color: '#D0021B'}}/> :
            <Icon name='heart' type='AntDesign' style={{fontSize: 20, color: 'silver'}}/>}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('ReadPdf', {data: item.book_file_url})}
          download={() => this.saveDownloadData()}
          style={[styles.button2, {backgroundColor: '#D0021B'}]}>
          <TextComponent style={{color: colors.white}}>{Locales.ReadNow}</TextComponent>
        </TouchableOpacity>
        {/*<ButtonBottom*/}
        {/*    onPressReadNow={() => navigate('ReadPdf', {data: item.book_file_url})}*/}
        {/*    download={() => this.saveDownloadData()}*/}
        {/*/>*/}
      </View>

    )
      ;
  };

  render() {
    const styles = Styles.getSheet(this.state.isRTL);
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    // const item = this.props.navigation.state.params.item;
    const {data} = this.props;
    // console.log('data ebook' + JSON.stringify(data));
    const image = `${Constant.images}`;
    const {isDarkTheme} = this.props;
    const theme = isDarkTheme ? 'dark' : 'light';
    return (
      <View style={[styles.container, {backgroundColor: ThemeConstants[theme].backgroundColor2}]}>
        {/*<HeaderComponent*/}
        {/*    iconRightStyle={{fontSize: 22}}*/}
        {/*    iconLeft='ios-arrow-back'*/}
        {/*    left='back'*/}
        {/*    typeIconRight='FontAwesome'*/}
        {/*    title={Locales.Detail_EBook}*/}
        {/*    iconRight='heart-o'*/}
        {/*    onPressLeft={() => navigation.goBack()}*/}
        {/*/>*/}
        <ScrollView>
          <View style={styles.body}>
            <FlatList data={data} renderItem={this.renderItem}/>
          </View>
        </ScrollView>
        <View style={styles.viewButtonBottom}>
          <View
            style={[styles.container, styles.horizontal, {backgroundColor: ThemeConstants[theme].backgroundCard}]}>
            <TouchableOpacity
              // onPress={this.props.download}
              onPress={() => this.addToDownload(data[0])}
              style={styles.button}>
              <Icon name='cloud-download' type='SimpleLineIcons'
                    style={{fontSize: 20, color: 'silver'}}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.onPressNotification}
              style={styles.button}>
              <Icon name='notifications-active' type='MaterialIcons'
                    style={{fontSize: 20, color: 'silver'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._favorite(data[0])}
                              style={styles.button}>
              {this.state.check ?
                <Icon name='heart' type='AntDesign' style={{fontSize: 20, color: '#D0021B'}}/> :
                <Icon name='heart' type='AntDesign' style={{fontSize: 20, color: 'silver'}}/>}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('ReadPdf', {data: data[0].book_file_url})}
              download={() => this.saveDownloadData()}
              style={[styles.button2, {backgroundColor: '#D0021B'}]}>
              <TextComponent style={{color: colors.white}}>{Locales.ReadNow}</TextComponent>
            </TouchableOpacity>
            {/*<ButtonBottom*/}
            {/*    onPressReadNow={() => navigate('ReadPdf', {data: item.book_file_url})}*/}
            {/*    download={() => this.saveDownloadData()}*/}
            {/*/>*/}
          </View>
        </View>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.productReducers.detail,
    isDarkTheme: state.settingReducers.currentValue,
    favorite: state.favoriteReducers,
    download: state.downloadReducers,
  };
}

export default connect(mapStateToProps, {
  getDetail, darkMode, addToFavorite,
  removeFavorite,
  getDataFavorite,
  addToDownload,
  getDataDownload,
})(Infor);

