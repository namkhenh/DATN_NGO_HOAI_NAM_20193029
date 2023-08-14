import React, { useState } from 'react'
import './Signup.scss'
import doctor from '../../base/image/doctor.png'
import user from '../../base/image/user.png'
import login from '../../base/image/login-form.png'
import logo from '../../base/image/Riordan_Clinic_logo.png'
import { TextField } from '../../common/textField/TextField'
import SubmitButton from '../../common/button/SubmitButton'
import { ButtonVariantType, LoadingPosition } from '../../model/enum/buttonEnum'
import { useNavigate } from 'react-router-dom'
import { AccountRoleEnum } from '../../model/enum/accPermissionEnum'
import Button from '@mui/material/Button'
import { UserService } from '../../api/apiPage/apiPage'
import { useStateValue } from '../../context/StateProvider'
import { MessageBarStatus } from '../../model/enum/messageBarEnum'
import { actionType } from '../../context/Reducer'

interface IErrorMessage {
    phoneNumber: string;
    password: string;
    passwordAgain: string
}

function Signup() {
    const [loadingButton, setLoading] = useState<boolean>()
    const [phoneNumber, setPhoneNumber] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [passwordAgain, setPasswordAgain] = useState<string>()
    const [errorMessage, setErrorMessage] = useState<IErrorMessage>(
        {
            phoneNumber: '',
            password: '',
            passwordAgain: ''
        }
    )


    const navigate = useNavigate()
    const [, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }
    const handleSignup = () => {
        let requestBody = {
            phoneNumber: phoneNumber,
            email: 'namkhenh81@gmail.com',
            password: password
        }
        setLoading(true)
        const result = UserService.register(requestBody).then(res => {
            if (res.success) {
                setLoading(false)
                showMessageBar("Đăng ký thành công!", true, MessageBarStatus.Success)
                navigate('/dang-nhap')
            } else {
                setLoading(false)
                showMessageBar(`Đăng ký thất bại! \n${res.message ? res.message : ''}`, true, MessageBarStatus.Error)
            }
        })
        return result
    }

    return (
        <div className='signup-container'>
            <div className="signup-form-wrap">
                <div className="form-left">
                    <img src={login} alt="" />
                </div>
                <div className="form-right">
                    <img src={logo} alt="" />
                    <div className="form-title">
                        Đăng ký
                    </div>
                    <div className="form-field">
                        <TextField
                            label='Số điện thoại'
                            placeholder='--'
                            value={phoneNumber}
                            required
                            onChange={(_, value) => { setPhoneNumber(value) }}
                            errorMessage={errorMessage.phoneNumber}
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
                            errorMessage={errorMessage.password}
                        />
                    </div>
                    <div className="form-field">
                        <TextField
                            label='Nhập lại mật khẩu'
                            placeholder='--'
                            required
                            value={passwordAgain}
                            type="password"
                            canRevealPassword
                            revealPasswordAriaLabel="Show password"
                            onChange={(_, value) => { setPasswordAgain(value) }}
                            errorMessage={errorMessage.passwordAgain}
                        />
                    </div>
                    <div className="signup-button">
                        <SubmitButton
                            id={'common-dialog-default'}
                            text={'Đăng ký'}
                            // disable={!canUpdate}
                            buttonVariantType={ButtonVariantType.Contained}
                            promise={handleSignup}
                            fullWidth={true}
                            loading={loadingButton}
                            loadingPosition={LoadingPosition.Center}

                        />
                    </div>
                </div>
            </div>
            <div className="signup-footer">
                <img src={doctor} alt="" />
                <img src={user} alt="" />
            </div>
        </div>
    )
}

export default Signup