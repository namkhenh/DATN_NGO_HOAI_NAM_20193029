import React from 'react';
import './DoctorPage.scss'
import BackTopButton from '../../../common/backTopButton/BackTopButton';
import team1 from '../../../base/image/lading-team.jpg'
import LandingTeam from '../../../components/landingTeam/LandingTeam';


interface TeamItem {
    avatar: string;
    name: string;
    position: string;
    contact: string;
}

interface LandingPageState {
    medicalProvider: TeamItem[];
    adminTeam: TeamItem[];
    marketingEducation: TeamItem[];
    clinicTeam: TeamItem[];
    medicalRecord: TeamItem[];
    volunteerTeam: TeamItem[];
}

class DoctorPage extends React.Component<any, LandingPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            medicalProvider: [],
            adminTeam: [],
            marketingEducation: [],
            clinicTeam: [],
            medicalRecord: [],
            volunteerTeam: [],
        }
    }

    componentDidMount(): void {
        this.setState({
            medicalProvider: [
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'}
            ],
            adminTeam: [
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'}
            ],
            marketingEducation: [
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'}
            ],
            clinicTeam: [
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'}
            ],
            medicalRecord: [
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'}
            ],
            volunteerTeam: [
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
                {avatar: team1, name: 'Nguyễn Văn A', position: 'Trưởng khoa thần kinh', contact: '0123456789'},
            ],
        })
    }

    render() {
        return (
            <div className='doctor-contaier'>
                <div className="content">
                    <div className="doctor-title">
                        Bác sĩ & Nhân viên
                    </div>
                    <div className="doctor-sub-title">
                        Nhân viên chăm sóc sức khỏe toàn diện của chúng tôi trao quyền cho bệnh nhân bằng các công cụ &
                        kiến thức tự chăm sóc
                    </div>
                    <div className="doctor-content">
                        Với thông tin ấn tượng và nhiều thập kỷ kinh nghiệm, các bác sĩ tại Phòng khám Riordan cung cấp
                        dịch vụ chăm sóc và chuyên môn tốt nhất. Đội ngũ nhân viên xuất sắc của chúng tôi bao gồm các
                        chuyên gia giàu kinh nghiệm và chu đáo, những người sẽ dành thời gian của bạn tại Phòng khám
                        Riordan trong số những trải nghiệm y tế tốt nhất trong cuộc đời bạn.
                    </div>
                    <div className="doctor-position">
                        Nhà cung cấp dịch vụ y tế
                    </div>
                    <div className="doctor-wrap">
                        {this.state.medicalProvider?.map((item) => {
                            return <LandingTeam
                                avatar={item.avatar}
                                name={item.name}
                                position={item.position}
                                contact={item.contact}
                            />
                        })}
                    </div>
                    <div className="doctor-position">
                        Đội ngũ hành chính
                    </div>
                    <div className="doctor-wrap">
                        {this.state.adminTeam?.map((item) => {
                            return <LandingTeam
                                avatar={item.avatar}
                                name={item.name}
                                position={item.position}
                                contact={item.contact}
                            />
                        })}
                    </div>
                    <div className="doctor-position">
                        Tiếp thị & Giáo dục
                    </div>
                    <div className="doctor-wrap">
                        {this.state.marketingEducation?.map((item) => {
                            return <LandingTeam
                                avatar={item.avatar}
                                name={item.name}
                                position={item.position}
                                contact={item.contact}
                            />
                        })}
                    </div>
                    <div className="doctor-position">
                        Đội ngũ phòng khám
                    </div>
                    <div className="doctor-wrap">
                        {this.state.clinicTeam?.map((item) => {
                            return <LandingTeam
                                avatar={item.avatar}
                                name={item.name}
                                position={item.position}
                                contact={item.contact}
                            />
                        })}
                    </div>
                    <div className="doctor-position">
                        Hồ sơ bệnh án
                    </div>
                    <div className="doctor-wrap">
                        {this.state.medicalRecord?.map((item) => {
                            return <LandingTeam
                                avatar={item.avatar}
                                name={item.name}
                                position={item.position}
                                contact={item.contact}
                            />
                        })}
                    </div>
                    <div className="doctor-position">
                        Tình nguyện viên
                    </div>
                    <div className="doctor-wrap">
                        {this.state.volunteerTeam?.map((item) => {
                            return <LandingTeam
                                avatar={item.avatar}
                                name={item.name}
                                position={item.position}
                                contact={item.contact}
                            />
                        })}
                    </div>
                </div>
                <BackTopButton></BackTopButton>
            </div>
        );
    }
}

export default DoctorPage;