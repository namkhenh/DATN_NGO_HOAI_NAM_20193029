import React, {useEffect, useState} from 'react'
import './PaidDetailManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { Backdrop, CircularProgress } from '@mui/material';
import {SearchBoxView} from '../../../common/searchBox/SearchBox'
import {Dropdown} from '../../../common/dropdown/DropDown'
import {Label} from '@fluentui/react'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import {TextField} from '../../../common/textField/TextField'
import TablePager from '../../../common/tablePager/TablePager'
import {ServiceListTableColumns, ServiceListTableDatas, TableType, UserGender} from '../../../model/enum/tableTypeEnum'
import PatientListCommandBar from '../patientListPage/PatientListCommandBar'
import {useStateValue} from '../../../context/StateProvider'
import {MessageBarStatus} from '../../../model/enum/messageBarEnum'
import {actionType} from '../../../context/Reducer'
import DialogView from '../../../common/dialog/Dialog'
import { PatientRecordService, PaymentService } from '../../../api/apiPage/apiPage'
import { useParams } from 'react-router-dom'

export enum PaidStatus {
    Paid,
    UnPaid
}

function PaidDetailManagerPage() {
    const patientRecordId = useParams().id
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [patientName, setPatientName] = useState<string>('')
    const [patientSex, setPatientSex] = useState<number>()
    const [patientCode, setPatientCode] = useState<string>('')
    const [patientPhone, setPatientPhone] = useState<string>('')
    const [patientDateOfBirth, setPatientDateOfBirth] = useState<string>('')
    const [patientAddress, setPatientAddress] = useState<string>('')
    const [profileCode, setprofileCode] = useState<string>('')
    const [profileDate, setprofileDate] = useState<string>('')
    const [totalCost, setTotalCost] = useState<number>(0)
    const [paymentCost, setPaymetCost] = useState<number>(0)
    const [paymentCostForm, setPaymetCostForm] = useState<number>(0)
    const [rows, setRow] = useState<ServiceListTableColumns[]>([])
    const [paymentRows, setPaymentRow] = useState<ServiceListTableColumns[]>([])
    const [datas, setData] = useState<ServiceListTableDatas[]>([])
    const [paymentDatas, setPaymentData] = useState<ServiceListTableDatas[]>([])
    const [{selection}, dispatch] = useStateValue()
    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.PaidContentTable}
                showPayService={() => { setShowDialog (true)}}
            />
        ])
    }

    useEffect(() => {
        if (showDialog) {
            let paymentCost: number = 0
            !!selection.selectedItems.length && selection.selectedItems.forEach((item: any) => {
                paymentCost += item.serviceCost
            })
            setPaymetCostForm(paymentCost)
        }
    }, [showDialog])

    useEffect(() => {
        let totalCost = 0
        let paymentCost = 0
        setRow(datas.map((e: ServiceListTableDatas) => {
            e.patientPaid && (paymentCost += e.serviceCost || 0)
            totalCost += e.serviceCost || 0
            return {
                serviceCode: e.serviceCode,
                serviceName: e.serviceName,
                designatedRoom: e.designatedRoom,
                designatedDoctor: e.designatedDoctor,
                serviceCost: e.serviceCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                patientPaid: e.patientPaid ? e.serviceCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0',
            }
        }))
        setPaymentRow(paymentDatas.map((e: ServiceListTableDatas) => {
            e.patientPaid && (paymentCost += e.serviceCost || 0)
            totalCost += e.serviceCost || 0
            return {
                serviceCode: e.serviceCode,
                serviceName: e.serviceName,
                designatedRoom: e.designatedRoom,
                designatedDoctor: e.designatedDoctor,
                serviceCost: e.serviceCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                patientPaid: e.patientPaid ? e.serviceCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0',
            }
        }))
        setTotalCost(totalCost)
        setPaymetCost(paymentCost)
    }, [datas, paymentDatas])

    // useEffect(() => {
    //     let totalCost = 0
    //     let paymentCost = 0
    //     setPaymentRow(paymentDatas.map((e: ServiceListTableDatas) => {
    //         e.patientPaid && (paymentCost += e.serviceCost || 0)
    //         totalCost += e.serviceCost || 0
    //         return {
    //             serviceCode: e.serviceCode,
    //             serviceName: e.serviceName,
    //             designatedRoom: e.designatedRoom,
    //             designatedDoctor: e.designatedDoctor,
    //             serviceCost: e.serviceCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    //             patientPaid: e.patientPaid ? e.serviceCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0',
    //         }
    //     }))
    //     setTotalCost(totalCost)
    //     setPaymetCost(paymentCost)
    // }, [paymentDatas])

    const getPatientRecord = () => {
        if (!!patientRecordId) {
            setLoading(true)
            PatientRecordService.getDetailPatientRecord(patientRecordId).then(res => {
                setLoading(false)
                if (res.success && !!res.data) {
                    setPatientName(res.data?.user?.fullName)
                    setPatientSex(res.data?.user?.sex)
                    setPatientCode(res.data?.user?.code)
                    setPatientPhone(res.data?.user?.phoneNumber)
                    setPatientDateOfBirth(`${new Date(res.data?.user?.dateOfBirth).getDate()}/${new Date(res.data?.user?.dateOfBirth).getMonth()}/${new Date(res.data?.user?.dateOfBirth).getFullYear()}`)
                    setPatientAddress(`${res.data?.user?.adress || ''}, ${res.data?.user?.ward?.name || ''}, ${res.data?.user?.district?.name || ''}, ${res.data?.user?.province?.name || ''}`)
                    setprofileCode(res.data?.code)
                    setprofileDate(`${new Date(res.data?.createdDate).getDate()}/${new Date(res.data?.createdDate).getMonth()}/${new Date(res.data?.createdDate).getFullYear()} -- ${new Date(res.data?.createdDate).getHours()}h/${new Date(res.data?.createdDate).getMinutes()}`)

                    !!res.data?.service && setData(res.data?.service.filter((e: any) => !e.paymentStatus).map((e: any) => {
                        return {
                            serviceId: e.id,
                            serviceCode: e.code,
                            serviceName: e.name,
                            designatedRoom: e.department?.name,
                            designatedDoctor: e.department?.user?.fullName,
                            patientPaid: e.paymentStatus,
                            serviceCost: e.amountOfMoney,
                            patientRecordServiceId: e.patientRecordServiceId
                        }
                    }))

                    !!res.data?.service && setPaymentData(res.data?.service.filter((e: any) => e.paymentStatus).map((e: any) => {
                        return {
                            serviceId: e.id,
                            serviceCode: e.code,
                            serviceName: e.name,
                            designatedRoom: e.department?.name,
                            designatedDoctor: e.department?.user?.fullName,
                            patientPaid: e.paymentStatus,
                            serviceCost: e.amountOfMoney,
                            patientRecordServiceId: e.patientRecordServiceId
                        }
                    }))
                } else {
                    showMessageBar(`Đã xảy ra lỗi!`, true, MessageBarStatus.Success)
                }
            })
        }
    }
    
    useEffect(() => {
        getPatientRecord()
    }, [])

    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onSave = () => {
        let listServiceId: string[] = []
        !!selection.selectedItems.length && selection.selectedItems.forEach((element: ServiceListTableDatas) => {
            listServiceId.push(element.serviceId)
        });
        let requestBody = {
            key: patientRecordId,
            value: listServiceId 
        }
        const result = PaymentService.createPayment(requestBody).then(res => {
            if (res.success) {
                setShowDialog(false)
                setPaymetCostForm(0)
                showMessageBar('Thanh toán thành công!', true, MessageBarStatus.Success)
                getPatientRecord()
            } else {
                setShowDialog(false)
                setPaymetCostForm(0)
                showMessageBar('Thanh toán không thành công!', true, MessageBarStatus.Error)
            }
        })
        return result
    }

    return (
        <div className='paiddetail-page'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="paiddetail-page-container">
                <BreadCrumb
                    breadcrumbItem={[
                        { key: 1, text: 'Thanh toán ngoại trú', href: '/admin/thanh-toan-ngoai-tru' },
                        { key: 2, text: 'Chi tiết', href: '/admin/thanh-toan-ngoai-tru/chi-tiet-thanh-toan' },
                    ]}
                />
                <div className="paiddetail-page-header">
                    <div className="page-header-left">
                        <div className="page-patient-name">
                            {patientName}
                        </div>
                        <div className="page-patient-gender">
                            {patientSex === UserGender.Female ? 'Nữ' : 'Nam'}
                        </div>
                    </div>
                    <div className="page-header-center">
                        <div className="search-id">
                            <SearchBoxView
                                placeholder='Mã bệnh nhân/ Số điện thoại/ CMND'
                                onSearch={() => { }}
                            />
                        </div>
                        <div className="page-profile-paid">
                            <Label>Trạng thái</Label>
                            <div className="page-profile-paid-status">
                                <Dropdown
                                    placeholder=""
                                    options={[]}
                                // selectedKey={userAddress.province?.key}
                                // required
                                // onChange={(_, selected) => {
                                //     onChangeAddress(UserAddressModelProperty.province, selected)
                                // }}
                                // errorMessage={errorMessageString.userAddress.province}
                                // onFocus={this.getProvinceOptions.bind(this)}
                                />
                            </div>
                        </div>

                    </div>
                    {/* <div className="page-header-right">
                        <Button variant={ButtonVariantType.Contained} sx={{ textTransform: 'none' }} >Thanh toán</Button>
                    </div> */}
                </div>
                <div className="paiddetail-page-info">
                    <div className="page-info-item">
                        Mã bệnh nhân: {patientCode}
                    </div>
                    <div className="page-info-item">
                        Ngày sinh: {patientDateOfBirth}
                    </div>
                    <div className="page-info-item">
                        Thời gian tiếp nhận: {profileDate}
                    </div>
                    <div className="page-info-item">
                        Mã hồ sơ: {profileCode}
                    </div>
                    <div className="page-info-item">
                        Số điện thoại: {patientPhone}
                    </div>
                    <div className="page-info-item">
                        Địa chỉ: {patientAddress}
                    </div>
                </div>
                <div className="paiddetail-sub-title">
                    Thông tin thanh toán
                </div>
                <div className="paiddetail-page-info">
                    <div className="page-info-item">
                        <Dropdown
                            placeholder="--"
                            label='Hình thức thanh toán'
                            options={[]}
                            required
                        // selectedKey={userAddress.province?.key}
                        // required
                        // onChange={(_, selected) => {
                        //     onChangeAddress(UserAddressModelProperty.province, selected)
                        // }}
                        // errorMessage={errorMessageString.userAddress.province}
                        // onFocus={this.getProvinceOptions.bind(this)}
                        />
                    </div>
                    <div className="page-info-item">
                        <TextField
                            label='Số tiền'
                            required
                            readOnly
                        />
                    </div>
                    <div className="page-info-item">
                        <TextField
                            label='Ghi chú'
                            
                        />
                    </div>
                </div>
                <div className="paiddetail-page-cost">
                    <div className="page-cost-wrap">
                        <AttachMoneyOutlinedIcon />
                        <div className="page-cost-detail">
                            <div className='cost-detail'>{totalCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                            <div className='cost-text'>Tổng chi phí</div>
                        </div>
                    </div>
                    <div className="page-cost-wrap">
                        <PointOfSaleOutlinedIcon />
                        <div className="page-cost-detail">
                            <div className='cost-detail'>{paymentCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                            <div className='cost-text'>Tiền thu</div>
                        </div>
                    </div>
                </div>
                <div className="paiddetail-sub-title">
                    Nội dung cần thanh toán
                </div>
                <div className="paiddetail-list-wrap" style={{ marginBottom: '48px' }}>
                    <TablePager<ServiceListTableColumns, ServiceListTableDatas>
                        tableType={TableType.PaidContentTable}
                        batchActionElements={onRenderActionButtons()}
                        rowData={rows}
                        dataTotal={datas}
                        hasCheckBox
                        page={currentPage}
                        handleChangePage={(page) => { setCurrentPage(page) }}
                        total={15}
                        hasNavigate={false}
                        className='service-table'
                        hasTablePaging={false}
                        isLoading={false}
                    />
                </div>
                <div className="paiddetail-sub-title">
                    Nội dung đã thanh toán
                </div>
                <div className="paiddetail-list-wrap">
                    <TablePager<ServiceListTableColumns, ServiceListTableDatas>
                        tableType={TableType.PaidContentTable}
                        rowData={paymentRows}
                        dataTotal={paymentDatas}
                        hasCheckBox={false}
                        page={currentPage}
                        handleChangePage={(page) => { setCurrentPage(page) }}
                        total={15}
                        hasNavigate={false}
                        className='service-table'
                        hasTablePaging={false}
                        isLoading={false}
                    />
                </div>
                <DialogView
                    title={'Xác nhận thanh toán'}
                    hidden={!showDialog}
                    message={`Bệnh nhân đã thanh toán ${paymentCostForm.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }`}
                    // closeWithPromise={this.onLogoutAction.bind(this)}
                    // confirm={this.handlecClosePopup.bind(this)}
                    confirmButtonText={'Xác nhận'}
                    confirmWithPromise={onSave}
                    closeButtonText='Quay lại'
                    close={() => {
                        setShowDialog(false)
                        setPaymetCostForm(0)
                    }}
                    loading={loadingButton}
                />
            </div>
        </div>
    )
}

export default PaidDetailManagerPage