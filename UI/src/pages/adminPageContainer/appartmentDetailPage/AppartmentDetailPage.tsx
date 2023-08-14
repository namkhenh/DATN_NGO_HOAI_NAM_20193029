import React, { useCallback, useEffect, useState } from 'react'
import './AppartmentDetailPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { DatePicker } from '../../../common/datePicker/DatePicker'
import { TextField } from '../../../common/textField/TextField'
import { IAppointmenViewModel, AppointmenModelProperty } from '../../../model/apimodel/appointmentInfo'
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { Label } from '@fluentui/react'
import Button from '@mui/material/Button'
import { ButtonColorType, ButtonVariantType, LoadingPosition } from '../../../model/enum/buttonEnum'
import { useNavigate, useParams } from 'react-router-dom'
import { SearchBoxView } from '../../../common/searchBox/SearchBox'
import { UserGender } from '../../../model/enum/tableTypeEnum'
import { isStringEmpty, validateNumberField, validateRequireLimitCharacter, validateRequireLimitCharacterForm } from '../../../utils/commonFunction'
import { Autocomplete, Backdrop, CircularProgress, TextField as TextFieldView } from '@mui/material'
import { TimePickerView } from '../../../common/timePicker/TimePicker'
import { CommuneDefault, DistricDefault, ICommune, IDistrict, IProvince, IUserAddress, IUserInfoViewModel, ProvinceDefault, Relation, UserInfoDefaultView, UserInfoModelProperty } from '../../../model/apimodel/userInfo'
import { AddressService, ExaminationScheduleService, PatientRecordService, UserService } from '../../../api/apiPage/apiPage'
import { useStateValue } from '../../../context/StateProvider'
import { MessageBarStatus } from '../../../model/enum/messageBarEnum'
import { actionType } from '../../../context/Reducer'
import SubmitButton from '../../../common/button/SubmitButton'
import { Dropdown } from '../../../common/dropdown/DropDown'

export enum IAppointmentAction {
    Create,
    Edit
}

export enum PatientType {
    Normal,
    Emergency
}

interface IAppartmentDetailPageProps {
    actionType: IAppointmentAction
}

interface IFormErrorMessage {
    patientName: string;
    patientSex: string;
    patientDateBirth: string;
    patientPhoneNumber: string;
    patientIdentityNumber: string;
    patientAddress: IAddressErrorMessage
    guardianName: string
    guardianPhone: string
    guardianRelation: string
}

interface IAddressErrorMessage {
    province: string
    district: string
    commune: string
}

function AppartmentDetailPage(props: IAppartmentDetailPageProps) {
    const appointmentIdFromProps = useParams().id;
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isLoadingButton, setLoadingButton] = useState<boolean>(false)
    const [emergencyStatus, setEmergency] = useState<string>(PatientType.Normal.toString())
    const [appointmentId, setappointmentId] = useState<string>(appointmentIdFromProps || '')
    const [appointmentCode, setappointmentCode] = useState<string>()
    const [appointmentDate, setappointmentDate] = useState<Date>(new Date())
    const [appointmentTime, setappointmentTime] = useState<Date>(new Date())
    const [appointmentReason, setappointmentReason] = useState<string>()
    const [userInfo, setUserInfo] = useState<IUserInfoViewModel>(UserInfoDefaultView)
    const [listProvince, setListProvince] = useState<IProvince[]>()
    const [listDistrict, setListDistrict] = useState<IDistrict[]>()
    const [listWard, setListWard] = useState<ICommune[]>()
    const [provinceSelect, setProvinceSelect] = useState<IProvince>(ProvinceDefault)
    const [districtSelect, setDistrictSelect] = useState<IDistrict>(DistricDefault)
    const [wardSelect, setWardSelect] = useState<ICommune>(CommuneDefault)
    const [loadingDistrict, setloadingDis] = useState<boolean>(false)
    const [loadingCommune, setloadingCom] = useState<boolean>(false)
    const [, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }
    const [errorMessageFormString, setErrorMessage] = useState<IFormErrorMessage>({
        patientName: '',
        patientSex: '',
        patientDateBirth: '',
        patientPhoneNumber: '',
        patientIdentityNumber: '',
        patientAddress: {
            province: '',
            commune: '',
            district: '',
        },
        guardianName: '',
        guardianPhone: '',
        guardianRelation: ''
    })

    const onChangeOneField = (key: keyof IUserInfoViewModel, value: any) => {
        setUserInfo({
            ...userInfo,
            [key]: value
        })
    }

    const validate = (key: keyof IAppointmenViewModel, value: any) => {
        setErrorMessage({
            ...errorMessageFormString,
            [key]: validateField(key, value)
        })
    }

    const validateField = (key: keyof IAppointmenViewModel, value: any) => {
        switch (key) {
            case AppointmenModelProperty.patientName:
                return validateRequireLimitCharacter(value)
            case AppointmenModelProperty.patientPhoneNumber:
            case AppointmenModelProperty.guardianPhone:
                return validateNumberField(value, 10)
            case AppointmenModelProperty.patientIdentityNumber:
                return validateNumberField(value, 12)
            case AppointmenModelProperty.guardianName:
                return validateRequireLimitCharacterForm(value)
            default:
        }
    }

    const validateFunction = () => {
        let passedVerify = true;
        let tempNameError = validateRequireLimitCharacter(userInfo.fullName)
        // let tempProvinceError = validateRequire(patientAddress.province.text)
        // let tempDistrictError = validateRequire(patientAddress.district.text)
        // let tempCommuneError = validateRequire(patientAddress.commune.text)

        passedVerify = isStringEmpty(tempNameError) && isStringEmpty(errorMessageFormString.patientPhoneNumber) && isStringEmpty(errorMessageFormString.patientIdentityNumber) && isStringEmpty(errorMessageFormString.guardianName) && isStringEmpty(errorMessageFormString.guardianPhone) && isStringEmpty(errorMessageFormString.guardianRelation)

        setErrorMessage({
            ...errorMessageFormString,
            patientName: tempNameError,
            // patientAddress: {
            //     province: tempProvinceError,
            //     district: tempDistrictError,
            //     commune: tempCommuneError,
            // }    
        })
        return passedVerify
    }

    useEffect(() => {
        if (!!appointmentId) {
            setLoading(true)
            ExaminationScheduleService.getScheduleById(appointmentId).then(res => {
                setLoading(false)
                if (res.success) {
                    setUserInfo({
                        id: res.data?.user?.id,
                        code: res.data?.user?.code,
                        userName: res.data?.user?.userName,
                        status: res.data?.user?.status,
                        phoneNumber: res.data?.user?.phoneNumber,
                        fullName: res.data?.user?.fullName,
                        email: res.data?.user?.email,
                        cmnd: res.data?.user?.cmnd,
                        dateOfBirth: res.data?.user?.dateOfBirth,
                        sex: res.data?.user?.sex,
                        provinceId: res.data?.user?.provinceId,
                        districtId: res.data?.user?.districtId,
                        wardId: res.data?.user?.wardId,
                        province: res.data?.user?.province,
                        district: res.data?.user?.district,
                        ward: res.data?.user?.ward,
                        address: res.data?.user?.adress,
                        religion: res.data?.user?.religion,
                        guardianName: res.data?.user?.guardiasName,
                        guardianPhone: res.data?.user?.guardiansPhoneNumber,
                        guardianRelation: res.data?.user?.relationship,
                        roles: res.data?.user?.roles,
                    })
                    setappointmentId(res.data?.id)
                    setappointmentCode(res.data?.code)
                    setappointmentDate(res.data?.timeOfExamination)
                    setappointmentTime(res.data?.timeOfExamination)
                    setappointmentReason(res.data?.reason)
                    setProvinceSelect(res.data?.user?.province)
                    setDistrictSelect(res.data?.user?.district)
                    setWardSelect(res.data?.user?.ward)
                } else {
                    setLoading(false)
                    showMessageBar(`Đã có lỗi xảy ra! \n ${res?.message ? res?.message : ''}`, true, MessageBarStatus.Error)
                }
            })
        }
    }, [])

    const onSave = () => {
        if (validateFunction()) {
            if (props.actionType === IAppointmentAction.Edit) {
                let requestBody = {
                    id: userInfo.id,
                    code: userInfo.code,
                    fullName: userInfo.fullName,
                    status: userInfo.status,
                    description: "",
                    email: userInfo.email,
                    userName: userInfo.userName,
                    phone: userInfo.phoneNumber,
                    sex: userInfo.sex,
                    religion: userInfo.religion || 0,
                    provinceId: provinceSelect?.id,
                    districtId: districtSelect?.id,
                    wardId: wardSelect?.id,
                    adress: userInfo.address,
                    age: userInfo.sex,
                    dateOfBirth: userInfo.dateOfBirth,
                    cmnd: userInfo.cmnd,
                    guardiasName: userInfo.guardianName,
                    guardiansPhoneNumber: userInfo.guardianPhone,
                    relationship: userInfo.guardianRelation
                }
                setLoadingButton(true)
                const result = UserService.updateUser(requestBody).then(res => {
                    if (res.success) {
                        let requestBody = {
                            id: "00000000-0000-0000-0000-000000000000",
                            medicalExaminationScheduleId: appointmentId,
                            userId: userInfo.id
                        }
                        PatientRecordService.createPatientRecord(requestBody).then(res => {
                            if (res.success) {
                                setLoadingButton(false)
                                showMessageBar(`Tạo hồ sơ bệnh nhân thành công!`, true, MessageBarStatus.Success)
                                navigate('/admin/tiep-don-benh-nhan/danh-sach-benh-nhan')
                            } else {
                                setLoadingButton(false)
                                showMessageBar(`Tạo hồ sơ bệnh nhân thất bại!`, true, MessageBarStatus.Error)
                            }
                        })
                    }
                })
                return result
            }
             
            if (props.actionType === IAppointmentAction.Create && !userInfo.id) {
                let requestBody = {
                    password: `User${userInfo.cmnd}!`,
                    email: 'namkhenh81@gmail.com',
                    phoneNumber: userInfo.phoneNumber
                }
                setLoadingButton(true)
                const result = UserService.register(requestBody).then(res => {
                    if (res.success) {
                        let requestUpdate = {
                            id: res.data?.id,
                            code: res.data?.code,
                            fullName: userInfo.fullName,
                            status: userInfo.status,
                            description: "",
                            email: res.data?.email,
                            userName: res.data?.userName,
                            phone: userInfo.phoneNumber,
                            sex: userInfo.sex,
                            religion: userInfo.religion || 0,
                            provinceId: provinceSelect?.id,
                            districtId: districtSelect?.id,
                            wardId: wardSelect?.id,
                            adress: userInfo.address,
                            age: 0,
                            dateOfBirth: userInfo.dateOfBirth,
                            cmnd: userInfo.cmnd,
                            guardiasName: userInfo.guardianName,
                            guardiansPhoneNumber: userInfo.guardianPhone,
                            relationship: userInfo.guardianRelation
                        }
                        let requestSchedule = {
                            id: "00000000-0000-0000-0000-000000000000",
                            timeOfExamination: appointmentTime,
                            reason: appointmentReason,
                            appUserId: res.data?.id,
                            patientReceptionStatus: 0
                        }
                        Promise.all([UserService.updateUser(requestUpdate), ExaminationScheduleService.createSchedule(requestSchedule)]).then(res => {
                            if (res[0].success && res[1].success) {
                                let requestBody = {
                                    id: "00000000-0000-0000-0000-000000000000",
                                    medicalExaminationScheduleId: res[1].data?.id,
                                    userId: res[1].data?.appUserId,
                                    emergency: Number(emergencyStatus) === PatientType.Emergency
                                }
                                PatientRecordService.createPatientRecord(requestBody).then(res => {
                                    if (res.success) {
                                        setLoadingButton(false)
                                        showMessageBar(`Tạo hồ sơ bệnh nhân thành công!`, true, MessageBarStatus.Success)
                                        navigate('/admin/tiep-don-benh-nhan/danh-sach-benh-nhan')
                                    } else {
                                        setLoadingButton(false)
                                        showMessageBar(`Tạo hồ sơ bệnh nhân thất bại!`, true, MessageBarStatus.Error)
                                    }
                                })  
                            } else {
                                setLoadingButton(false)
                                showMessageBar('Tạo hồ sơ bệnh nhân thất bại!', true, MessageBarStatus.Error)
                            }
                        })
                    } else {
                        setLoadingButton(false)
                        showMessageBar(`Tạo hồ sơ bệnh nhân thất bại! \n ${res?.message ? res?.message : ''}`, true, MessageBarStatus.Error)
                    }
                })
                return result
            }

            if (props.actionType === IAppointmentAction.Create && !!userInfo.id) {
                let requestUpdate = {
                    id: userInfo.id,
                    code: userInfo.code,
                    fullName: userInfo.fullName,
                    status: userInfo.status,
                    description: "",
                    email: userInfo.email,
                    userName: userInfo.userName,
                    phone: userInfo.phoneNumber,
                    sex: userInfo.sex,
                    religion: userInfo.religion || 0,
                    provinceId: provinceSelect?.id,
                    districtId: districtSelect?.id,
                    wardId: wardSelect?.id,
                    adress: userInfo.address,
                    age: userInfo.sex,
                    dateOfBirth: userInfo.dateOfBirth,
                    cmnd: userInfo.cmnd,
                    guardiasName: userInfo.guardianName,
                    guardiansPhoneNumber: userInfo.guardianPhone,
                    relationship: userInfo.guardianRelation
                }

                let requestSchedule = {
                    id: "00000000-0000-0000-0000-000000000000",
                    timeOfExamination: appointmentTime,
                    reason: appointmentReason,
                    appUserId: userInfo.id,
                    patientReceptionStatus: 0
                }
                Promise.all([UserService.updateUser(requestUpdate), ExaminationScheduleService.createSchedule(requestSchedule)]).then(res => {
                    if (res[0].success && res[1].success) {
                        let requestBody = {
                            id: "00000000-0000-0000-0000-000000000000",
                            medicalExaminationScheduleId: res[1].data?.id,
                            userId: res[1].data?.appUserId
                        }
                        PatientRecordService.createPatientRecord(requestBody).then(res => {
                            if (res.success) {
                                setLoadingButton(false)
                                showMessageBar(`Tạo hồ sơ bệnh nhân thành công!`, true, MessageBarStatus.Success)
                                navigate('/admin/tiep-don-benh-nhan/danh-sach-benh-nhan')
                            } else {
                                setLoadingButton(false)
                                showMessageBar(`Tạo hồ sơ bệnh nhân thất bại!`, true, MessageBarStatus.Error)
                            }
                        })
                    } else {
                        setLoadingButton(false)
                        showMessageBar('Tạo hồ sơ bệnh nhân thất bại!', true, MessageBarStatus.Error)
                    }
                })
            }
            return new Promise(res => {})
        }
        return new Promise(res => { })
    }

    useEffect(() => {
        AddressService.getProvince().then(res => {
            if (res.success) {
                let province: IProvince[] = []
                !!res.data && res.data.forEach((pr: any) => {
                    province.push({
                        id: pr.id,
                        code: pr.code,
                        name: pr.name,
                        codeName: pr.codeName,
                        divisonType: pr.division_Type,
                        phoneCode: pr.phone_Code
                    })
                })
                setListProvince(province)
            }
        })
    }, [])

    useEffect(() => {
        if (!!provinceSelect?.code) {
            setloadingDis(true)
            setListDistrict([])
            AddressService.getDistrict(provinceSelect.id).then(res => {
                if (res.success) {
                    setloadingDis(false)
                    let district: IDistrict[] = []
                    !!res.data && res.data.forEach((dis: any) => {
                        district.push({
                            id: dis.id,
                            code: dis.code,
                            name: dis.name,
                            codeName: dis.codeName,
                            divisonType: dis.division_Type,
                            provinceId: dis.provinceId
                        })
                    })
                    setListDistrict(district)
                } else {
                    setloadingDis(false)
                }
            })
        } else {
            setListDistrict([])
            setListWard([])
        }

    }, [provinceSelect])

    useEffect(() => {
        if (!!districtSelect?.code) {
            setloadingCom(true)
            setListWard([])
            AddressService.getCommune(districtSelect.id).then(res => {
                if (res.success) {
                    setloadingCom(false)
                    let commune: ICommune[] = []
                    !!res.data && res.data.forEach((com: any) => {
                        commune.push({
                            id: com.id,
                            code: com.code,
                            name: com.name,
                            codeName: com.codeName,
                            divisonType: com.division_Type,
                            districtId: com.districtId
                        })
                    })
                    setListWard(commune)
                } else {
                    setloadingDis(false)
                }
            })
        }

    }, [districtSelect])

    const convertAddressToString = (inputAddress: IUserAddress) => {
        const addressString = inputAddress.address ? inputAddress.address + ', ' : ""
        const outputAddress: string = addressString + (!!inputAddress.commune?.name ? inputAddress.commune?.name : '') + ', ' + (!!inputAddress.district?.name ? inputAddress.district?.name : '') + ', ' + (!!inputAddress.province?.name ? inputAddress.province?.name : '')
        return outputAddress
    }

    const searchPatient = (searchTerm: string) => {
        if (!!searchTerm) {
            setLoading(true)
            UserService.getUserByCode(searchTerm).then(res => {
                setLoading(false)
                // if (res.success) {
                //     console.log(res);
                    
                // } else {
                //     showMessageBar(`Không tìm thấy bệnh nhân!`, true, MessageBarStatus.Error)
                // }
                setUserInfo({
                    id: res.data?.id,
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
                    address: res.data?.adress,
                    religion: res.data?.religion,
                    guardianName: res.data?.guardiasName,
                    guardianPhone: res.data?.guardiansPhoneNumber,
                    guardianRelation: res.data?.relationship,
                    roles: res.data?.roles,
                })
                setProvinceSelect(res.data?.province)
                setDistrictSelect(res.data?.district)
                setWardSelect(res.data?.ward)
            })
        }
    }  

    return (
        <div className='appointmentdetail-page'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='appointmentdetail-page-container'>
                {props.actionType === IAppointmentAction.Edit ?
                    <BreadCrumb
                        breadcrumbItem={[
                            { key: 1, text: 'Tiếp đón bệnh nhân đặt khám', href: '/admin/tiep-don-dat-kham' },
                            { key: 2, text: 'Chi tiết', href: '/admin/chi-tiet-ho-so' },
                        ]}
                    /> :
                    <BreadCrumb
                        breadcrumbItem={[
                            { key: 1, text: 'Tiếp đón bệnh nhân', href: '/admin/tiep-don-dat-kham' },
                            { key: 2, text: 'Thêm mới', href: '/admin/them-moi-hen-kham' },
                        ]}
                    />
                }
                {props.actionType === IAppointmentAction.Edit ?
                    <div className="appointmentdetail-page-title">
                        Chi tiết bệnh nhân đặt khám
                    </div> :
                    <div className="appointmentdetail-page-title">
                        Thêm mới hồ sơ bệnh nhân
                    </div>
                }
                <div className="search-id">
                    <SearchBoxView
                        placeholder='Mã bệnh nhân/ Số điện thoại/ CMND'
                        onSearch={(newValue) => { searchPatient(newValue) }}
                    />
                </div>
                <div className="appoitment-info">
                    <div className="appointment-sub-title">
                        Thông tin hồ sơ
                    </div>
                    <div className="appointment-info-wrap">
                        <div className="appointment-info-item">
                            <Label required>Phân loại bệnh nhân</Label>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={emergencyStatus}
                                onChange={(_, value) => props.actionType === IAppointmentAction.Create && setEmergency(value)}
                            >
                                <FormControlLabel value={PatientType.Normal} control={<Radio />} label="BN thường" />
                                <FormControlLabel value={PatientType.Emergency} control={<Radio />} label="BN cấp cứu" />
                            </RadioGroup>
                        </div>
                        <div className="appointment-info-item">
                            <DatePicker
                                placeholder="Chọn một giá trị"
                                ariaLabel="Chọn một giá trị"
                                label='Ngày khám'
                                isRequired={true}
                                onSelectDate={(date) => {
                                    setappointmentDate(date as Date)
                                }}
                                value={new Date(appointmentDate)}
                                disabled
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TimePickerView
                                placeholder='Chọn một giá trị'
                                label='Khung giờ khám'
                                timeRange={{ start: 8, end: 17 }}
                                dateAnchor={new Date(appointmentDate)}
                                increments={15}
                                onChange={(_, time) => setappointmentTime(time)}
                                value={new Date(appointmentTime)}
                                disabled
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TextField
                                label='Lý do/ Triệu chứng'
                                required
                                placeholder='--'
                                value={appointmentReason}
                                onChange={(_, value) => {
                                    setappointmentReason(value as string)
                                }}
                                disabled={props.actionType === IAppointmentAction.Edit}
                            />
                        </div>
                    </div>
                </div>
                <div className="patient-info">
                    <div className="appointment-sub-title">
                        Thông tin bệnh nhân
                    </div>
                    <div className="patient-info-item">
                        <div className="patient-avt">
                            {/* <Avatar variant="rounded" alt={''} src={flag}
                                sx={{ width: '132px', height: '132px' }}
                            /> */}
                            <ImageNotSupportedOutlinedIcon />
                        </div>
                        <div className="patient-info-item-child">
                            <div className="patient-info-detail width49">
                                <TextField
                                    label='CMND/ CCCD'
                                    placeholder='--'
                                    value={userInfo.cmnd}
                                    onChange={(_, value) => {
                                        onChangeOneField(UserInfoModelProperty.cmnd, value)
                                        validate(AppointmenModelProperty.patientIdentityNumber, value)
                                    }}
                                    errorMessage={errorMessageFormString?.patientIdentityNumber}
                                />
                            </div>
                            <div className="patient-info-detail width49">
                                <TextField
                                    label='Số điện thoại'
                                    placeholder='--'
                                    value={userInfo.phoneNumber}
                                    onChange={(_, value) => {
                                        onChangeOneField(UserInfoModelProperty.phoneNumber, value)
                                        validate(AppointmenModelProperty.patientPhoneNumber, value)
                                    }}
                                    errorMessage={errorMessageFormString?.patientPhoneNumber}
                                />
                            </div>
                            <div className="patient-info-detail width100">
                                <TextField
                                    label='Họ và tên'
                                    required
                                    placeholder='--'
                                    value={userInfo.fullName}
                                    onChange={(_, value) => {
                                        onChangeOneField(UserInfoModelProperty.fullName, value)
                                        validate(AppointmenModelProperty.patientName, value)
                                    }}
                                    errorMessage={errorMessageFormString?.patientName}
                                />
                            </div>
                        </div>
                        <div className="patient-info-item-child">
                            <div className="patient-info-detail width49">
                                <TextField
                                    label='Mã bệnh nhân'
                                    placeholder='--'
                                    value={userInfo.code}
                                    disabled
                                />
                            </div>
                            <div className="patient-info-detail width49">
                                <TextField
                                    label='Mã đặt lịch'
                                    placeholder='--'
                                    value={appointmentCode}
                                    disabled
                                />
                            </div>

                            <div className="patient-info-detail width49 detail-wrap">
                                <div className="detail-wrap-item">
                                    <DatePicker
                                        placeholder="Chọn một giá trị"
                                        ariaLabel="Chọn một giá trị"
                                        label='Ngày sinh'
                                        isRequired={false}
                                        // strings={defaultDatePickerStrings}
                                        onSelectDate={(date) => {
                                            onChangeOneField(UserInfoModelProperty.dateOfBirth, date)
                                        }}
                                        value={!!userInfo.dateOfBirth ? new Date(userInfo.dateOfBirth) : new Date()}
                                        // parseDateFromString={()}'
                                        maxDate={new Date()}
                                    />
                                </div>
                                <div className="detail-wrap-item">
                                    <TextField
                                        label='Tuổi'
                                        placeholder='--'
                                        value={!!userInfo.dateOfBirth ? (new Date().getFullYear() - new Date(userInfo.dateOfBirth).getFullYear()).toString() : ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="patient-info-detail width49">
                                <Label required>Giới tính</Label>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={userInfo.sex}
                                    onChange={(_, value) => onChangeOneField(UserInfoModelProperty.sex, Number(value))}
                                >
                                    <FormControlLabel value={UserGender.Male} control={<Radio />} label="Nam" />
                                    <FormControlLabel value={UserGender.Female} control={<Radio />} label="Nữ" />
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                    <div className="patient-info-item">
                        <div className="patient-info-detail width25">
                            <Label required>Tỉnh/ Thành phố</Label>
                            <Autocomplete
                                disablePortal
                                id="assignrole-box-select"
                                options={!!listProvince ? listProvince : []}
                                value={!!provinceSelect?.code ? provinceSelect : ProvinceDefault}
                                noOptionsText={'Không có lựa chọn'}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                getOptionLabel={(option) => option.name}
                                sx={{}}
                                renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn tỉnh' />}
                                onChange={(_, selected) => {
                                    setProvinceSelect(selected!)
                                    setDistrictSelect(DistricDefault)
                                }}
                                loading={listProvince?.length === 0}
                                loadingText={<>Vui lòng đợi...</>}
                            />
                        </div>
                        <div className="patient-info-detail width25">
                            <Label required>Huyện/ Quận</Label>
                            <Autocomplete
                                disablePortal
                                id="assignrole-box-select"
                                options={!!listDistrict ? listDistrict : []}
                                value={!!districtSelect?.code ? districtSelect : DistricDefault}
                                noOptionsText={'Không có lựa chọn'}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                getOptionLabel={(option) => option.name}
                                sx={{}}
                                renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn huyện' />}
                                onChange={(_, selected) => {
                                    setDistrictSelect(selected!)
                                    setWardSelect(CommuneDefault)
                                }}
                                loading={loadingDistrict}
                                loadingText={<>Vui lòng đợi...</>}
                                disabled={!provinceSelect?.id}
                            />
                        </div>
                        <div className="patient-info-detail width25">
                            <Label required>Xã/ Phường</Label>
                            <Autocomplete
                                disablePortal
                                id="assignrole-box-select"
                                options={!!listWard ? listWard : []}
                                value={!!wardSelect?.code ? wardSelect : CommuneDefault}
                                noOptionsText={'Không có lựa chọn'}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                getOptionLabel={(option) => option.name}
                                sx={{}}
                                renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn xã' />}
                                onChange={(_, selected) => {
                                    setWardSelect(selected!)
                                }}
                                loading={loadingCommune}
                                loadingText={<>Vui lòng đợi...</>}
                                disabled={!districtSelect?.id}
                            />
                        </div>
                        <div className="patient-info-detail width25">
                            <TextField
                                label='Số nhà/ Thôn/ Xóm'
                                placeholder='--'
                                value={userInfo.address}
                                onChange={(_, value) => {
                                    onChangeOneField(UserInfoModelProperty.address, value)
                                }}
                            // errorMessage={state.errorMessageString.userAddress.address}
                            />
                        </div>
                    </div>
                    <div className="patient-info-item">
                        <div className="patient-info-detail width100">
                            <TextField
                                label='Địa chỉ'
                                placeholder='--'
                                required
                                value={
                                    convertAddressToString(
                                        {
                                            province: provinceSelect,
                                            district: districtSelect,
                                            commune: wardSelect,
                                            address: userInfo.address
                                        })}
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div className="appoitment-info">
                    <div className="appointment-sub-title">
                        Thông tin bổ sung
                    </div>
                    <div className="appointment-info-wrap">
                        <div className="appointment-info-item">
                            <TextField
                                label='Người giám hộ'
                                placeholder='--'
                                value={userInfo.guardianName}
                                onChange={(_, value) => {
                                    onChangeOneField(UserInfoModelProperty.guardianName, value)
                                    validate(AppointmenModelProperty.guardianName, value)
                                }}
                                errorMessage={errorMessageFormString?.guardianName}
                            />
                        </div>
                        <div className="appointment-info-item">
                            <TextField
                                label='SĐT người dám hộ'
                                placeholder='--'
                                value={userInfo.guardianPhone}
                                onChange={(_, value) => {
                                    onChangeOneField(UserInfoModelProperty.guardianPhone, value)
                                    validate(AppointmenModelProperty.guardianPhone, value)
                                }}
                                errorMessage={errorMessageFormString?.guardianPhone}
                            />
                        </div>
                        <div className="appointment-info-item">
                            <Dropdown
                                placeholder="Chọn một giá trị"
                                label="Mối quan hệ"
                                options={Relation}
                                selectedKey={userInfo.guardianRelation}
                                required
                                onChange={(_, selected) => {
                                    onChangeOneField(UserInfoModelProperty.guardianRelation, selected?.key)
                                    validate(AppointmenModelProperty.guardianRelation, selected?.key)
                                }}
                                errorMessage={errorMessageFormString.patientSex}
                            />
                        </div>
                    </div>
                </div>
                <div className="appointment-info-button">
                    <Button variant={ButtonVariantType.Outlined} color={ButtonColorType.Inherit}>Hủy</Button>
                    {true && <SubmitButton
                        id={'common-dialog-default'}
                        text={'Lưu'}
                        // disable={!canUpdate}
                        buttonVariantType={ButtonVariantType.Contained}
                        promise={onSave}
                        loading={isLoadingButton}
                        loadingPosition={LoadingPosition.Center}
                    />}
                </div>
            </div>
        </div>
    )
}

export default AppartmentDetailPage