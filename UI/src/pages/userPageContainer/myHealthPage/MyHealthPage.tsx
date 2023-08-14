import React, {useState} from 'react'
import './MyHealthPage.scss'
import HeaderPage from '../../../structure/headerPage/HeaderPage'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {Button} from '@mui/material';
import BMI from '../../../base/image/BMI.png'
import BMR from '../../../base/image/BMR.png'
import heart from '../../../base/image/heartbeat.png'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {ButtonVariantType} from '../../../model/enum/buttonEnum';
import UpdateHealthForm from '../../../components/updateHealthForm/UpdateHealthForm';
import {MyHealthFormType} from '../../../model/enum/myHealthEnum';

function MyHealthPage() {
    const [openForm, setOpen] = useState<boolean>(false)
    const [formCurrent, setForm] = useState<MyHealthFormType>(MyHealthFormType.UpdateInfo)

    const openUpdate = (type: MyHealthFormType) => {
        setOpen(true)
        setForm(type)
    }

    const closeUpdate = () => {
        setOpen(false)
    }

    return (
        <div id='my-health' className='my-health'>
            <div className="myhealth-container">
                <HeaderPage icon={<FavoriteBorderIcon/>} text='Sức khỏe của tôi'/>
                <div className="health-info">
                    <Button sx={{borderRadius: '50%', width: '32px', height: '32px'}} onClick={() => {
                        openUpdate(MyHealthFormType.UpdateInfo)
                    }}>
                        <ModeEditIcon/>
                    </Button>
                    <div className="health-info-item">
                        <p className='health-info-text'>Tuổi</p>
                        <p className='health-info-text'>0 tuổi</p>
                    </div>
                    <div className="health-info-item">
                        <p className='health-info-text'>Chiều cao</p>
                        <p className='health-info-text'>-- cm</p>
                    </div>
                    <div className="health-info-item">
                        <p className='health-info-text'>Cân nặng</p>
                        <p className='health-info-text'>-- kg</p>
                    </div>
                    <div className="health-info-item">
                        <p className='health-info-text'>Hoạt động</p>
                        <p className='health-info-text'>--</p>
                    </div>
                </div>
                <div className="health-index">
                    <div className="health-index-wrap">
                        <div className="health-index-left">
                            <div className="index-title">
                                Tính chỉ số BMI
                            </div>
                            {true ? <div className="index-details">
                                <div className="index-detail-number">
                                    18.7
                                </div>
                                <div className="index-detail-unit">
                                    kg/m2
                                </div>
                            </div> : <div className='index-no-data'>Không có dữ liệu</div>}
                            {true ? <div className="index-update">
                                Cập nhật 29 ngày trước
                            </div> : <Button variant={ButtonVariantType.Text} onClick={() => {
                                openUpdate(MyHealthFormType.BMI)
                            }}>Tính</Button>}
                        </div>
                        <div className="health-index-right">
                            <div className="index-detail-button">
                                Chi tiết <KeyboardArrowRightIcon/>
                            </div>
                            <img src={BMI} alt=""/>
                        </div>
                    </div>
                    <div className="health-index-wrap">
                        <div className="health-index-left">
                            <div className="index-title">
                                Tính chỉ số BMR
                            </div>
                            {false ? <div className="index-details">
                                <div className="index-detail-number">
                                    18.7
                                </div>
                                <div className="index-detail-unit">
                                    kg/m2
                                </div>
                            </div> : <div className='index-no-data'>Không có dữ liệu</div>}
                            {false ? <div className="index-update">
                                Cập nhật 29 ngày trước
                            </div> : <Button variant={ButtonVariantType.Text} onClick={() => {
                                openUpdate(MyHealthFormType.BMR)
                            }}>Tính</Button>}
                        </div>
                        <div className="health-index-right">
                            <div className="index-detail-button">
                                Chi tiết <KeyboardArrowRightIcon/>
                            </div>
                            <img src={BMR} alt=""/>
                        </div>
                    </div>
                    <div className="health-index-wrap">
                        <div className="health-index-left">
                            <div className="index-title">
                                Tính chỉ số IHR
                            </div>
                            {false ? <div className="index-details">
                                <div className="index-detail-number">
                                    18.7
                                </div>
                                <div className="index-detail-unit">
                                    kg/m2
                                </div>
                            </div> : <div className='index-no-data'>Không có dữ liệu</div>}
                            {false ? <div className="index-update">
                                Cập nhật 29 ngày trước
                            </div> : <Button variant={ButtonVariantType.Text} onClick={() => {
                                openUpdate(MyHealthFormType.HeartBeat)
                            }}>Tính</Button>}
                        </div>
                        <div className="health-index-right">
                            <div className="index-detail-button">
                                Chi tiết <KeyboardArrowRightIcon/>
                            </div>
                            <img src={heart} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <UpdateHealthForm openForm={openForm} closeForm={closeUpdate} type={formCurrent}/>
        </div>
    )
}

export default MyHealthPage