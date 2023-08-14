import React, { useEffect, useState } from 'react'
import './Login.scss'
import doctor from '../../base/image/doctor.png'
import user from '../../base/image/user.png'
import login from '../../base/image/login-form.png'
import logo from '../../base/image/Riordan_Clinic_logo.png'
import {TextField} from '../../common/textField/TextField'
import SubmitButton from '../../common/button/SubmitButton'
import {ButtonVariantType, LoadingPosition} from '../../model/enum/buttonEnum'
import { useNavigate } from 'react-router-dom'
import { UserService } from '../../api/apiPage/apiPage'
import Cookies from 'js-cookie';
import jwt from 'jwt-decode'
import { useStateValue } from '../../context/StateProvider'
import { MessageBarStatus } from '../../model/enum/messageBarEnum'
import { actionType } from '../../context/Reducer'
import { onEnterKeyDownAction } from '../../utils/commonFunction'
function Login() {
    const [loadingButton, setLoading] = useState<boolean>()
    const [phoneNumber, setPhoneNumber] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [token, setToken] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const [rememberPass, setRemmemberPass] = useState<boolean>()
    const [{ auth }, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const navigate = useNavigate()
    const handleLogin = () => {
        let requestBody = {
            userName: phoneNumber,
            password: password,
            remmemberMe: true
        }
        setLoading(true)
        const result = UserService.login(requestBody).then(res => {
            if (res.success) {
                // Cookies.set("Token", res.data?.accessToken, {
                //     expires: 0.1,
                // });
                const user: any = jwt(res.data?.accessToken)
                // dispatch({
                //     type: actionType.SET_AUTH_VALUE,
                //     auth: {
                //         ...auth,
                //         token: res.data?.accessToken
                //     },
                // });
                setToken(res.data?.accessToken)
                setUserId(user?.userId)
                // const preURL = localStorage.getItem("previousUrl")?.toString()
                // navigate(preURL || '/')
            } else {
                showMessageBar(`Đăng nhập thất bại! \n ${res?.message ? res?.message : ''}`, true, MessageBarStatus.Error)
                setLoading(false)
            }
        })
        return result
    }

    useEffect(() => {
        if (!!userId) {
            UserService.checkUserRole(userId).then(res => {
                if (res.success) {
                    Cookies.set("Token", token, {
                        expires: 0.1,
                    });
                    Cookies.set("Menu", !!res.data?.length ? res?.data.join(", ") : '', {
                        expires: 0.1,
                    });
                    dispatch({
                        type: actionType.SET_AUTH_VALUE,
                        auth: {
                            ...auth,
                            menu: !!res.data?.length ? res?.data.join(", ") : '',
                            token: token
                        },
                    });
                    setLoading(false)
                    const preURL = localStorage.getItem("previousUrl")?.toString()
                    navigate(preURL || '/')
                } else {
                showMessageBar(`Đăng nhập thất bại! \n ${res?.message? res?.message: ''}`, true, MessageBarStatus.Error)
                setLoading(false)
                }
            })
        }
    }, [userId])

    return (
        <div className='login-container'>
            <div className="login-form-wrap">
                <div className="form-left">
                    <img src={login} alt="" />
                </div>
                <div className="form-right">
                    <img src={logo} alt="" />
                    <div className="form-title">
                        Đăng nhập
                    </div>
                    <div className="form-field">
                        <TextField
                            label='Tên đăng nhập'
                            placeholder='--'
                            value={phoneNumber}
                            required
                            onChange={(_, value) => { setPhoneNumber(value) }}
                            errorMessage={''}
                        />
                    </div>
                    <div className="form-field">
                        <TextField
                            label='Mật khẩu'
                            placeholder='--'
                            required
                            value={password}
                            type="password"
                            canRevealPassword
                            revealPasswordAriaLabel="Show password"
                            onChange={(_, value) => { setPassword(value) }}
                            errorMessage={''}
                            onKeyDown={(e) => { onEnterKeyDownAction(e, () => handleLogin()) }}
                        />
                    </div>
                    <div className="sign-up">
                        Bạn chưa có tài khoản? <br /><a href='/dang-ky'>Đăng ký</a> tại đây
                    </div>
                    <div className="login-button">
                        <SubmitButton
                            id={'common-dialog-default'}
                            text={'Đăng nhập'}
                            // disable={!canUpdate}
                            buttonVariantType={ButtonVariantType.Contained}
                            promise={handleLogin}
                            fullWidth={true}
                            loading={loadingButton}
                            loadingPosition={LoadingPosition.Center}
                            
                        />
                    </div>
                </div>
            </div>
            <div className="login-footer">
                <img src={doctor} alt="" />
                <img src={user} alt="" />
            </div>
        </div>
    )
}

export default Login