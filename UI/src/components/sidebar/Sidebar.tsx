import React from 'react';
import {NavLink} from 'react-router-dom';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import './Sidebar.scss'
import DialogView from '../../common/dialog/Dialog';

interface SidebarState {
    isExpandAccountSetting: boolean
    isExpandManagementBooking: boolean
    isActiveManagementBooking: boolean
    isActiveAccountSetting: boolean
    isOpenDialog: boolean
    isLoading: boolean
}
class Sidebar extends React.Component<any, SidebarState>  {
    constructor(props: any) {
        super(props);
        this.state = {
            isExpandAccountSetting: false,
            isExpandManagementBooking: false,
            isActiveManagementBooking: false,
            isActiveAccountSetting: false,
            isOpenDialog: false,
            isLoading: false
        }
    }
    
    componentDidMount(): void {
        if (window.location.href.indexOf('/quan-ly/danh-sach-lich-kham') !== -1) {
            this.setState({ isExpandManagementBooking : true, isActiveManagementBooking: true})
        }
        if (window.location.href.indexOf('/quan-ly/dat-lich-kham') !== -1) {
            this.setState({ isExpandManagementBooking: true })
        }
        if (window.location.href.indexOf('/quan-ly/mat-khau') !== -1) {
            this.setState({ isExpandAccountSetting: true, isActiveAccountSetting: true })
        }
        if (window.location.href.indexOf('/quan-ly/vo-hieu-hoa') !== -1) {
            this.setState({ isExpandAccountSetting: true, isActiveAccountSetting: true })
        }
    }

    checkActive() {
        if (this.state.isExpandManagementBooking) {
            this.setState({ isActiveManagementBooking: true, isActiveAccountSetting: false })
        }
        if (this.state.isExpandAccountSetting) {
            this.setState({ isActiveAccountSetting: true, isActiveManagementBooking: false })
        }
    }
    

    activeOtherNav() {
        this.setState({ isExpandAccountSetting: false, isExpandManagementBooking: false, isActiveManagementBooking: false, isActiveAccountSetting: false })
    }

    expandAccountSetting() {
        let isExpandAccountSetting = !this.state.isExpandAccountSetting
        this.setState({ isExpandAccountSetting: isExpandAccountSetting, isExpandManagementBooking: false })
    }

    expandManagementBooking() {
        let isExpandManagementBooking = !this.state.isExpandManagementBooking
        this.setState({ isExpandAccountSetting: false, isExpandManagementBooking: isExpandManagementBooking })
    }

    onLogoutAction() {
        const result = new Promise((resolve) => {
            this.setState({ isLoading: true })
            setTimeout(() => {
                this.setState({ isLoading: false })
                resolve('success')
            }, 4000);
        }).then(() => {
        })
        return result
    }

    handlecClosePopup() {
        this.setState({ isOpenDialog: false })
    }

    render() {
        const { isExpandAccountSetting, isExpandManagementBooking, isActiveManagementBooking, isActiveAccountSetting, isOpenDialog, isLoading } = this.state
        return (
            <div className='sidebar' id='side-bar'>
                <div className="sidebar-container">
                    <NavLink to={'/quan-ly/ho-so'} className={({ isActive }) => (isActive ? 'sidebar-item-active' : 'sidebar-item')}>
                        <div className="sidebar-item-wrap" onClick={this.activeOtherNav.bind(this)}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <PersonRoundedIcon sx={{ marginRight: '12px' }} /> Hồ sơ
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to={'/quan-ly/suc-khoe'} className={({ isActive }) => (isActive ? 'sidebar-item-active' : 'sidebar-item')}>
                        <div className="sidebar-item-wrap" onClick={this.activeOtherNav.bind(this)}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FavoriteSharpIcon sx={{ marginRight: '12px', color: '#ff2727d7' }} /> Sức khỏe của tôi
                            </div>
                        </div>
                    </NavLink>
                    {/* <NavLink to={'/quan-ly/lich-su-dat-kham'} className={({ isActive }) => (isActive ? 'sidebar-item-active' : 'sidebar-item')}>
                        <div className="sidebar-item-wrap">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <EventAvailableIcon sx={{ marginRight: '12px', color: '#0067A2' }} /> Lịch sử đặt khám
                            </div>
                        </div>
                    </NavLink> */}
                    <div className={isActiveManagementBooking ? "sidebar-item-active" : "sidebar-item"}>
                        <div className="sidebar-item-wrap" onClick={this.expandManagementBooking.bind(this)}>
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                                <EventAvailableIcon sx={{ marginRight: '12px', scolor: '#0067A2' }} /> Quản lý lịch khám
                            </div>
                            {isExpandManagementBooking ? <ExpandLessIcon sx={{ marginLeft: '8px' }} /> : <ExpandMoreIcon sx={{ marginLeft: '8px' }} />}
                        </div>
                        <div className="sidebar-sub-menu" aria-expanded={isExpandManagementBooking} >
                            <NavLink to={'/quan-ly/dat-lich-kham'} className={({ isActive }) => (isActive ? 'sub-menu-item-active' : 'sub-menu-item')} onClick={this.checkActive.bind(this)}>
                                Đặt lịch khám
                            </NavLink>
                            <NavLink to={'/quan-ly/danh-sach-lich-kham'} className={({ isActive }) => (isActive ? 'sub-menu-item-active' : 'sub-menu-item')} onClick={this.checkActive.bind(this)}>
                                Danh sách lịch khám
                            </NavLink>
                        </div>
                    </div>
                    <div className={isActiveAccountSetting ? "sidebar-item-active" : "sidebar-item"}>
                        <div className="sidebar-item-wrap" onClick={this.expandAccountSetting.bind(this)}>
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                                <SettingsIcon sx={{ marginRight: '12px', color: '#535353' }} /> Thiết lập tài khoản
                            </div>
                            {isExpandAccountSetting ? <ExpandLessIcon sx={{ marginLeft: '8px' }} /> : <ExpandMoreIcon sx={{ marginLeft: '8px' }} />}
                        </div>
                        <div className="sidebar-sub-menu" aria-expanded={isExpandAccountSetting} >
                            <NavLink to={'/quan-ly/mat-khau'} className={({ isActive }) => (isActive ? 'sub-menu-item-active' : 'sub-menu-item')} onClick={this.checkActive.bind(this)}>
                                Đổi mật khẩu
                            </NavLink>
                            <NavLink to={'/quan-ly/vo-hieu-hoa'} className={({ isActive }) => (isActive ? 'sub-menu-item-active' : 'sub-menu-item')} onClick={this.checkActive.bind(this)}>
                                Vô hiệu hóa tài khoản
                            </NavLink>
                        </div>
                    </div>
                    <NavLink to={'/quan-ly/tro-giup'} className={({ isActive }) => (isActive ? 'sidebar-item-active' : 'sidebar-item')}>
                        <div className="sidebar-item-wrap" onClick={this.activeOtherNav.bind(this)}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <HelpIcon sx={{ marginRight: '12px', color: '#535353' }} /> Trợ giúp
                            </div>
                        </div>
                    </NavLink>
                    <div className='sidebar-item' onClick={() => { this.setState({ isOpenDialog: true}) }}>
                        <div className="sidebar-item-wrap" onClick={this.activeOtherNav.bind(this)}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <LogoutIcon sx={{ marginRight: '12px', color: '#535353' }} /> Đăng xuất
                            </div>
                        </div>
                    </div>
                </div>
                <DialogView
                    title='Đăng xuất khỏi Riordan Clinic?'
                    hidden={!isOpenDialog}
                    message='Bạn có chắc chắn muốn đăng xuất?'
                    closeButtonText='Đăng xuất'
                    closeWithPromise={this.onLogoutAction.bind(this)}
                    confirm={this.handlecClosePopup.bind(this)}
                    confirmButtonText={'Hủy'}
                    close={this.handlecClosePopup.bind(this)}
                    loading={isLoading}
                />
            </div>
        );
    }
}

export default Sidebar;