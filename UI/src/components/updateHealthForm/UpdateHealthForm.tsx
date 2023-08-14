import React, {useEffect, useState} from 'react'
import './UpdateHealthForm.scss'
import DialogView from '../../common/dialog/Dialog'
import {useStateValue} from '../../context/StateProvider'
import {actionType} from '../../context/Reducer'
import {MessageBarStatus} from '../../model/enum/messageBarEnum'
import {DatePicker} from '../../common/datePicker/DatePicker'
import {TextField} from '../../common/textField/TextField'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import NordicWalkingIcon from '@mui/icons-material/NordicWalking';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import PoolIcon from '@mui/icons-material/Pool';
import {Label} from '@fluentui/react'
import {UserHealthActivityIntensity} from '../../model/enum/appointmentEnum'
import {MyHealthFormType} from '../../model/enum/myHealthEnum'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider'

interface UpdateHealthFormProps {
    openForm: boolean
    closeForm: () => void
    type: MyHealthFormType
}

function UpdateHealthForm(props: UpdateHealthFormProps) {
    const [isOpen, setOpen] = useState<boolean>(props.openForm)
    const [titleForm, setTitle] = useState<string>('')
    const [bodyForm, setBodyForm] = useState<JSX.Element>()
    
    useEffect(() => {
        setOpen(props.openForm)
    },[props.openForm])
    
    const [isLoading, setLoading] = useState<boolean>(false)
    const [intensity, setIntensity] = useState<UserHealthActivityIntensity>(UserHealthActivityIntensity.Little)
    const [intensityText, setIntensityText] = useState<string>('Cường độ Ít')

    const closeForm = () => {
        props.closeForm();
        setIntensity(UserHealthActivityIntensity.Little)
        setIntensityText('Cường độ Ít')
    }

    const chooseIntensity = (intensity: number) => {
        setIntensity(intensity)
        switch (intensity) {
            case UserHealthActivityIntensity.Little:
                setIntensityText('Cường độ Ít')
                break;
            case UserHealthActivityIntensity.Medium:
                setIntensityText('Cường độ Trung bình')
                break;
            case UserHealthActivityIntensity.Midding:
                setIntensityText('Cường độ Khá')
                break;
            case UserHealthActivityIntensity.Many:
                setIntensityText('Cường độ Nhiều')
                break;
            case UserHealthActivityIntensity.Maximum:
                setIntensityText('Cường độ Tối đa')
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const body = renderBodyForm(props.type)
        setBodyForm(body)
    },[props.type])

    const renderBodyForm = (type: MyHealthFormType) => {
        switch (type) {
            case MyHealthFormType.UpdateInfo:
                setTitle('Cập nhật thông tin')
                return renderUpdateForm
            case MyHealthFormType.BMI:
                setTitle('Tính chỉ số BMI')
                return renderBMIForm
            case MyHealthFormType.BMR:
                setTitle('Tính chỉ số BMR')
                return renderBMRForm
            case MyHealthFormType.HeartBeat:
                setTitle('Tính nhịp tim lý tưởng')
                return renderHeartBeatForm

            default:
                break;
        }
    }

    const renderUpdateForm = () => {
        return (<div className='update-health-form'>
            <div className="update-health-field">
                <DatePicker
                    placeholder="Chọn một giá trị"
                    ariaLabel="Chọn một giá trị"
                    label='Ngày sinh'
                    isRequired={true}
                    // strings={defaultDatePickerStrings}
                    // onSelectDate={(date) => { onChangeOneFieldForm(PatientProfileModelProperty.patientDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`) }}
                    value={new Date()}
                    // parseDateFromString={()}'
                    maxDate={new Date()}
                />
            </div>
            <div className="update-health-field">
                <TextField
                    label='Chiều cao của bạn? (cm)'
                    placeholder='--'
                    // value={currentPatientProfile.patientPhoneNumber}
                    // onChange={(_, value) => { onChangeOneFieldForm(PatientProfileModelProperty.patientPhoneNumber, value) }}
                    // errorMessage={errorMessageFormString.patientPhoneNumber}
                />
            </div>
            <div className="update-health-field">
                <TextField
                    label='Cân nặng của bạn? (kg)'
                    placeholder='--'
                    // value={currentPatientProfile.patientPhoneNumber}
                    // onChange={(_, value) => { onChangeOneFieldForm(PatientProfileModelProperty.patientPhoneNumber, value) }}
                    // errorMessage={errorMessageFormString.patientPhoneNumber}
                />
            </div>
            <div className="update-health-field">
                <Label>Chọn cường độ hoạt động của bạn</Label>
                <div className="activity-wrap">
                    <div className={intensity === UserHealthActivityIntensity.Little ? "activity-item activity-item-active" : "activity-item"} onClick={()=>{chooseIntensity(UserHealthActivityIntensity.Little)}}>
                        <AccessibilityNewIcon sx={{ fontSize: '40px' }}/>
                    </div>
                    <div className={intensity === UserHealthActivityIntensity.Medium ? "activity-item activity-item-active" : "activity-item"} onClick={() => { chooseIntensity(UserHealthActivityIntensity.Medium) }}>
                        <NordicWalkingIcon sx={{ fontSize: '40px' }} />
                    </div>
                    <div className={intensity === UserHealthActivityIntensity.Midding ? "activity-item activity-item-active" : "activity-item"} onClick={() => { chooseIntensity(UserHealthActivityIntensity.Midding) }}>
                        <SportsGymnasticsIcon sx={{ fontSize: '40px' }} />
                    </div>
                    <div className={intensity === UserHealthActivityIntensity.Many ? "activity-item activity-item-active" : "activity-item"} onClick={() => { chooseIntensity(UserHealthActivityIntensity.Many) }}>
                        <DirectionsBikeIcon sx={{ fontSize: '40px' }} />
                    </div>
                    <div className={intensity === UserHealthActivityIntensity.Maximum ? "activity-item activity-item-active" : "activity-item"} onClick={() => { chooseIntensity(UserHealthActivityIntensity.Maximum) }}>
                        <PoolIcon sx={{ fontSize: '40px' }} />
                    </div>
                </div>
                <div className="activity-text">
                    {intensityText}
                </div>
            </div>
        </div>)
    }

    const renderBMIForm = () => {
        return (<div className='update-health-form'>
            <div className="update-health-field">
                <DatePicker
                    placeholder="Chọn một giá trị"
                    ariaLabel="Chọn một giá trị"
                    label='Ngày sinh'
                    isRequired={true}
                    // strings={defaultDatePickerStrings}
                    // onSelectDate={(date) => { onChangeOneFieldForm(PatientProfileModelProperty.patientDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`) }}
                    value={new Date()}
                    // parseDateFromString={()}'
                    maxDate={new Date()}
                />
            </div>
            <div className="update-health-field">
                <TextField
                    label='Chiều cao của bạn? (cm)'
                    placeholder='--'
                // value={currentPatientProfile.patientPhoneNumber}
                // onChange={(_, value) => { onChangeOneFieldForm(PatientProfileModelProperty.patientPhoneNumber, value) }}
                // errorMessage={errorMessageFormString.patientPhoneNumber}
                />
            </div>
            <div className="update-health-field">
                <TextField
                    label='Cân nặng của bạn? (kg)'
                    placeholder='--'
                // value={currentPatientProfile.patientPhoneNumber}
                // onChange={(_, value) => { onChangeOneFieldForm(PatientProfileModelProperty.patientPhoneNumber, value) }}
                // errorMessage={errorMessageFormString.patientPhoneNumber}
                />
            </div>
        </div>)
    }

    const renderBMRForm = () => {
        return (<div className='update-health-form'>
            <div className="update-health-field">
                <DatePicker
                    placeholder="Chọn một giá trị"
                    ariaLabel="Chọn một giá trị"
                    label='Ngày sinh'
                    isRequired={true}
                    // strings={defaultDatePickerStrings}
                    // onSelectDate={(date) => { onChangeOneFieldForm(PatientProfileModelProperty.patientDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`) }}
                    value={new Date()}
                    // parseDateFromString={()}'
                    maxDate={new Date()}
                />
            </div>
            <div className="update-health-field">
                <TextField
                    label='Chiều cao của bạn? (cm)'
                    placeholder='--'
                    type='number'
                // value={currentPatientProfile.patientPhoneNumber}
                // onChange={(_, value) => { onChangeOneFieldForm(PatientProfileModelProperty.patientPhoneNumber, value) }}
                // errorMessage={errorMessageFormString.patientPhoneNumber}
                />
            </div>
            <div className="update-health-field">
                <TextField
                    label='Cân nặng của bạn? (kg)'
                    placeholder='--'
                    type='number'
                // value={currentPatientProfile.patientPhoneNumber}
                // onChange={(_, value) => { onChangeOneFieldForm(PatientProfileModelProperty.patientPhoneNumber, value) }}
                // errorMessage={errorMessageFormString.patientPhoneNumber}
                />
            </div>
            <div className="update-health-field">
                <Label>Mục tiêu</Label>

                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="female"
                    name="radio-buttons-group"
                    value={''}
                    // onChange={handleChange}
                >
                    <FormControlLabel value="reduce" control={<Radio />} label="Giảm cân" />
                    <FormControlLabel value="hold" control={<Radio />} label="Giữ cân" />
                    <FormControlLabel value="increase" control={<Radio />} label="Tăng cân" />
                </RadioGroup>
            </div>
        </div>)
    }

    const renderHeartBeatForm = () => {
        return (<div className='update-health-form'>
            <div className="update-health-field">
                <DatePicker
                    placeholder="Chọn một giá trị"
                    ariaLabel="Chọn một giá trị"
                    label='Ngày sinh'
                    isRequired={true}
                    // strings={defaultDatePickerStrings}
                    // onSelectDate={(date) => { onChangeOneFieldForm(PatientProfileModelProperty.patientDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`) }}
                    value={new Date()}
                    // parseDateFromString={()}'
                    maxDate={new Date()}
                />
                <div className="update-health-note">
                    Lưu ý: hồ sơ của bạn sẽ được cập nhật dựa trên thông tin này
                </div>
            </div>
            <div className="update-health-field">
                <Label style={{marginBottom: '40px'}}>Nhịp tim khi nghỉ ngơi của bạn (bpm)</Label>
                <Slider
                    defaultValue={60}
                    aria-label="Default"
                    valueLabelDisplay="on"
                    min={40}
                    max={200}
                />
            </div>
            <div className="update-health-field">
                <Label>Chọn cường độ hoạt động của bạn</Label>
                <div className="activity-wrap">
                    <div className={intensity === UserHealthActivityIntensity.Little ? "activity-item activity-item-active" : "activity-item"} onClick={()=>{chooseIntensity(UserHealthActivityIntensity.Little)}}>
                        <AccessibilityNewIcon sx={{ fontSize: '40px' }}/>
                    </div>
                    <div className={intensity === UserHealthActivityIntensity.Medium ? "activity-item activity-item-active" : "activity-item"} onClick={() => { chooseIntensity(UserHealthActivityIntensity.Medium) }}>
                        <NordicWalkingIcon sx={{ fontSize: '40px' }} />
                    </div>
                    <div className={intensity === UserHealthActivityIntensity.Midding ? "activity-item activity-item-active" : "activity-item"} onClick={() => { chooseIntensity(UserHealthActivityIntensity.Midding) }}>
                        <SportsGymnasticsIcon sx={{ fontSize: '40px' }} />
                    </div>
                    <div className={intensity === UserHealthActivityIntensity.Many ? "activity-item activity-item-active" : "activity-item"} onClick={() => { chooseIntensity(UserHealthActivityIntensity.Many) }}>
                        <DirectionsBikeIcon sx={{ fontSize: '40px' }} />
                    </div>
                    <div className={intensity === UserHealthActivityIntensity.Maximum ? "activity-item activity-item-active" : "activity-item"} onClick={() => { chooseIntensity(UserHealthActivityIntensity.Maximum) }}>
                        <PoolIcon sx={{ fontSize: '40px' }} />
                    </div>
                </div>
                <div className="activity-text">
                    {intensityText}
                </div>
            </div>
        </div>)
    }




    const [, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onSave = () => {
        // const canUpdate = validateFunction()
        // if (canUpdate) {
            let requestBody = {

            }
            const result = new Promise((resolve) => {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    showMessageBar("Cập nhật thông tin thành công", true, MessageBarStatus.Success)
                    resolve('success')
                }, 4000);
            }).then(() => {/*  */

            })

            return result
        // }
        // return new Promise((res) => { })
    }

    return (
        <DialogView
            title={titleForm}
            hidden={!isOpen}
            customContent={bodyForm}
            // closeWithPromise={this.onLogoutAction.bind(this)}
            // confirm={this.handlecClosePopup.bind(this)}
            confirmButtonText={props.type === MyHealthFormType.UpdateInfo ? 'Lưu' : 'Tính ngay'}
            confirmWithPromise={onSave}
            closeButtonText='Hủy bỏ'
            close={closeForm}
            loading={isLoading}
        />
    )
}

export default UpdateHealthForm