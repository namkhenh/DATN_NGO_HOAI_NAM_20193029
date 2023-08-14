import {UserInfoDefaultView} from "../model/apimodel/userInfo";
import {AccountRoleEnum} from "../model/enum/accPermissionEnum";

export const initialState = {
  userInfo: UserInfoDefaultView,
  auth: {
    fullName: '',
    isAdmin: false,
    isLogined: false,
    isLogout: false,
    menu: '',
    role: '',
    userId: '',
    userName: '',
    email: '',
    token: '',
  },
  accountPermission: AccountRoleEnum,
  messageBar: { text: "", isOpen: false, status: undefined },
  selection: {
    selectedItems: [],
    selectedCount: 0,
    singleSelectedItem: undefined,
    selectedObject: undefined
  }
};