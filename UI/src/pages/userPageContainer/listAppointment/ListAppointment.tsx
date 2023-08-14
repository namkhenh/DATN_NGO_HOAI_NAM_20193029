import React, {useEffect, useState} from 'react';
import HeaderPage from '../../../structure/headerPage/HeaderPage';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import './ListAppointment.scss'
import Button from '@mui/material/Button';
import {ButtonVariantType} from '../../../model/enum/buttonEnum';
import AddIcon from '@mui/icons-material/Add';
import {Link} from 'react-router-dom';
import LinkOffOutlinedIcon from '@mui/icons-material/LinkOffOutlined';
import AppointmentItem from '../../../components/appointmentItem/AppointmentItem';
import {AppointmentStatus} from '../../../model/enum/appointmentEnum';
import avatar1 from '../../../base/image/anh-la-co-viet-nam-dep-1.png'
import {IAppointmenViewModel} from '../../../model/apimodel/appointmentInfo';
import AppointmentDetail from '../../../components/appointmentDetail/AppointmentDetail';
import InfoIcon from '@mui/icons-material/Info';
import { CommuneDefault, DistricDefault, ProvinceDefault } from '../../../model/apimodel/userInfo';
import { ExaminationScheduleService } from '../../../api/apiPage/apiPage';
import { useStateValue } from '../../../context/StateProvider';
import { Backdrop, CircularProgress } from '@mui/material';

const ListAppointment = (props: any) => {
    const [{ auth },] = useStateValue()
    const [isLoading, setLoading] = useState<boolean>(false)
    const [appointment, setappointment] = useState<IAppointmenViewModel[]>([])
    const [currentSelection, setcurrentSelection] = useState<number>(-1)

    useEffect(() => {
        setLoading(true)
        ExaminationScheduleService.getScheduleByUser(auth.userId).then(res => {
            if (res.success) {
                setLoading(false)
                let schedule: IAppointmenViewModel[] = []
                !!res?.data && res?.data.forEach((sch: any) => {
                    schedule.push({
                        patientAvatar: avatar1,
                        patientName: sch?.user?.fullName,
                        patientBirth: sch?.user?.dateOfBirth,
                        patientSex: sch?.user?.sex,
                        patientPhoneNumber: sch?.user?.phoneNumber,
                        patientAddress: {
                            province: sch?.user?.province || ProvinceDefault,
                            district: sch?.user?.district || DistricDefault,
                            commune: sch?.user?.ward || CommuneDefault
                        },
                        appointmentTime: sch?.timeOfExamination,
                        appointmentReason: sch?.reason,
                        appointmentStatus: sch?.patientReceptionStatus,
                        appointmentId: sch?.code,
                        appointmentNumber: 3
                    })
                })
                setappointment(schedule)
            } else {
                setLoading(false)
            }
        })
    }, [])

    const handleClickAppointment = (index: number) => {
        setcurrentSelection(index)
    }

    return (
        <div id='user-appointment' className='user-appointment'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <HeaderPage icon={<EventAvailableIcon/>} text='Quản lý lịch khám' textChild='Danh sách lịch khám'/>
            <div className="appointment-container">
                <div className="list-appointment">
                    <div className="appointment-title">
                        Danh sách lịch khám
                    </div>
                    <div className="appointment-sub-title">
                        Vui lòng chọn một trong các lịch khám có sẵn để xem chi tiết hoặc bấm vào <strong>Đặt khám
                        mới</strong> để tạo lịch khám mới
                    </div>
                    <div className="list-appointment-wrap">
                        {/* <div className="no-appointment">
                            <ReportProblemOutlinedIcon sx={{ fontSize: '96px', color: '#cccccc', marginBottom: '12px' }}></ReportProblemOutlinedIcon>
                            Không tìm thấy lịch hẹn nào
                        </div> */}
                        {appointment?.map((item, index) => {
                            return <AppointmentItem
                                index={index}
                                avatar={item.patientAvatar}
                                name={item.patientName}
                                time={item.appointmentTime}
                                status={item.appointmentStatus!}
                                selectAppointment={handleClickAppointment}
                                isSelected={currentSelection === index}
                            />
                        })}
                    </div>
                    <div className="booking-new-appointment">
                        <Button variant={ButtonVariantType.Outlined} startIcon={<AddIcon/>}>
                            <Link to='/quan-ly/dat-lich-kham' style={{color: '#1976d2'}}>
                                Đặt khám mới
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="list-appointment-right">
                    <div className="list-appointment-detail">
                        <div className="appointment-title">
                            Chi tiết lịch khám
                        </div>
                        <div className="list-appointment-wrap">
                            {currentSelection === -1 ?
                                <div className="no-list-appointment">
                                    <LinkOffOutlinedIcon sx={{
                                        fontSize: '96px',
                                        color: '#cccccc',
                                        marginBottom: '12px'
                                    }}></LinkOffOutlinedIcon>
                                    Vui lòng chọn một lịch khám để xem chi tiết
                                </div> :
                                <AppointmentDetail appointment={appointment[currentSelection]}/>
                            }
                        </div>
                    </div>
                    {currentSelection !== -1 &&
                        <div className="appointment-hotline">
                            <InfoIcon sx={{fontSize: '14px', color: '#FFA95A'}}/>
                            <div className="hotline">
                                Lịch khám của bạn đã được gửi đi. Vui lòng đợi <strong>Riordan Clinic</strong> xác nhận.
                                Mọi yêu cầu về <strong>Hủy lịch/ Đổi lịch</strong> vui lòng gọi
                                Hotline <strong>19001234</strong> để được hỗ trợ.<br/>Trân trọng cảm ơn!
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    );
}

export default ListAppointment;