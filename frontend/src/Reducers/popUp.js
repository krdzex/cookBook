const popUpReducer = (state = { show: false, content: "", error: false }, action) => {
    switch (action.type) {
        case "SHOW_POP_UP":
            return state = { ...state, show: true, content: action.payload }
        case "REMOVE_POP_UP":
            return state = { ...state, show: false }
        case "SHOW_ERROR_POP_UP":
            return state = { ...state, error: true, content: action.payload }
        case "REMOVE_ERROR_POP_UP":
            return state = { ...state, error: false }
        default:
            return state;
    }
}
export default popUpReducer;