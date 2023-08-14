import React from 'react'
import {IAppointmenViewModel} from '../../model/apimodel/appointmentInfo'
import './AppointmentDetail.scss'
import {AppointmentStatus} from '../../model/enum/appointmentEnum'
import {IUserAddress} from '../../model/apimodel/userInfo'
import Tooltip from '@mui/material/Tooltip'

interface IAppointmentDetailProps {
    appointment: IAppointmenViewModel
}

function AppointmentDetail(props: IAppointmentDetailProps) {
    const { appointment } = props
    const getColorStatus = (status: AppointmentStatus) => {
        switch (status) {
            case AppointmentStatus.Success:
                return '#00794E'
            case AppointmentStatus.Cancel:
                return '#AC0000'
            case AppointmentStatus.Waiting:
                return '#EA703C'
            default:
                break;
        }
    }

    const getTextStatus = (status: AppointmentStatus) => {
        switch (status) {
            case AppointmentStatus.Success:
                return 'Đã duyệt'
            case AppointmentStatus.Cancel:
                return 'Đã hủy'
            case AppointmentStatus.Waiting:
                return 'Chờ duyệt'
            default:
                break;
        }
    }

    const convertAddressToString = (inputAddress: IUserAddress) => {
        const addressString = inputAddress.address ? inputAddress.address + ', ' : ""
        const outputAddress: string = addressString + (inputAddress.commune?.name ? inputAddress.commune?.name : '...') + ', ' + (inputAddress.district?.name ? inputAddress.district?.name : '...') + ', ' + (inputAddress.province?.name ? inputAddress.province?.name : '')
        return outputAddress
    }
    
    return (
        <div className='appointment-detail'>
            <div className="appointment-detail-wrap">
                <div className="appointment-detail-title">
                    Thông tin đặt khám
                </div>
                <div className="appointment-detail-info">
                    <div className="appointment-detail-item">
                        <div className="item-field">
                            Ngày khám:
                        </div>
                        <div className="item-content">
                            {`${new Date(appointment.appointmentTime).getDate()}/${new Date(appointment.appointmentTime).getMonth() + 1}/${new Date(appointment.appointmentTime).getFullYear()}`}
                        </div>
                    </div>
                    <div className="appointment-detail-item">
                        <div className="item-field">
                            Khung giờ khám:
                        </div>
                        <div className="item-content">
                            {`${new Date(appointment.appointmentTime).getHours()}h:${new Date(appointment.appointmentTime).getMinutes()}`}
                        </div>
                    </div>
                    <div className="appointment-detail-item">
                        <div className="item-field">
                            Lý do/ Triệu chứng:
                        </div>
                        <div className="item-content">
                            {appointment.appointmentReason}
                        </div>
                    </div>
                    {!(appointment.appointmentStatus === undefined) && 
                        <div className="appointment-detail-item">
                            <div className="item-field">
                                Trạng thái:
                            </div>
                            <div className="item-content" style={{ color: getColorStatus(appointment.appointmentStatus) }}>{getTextStatus(appointment.appointmentStatus)}</div>
                        </div>}
                    {appointment.appointmentNumber &&
                        <div className="appointment-detail-item">
                            <div className="item-field" style={{ width: '50%' }}>
                                Số thứ tự khám dự kiến:
                            </div>
                            <div className="item-content">
                                {appointment.appointmentNumber}
                            </div>
                        </div>}
                    {appointment.appointmentId &&
                        <div className="appointment-detail-item">
                            <div className="item-field">
                                Mã đặt lịch:
                            </div>
                            <div className="item-content">
                                {appointment.appointmentId}
                            </div>
                        </div>}
                </div>
            </div>
            <div className="appointment-detail-wrap">
                <div className="appointment-detail-title">
                    Thông tin người bệnh
                </div>
                <div className="appointment-detail-info">
                    <div className="appointment-detail-item">
                        <div className="item-field">
                            Họ và tên:
                        </div>
                        <div className="item-content">
                            {appointment.patientName}
                        </div>
                    </div>
                    <div className="appointment-detail-item">
                        <div className="item-field">
                            Ngày sinh:
                        </div>
                        <div className="item-content">
                            {`${new Date(appointment.patientBirth).getDate()}/${new Date(appointment.patientBirth).getMonth() + 1}/${new Date(appointment.patientBirth).getFullYear()}`}
                        </div>
                    </div>
                    <div className="appointment-detail-item">
                        <div className="item-field">
                            Giới tính:
                        </div>
                        <div className="item-content">
                            {appointment.patientSex === 0 ? 'Nam' : 'Nữ'}
                        </div>
                    </div>
                    <div className="appointment-detail-item">
                        <div className="item-field">
                            Số điện thoại:
                        </div>
                        <div className="item-content">
                            {!!appointment.patientPhoneNumber ? appointment.patientPhoneNumber : 'Chưa có'}
                        </div>
                    </div>
                    <div className="appointment-detail-item">
                        <div className="item-field">
                            Địa chỉ:
                        </div>
                        <Tooltip title={convertAddressToString(appointment.patientAddress)} placement="top-start">
                            <div className='item-content'>{convertAddressToString(appointment.patientAddress)}</div>
                        </Tooltip>
                    </div>
                    {appointment.patientCode &&
                        <div className="appointment-detail-item">
                            <div className="item-field">
                                Mã người bệnh:
                            </div>
                            <div className="item-content">
                                {appointment.patientCode}
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default AppointmentDetail