import React, {Component} from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import logo1 from '../../base/image/Riordan_Clinic_logo1.png'
import './Footer.scss'

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-logo"><img src={logo1} alt="/" /></div>
                <div className="footer-title">
                    <span>Phòng khám Riordan</span>
                    <div className="footer-sub-title">Trang chủ</div>
                    <div className="footer-sub-title">Về chúng tôi</div>
                    <div className="footer-sub-title">Dịch vụ</div>
                    <div className="footer-sub-title">Đội ngũ</div>
                </div>
                <div className="footer-title">
                    <span>Hỗ trợ</span>
                    <div className="footer-sub-title">Đội ngũ</div>
                    <div className="footer-sub-title">FAQ</div>
                    <div className="footer-sub-title">Chính sách</div>
                </div>
                <div className="footer-title">
                    <span>Theo dõi chúng tôi</span>
                    <div className="social-icon">
                        <FacebookOutlinedIcon className='footer-icon' />
                        <FacebookOutlinedIcon className='footer-icon' />
                        <FacebookOutlinedIcon className='footer-icon' />
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;