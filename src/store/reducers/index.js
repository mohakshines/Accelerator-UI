import { combineReducers } from "redux";
import { optionReducer } from "./formReducer"
export default combineReducers({
    options: optionReducer
})