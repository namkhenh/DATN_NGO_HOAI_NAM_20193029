import React, {Component} from 'react';
import './ContactPage.scss'
import contactbanner from '../../../base/image/contact-banner.jpg'
import BackTopButton from '../../../common/backTopButton/BackTopButton';

class ContactPage extends Component {
    render() {
        return (
            <div className='contact-contaier'>
                <div className="contact-banner">
                    <img src={contactbanner} alt=""/>
                </div>
                <div className="content">
                    <div className="contact-title">
                        Địa điểm của chúng tôi
                    </div>
                    <div className="contact-sub-title">
                        Biến sức khỏe thành một hành trình, không phải là đích đến. Tìm kiếm câu trả lời y tế thực sự?
                    </div>
                    <div className="contact-content">
                        Các bác sĩ của chúng tôi chuyên tìm kiếm và điều chỉnh <strong>NGUYÊN NHÂN</strong> gây bệnh,
                        không chỉ đơn giản là điều trị các triệu chứng. Đến với Riordan Clinic để tìm hiểu thêm:
                    </div>
                    <div className="contact-detail">
                        <div className="contact-info">
                            <div className="contact-info-title">
                                TRỤ SỞ CHÍNH
                            </div>
                            <div className="contact-info-address">
                                Địa chỉ: Số 1 Đại Cồ Việt - Hai Bà Trưng - Hà Nội - Việt Nam
                            </div>
                            <div className="contact-info-address">
                                ĐT: (024)38.253.531 Fax: (844) 8.248.308
                            </div>
                            <div className="contact-info-address">
                                phongkhamriordan@gmail.com
                            </div>
                        </div>
                        <iframe title='goole-map' className='google-map'
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.7328405264975!2d105.84215921531356!3d21.003343694020522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad5569f4fbf1%3A0x5bf30cadcd91e2c3!2zQ-G7lW5nIFRy4bqnbiDEkOG6oWkgTmdoxKlhIC0gxJDhuqFpIEjhu41jIELDoWNoIEtob2EgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1681094840991!5m2!1svi!2s'
                                width={600} height={450}
                                style={{border: '2px solid #f2ab4a', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)'}}
                                allowFullScreen loading='lazy' referrerPolicy='no-referrer-when-downgrade'></iframe>
                    </div>
                </div>
                <BackTopButton></BackTopButton>
            </div>
        );
    }
}

export default ContactPage;