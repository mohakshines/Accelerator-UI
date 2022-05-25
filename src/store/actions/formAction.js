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

export const fetchYml = () => async (dispatch) => {
    dispatch({
        type: "YML_REQUEST",
    });
    try {
        const yml = await axios.get(endpoint?.yml);
        dispatch({
            type: "YML_SUCCESS",
            payload: yml.data,
        });
    } catch (error) {
        dispatch({
            type: "YML_FAIL",
            payload: error.message,
        });
    }
};
