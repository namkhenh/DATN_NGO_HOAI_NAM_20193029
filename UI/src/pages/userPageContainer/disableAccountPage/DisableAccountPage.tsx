import React, {useEffect, useState} from 'react'
import './DisableAccountPage.scss'
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HeaderPage from '../../../structure/headerPage/HeaderPage'
import PersonOffIcon from '@mui/icons-material/PersonOff';
import {Dropdown} from '../../../common/dropdown/DropDown';
import {UserDisableAcount} from '../../../model/apimodel/userInfo';
import {TextField} from '../../../common/textField/TextField';
import SubmitButton from '../../../common/button/SubmitButton';
import {ButtonVariantType, LoadingPosition} from '../../../model/enum/buttonEnum';
import {useStateValue} from '../../../context/StateProvider';
import {actionType} from '../../../context/Reducer';
import {MessageBarStatus} from '../../../model/enum/messageBarEnum';
import {isStringEmpty} from '../../../utils/commonFunction';
import { UserService } from '../../../api/apiPage/apiPage';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function DisableAccountPage() {
    const [loadingButton, setLoading] = useState<boolean>(false)
    const [reason, setReason] = useState<number>(-1)
    const [otherReason, setOtherReason] = useState<string>()
    const navigate = useNavigate()
    useEffect(() => {
        setOtherReason('')
    }, [reason])

    const [{auth}, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({type: actionType.SET_MESSAGE_BAR, messageBar: {isOpen: isOpen, text: message, status: status}})
    }

    const lockAccount = () => {
        setLoading(true)
        const result = UserService.lockAcc(auth.userId).then(res => {
            setLoading(false)
            if (res.success) {
                showMessageBar(`Khóa tài khoản thành công, sẽ đăng xuất sau 5 giây nữa!`, true, MessageBarStatus.Success)
                setTimeout(() => {
                    Cookies.remove("Token")
                    Cookies.remove("Menu")
                    localStorage.removeItem("previousUrl")
                    dispatch({
                        type: actionType.SET_AUTH_VALUE,
                        auth: {
                            ...auth,
                            isLogined: false,
                            isLogout: true,
                            role: '',
                            userId: '',
                            userName: '',
                            email: '',
                            token: '',
                            menu: ''
                        },
                    });
                    navigate('/trang-chu')
                }, 5000)
            } else {
                showMessageBar(`Khóa tài khoản thất bại!`, true, MessageBarStatus.Error)
            }
        })

        return result
    }
    return (
        <div className="disable-account">
            <HeaderPage
                icon={<ManageAccountsIcon/>}
                text="Thiết lập tài khoản"
                textChild="Vô hiệu hóa tài khoản"
            />
            <div className="disable-account-icon">
                <PersonOffIcon/>
            </div>
            <div className="disable-account-note">
                <p>namkhenh8137-0UB thân mến,</p>
                <p>Chúng tôi rất tiếc vì tài khoản của bạn đã bị vô hiệu hóa. Sứ mệnh của chúng tôi là mang đến hành
                    trình chăm sóc sức khỏe tiện lợi dành cho bạn. Chúng tôi luôn nỗ lực hết mình để hỗ trợ bạn, mong
                    rằng chúng tôi sẽ có cơ hội xử lý các sự cố hoặc vấn đề khó khăn bạn đang gặp phải với tài khoản của
                    mình.</p>
                <p>Sau khi bị vô hiệu hóa tài khoản tại Hello Health, bạn sẽ có 30 ngày để khôi phục lại tài khoản bằng
                    cách đăng nhập lại. Nếu bạn không thực hiện thao tác này, tài khoản của bạn với các dữ liệu, thông
                    tin sức khỏe và lịch sử đặt khám sẽ không còn có thể truy cập hay khôi phục được nữa, đồng nghĩa với
                    việc tài khoản sẽ bị xóa vĩnh viễn.</p>
            </div>
            <div className="disable-account-reason">
                <Dropdown
                    placeholder="- Chọn -"
                    label="Vì sao bạn muốn vô hiệu hóa tài khoản?"
                    options={UserDisableAcount}
                    selectedKey={reason}
                    required
                    onChange={(_, selected) => {
                        setReason(Number(selected?.key))
                    }}
                    // errorMessage={errorMessageString.userSex}
                />
            </div>
            {reason === 2 && <TextField
                // label='Họ và tên'
                placeholder='Vui lòng nhập lý do của bạn'
                required={true}
                value={otherReason}
                multiline
                onChange={(_, value) => {
                    setOtherReason(value)
                }}
                // errorMessage={errorMessageString.userName}
            />}

            <div className="disable-account-button">
                <SubmitButton
                    id={'common-dialog-default'}
                    text={'Vô hiệu hóa tài khoản'}
                    disable={reason === -1 || (reason === 2 && isStringEmpty(otherReason))}
                    buttonVariantType={ButtonVariantType.Contained}
                    promise={lockAccount}
                    loading={loadingButton}
                    loadingPosition={LoadingPosition.Center}
                />
            </div>
        </div>
    )
}

export default DisableAccountPage