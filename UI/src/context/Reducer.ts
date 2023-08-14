export const actionType = {
    SET_AUTH_VALUE: "SET_AUTH_VALUE",
    SET_USER_INFO: "SET_USER_INFO",
    SET_ACCOUNT_PERMISSION: "SET_ACCOUNT_PERMISSION",
    SET_MESSAGE_BAR: "SET_MESSAGE_BAR",
    SET_SELECTION: "SET_SELECTION"
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actionType.SET_AUTH_VALUE:
            return {...state, auth: action.auth}
        case actionType.SET_USER_INFO:
            return {...state, userInfo: action.userInfo}
        case actionType.SET_ACCOUNT_PERMISSION:
            return { ...state, accountPermission: action.accountPermission }
        case actionType.SET_MESSAGE_BAR:
            return { ...state, messageBar: action.messageBar }
        case actionType.SET_SELECTION:
            return { ...state, selection: action.selection}
        default:
            return state;
    }
} 

export default reducer