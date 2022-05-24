export const optionReducer = (
    state = {
        loading: false,
        options: [],
    },
    action
) => {
    switch (action.type) {
        case "OPTION_REQUEST":
            return {
                loading: true,
            };
        case "OPTION_SUCCESS":
            return {
                loading: false,
                options: action.payload,
            };
        case "OPTION_FAIL":
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};