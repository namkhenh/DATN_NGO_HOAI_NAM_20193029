import React, {useState} from 'react'
import './AcceptBookingForm.scss'
import DialogView from '../../common/dialog/Dialog'
import {IAppointmenViewModel} from '../../model/apimodel/appointmentInfo'
import AppointmentDetail from '../appointmentDetail/AppointmentDetail'
import {useStateValue} from '../../context/StateProvider'
import {actionType} from '../../context/Reducer'
import {MessageBarStatus} from '../../model/enum/messageBarEnum'
import { ExaminationScheduleService } from '../../api/apiPage/apiPage'
import { convertTZ } from '../../utils/commonFunction'
import { AppointmentStatus } from '../../model/enum/appointmentEnum'

interface BookingFormProps {
    currentBookingAppointment: IAppointmenViewModel
    openAccept: boolean
    closeAccept: () => void
}
function AcceptBookingForm(props: BookingFormProps) {
    const [isOpen, setOpen] = useState<boolean>(props.openAccept)
    const [loadingButton, setLoading] = useState<boolean>(false)
    const [showMessage, setMessage] = useState<boolean>(false)
    const renderBodyForm = (): JSX.Element => {
        return (
            <AppointmentDetail appointment={props.currentBookingAppointment} />
        )
    }
    const handlecClose = () => {
        props.closeAccept()
    }

    const[, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }
    
    const onSave = () => {
        console.log(props.currentBookingAppointment?.patientId);
        let requestBody = {
            id: "00000000-0000-0000-0000-000000000000",
            timeOfExamination: convertTZ(props.currentBookingAppointment?.appointmentTime),
            reason: props.currentBookingAppointment?.appointmentReason,
            appUserId: props.currentBookingAppointment?.patientId,
            patientReceptionStatus: AppointmentStatus.Waiting
        }
        setLoading(true)
        const result = ExaminationScheduleService.createSchedule(requestBody).then(res => {
            setLoading(false)
            if (res.success) {
                handlecClose()
                setLoading(false)
                showMessageBar("Đặt khám thành công!", true, MessageBarStatus.Success)
            } else {
                handlecClose()
                setLoading(false)
                showMessageBar("Đặt khám thất bại!", true, MessageBarStatus.Error)
            }
        })
        return result
    }
    return (
        <DialogView
            title={'Xác nhận đặt khám'}
            hidden={!props.openAccept}
            customContent={renderBodyForm()}
            // closeWithPromise={this.onLogoutAction.bind(this)}
            // confirm={handlecClose}
            confirmButtonText={'Lưu'}
            confirmWithPromise={onSave}
            closeButtonText='Hủy bỏ'
            close={handlecClose}
            loading={loadingButton}
        />
    )
}

export default AcceptBookingForm