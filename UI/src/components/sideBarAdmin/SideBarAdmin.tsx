import React from 'react'
import './SideBarAdmin.scss'
import { NavLink } from 'react-router-dom';
import logoSmall from '../../base/image/Riordan_Clinic_logo_small.png'
import logoBig from '../../base/image/Riordan_Clinic_logo1.png'
import HomeIcon from '@mui/icons-material/Home';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ContactsIcon from '@mui/icons-material/Contacts';
function SideBarAdmin() {
    const [isCollapse, setOpen] = React.useState(true);

    // const handleClick = () => {
    //     setOpen(!open);
    // };

    return (
        <div className={isCollapse ? 'nav-all-collapes' : 'nav-all-expand'}>
            <div className="nav-all-container">
                <div className="nav-header">
                    {isCollapse ? <img src={logoSmall} alt="" /> : <img src={logoBig} alt="" />}
                </div>
                <div className="nav-body">
                    <NavLink to={'/admin/dashboard'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <HomeIcon />
                            <div className="nav-item-text">Dashboard</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/quan-ly-tai-khoan'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <ManageAccountsIcon />
                            <div className="nav-item-text">Quản lý tài khoản</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/quan-ly-vai-tro'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <EngineeringIcon />
                            <div className="nav-item-text">Quản lý vai trò</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/quan-ly-phong-ban'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <RoomPreferencesIcon />
                            <div className="nav-item-text">Quản lý phòng ban</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/quan-ly-dich-vu'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <MedicalServicesIcon />
                            <div className="nav-item-text">Quản lý dịch vụ</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/duyet-lich-dat-kham'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <EventAvailableIcon />
                            <div className="nav-item-text">Duyệt lịch đặt khám</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/tiep-don-dat-kham'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <EventNoteIcon />
                            <div className="nav-item-text">Tiếp đón đặt khám</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/tiep-don-benh-nhan'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <ContactsIcon />
                            <div className="nav-item-text">Tiếp đón bệnh nhân</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/thanh-toan-ngoai-tru'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <MonetizationOnOutlinedIcon />
                            <div className="nav-item-text">Thanh toán ngoại trú</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/kham-chua-benh'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <LocalHospitalIcon />
                            <div className="nav-item-text">KCB ngoại trú</div>
                        </div>
                    </NavLink>
                    {/* <NavLink to={'/admin/quan-ly-dat-kham'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <EventNoteIcon />
                            <div className="nav-item-text">Quản lý lịch đặt</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/admin/them-moi-hen-kham'} className={({ isActive }) => (isActive ? 'nav-item-wrap-selected' : 'nav-item-wrap')}>
                        <div className="nav-item">
                            <EventAvailableIcon />
                            <div className="nav-item-text">Đặt lịch trực tiếp</div>
                        </div>
                    </NavLink> */}
                </div>
                <div className="nav-footer" onClick={() => { setOpen(!isCollapse)}}>
                    {isCollapse ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon/>}
                </div>
            </div>
        </div>
    );
}

export default SideBarAdmin