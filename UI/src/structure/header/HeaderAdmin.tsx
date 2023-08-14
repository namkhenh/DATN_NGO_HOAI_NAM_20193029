import React, { useState } from 'react'
import './HeaderAdmin.scss'
import Avatar from '@mui/material/Avatar'
import avatar from '../../base/image/anh-la-co-viet-nam-dep-1.png'
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout';
import { useStateValue } from '../../context/StateProvider'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { actionType } from '../../context/Reducer'
function HeaderAdmin() {
    const [isOpenDialog, setOpen] = useState<boolean>(false)
    const [showPopup, setShow] = useState<boolean>(false)
    const [{ auth },dispatch] = useStateValue()
    const navigate = useNavigate()
    const handleLogout = () => {
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
        setShow(false)
        navigate('/trang-chu')
    }
    return (
        <div className='admin-header'>
            <div className="admin-header-image" onClick={() => { setShow(!showPopup) }}>
                <Avatar alt={avatar} src={avatar} />
            </div>
            {showPopup && 
                <div className="admin-popup-container">
                    <div className="admin-popup-content">
                        <div className="admin-popup-header">
                            <div className="admin-popup-avatar">
                                <img alt={avatar} src={avatar} />
                            </div>
                            <div className="admin-popup-header-content">
                                <div className="admin-popup-name">{auth.userName}</div>
                                <div className="admin-popup-role">Admin</div>
                            </div>
                        </div>
                        <div className="admin-logout-button" onClick={() => { navigate('/trang-chu') }}>
                            <Button startIcon={<LogoutIcon />}>Quay lại Trang chủ</Button>
                        </div>
                        <div className="admin-logout-button" onClick={() => { handleLogout() }}>
                            <Button startIcon={<LogoutIcon />}>Đăng xuất</Button>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    )
}

export default HeaderAdmin