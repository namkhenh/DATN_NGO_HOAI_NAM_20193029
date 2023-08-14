import React, {useEffect, useState} from 'react'

import {ICommune, IDistrict, IProvince, IUserAddress, IUserInfoViewModel, Relation, UserAddressModelProperty, UserInfoDefaultView, UserInfoModelProperty, UserSexView} from '../../model/apimodel/userInfo';
import {IDropdownOption} from '@fluentui/react/lib/Dropdown';
import {TextField} from '../../common/textField/TextField';
import {Dropdown} from '../../common/dropdown/DropDown';
import {DatePicker} from '../../common/datePicker/DatePicker';
import {ProfileAction} from '../../model/enum/appointmentEnum';
import Skeleton from '@mui/material/Skeleton';
import DialogView from '../../common/dialog/Dialog';
import './BookingForm.scss'
import {
    isStringEmpty,
    validateNumberField,
    validateRequire,
    validateRequireLimitCharacter,
    validateRequireLimitCharacterForm
} from '../../utils/commonFunction';
import {useStateValue} from '../../context/StateProvider';
import {actionType} from '../../context/Reducer';
import {MessageBarStatus} from '../../model/enum/messageBarEnum';
import { Autocomplete, TextField as TextFieldView } from '@mui/material';
import { AddressService, UserService } from '../../api/apiPage/apiPage';
import { Label } from '@fluentui/react';

interface BookingFormState {
    // currentPatientProfile: IPatientProfileViewModel
    // errorMessageFormString: IFormErrorMessage;
    addressOptions: IAddressOptions
    canEditDistrict: boolean
    canEditCommune: boolean
    loadingButton: boolean
    showMessage: boolean
}

interface IAddressOptions {
    province: IDropdownOption[]
    district: IDropdownOption[]
    commune: IDropdownOption[]
}

interface BookingFormProps {
    currentPatientProfile: IUserInfoViewModel
    openForm: boolean
    profileAction?: ProfileAction
    closeForm: () => void
    addProfile: (profile: IUserInfoViewModel) => void
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

function BookingForm(props: BookingFormProps) {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isLoadingButton, setLoadingButton] = useState<boolean>(false)
    const [isOpen, setOpen] = useState<boolean>(props.openForm)
    const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
    const [listProvince, setListProvince] = useState<IProvince[]>()
    const [listDistrict, setListDistrict] = useState<IDistrict[]>()
    const [listWard, setListWard] = useState<ICommune[]>()
    const [provinceSelect, setProvinceSelect] = useState<IProvince>()
    const [districtSelect, setDistrictSelect] = useState<IDistrict>()
    const [wardSelect, setWardSelect] = useState<ICommune>()
    const [loadingDistrict, setloadingDis] = useState<boolean>(false)
    const [loadingCommune, setloadingCom] = useState<boolean>(false)
    const [currentPatientProfile, setCurrentPatient] = useState<IUserInfoViewModel>(UserInfoDefaultView);
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
    
    useEffect(() => {
        if (props.openForm) {
            setLoading(true)
            setOpen(true)
            setCurrentPatient({
                id: props.currentPatientProfile?.id,
                code: props.currentPatientProfile?.code,
                userName: props.currentPatientProfile?.userName,
                status: props.currentPatientProfile?.status,
                phoneNumber: props.currentPatientProfile?.phoneNumber,
                fullName: props.currentPatientProfile?.fullName,
                email: props.currentPatientProfile?.email,
                cmnd: props.currentPatientProfile?.cmnd,
                dateOfBirth: props.currentPatientProfile?.dateOfBirth,
                sex: props.currentPatientProfile?.sex,
                provinceId: props.currentPatientProfile?.provinceId,
                districtId: props.currentPatientProfile?.districtId,
                wardId: props.currentPatientProfile?.wardId,
                province: props.currentPatientProfile?.province,
                district: props.currentPatientProfile?.district,
                ward: props.currentPatientProfile?.ward,
                address: props.currentPatientProfile?.address,
                religion: props.currentPatientProfile?.religion,
                guardianName: props.currentPatientProfile?.guardianName,
                guardianPhone: props.currentPatientProfile?.guardianPhone,
                guardianRelation: props.currentPatientProfile?.guardianRelation,
                roles: props.currentPatientProfile?.roles,
            })
            setErrorMessage({
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
        } else {
            setOpen(false)

        }
    }, [props.openForm])
    
    const onChangeOneFieldForm = (key: keyof IUserInfoViewModel, value: any) => {
        setCurrentPatient({
            ...currentPatientProfile,
            [key]: value
        })
        setErrorMessage({
            ...errorMessageFormString,
            [key]: validateField(key, value)
        })
    }

    const validateField = (key: keyof IUserInfoViewModel, value: any) => {
        switch (key) {
            case UserInfoModelProperty.fullName:
                return validateRequireLimitCharacter(value)
            case UserInfoModelProperty.phoneNumber:
            case UserInfoModelProperty.guardianPhone: 
                return validateNumberField(value, 10)
            case UserInfoModelProperty.cmnd:
                return validateNumberField(value, 12)
            case UserInfoModelProperty.guardianName:
            case UserInfoModelProperty.guardianRelation: 
                return validateRequireLimitCharacterForm(value)
            default:
        }
    }

    const validateFunction = () => {
        let passedVerify = true;
        let tempNameError = validateRequireLimitCharacter(currentPatientProfile.fullName)

        passedVerify = isStringEmpty(tempNameError) && isStringEmpty(errorMessageFormString.patientPhoneNumber) && isStringEmpty(errorMessageFormString.patientIdentityNumber) && isStringEmpty(errorMessageFormString.guardianName) && isStringEmpty(errorMessageFormString.guardianPhone) && isStringEmpty(errorMessageFormString.guardianRelation)
        
        setErrorMessage({
            ...errorMessageFormString,
            patientName: tempNameError,

        })
        return passedVerify
    }

    const renderBodyForm = (): JSX.Element => {
        return (
            (false ?
                <div className="user-main-container" style={{ display: 'flex', flexWrap: 'wrap' }} >
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                    <Skeleton variant="rounded" width={300} height={72} />
                </div > :
                <div className="patient-profile-form">
                    <div className="patient-profile-field">
                        <TextField
                            label='Họ và tên'
                            placeholder='--'
                            required={true}
                            value={currentPatientProfile.fullName}
                            onChange={(_, value) => { onChangeOneFieldForm(UserInfoModelProperty.fullName, value) }}
                            errorMessage={errorMessageFormString.patientName}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <Dropdown
                            placeholder="Chọn một giá trị"
                            label="Giới tính"
                            options={UserSexView}
                            selectedKey={currentPatientProfile.sex}
                            required
                            onChange={(_, selected) => {
                                onChangeOneFieldForm(UserInfoModelProperty.sex, Number(selected?.key))
                            }}
                            errorMessage={errorMessageFormString.patientSex}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Chọn một giá trị"
                            label='Ngày sinh'
                            isRequired={true}
                            // strings={defaultDatePickerStrings}
                            onSelectDate={(date) => { onChangeOneFieldForm(UserInfoModelProperty.dateOfBirth, date )}}
                            value={!!currentPatientProfile.dateOfBirth ? new Date(currentPatientProfile.dateOfBirth) : new Date()}
                            // parseDateFromString={()}'
                            maxDate={new Date()}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <TextField
                            label='Tuổi'
                            required={true}
                            value={!!currentPatientProfile.dateOfBirth ? (new Date().getFullYear() - new Date(currentPatientProfile.dateOfBirth).getFullYear()).toString() : ''}
                            readOnly
                        />
                    </div>
                    <div className="patient-profile-field">
                        <TextField
                            label='Số điện thoại'
                            placeholder='--'
                            value={currentPatientProfile.phoneNumber}
                            onChange={(_, value) => { onChangeOneFieldForm(UserInfoModelProperty.phoneNumber, value) }}
                            errorMessage={errorMessageFormString.patientPhoneNumber}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <TextField
                            label='CMND/ CCCD'
                            placeholder='--'
                            value={currentPatientProfile.cmnd}
                            onChange={(_, value) => { onChangeOneFieldForm(UserInfoModelProperty.cmnd, value) }}
                            errorMessage={errorMessageFormString.patientIdentityNumber}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <Label required>Tỉnh/ Thành phố</Label>
                        <Autocomplete
                            disablePortal
                            id="assignrole-box-select"
                            options={!!listProvince ? listProvince : []}
                            noOptionsText={'Không có lựa chọn'}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.name}
                            sx={{}}
                            renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn tỉnh' />}
                            onChange={(_, selected) => {
                                setProvinceSelect(selected!)
                            }}
                            loading={listProvince?.length === 0}
                            loadingText={<>Vui lòng đợi...</>}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <Label required>Huyện/ Quận</Label>
                        <Autocomplete
                            disablePortal
                            id="assignrole-box-select"
                            options={!!listDistrict ? listDistrict : []}
                            noOptionsText={'Không có lựa chọn'}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.name}
                            sx={{}}
                            renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn huyện' />}
                            onChange={(_, selected) => {
                                setDistrictSelect(selected!)
                            }}
                            loading={loadingDistrict}
                            loadingText={<>Vui lòng đợi...</>}
                            disabled={!provinceSelect}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <Label required>Xã/ Phường</Label>
                        <Autocomplete
                            disablePortal
                            id="assignrole-box-select"
                            options={!!listWard ? listWard : []}
                            noOptionsText={'Không có lựa chọn'}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.name}
                            sx={{}}
                            renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn xã' />}
                            onChange={(_, selected) => {
                                setWardSelect(selected!)
                            }}
                            loading={loadingCommune}
                            loadingText={<>Vui lòng đợi...</>}
                            disabled={!districtSelect}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <TextField
                            label='Địa chỉ'
                            placeholder='--'
                            value={currentPatientProfile.address}
                            onChange={(_, value) => { onChangeOneFieldForm(UserInfoModelProperty.cmnd, value) }}
                        // errorMessage={errorMessageFormString.patientAddress.address}
                        />
                    </div>
                    <div className="" style={{ border: '1px solid #CCCCCC', width: '100%' }}></div>
                    <div className="patient-profile-field">
                        <TextField
                            label='Người giám hộ'
                            placeholder='--'
                            value={currentPatientProfile.guardianName}
                            onChange={(_, value) => { onChangeOneFieldForm(UserInfoModelProperty.guardianName, value) }}
                            errorMessage={errorMessageFormString.guardianName}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <TextField
                            label='SĐT người giám hộ'
                            placeholder='--'
                            value={currentPatientProfile.guardianPhone}
                            onChange={(_, value) => { onChangeOneFieldForm(UserInfoModelProperty.guardianPhone, value) }}
                            errorMessage={errorMessageFormString.guardianPhone}
                        />
                    </div>
                    <div className="patient-profile-field">
                        <Dropdown
                            placeholder="Chọn một giá trị"
                            label="Mối quan hệ"
                            options={Relation}
                            selectedKey={currentPatientProfile.guardianRelation}
                            required
                            onChange={(_, selected) => {
                                onChangeOneFieldForm(UserInfoModelProperty.guardianRelation, selected?.key)
                            }}
                            errorMessage={errorMessageFormString.patientSex}
                        />
                    </div>
                </div>
            ))
    }

    const handleCloseForm = () => {
        props.closeForm()
    }

    const [, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onSave = () => {
        if (props.profileAction === ProfileAction.Create) {
            let requestBody = {
                password: `User${currentPatientProfile.cmnd}!`,
                email: 'namkhenh81@gmail.com',
                phoneNumber: currentPatientProfile.phoneNumber
            }
            setLoadingButton(true)
            UserService.register(requestBody).then(res => {
                if (res.success) {
                    let requestUpdate = {
                        id: res.data?.id,
                        code: res.data?.code,
                        fullName: currentPatientProfile.fullName,
                        status: currentPatientProfile.status,
                        description: "",
                        email: res.data?.email,
                        userName: res.data?.userName,
                        phone: currentPatientProfile.phoneNumber,
                        sex: currentPatientProfile.sex,
                        religion: currentPatientProfile.religion || 0,
                        provinceId: provinceSelect?.id,
                        districtId: districtSelect?.id,
                        wardId: wardSelect?.id,
                        address: currentPatientProfile.address,
                        age: 0,
                        dateOfBirth: currentPatientProfile.dateOfBirth,
                        cmnd: currentPatientProfile.cmnd,
                        guardiasName: currentPatientProfile.guardianName,
                        guardiansPhoneNumber: currentPatientProfile.guardianPhone,
                        relationship: currentPatientProfile.guardianRelation
                    }
                    UserService.updateUser(requestUpdate).then(res => {
                        if (res.success) {
                            setLoadingButton(false)
                            showMessageBar(`Thêm hồ sơ bệnh nhân thành công!`, true, MessageBarStatus.Success)
                            handleCloseForm()
                            console.log(res);
                            props.addProfile(res.data)

                        } else {
                            setLoadingButton(false)
                            showMessageBar(`Thêm hồ sơ bệnh nhân thất bại!`, true, MessageBarStatus.Error)
                        }
                    })
                }      
            })
        }
        return new Promise((res) => { })
    }

    return (
        <>
            <DialogView
                title={props.profileAction === ProfileAction.Create ? 'Thêm hồ sơ bệnh nhân' : 'Chỉnh sửa hồ sơ bệnh nhân'}
                hidden={!isOpen}
                customContent={renderBodyForm()}
                // closeWithPromise={this.onLogoutAction.bind(this)}
                // confirm={this.handlecClosePopup.bind(this)}
                confirmButtonText={'Lưu'}
                confirmWithPromise={onSave}
                closeButtonText='Hủy bỏ'
                close={handleCloseForm}
                loading={isLoadingButton}
            />
        </>
  )
}

export default BookingForm