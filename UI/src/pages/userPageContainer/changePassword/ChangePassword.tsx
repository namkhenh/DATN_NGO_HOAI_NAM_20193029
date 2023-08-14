import React, {useState} from "react";
import "./ChangePassword.scss";
import HeaderPage from "../../../structure/headerPage/HeaderPage";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {TextField} from "../../../common/textField/TextField";
import SubmitButton from "../../../common/button/SubmitButton";
import {ButtonVariantType, LoadingPosition} from "../../../model/enum/buttonEnum";
import {useStateValue} from "../../../context/StateProvider";
import {MessageBarStatus} from "../../../model/enum/messageBarEnum";
import {actionType} from "../../../context/Reducer";
import { UserService } from "../../../api/apiPage/apiPage";

function ChangePassword() {
    const [loadingButton, setLoading] = useState<boolean>(false)
    const [{auth}, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({type: actionType.SET_MESSAGE_BAR, messageBar: {isOpen: isOpen, text: message, status: status}})
    }
    const [oldPass, setOldPass] = useState<string>()
    const [newPass, setNewPass] = useState<string>()
    const [rePass, setRePass] = useState<string>()

    const changPass = () => {
        let requestBody = {
            userId: auth.userId,
            oldPassword: oldPass,
            newPassword: newPass
        }
        setLoading(true)
        const result = UserService.changePassword(requestBody).then(res => {
            setLoading(false)
            if (res.success) {
                showMessageBar('Đổi mật khẩu thành công!', true, MessageBarStatus.Success)
            } else {
                showMessageBar('Đổi mật khẩu thất bại!', true, MessageBarStatus.Error)
            }
        })

        return result
    }
    return (
        <div className="change-password">
            <HeaderPage
                icon={<ManageAccountsIcon/>}
                text="Thiết lập tài khoản"
                textChild="Đổi mật khẩu"
            />
            <div className="change-password-container">
                <div className="change-password-note">
                    Mật khẩu của bạn phải có ít nhất 8 ký tự, bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!$@%).
                </div>
                <div className="change-password-item">
                    <TextField
                        label="Mật khẩu hiện tại"
                        placeholder="--"
                        required
                        value={oldPass}
                        type="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                        onBlur={() => {
                        }}
                        onChange={(_, value) => { setOldPass(value) }}
                        // errorMessage={errorMessageString.userPhoneNumber}
                    />
                </div>
                <div className="change-password-item">
                    <TextField
                        label="Mật khẩu mới"
                        placeholder="--"
                        required
                        value={newPass}
                        type="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                        onBlur={() => {
                        }}
                        onChange={(_, value) => { setNewPass(value) }}
                    />
                </div>
                <div className="change-password-item">
                    <TextField
                        label="Nhập lại mật khẩu mới"
                        placeholder="--"
                        required
                        value={rePass}
                        type="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                        onBlur={() => {
                        }}
                        onChange={(_, value) => { setRePass(value) }}
                    />
                </div>
                <div className="forget-password">
                    Bạn quên mật khẩu? <strong>Vui lòng gọi Hotline 19001234 để được hỗ trợ.</strong>
                </div>
                <div className="change-password-button">
                    <SubmitButton
                        id={'common-dialog-default'}
                        text={'Đổi mật khẩu'}
                        // disable={!canUpdate}
                        buttonVariantType={ButtonVariantType.Contained}
                        promise={changPass}
                        loading={loadingButton}
                        loadingPosition={LoadingPosition.Center}
                        fullWidth={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
