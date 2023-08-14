import React, {useState} from 'react'
import './HealthCareDetail.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import Button from '@mui/material/Button'
import {ButtonVariantType} from '../../../model/enum/buttonEnum'
import {SearchBoxView} from '../../../common/searchBox/SearchBox'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import HealthInfoPage from './healthInfoPage/HealthInfoPage'
import MedicineInfoPage from './medicineInfoPage/MedicineInfoPage'

export enum HealthCareTab {
    HealthInfo = '0',
    MedicineInfo = '1',
}

function HealthCareDetail() {
    const [tabValue, setTabValue] = useState<string>(HealthCareTab.HealthInfo)
    return (
        <div className='healthdetail-page'>
            <div className="healthdetail-page-container">
                <BreadCrumb
                    breadcrumbItem={[
                        { key: 1, text: 'KCB ngoại trú', href: '/admin/kham-chua-benh' },
                        { key: 2, text: 'Khám chữa bệnh', href: '/admin/chi-tiet-kham-benh' },
                    ]}
                />
                <div className="healthdetail-page-header">
                    <div className="page-room-name">
                        Khám Nhi - Phòng khám bệnh 1
                    </div>
                    <div className="page-header-right">
                        <Button variant={ButtonVariantType.Contained} sx={{ textTransform: 'none' }} >Tiếp nhận</Button>
                        <Button variant={ButtonVariantType.Contained} sx={{ textTransform: 'none' }} >Chuyển phòng</Button>
                        <Button variant={ButtonVariantType.Contained} sx={{ textTransform: 'none' }} >Lịch sử khám</Button>
                        <Button variant={ButtonVariantType.Contained} sx={{ textTransform: 'none' }} >Hành trình khám</Button>
                    </div>
                </div>
                <div className="search-id">
                    <SearchBoxView
                        placeholder='Nhập tên/ Mã BN/ Mã HS'
                        onSearch={() => { }}
                    />
                </div>
                <div className="healthdetail-page-info">
                    <div className="page-info-item">
                        <div className="page-patient-name">
                            Ngô Hoài Nam
                        </div>
                        <div className="page-patient-gender">
                            Nam
                        </div>
                    </div>
                    <div className="page-info-item">
                        <div className="item-title">
                            Mã người bệnh: 
                        </div>
                        <div className="item-content">
                            BN12345
                        </div>
                    </div>
                    <div className="page-info-item">
                        <div className="item-title">
                            Mã hồ sơ:
                        </div>
                        <div className="item-content">
                            HS12345
                        </div>
                    </div>
                    <div className="page-info-item">
                        <div className="item-title">
                            Trạng thái:
                        </div>
                        <div className="item-content" style={{ backgroundColor: '#e9baff'}}>
                            Chờ khám
                        </div>
                    </div>
                </div>
                <div className="healthdetail-page-cost">
                    <div className="page-cost-wrap">
                        <AttachMoneyOutlinedIcon />
                        <div className="page-cost-detail">
                            <div className='cost-detail'>34.500</div>
                            <div className='cost-text'>Tổng chi phí</div>
                        </div>
                    </div>
                    <div className="page-cost-wrap">
                        <PointOfSaleOutlinedIcon />
                        <div className="page-cost-detail">
                            <div className='cost-detail'>0</div>
                            <div className='cost-text'>Tiền thu</div>
                        </div>
                    </div>
                </div>
                <div className="page-edit-container">
                    <TabContext value={tabValue}>
                        <TabList onChange={(event: React.SyntheticEvent, newValue: string) => {
                            setTabValue(newValue)
                        }} aria-label="lab API tabs example">
                            <Tab label="Thông tin khám" value={HealthCareTab.HealthInfo} />
                            <Tab label="Thông tin thuốc" value={HealthCareTab.MedicineInfo} />
                        </TabList>
                        <TabPanel value={HealthCareTab.HealthInfo}><HealthInfoPage/></TabPanel>
                        <TabPanel value={HealthCareTab.MedicineInfo}><MedicineInfoPage/></TabPanel>
                    </TabContext>
                </div>
            </div>
        </div>
    )
}

export default HealthCareDetail