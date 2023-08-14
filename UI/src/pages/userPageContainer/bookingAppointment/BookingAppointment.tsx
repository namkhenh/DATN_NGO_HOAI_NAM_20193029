import React, {useEffect, useState} from 'react';
import HeaderPage from '../../../structure/headerPage/HeaderPage';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import './BookingAppointment.scss'
import Button from '@mui/material/Button';
import {ButtonColorType, ButtonVariantType} from '../../../model/enum/buttonEnum';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BookingPatientItem from '../../../components/bookingPatientItem/BookingPatientItem';
import {
    AppointmentInfoModelProperty,
    IAppointmentInfo,
    IPatientProfileViewModel,
    PatientProfileDefaultView
} from '../../../model/apimodel/appointmentInfo';
import AddIcon from '@mui/icons-material/Add';
import {DatePicker} from '../../../common/datePicker/DatePicker';
import {Dropdown} from '../../../common/dropdown/DropDown';
import {TextField} from '../../../common/textField/TextField';
import {ProfileAction} from '../../../model/enum/appointmentEnum';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DialogView from '../../../common/dialog/Dialog';
import {IDropdownOption} from '@fluentui/react/lib/Dropdown';
import BookingForm from '../../../components/bookingForm/BookingForm';
import {MessageBarStatus} from '../../../model/enum/messageBarEnum';
import {useStateValue} from '../../../context/StateProvider';
import {actionType} from '../../../context/Reducer';
import {isStringEmpty, validateRequire} from '../../../utils/commonFunction';
import AcceptBookingForm from '../../../components/acceptBookingForm/AcceptBookingForm';
import { UserService } from '../../../api/apiPage/apiPage';
import { Backdrop, CircularProgress } from '@mui/material';
import { IUserInfoViewModel, UserInfoDefaultView } from '../../../model/apimodel/userInfo';
import { TimePickerView } from '../../../common/timePicker/TimePicker';
import { log, time } from 'console';


interface IBookingInfoErrorMessage {
    appointmentDate: string;
    appointmentTime: string;
    appointmentReason: string
}

const BookingAppointment = (props: any) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [loadingButton, setloadingButton] = useState<boolean>(false)
    const [{ auth }, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [openAccept, setOpenAccept] = useState<boolean>(false)
    const [isEdited, setIsEdited] = useState<boolean>(false)
    const [currentSelection, setcurrentSelection] = useState<number>(0)
    const [currentPatientProfile, setcurrentPatientProfile] = useState<IUserInfoViewModel>(UserInfoDefaultView)
    const [profileAction, setprofileAction] = useState <ProfileAction>()
    const [appointmentInfo, setAppointment] = useState<IAppointmentInfo>({
        appointmentDate: new Date(),
        appointmentReason: '',
        appointmentTime: new Date()
    })
    const [errorMessageString, setErrorMessage] = useState<IBookingInfoErrorMessage>({
        appointmentDate: "",
        appointmentTime: "",
        appointmentReason: ""
    })
    const [userInfo, setUserInfo] = useState<IUserInfoViewModel>(UserInfoDefaultView)
    const [patientProfile, setPatientProfile] = useState<IUserInfoViewModel[]>([])
    useEffect(() => {
        setLoading(true)
        if (!!auth.userId) {
            UserService.getUserById(auth.userId).then(res => {
                if (res.success) {
                    setLoading(false)
                    setUserInfo({
                        id: auth.userId,
                        code: res.data?.code,
                        userName: res.data?.userName,
                        status: res.data?.status,
                        phoneNumber: res.data?.phoneNumber,
                        fullName: res.data?.fullName,
                        email: res.data?.email,
                        cmnd: res.data?.cmnd,
                        dateOfBirth: res.data?.dateOfBirth,
                        sex: res.data?.sex,
                        provinceId: res.data?.provinceId,
                        districtId: res.data?.districtId,
                        wardId: res.data?.wardId,
                        province: res.data?.province,
                        district: res.data?.district,
                        ward: res.data?.ward,
                        address: '',
                        religion: res.data?.religion,
                        guardianName: '',
                        guardianPhone: '',
                        guardianRelation: 0, 
                        roles: res.data?.roles,
                    })
                } else {
                    setLoading(false)
                    showMessageBar(`Đã có lỗi xảy ra! \n ${res?.message ? res?.message : ''}`, true, MessageBarStatus.Error)
                }
            })
        }
    }, [])

    let allProfile = [userInfo].concat(patientProfile)

    const onChangeOneField = (key: keyof IAppointmentInfo, value: any) => {
        setAppointment({
            ...appointmentInfo,
            [key]: value
        })
        setErrorMessage({
            ...errorMessageString,
            [key]: validateField(key, value)
        })
    }

    const validateField = (key: keyof IAppointmentInfo, value: any) => {
        switch (key) {
            case AppointmentInfoModelProperty.appointmentReason:
                return validateRequire(value)
            default:
        }
    }

    const validateFunction = () => {
        let passedVerify = true;
        let tempReasonError = validateRequire(appointmentInfo.appointmentReason)

        passedVerify = isStringEmpty(tempReasonError)
        setErrorMessage({
            ...errorMessageString,
            appointmentReason: tempReasonError
        })
        return passedVerify
    }

    const openConfirmAppointment = () => {
        const canConfirm = validateFunction()
        if (canConfirm) {
            setOpenAccept(true)
        }
    }

    const cancelBooking = () => {
        setAppointment({
            appointmentDate: new Date(),
            appointmentReason: '',
            appointmentTime: new Date()
        })
    }

    const handleClickProfile = (index: number) => {
        setcurrentSelection(index)
    }

    const handleActionPatientProfile = (action: string, index: number) => {
        if (action === "Add") {
            setcurrentPatientProfile(UserInfoDefaultView)
            setprofileAction(ProfileAction.Create)
            setOpenForm(true)
        }
        if (action === "Edit") {
            setcurrentPatientProfile(allProfile[index])
            setprofileAction(ProfileAction.Edit)
            setcurrentSelection(index)
            setOpenForm(true)
        }
        if (action === "Delete") {
            setOpenDelete(true)
        }
    }

    const closeForm = () => {
        setOpenForm(false)
    }

    const handleDeleteProfile = () => {
        let requestBody = {}
        const result = new Promise((resolve) => {
            setTimeout(() => {
                showMessageBar("Xóa hồ sơ người bệnh thành công", true, MessageBarStatus.Success)
                setOpenDelete(false)
            }, 4000);
        }).then(() => {/*  */

        })
        return result
    }

    const closeDelete = () => {
        setOpenDelete(false)
    }

    const closeAccept = () => {
        setOpenAccept(false)
    }

    // const checkEdited = () => {
    //     const isEdited = !(`${new Date(appointmentInfo.appointmentDate).getDate()}/${new Date(appointmentInfo.appointmentDate).getMonth() + 1}/${new Date(appointmentInfo.appointmentDate).getFullYear()}` === `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}` && appointmentInfo.appointmentTime === 0 && appointmentInfo.appointmentReason === '')
    //     setIsEdited(isEdited)
    // }

    // useEffect(() => {
    //     checkEdited()
    // }, [appointmentInfo])

    const addProfile = (profile: IUserInfoViewModel) => {
        setPatientProfile(patientProfile.concat(profile))
    }

    return (
        <div id='booking-appointment' className='booking-appointment'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <HeaderPage icon={<EventAvailableIcon/>} text='Quản lý lịch khám' textChild='Đặt lịch khám'/>
            <div className="booking-appointment-container">
                <div className="booking-appointment">
                    <div className="booking-appointment-title">
                        Thông tin người bệnh
                    </div>
                    <div className="booking-appointment-sub-title">
                        Vui lòng chọn một trong các hồ sơ có sẵn để đặt lịch hoặc bấm vào <strong>Thêm hồ sơ</strong> để tạo đặt lịch hộ
                    </div>
                    <div className="booking-appointment-wrap">
                        {/* <div className="no-booking-appointment">
                            <ReportProblemOutlinedIcon sx={{ fontSize: '96px', color: '#cccccc', marginBottom: '12px' }}></ReportProblemOutlinedIcon>
                            Không tìm thấy lịch hẹn nào
                        </div> */}
                        {allProfile?.map((item, index) => {
                            return <BookingPatientItem
                                index={index}
                                name={item.fullName}
                                dateBirth={item.dateOfBirth}
                                sex={item.sex}
                                phone={item.phoneNumber}
                                selectProfile={handleClickProfile}
                                editProfile={handleActionPatientProfile}
                                isSelected={currentSelection === index}
                            />
                        })}
                    </div>
                    <div className="booking-new-booking-appointment">
                        {currentSelection !== 0 &&
                            <Button variant={ButtonVariantType.Outlined} startIcon={<DeleteOutlineOutlinedIcon/>}
                                    sx={{marginRight: '8px'}} color={ButtonColorType.Error} onClick={() => {
                                handleActionPatientProfile("Delete", 0)
                            }}>
                                Xóa người bệnh
                            </Button>}
                        <Button variant={ButtonVariantType.Outlined} startIcon={<AddIcon/>} onClick={() => {
                            handleActionPatientProfile("Add", 0)
                        }}>
                            Thêm hồ sơ
                        </Button>
                    </div>
                </div>
                <div className="booking-appointment-right">
                    <div className="booking-appointment-detail">
                        <div className="booking-appointment-title">
                            Thông tin đặt khám
                        </div>
                        <div className="booking-appointment-wrap">
                            <div className="booking-appointment-item">
                                <DatePicker
                                    placeholder="Chọn một giá trị"
                                    ariaLabel="Chọn một giá trị"
                                    label='Ngày khám'
                                    isRequired={true}
                                    // strings={defaultDatePickerStrings}
                                    onSelectDate={(date) => {
                                        onChangeOneField(AppointmentInfoModelProperty.appointmentDate, date)
                                    }}
                                    value={appointmentInfo.appointmentDate}
                                    // parseDateFromString={()}'
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="booking-appointment-item">
                                <TimePickerView
                                    placeholder='Chọn một giá trị'
                                    label='Khung giờ khám'
                                    timeRange={{ start: 8, end: 17 }}
                                    dateAnchor={appointmentInfo.appointmentDate}
                                    onChange={(_, time) => onChangeOneField(AppointmentInfoModelProperty.appointmentTime, time)}
                                    increments={15}
                                />
                            </div>
                            <div className="booking-appointment-item">
                                <TextField
                                    label='Lý do/ Triệu chứng'
                                    required
                                    placeholder='--'
                                    value={appointmentInfo.appointmentReason}
                                    onChange={(_, value) => {
                                        onChangeOneField(AppointmentInfoModelProperty.appointmentReason, value)
                                    }}
                                    errorMessage={errorMessageString.appointmentReason}
                                />
                            </div>
                            <div className="booking-button-wrap">
                                <Button variant={ButtonVariantType.Outlined} startIcon={<ClearOutlinedIcon/>}
                                        color={ButtonColorType.Inherit} disabled={!isEdited} onClick={cancelBooking}>
                                    Hủy bỏ
                                </Button>
                                <Button variant={ButtonVariantType.Contained} startIcon={<EventAvailableOutlinedIcon/>}
                                        onClick={openConfirmAppointment}>
                                    Đặt lịch
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BookingForm
                openForm={openForm}
                closeForm={closeForm}
                currentPatientProfile={currentPatientProfile}
                profileAction={profileAction}
                addProfile={addProfile}
            />
            <DialogView
                title={'Xác nhận xóa'}
                hidden={!openDelete}
                customContent={
                    <span>Bạn có chắc chắn muốn xóa hồ sơ bệnh nhân <strong>{currentSelection !== -1 ? allProfile[currentSelection].fullName : ''}</strong></span>}
                // closeWithPromise={this.onLogoutAction.bind(this)}
                // confirm={this.handlecClosePopup.bind(this)}
                confirmButtonText={'Xóa'}
                confirmWithPromise={handleDeleteProfile}
                closeButtonText='Trở lại'
                close={closeDelete}
                loading={loadingButton}
            />
            <AcceptBookingForm
                closeAccept={closeAccept}
                currentBookingAppointment={{
                appointmentTime: appointmentInfo.appointmentTime,
                appointmentReason: appointmentInfo.appointmentReason,
                patientName: allProfile[currentSelection].fullName,
                patientBirth: allProfile[currentSelection].dateOfBirth,
                patientSex: allProfile[currentSelection].sex,
                patientPhoneNumber: allProfile[currentSelection].phoneNumber!,
                    patientAddress: {
                        province: allProfile[currentSelection].province,
                        district: allProfile[currentSelection].district,
                        commune: allProfile[currentSelection].ward,
                        address: allProfile[currentSelection].address
                    },
                patientId: allProfile[currentSelection].id,
                patientCode: allProfile[currentSelection].code
                }}
                openAccept={openAccept}
            />
        </div>
    );
}

export default BookingAppointment;