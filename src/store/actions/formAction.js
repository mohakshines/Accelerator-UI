import axios from "axios";
import { endpoint } from "../../config/endpoint"

export const fetchOptions = () => async (dispatch) => {

    dispatch({
        type: "OPTION_REQUEST",
    });
    try {
        const options = await axios.get(endpoint?.dropdown);
        dispatch({
            type: "OPTION_SUCCESS",
            payload: options.data,
        });
    } catch (error) {
        dispatch({
            type: "OPTION_FAIL",
            payload: error.message,
        });
    }
};