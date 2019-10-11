// import firebase from "react-native-firebase";
import * as types from "./actionTypes";

export const checkLogin = () => {
    return (dispatch) => {
        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         // console.log("testFirebaseInRedux: logged in" + JSON.stringify(user.toJSON()));
        //         dispatch({
        //             type: types.CHECK_LOGIN,
        //             payload: user.toJSON()
        //         });
        //     } else {
        //         // console.log("testFirebaseInRedux: not logged in" + JSON.stringify(user.toJSON()));
        //         dispatch({
        //             type: types.CHECK_LOGIN,
        //             payload: null
        //         });
        //     }
        // })
    }
}
