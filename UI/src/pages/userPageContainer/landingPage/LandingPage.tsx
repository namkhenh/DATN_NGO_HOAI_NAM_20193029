import React, { useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Button } from '@mui/material';
import './LandingPage.scss'
import icon1 from '../../../base/image/i-1.png'
import icon2 from '../../../base/image/i-2.png'
import icon3 from '../../../base/image/i-3.png'
import icon4 from '../../../base/image/i-4.png'
import field1 from '../../../base/image/landingFields/Asset 2.png'
import field2 from '../../../base/image/landingFields/Asset 3.png'
import field3 from '../../../base/image/landingFields/Asset 4.png'
import field4 from '../../../base/image/landingFields/Asset 5.png'
import field5 from '../../../base/image/landingFields/Asset 6.png'
import field6 from '../../../base/image/landingFields/Asset 7.png'
import field7 from '../../../base/image/landingFields/Asset 8.png'
import field8 from '../../../base/image/landingFields/Asset 9.png'
import team1 from '../../../base/image/lading-team.jpg'
import LandingField from '../../../components/landingField/LandingField'
import LandingTeam from '../../../components/landingTeam/LandingTeam'
import LandingFeedback from '../../../components/landingFeedback/LandingFeedback';
import BackTopButton from '../../../common/backTopButton/BackTopButton'
import { ButtonVariantType } from '../../../model/enum/buttonEnum';
import { useStateValue } from '../../../context/StateProvider';
import { useNavigate } from 'react-router-dom';

interface FieldItem {
    icon: string;
    title: string;
    subTitle: string;
    link: string;
}

interface TeamItem {
    avatar: string;
    name: string;
    position: string;
    contact: string;
}

interface FeedbackItem {
    avatar: string;
    name: string;
    job: string;
    feedback: string;
    rate: number
}

export function LandingPage() {
    const [fieldContent, setFieldContent] = useState<FieldItem[]>([
        {
            icon: field1,
            title: 'Chăm sóc sức khỏe1',
            subTitle: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            link: '/linh-vuc-chi-tiet1'
        },
        {
            icon: field2,
            title: 'Chăm sóc sức khỏe2',
            subTitle: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            link: '/linh-vuc-chi-tiet2'
        },
        {
            icon: field3,
            title: 'Chăm sóc sức khỏe3',
            subTitle: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            link: '/linh-vuc-chi-tiet3'
        },
        {
            icon: field4,
            title: 'Chăm sóc sức khỏe4',
            subTitle: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            link: '/linh-vuc-chi-tiet4'
        },
        {
            icon: field5,
            title: 'Chăm sóc sức khỏe5',
            subTitle: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            link: '/linh-vuc-chi-tiet5'
        },
        {
            icon: field6,
            title: 'Chăm sóc sức khỏe6',
            subTitle: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            link: '/linh-vuc-chi-tiet6'
        },
        {
            icon: field7,
            title: 'Chăm sóc sức khỏe7',
            subTitle: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            link: '/linh-vuc-chi-tiet7'
        },
        {
            icon: field8,
            title: 'Chăm sóc sức khỏe8',
            subTitle: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            link: '/linh-vuc-chi-tiet8'
        },
    ])

    const [teamContent, setTeamContent] = useState<TeamItem[]>([
        { avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789' },
        { avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789' },
        { avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789' }
    ])

    const [feedbackContent, setFeedbackContent] = useState<FeedbackItem[]>([
        {
            avatar: team1,
            name: 'Nguyễn Văn A',
            job: 'Sinh viên',
            feedback: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            rate: 4
        },
        {
            avatar: team1,
            name: 'Nguyễn Văn A',
            job: 'Sinh viên',
            feedback: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            rate: 5
        },
        {
            avatar: team1,
            name: 'Nguyễn Văn A',
            job: 'Sinh viên',
            feedback: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            rate: 3
        },
        {
            avatar: team1,
            name: 'Nguyễn Văn A',
            job: 'Sinh viên',
            feedback: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            rate: 4
        },
    ],) 

    useEffect(() => {
        document.title = "Trang chủ"
    })
    
    const [{ auth },] = useStateValue()
    const navigate = useNavigate()

    return (
        <div className="langding-container">
            <div className="landing-banner">
                <div className="banner-container">
                    <div className="banner-title">CHẨN ĐOÁN CHÍNH XÁC</div>
                    <div className="banner-sub-title">Trong từng ca khám</div>
                    <div className="view-more-button">
                        <Button variant={ButtonVariantType.Contained}
                            endIcon={<ArrowForwardIosIcon sx={{ marginLeft: '120px' }} />}>
                            <span>XEM THÊM</span>
                        </Button>
                    </div>
                </div>
                <div className="why-choose-us">
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                                <div className="reasons-item">
                                    <div className="reasons-logo">
                                        <img src={icon1} alt="" />
                                    </div>
                                    <p className="reasons-title">ĐẦY ĐỦ<br />CHỦNG LOẠI</p>
                                </div>
                            </div>
                            <div className="column">
                                <div className="reasons-item">
                                    <div className="reasons-logo">
                                        <img src={icon2} alt="" />
                                    </div>
                                    <p className="reasons-title">GIÁ CẢ PHÙ HỢP</p>
                                </div>
                            </div>
                            <div className="column">
                                <div className="reasons-item">
                                    <div className="reasons-logo">
                                        <img src={icon3} alt="" />
                                    </div>
                                    <p className="reasons-title">TIÊU CHUẨN<br />ISO | FDA</p>
                                </div>
                            </div>
                            <div className="column">
                                <div className="reasons-item">
                                    <div className="reasons-logo">
                                        <img src={icon4} alt="" />
                                    </div>
                                    <p className="reasons-title">GIAO HÀNG<br />NHANH CHÓNG</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="landing-about-us">
                <div className="landing-about-us-left">
                    <div className="left-title">
                        <span>Chào mừng tới Riordan Clinic!</span>
                    </div>
                    <div className="left-sub-tile">
                        <span>Trong hơn 20 năm, mọi người đã tìm đến Phòng khám Riordan để phục hồi, cải thiện và duy trì sức khỏe. Chúng tôi tiếp tục chuyên về thử nghiệm dinh dưỡng và các phương pháp điều trị toàn diện/tự nhiên đối với các bệnh dai dẳng như ung thư, bệnh Lyme, các vấn đề về đường ruột, lo lắng và trầm cảm, rối loạn tự miễn dịch, tiểu đường, v.v.</span>
                    </div>
                    <div className="left-management">
                        <div className="management-benefit">
                            <div className="benefit-item">
                                <TaskAltIcon sx={{ marginRight: '8px', fontSize: '20px' }} />
                                <span>Hơn 20 năm kinh nghiệm</span>
                            </div>
                            <div className="benefit-item">
                                <TaskAltIcon sx={{ marginRight: '8px', fontSize: '20px' }} />
                                <span>Có nhiều đối tác trên toàn quốc</span>
                            </div>
                            <div className="benefit-item">
                                <TaskAltIcon sx={{ marginRight: '8px', fontSize: '20px' }} />
                                <span>Dịch vụ thuốc men trực tiếp 24/7</span>
                            </div>
                            <div className="benefit-item">
                                <TaskAltIcon sx={{ marginRight: '8px', fontSize: '20px' }} />
                                <span>Đội ngũ y bác sĩ dày dặc, chất lượng</span>
                            </div>
                        </div>
                        <div className="book-appoinment-button">
                            <Button variant={ButtonVariantType.Contained}
                                startIcon={<EventAvailableIcon sx={{ fontSize: '30px' }} />} onClick={() => {auth.isLogined ? navigate('/quan-ly/dat-lich-kham') : navigate('/dang-nhap')}}>
                                <span>Đặt lịch khám bệnh</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="landing-about-us-right"></div>
            </div>

            <div className="landing-fields">
                <div className="fields-title">
                    <span>Có kinh nghiệm dày dặn<br />trong nhiều chuyên khoa y tế</span>
                </div>
                <div className="fields-sub-title">
                    <span>Thay vì tập trung vào chẩn đoán và quản lý các triệu chứng, mục tiêu của chúng tôi là khám phá nguyên nhân gốc rễ của bệnh. Nói một cách đơn giản, chúng tôi không chỉ tìm cách dán nhãn cho bạn bị bệnh gì – chúng tôi muốn tìm hiểu lý do tại sao căn bệnh này xảy ra ngay từ đầu và sau đó giải quyết những nguyên nhân đó.</span>
                </div>
                <div className="fields-wrap">
                    {fieldContent?.map((item) => {
                        return <LandingField
                            icon={item.icon}
                            title={item.title}
                            subTitle={item.subTitle}
                            link={item.link}
                        />
                    })}
                </div>
                <div className="view-more-button">
                    <Button variant={ButtonVariantType.Contained}>
                        <span>XEM THÊM</span>
                    </Button>
                </div>
            </div>

            <div className="landing-teams">
                <div className="teams-title">
                    <span>Đội ngũ Chuyên gia</span>
                </div>
                <div className="teams-sub-title">
                    <span>Cũng giống như bạn, mỗi bác sĩ và nhân viên của chúng tôi đều có một câu chuyện đã đưa họ đến Phòng khám Riordan. Một số bắt đầu với tư cách là bệnh nhân, những người khác thậm chí còn chưa nghe nói về Naturopathic of Integrative Medicine, nhiều người nghĩ rằng họ chỉ đang xin việc, nhưng tất cả đều có một điểm chung - niềm đam mê và cam kết với mọi người và cộng đồng mà chúng tôi phục vụ. Trong suốt lịch sử 47 năm của mình, chúng tôi đã có những người đàn ông và phụ nữ đặc biệt tham gia cùng chúng tôi trên hành trình mang lại Sức khỏe Thực sự trên toàn cầu. Đội ngũ nhân viên hiện tại của chúng tôi cũng không ngoại lệ. Mỗi người chúng tôi ở đây để giảng dạy, hướng dẫn, phục vụ và chăm sóc cho bạn trong khi bạn cải thiện sức khỏe của mình và tiến tới những gì chúng tôi hy vọng là những năm tháng đẹp nhất trong cuộc đời bạn.</span>
                </div>
                <div className="teams-wrap">
                    {teamContent?.map((item) => {
                        return <LandingTeam
                            avatar={item.avatar}
                            name={item.name}
                            position={item.position}
                            contact={item.contact}
                        />
                    })}
                </div>
                <div className="view-more-button">
                    <Button variant={ButtonVariantType.Contained} href='/doi-ngu'>
                        <span>GẶP GỠ ĐỘI NGŨ CỦA CHÚNG TÔI</span>
                    </Button>
                </div>
            </div>

            <div className="landing-feedback">
                <div className="feedback-title">
                    <span>Phản hồi khách hàng</span>
                </div>
                <div className="feedback-sub-title">
                    <span>Làm hài lòng khách hàng và bệnh nhân là trách nhiệm và trọng trách của chúng tôi!</span>
                </div>
                <div className="feedback-wrap">
                    {feedbackContent?.map((item) => {
                        return <LandingFeedback
                            avatar={item.avatar}
                            name={item.name}
                            job={item.job}
                            feedback={item.feedback}
                            rate={item.rate}
                        />
                    })}
                </div>
            </div>
            <BackTopButton></BackTopButton>
        </div>
    );
}