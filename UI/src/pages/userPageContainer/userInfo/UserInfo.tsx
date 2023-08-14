import React, { useEffect, useState } from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import ChurchOutlinedIcon from '@mui/icons-material/ChurchOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import './UserInfo.scss'
import Tooltip from '@mui/material/Tooltip';
import { ButtonVariantType } from '../../../model/enum/buttonEnum';
import { IUserAddress, IUserInfoViewModel, UserInfoDefaultView, UserInfoDetailTabType } from '../../../model/apimodel/userInfo';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserMainInfo from '../userInfoEdit/userMainInfo/UserMainInfo';
import UserOtherInfo from '../userInfoEdit/userOtherInfo/UserOtherInfo';
import HeaderPage from '../../../structure/headerPage/HeaderPage';
import { useStateValue } from '../../../context/StateProvider';
import { UserService } from '../../../api/apiPage/apiPage';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { MessageBarStatus } from '../../../model/enum/messageBarEnum';
import { actionType } from '../../../context/Reducer';

export function UserInfo() {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [{ auth }, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }
    const [userInfo, setUserInfo] = useState<IUserInfoViewModel>(UserInfoDefaultView)
    const [tabValue, setTabValue] = useState<string>(UserInfoDetailTabType.MainInfo)
    const [updateSuccess, setUpdate] = useState<boolean>(false)
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
                        address: res.data?.adress,
                        religion: res.data?.religion,
                        guardianName: res.data?.guardiasName,
                        guardianPhone: res.data?.guardiansPhoneNumber,
                        guardianRelation: res.data?.relationship,
                        roles: res.data?.roles,
                    })
                } else {
                    setLoading(false)
                    showMessageBar(`Đã có lỗi xảy ra! \n ${res?.message ? res?.message : ''}`, true, MessageBarStatus.Error)
                }
            })
        }
    }, [updateSuccess])


    const convertAddressToString = (inputAddress: IUserAddress) => {
        const addressString = inputAddress.address ? inputAddress.address + ', ' : ""
        const outputAddress: string = addressString + (!!inputAddress.commune?.name ? inputAddress.commune?.name : '') + ', ' + (!!inputAddress.district?.name ? inputAddress.district?.name : '') + ', ' + (!!inputAddress.province?.name ? inputAddress.province?.name : '')
        return outputAddress
    }

    return (
        <div id='user-info' className='user-info'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <HeaderPage icon={<AccountCircleOutlinedIcon />} text='Hồ sơ' />
            <div className="page-info-container">
                <div className="info-avatar">
                    {false ?
                        <div className="info-avatar-wrap">
                            <Avatar variant="rounded" alt={userInfo?.userName} src={userInfo?.fullName}
                                sx={{ width: '132px', height: '132px' }} />
                            <IconButton aria-label="upload picture" component="label" className='update-button'>
                                <input hidden accept="image/*" type="file" />
                                <PhotoCameraIcon sx={{ fontSize: '20px' }} />
                            </IconButton>
                        </div>
                        :
                        <Button variant={ButtonVariantType.Contained} component="label" className='upload-button'>
                            Tải ảnh lên
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>}
                </div>
                <div className="info-wrap">
                    <div className="info-header">
                        <div className="user-name-sex">
                            <div className="user-name">{userInfo?.fullName ? userInfo?.fullName : "Chưa có tên"}</div>
                            {userInfo?.sex === 0 ?
                                <div className="user-sex">
                                    <MaleIcon sx={{ marginRight: '4px' }} /> Nam
                                </div> :
                                <div className="user-sex">
                                    <FemaleIcon sx={{ marginRight: '4px' }} /> Nữ
                                </div>}
                        </div>
                        {/* <div className="user-national">
                                <img src={userNational.flag} alt=""/>
                                {userNational.name}
                            </div> */}
                    </div>
                    <div className="info-body">
                        <div className="info-body-wrap">
                            <div className="user-info-item">
                                <CakeOutlinedIcon sx={{ width: '20px', marginRight: '10px' }} />
                                <span>Ngày sinh:</span>
                                <div
                                    className='item-detail'>{!!userInfo.dateOfBirth ? `${new Date(userInfo?.dateOfBirth).getDate()}/${new Date(userInfo?.dateOfBirth).getMonth() + 1}/${new Date(userInfo?.dateOfBirth).getFullYear()}` : ''}
                                </div>
                            </div>
                            <div className="user-info-item">
                                <PhoneOutlinedIcon sx={{ width: '20px', marginRight: '10px' }} />
                                <span>Số điện thoại:</span>
                                <div className='item-detail'>{userInfo?.phoneNumber}</div>
                            </div>
                            <div className="user-info-item">
                                <CreditCardOutlinedIcon sx={{ width: '20px', marginRight: '10px' }} />
                                <span>CMND/ CCCD:</span>
                                <div className='item-detail'>{userInfo?.cmnd}</div>
                            </div>
                            <div className="user-info-item">
                                <PlaceOutlinedIcon sx={{ width: '20px', marginRight: '10px' }} />
                                <span>Địa chỉ:</span>
                                <Tooltip
                                    title={convertAddressToString(
                                        {
                                            province: userInfo.province,
                                            district: userInfo.district,
                                            commune: userInfo.ward,
                                            address: userInfo.address
                                        })} placement="top-start">
                                    <div className='item-detail'>{convertAddressToString(
                                        {
                                            province: userInfo.province,
                                            district: userInfo.district,
                                            commune: userInfo.ward,
                                            address: userInfo.address
                                        })}</div>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="info-body-wrap">
                            <div className="user-info-item">
                                <MedicalInformationOutlinedIcon sx={{ width: '20px', marginRight: '10px' }} />
                                <span>Thẻ BHYT:</span>
                                <div className='item-detail'>{ }</div>
                            </div>
                            {/* <div className="user-info-item">
                                    <PersonPinOutlinedIcon sx={{ width: '20px', marginRight: '10px'}}/>
                                    <span>Dân tộc:</span>
                                    <div className='item-detail'>{userEthnic.name}</div>
                                </div> */}
                            <div className="user-info-item">
                                <MedicalInformationOutlinedIcon sx={{ width: '20px', marginRight: '10px' }} />
                                <span>Thời hạn:</span>
                                <div className='item-detail'>{ }</div>
                            </div>
                            <div className="user-info-item">
                                <ChurchOutlinedIcon sx={{ width: '20px', marginRight: '10px' }} />
                                <span>Tôn giáo:</span>
                                <div className='item-detail'>{ }</div>
                            </div>
                            <div className="user-info-item">
                                <WorkOutlineOutlinedIcon sx={{ width: '20px', marginRight: '10px' }} />
                                <span>Nghề nghiệp:</span>
                                <div className='item-detail'>{ }</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-edit-container">
                <TabContext value={tabValue}>
                    <TabList onChange={(event: React.SyntheticEvent, newValue: string) => {
                        setTabValue(newValue)
                    }} aria-label="lab API tabs example">
                        <Tab label="Thông tin chính" value={UserInfoDetailTabType.MainInfo} />
                        <Tab label="Thông tin khác" value={UserInfoDetailTabType.OtherInfo} />
                    </TabList>
                    <TabPanel value={UserInfoDetailTabType.MainInfo}><UserMainInfo
                        userMainInfo={userInfo} update={() => setUpdate(!updateSuccess)}></UserMainInfo></TabPanel>
                    <TabPanel value={UserInfoDetailTabType.OtherInfo}><UserOtherInfo
                        userOtherInfo={userInfo} update={() => setUpdate(!updateSuccess)}></UserOtherInfo></TabPanel>
                </TabContext>
            </div>
        </div>
    );
}
