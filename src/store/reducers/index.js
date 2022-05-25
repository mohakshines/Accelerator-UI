import { combineReducers } from "redux";
import { optionReducer, ymlReducer } from "./formReducer"
export default combineReducers({
    options: optionReducer,
    yml: ymlReducer
})