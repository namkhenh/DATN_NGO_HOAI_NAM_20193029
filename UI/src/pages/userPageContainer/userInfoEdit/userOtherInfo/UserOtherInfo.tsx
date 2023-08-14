import React, {useEffect, useState} from 'react';
// import {TextField} from '../../../common/textField/TextField';
import './UserOtherInfo.scss'
import {IUserInfoViewModel, UserInfoModelProperty} from '../../../../model/apimodel/userInfo';
import {initializeIcons} from '@fluentui/font-icons-mdl2';
import {TextField} from '../../../../common/textField/TextField';
import {Dropdown} from '../../../../common/dropdown/DropDown';
import {DatePicker} from '../../../../common/datePicker/DatePicker';
import {IDropdownOption} from '@fluentui/react/lib/Dropdown';
import Skeleton from '@mui/material/Skeleton';
import SubmitButton from '../../../../common/button/SubmitButton';
import {ButtonVariantType, LoadingPosition} from '../../../../model/enum/buttonEnum';
import {MessageBarStatus} from '../../../../model/enum/messageBarEnum';
import {isStringEmpty, validateNumberField, validateRequireLimitCharacter} from '../../../../utils/commonFunction';
import {useStateValue} from '../../../../context/StateProvider';
import {actionType} from '../../../../context/Reducer';

initializeIcons();

interface IUserOtherInfoState {
    userOtherInfo: IUserInfoViewModel;
    errorMessageString: IUserOtherInfoErrorMessage;
    countriesOptions: IDropdownOption[]
    ethnicOptions: IDropdownOption[]
    loadingButton: boolean
    showMessage: boolean
}

interface IUserOtherInfoProps {
    userOtherInfo: IUserInfoViewModel
    update: () => void
}

interface IUserOtherInfoErrorMessage {
    userInsuranceNumber: string;
    userNational: string;
    userEthnic: string;
    userReligion: string;
    userJob: string;
}

function UserOtherInfo(props: IUserOtherInfoProps) {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [state, setState] = useState<IUserOtherInfoState>({
        userOtherInfo: {
            id: props.userOtherInfo?.id,
            code: props.userOtherInfo?.code,
            userName: props.userOtherInfo?.userName,
            status: props.userOtherInfo?.status,
            phoneNumber: props.userOtherInfo?.phoneNumber,
            fullName: props.userOtherInfo?.fullName,
            email: props.userOtherInfo?.email,
            cmnd: props.userOtherInfo?.cmnd,
            dateOfBirth: props.userOtherInfo?.dateOfBirth,
            sex: props.userOtherInfo?.sex,
            provinceId: props.userOtherInfo?.provinceId,
            districtId: props.userOtherInfo?.districtId,
            wardId: props.userOtherInfo?.wardId,
            province: props.userOtherInfo?.province,
            district: props.userOtherInfo?.district,
            ward: props.userOtherInfo?.ward,
            address: props.userOtherInfo?.address,
            religion: props.userOtherInfo?.religion,
            guardianName: '',
            guardianPhone: '',
            guardianRelation: 0,  
            roles: props.userOtherInfo?.roles,
        },
        errorMessageString: {
            userInsuranceNumber: '',
            userNational: '',
            userEthnic: '',
            userReligion: '',
            userJob: '',
        },
        countriesOptions: [{key: -1, text: 'Vui lòng đợi...', disabled: true}],
        ethnicOptions: [{key: -1, text: 'Vui lòng đợi...', disabled: true}],
        loadingButton: false,
        showMessage: false
    });

    useEffect(() => {
        setLoading(true)
        getCountriesOptions().then((res) => {
            if (res) {
                setState({
                    ...state,
                    countriesOptions: res,
                })
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [])


    const getCountriesOptions = async () => {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags', {
            method: "GET",
        }).then((res) => res.json());
        let countriesOptions: IDropdownOption[] = []
        response.forEach((item: any) => {
            countriesOptions.push({
                key: item.flags.png,
                text: item.name.common
            })
        });
        return countriesOptions.sort((a, b) => a.text.localeCompare(b.text))
    }

    // const onChangeOneField = (key: keyof IUserInfoViewModel, value: any) => {
    //     setState({
    //         ...state,
    //         userOtherInfo: {
    //             ...state.userOtherInfo,
    //             [key]: value
    //         },
    //         errorMessageString: {
    //             ...state.errorMessageString,
    //             [key]: validateField(key, value)
    //         }
    //     })
    // }

    // const validateField = (key: keyof IUserInfoViewModel, value: any) => {
    //     switch (key) {
    //         case UserInfoModelProperty.:
    //         case UserInfoModelProperty.userJob:
    //             return validateRequireLimitCharacter(value)
    //         case UserInfoModelProperty.userInsuranceNumber:
    //             return validateNumberField(value, 10)
    //         default:
    //     }
    // }

    const validateFunction = () => {
        let passedVerify = true;
        // let tempNameError = validateRequireLimitCharacter(state.userOtherInfo.userName)
        // let tempDescriptionError = validateMaxLength(currentItem.description);
        // let tempTenantError = validateRequire(currentItem.tenant!.id);
        passedVerify = isStringEmpty(state.errorMessageString.userJob) && isStringEmpty(state.errorMessageString.userInsuranceNumber) && isStringEmpty(state.errorMessageString.userReligion)

        // setState({
        //     ...state,
        //     errorMessageString: {
        //         ...state.errorMessageString,
        //     }
        // })
        return passedVerify
    }

    const [, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({type: actionType.SET_MESSAGE_BAR, messageBar: {isOpen: isOpen, text: message, status: status}})
    }

    const handleUpdateInfo = () => {
        const canUpdate = validateFunction()
        if (canUpdate) {
            let requestBody = {}
            const result = new Promise((resolve) => {
                setState({...state, loadingButton: true})
                setTimeout(() => {
                    setState({...state, loadingButton: false, showMessage: true})
                    showMessageBar("Cập nhật thông tin thành công", true, MessageBarStatus.Success)
                    resolve('success')
                }, 4000);
            }).then(() => {/*  */

            })

            return result
        }
        return new Promise((res) => {
        })
    }

    const {userOtherInfo, countriesOptions, loadingButton, errorMessageString} = state

    return (
        <div className="user-main">
            {isLoading ?
                <div className="user-main-container" style={{display: 'flex', flexWrap: 'wrap'}}>
                    {Array.from({length: 3}).map((item, index) => (
                        <>
                            <Skeleton variant="rounded" width={300} height={72}
                                      style={{opacity: 1 - 0.15 * index}}/>
                            <Skeleton variant="rounded" width={300} height={72}
                                      style={{opacity: 1 - 0.15 * index}}/>
                        </>
                    ))}
                </div> :
                <div className='user-main-container'>
                    <div className="user-main-detail">
                        <TextField
                            label='Sổ thẻ BHYT'
                            placeholder='--'
                            // value={userOtherInfo.userInsuranceNumber}
                            onChange={(_, value) => {
                                // onChangeOneField(UserInfoModelProperty.userInsuranceNumber, value)
                            }}
                            errorMessage={errorMessageString.userInsuranceNumber}
                        />
                    </div>
                    <div className="user-main-detail">
                        <Dropdown
                            placeholder="Chọn một giá trị"
                            label="Quốc tịch"
                            options={countriesOptions}
                            // selectedKey={userOtherInfo.userNational.flag}
                            onChange={(_, selected) => {
                                // onChangeOneField(UserInfoModelProperty.userNational, selected?.key)
                            }}
                            errorMessage={errorMessageString.userNational}
                        />
                    </div>
                    <div className="user-main-detail">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Select a date"
                            label='Thời hạn thẻ - Từ ngày'
                            // strings={defaultDatePickerStrings}
                            onSelectDate={(date) => {
                                // onChangeOneField(UserInfoModelProperty.userCardPeriodFrom, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`)
                            }}
                            // value={new Date(userOtherInfo.userCardPeriodFrom)}
                            // parseDateFromString={()}'
                            maxDate={new Date()}
                        />
                    </div>
                    <div className="user-main-detail">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Select a date"
                            label='Thời hạn thẻ - Đến ngày'
                            // strings={defaultDatePickerStrings}
                            onSelectDate={(date) => {
                                // onChangeOneField(UserInfoModelProperty.userCardPeriodTo, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`)
                            }}
                            // value={new Date(userOtherInfo.userCardPeriodTo)}
                            // parseDateFromString={()}'
                            // maxDate={new Date()}
                            // minDate={userOtherInfo.userCardPeriodFrom ? new Date(userOtherInfo.userCardPeriodFrom) : new Date()}

                        />
                    </div>
                    {/* <div className="user-main-detail">
                        <TextField
                            label='Dân tộc'
                            placeholder='--'
                            value={userOtherInfo.userPhoneNumber}
                            onChange={(_, value) => { onChangeOneField(UserInfoModelProperty.userPhoneNumber, value) }}
                            // errorMessage={errorMessageString.userPhoneNumber}
                        />
                    </div> */}
                    <div className="user-main-detail">
                        <TextField
                            label='Tôn giáo'
                            placeholder='--'
                            // value={userOtherInfo.userReligion}
                            onChange={(_, value) => {
                                // onChangeOneField(UserInfoModelProperty.userReligion, value)
                            }}
                            errorMessage={errorMessageString.userReligion}
                        />
                    </div>
                    <div className="user-main-detail">
                        <TextField
                            label='Nghề nghiệp'
                            placeholder='--'
                            // value={userOtherInfo.userJob}
                            onChange={(_, value) => {
                                // onChangeOneField(UserInfoModelProperty.userJob, value)
                            }}
                            errorMessage={errorMessageString.userJob}
                        />
                    </div>
                </div>
            }
            <div className="update-other-button">
                <SubmitButton
                    id={'common-dialog-default'}
                    text={'Cập nhật thông tin'}
                    buttonVariantType={ButtonVariantType.Contained}
                    promise={handleUpdateInfo}
                    loading={loadingButton}
                    loadingPosition={LoadingPosition.Center}
                />
            </div>
        </div>
    );
}

export default UserOtherInfo;