import React, {useEffect, useState} from 'react'
import './ProfileDetailPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Backdrop, Button, CircularProgress} from '@mui/material';
import {ButtonColorType, ButtonVariantType} from '../../../model/enum/buttonEnum';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import TablePager from '../../../common/tablePager/TablePager';
import {ServiceListTableColumns, ServiceListTableDatas, TableType, UserGender} from '../../../model/enum/tableTypeEnum';
import PatientListCommandBar from '../patientListPage/PatientListCommandBar';
import DialogView from '../../../common/dialog/Dialog';
import {useStateValue} from '../../../context/StateProvider';
import {SearchBoxView} from '../../../common/searchBox/SearchBox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExaminationSchedulePatientRecordService, MedicalExaminationService, PatientRecordService } from '../../../api/apiPage/apiPage';
import { useParams } from 'react-router-dom';
import { actionType } from '../../../context/Reducer';
import { MessageBarStatus } from '../../../model/enum/messageBarEnum';

function ProfileDetailPage() {
    const patientRecordId = useParams().id
    const [{ selection }, dispatch] = useStateValue();
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [rowsForm, setRowForm] = useState<ServiceListTableColumns[]>([createDataForm('','',0)])
    const [datasForm, setDataForm] = useState<ServiceListTableDatas[]>([{
        serviceId: '',
        serviceCode: '',
        serviceName: '',
        designatedRoom: '',
        designatedDoctor: '',
        serviceCost: 0,
        patientRecordServiceId: ''
    }])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rows, setRow] = useState<ServiceListTableColumns[]>([])
    const [datas, setData] = useState<ServiceListTableDatas[]>([])
    const [loadingForm, setLoadingForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [patientName, setPatientName] = useState<string>('')
    const [patientSex, setPatientSex] = useState<number>()
    const [patientCode, setPatientCode] = useState<string>('')
    const [patientPhone, setPatientPhone] = useState<string>('')
    const [patientIdentityNumber, setPatientIdentityNumber] = useState<string>('')
    const [patientDateOfBirth, setPatientDateOfBirth] = useState<string>('')
    const [patientAddress, setPatientAddress] = useState<string>('')
    const [profileCode, setprofileCode] = useState<string>('')
    const [profileReason, setprofileReason] = useState<string>('')
    const [profileDate, setprofileDate] = useState<string>('')
    const [profileEmergency, setProfileEmergency] = useState<boolean>()
    const [totalCost, setTotalCost] = useState<number>(0)
    const [paymentCost, setPaymetCost] = useState<number>(0)
    const onSearch = (newValue: string) => {
        console.log(newValue);

    }
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.ServiceInfoTable}
                showAddService={() => { setShowDialog(true) }}
            />
        ])
    }

    const onSave = () => {
        const filteredArray: ServiceListTableDatas[] = selection.selectedItems.filter((element: ServiceListTableDatas) => {
            return datas.every((data) => {
                return element.serviceCode !== data.serviceCode;
            });
        });
        // setData(datas.concat(filteredArray))
        let listServiceId: string[] = []
        filteredArray.forEach((element: ServiceListTableDatas) => {
            listServiceId.push(element.serviceId)
        });
        let requestBody = {
            key: patientRecordId,
            value: listServiceId
        }
        setLoadingButton(true)
        !!listServiceId && ExaminationSchedulePatientRecordService.createListSchedulePatientRecord(requestBody).then(res => {
            setLoadingButton(false)
            if (res.success) {
                showMessageBar('Chỉ định dịch vụ thành công!', true, MessageBarStatus.Success)
                setShowDialog(false)
                getPatientRecord()
            } else {
                showMessageBar('Chỉ định dịch vụ thành công!', true, MessageBarStatus.Success)
            }
        })
        return new Promise(res => {})
    }

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
                task: !e.patientPaid ? <IconButton aria-label="delete" size="small" onClick={() => { removeRole(e.patientRecordServiceId) }}>
                    <DeleteIcon color='error' />
                </IconButton> : <></>
            }
        }))
        setTotalCost(totalCost)
        setPaymetCost(paymentCost)
    }, [datas])
    
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
                    setPatientIdentityNumber(res.data?.user?.cmnd)
                    setPatientDateOfBirth(`${new Date(res.data?.user?.dateOfBirth).getDate()}/${new Date(res.data?.user?.dateOfBirth).getMonth()}/${new Date(res.data?.user?.dateOfBirth).getFullYear()}`)
                    setPatientAddress(`${res.data?.user?.adress || ''}, ${res.data?.user?.ward?.name || ''}, ${res.data?.user?.district?.name || ''}, ${res.data?.user?.province?.name || ''}`)
                    setprofileCode(res.data?.code)
                    setprofileReason(res.data?.medicalExaminationSchedule?.reason)
                    setprofileDate(`${new Date(res.data?.createdDate).getDate()}/${new Date(res.data?.createdDate).getMonth()}/${new Date(res.data?.createdDate).getFullYear()} -- ${new Date(res.data?.createdDate).getHours()}h/${new Date(res.data?.createdDate).getMinutes()}`)
                    setProfileEmergency(res.data?.emergency)

                    !!res.data?.service && setData(res.data?.service.map((e: any) => {
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

    const removeRole = (idDel: string) => {
        if (!!idDel) {
            ExaminationSchedulePatientRecordService.deleteSchedulePatientRecord(idDel).then(res => {
                if (res.success) {
                    showMessageBar('Loại bỏ dịch vụ thành công!', true, MessageBarStatus.Success)
                    getPatientRecord()
                } else {
                    showMessageBar('Loại bỏ dịch vụ thất bại!', true, MessageBarStatus.Error)
                }
            })
        }
    }

    function createDataForm(
        serviceCode: string,
        serviceName: string,
        serviceCostI: number,
    ): ServiceListTableColumns {
        let serviceCost: string = serviceCostI.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        return {
            serviceCode,
            serviceName,
            serviceCost,
        };
    }

    const getService = () => {
        setLoadingForm(true)
        MedicalExaminationService.getAllService().then(res => {
            setLoadingForm(false)
            let rows: ServiceListTableColumns[] = []
            let datas: ServiceListTableDatas[] = []
            !!res.data && res.data.forEach((element: any) => {
                rows.push(createDataForm(element?.code, element?.name, element?.amountOfMoney))
                datas.push({
                    serviceId: element?.id,
                    serviceCode: element?.code,
                    serviceName: element?.name,
                    designatedRoom: element?.department?.name,
                    designatedDoctor: element?.department?.user?.fullName,
                    patientPaid: element?.paymentStatus,
                    serviceCost: element?.amountOfMoney,
                    patientRecordServiceId: element?.patientRecordServiceId
                })
            })
            setRowForm(rows)
            setDataForm(datas)
        })
    }

    useEffect(() => {
        if (showDialog) {
            setRowForm([createDataForm('', '', 0)])
            setDataForm([{
                serviceId: '',
                serviceCode: '',
                serviceName: '',
                designatedRoom: '',
                designatedDoctor: '',
                serviceCost: 0,
                patientRecordServiceId: '',
            }])
            getService()
        }
    }, [showDialog])

    const renderBodyForm = () => {
        return (
            <div className="adduserassign-form">
                <div className="adduserassign-search">
                    <SearchBoxView
                        placeholder='Mã dịch vụ/ Tên dịch vụ'
                        onSearch={onSearch}
                    />
                </div>
                <div className="adduserassign-table">
                    <TablePager<ServiceListTableColumns, ServiceListTableDatas>
                        tableType={TableType.AddServiceManagerTable}
                        rowData={rowsForm}
                        dataTotal={datasForm}
                        hasCheckBox
                        page={currentPage}
                        handleChangePage={(page) => { setCurrentPage(page) }}
                        total={2}
                        isLoading={loadingForm}

                    />
                </div>
            </div>
        )
    }

    const closeForm = () => {
        setShowDialog(false)
        setLoadingForm(false)
    }

    return (
        <div className='profiledetail-page'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="profiledetail-page-container">
                <BreadCrumb
                    breadcrumbItem={[
                        { key: 1, text: 'Tiếp đón bệnh nhân', href: '/admin/tiep-don-benh-nhan' },
                        { key: 2, text: 'Chỉ định dịch vụ', href: '/admin/chi-tiet-ho-so' },
                    ]}
                />
                <div className="profiledetail-page-header">
                    <div className="page-header-left">
                        <div className="page-patient-name">
                            {patientName}
                        </div>
                        <div className="page-patient-gender">
                            {patientSex === UserGender.Female ? 'Nữ' : 'Nam'}
                        </div>
                        {profileEmergency && <div className="page-patient-emergency">
                            <CheckCircleIcon color='error'/> Cấp cứu
                        </div>}
                    </div>
                    <div className="page-header-right">
                        <Button variant={ButtonVariantType.Contained} sx={{ textTransform: 'none' }} >Lịch sử khám</Button>
                    </div>
                </div>
                <div className="profiledetail-page-info">
                    <div className="page-info-left">
                        {/* <div className="page-info-avt"> */}
                            {/* <Avatar variant="rounded" alt={''} src={flag}
                                sx={{ width: '132px', height: '132px' }}
                            /> */}
                            <ImageNotSupportedOutlinedIcon />
                        {/* </div> */}
                    </div>
                    <div className="page-info-right">
                        <div className="page-info-item">
                            Mã bệnh nhân: {patientCode}
                        </div>
                        <div className="page-info-item">
                            Họ và tên: {patientName}
                        </div>
                        <div className="page-info-item">
                            Số điện thoại: {patientPhone}
                        </div>
                        <div className="page-info-item">
                            CMND: {patientIdentityNumber}
                        </div>
                        <div className="page-info-item">
                            Ngày sinh: {patientDateOfBirth}
                        </div>
                        <div className="page-info-item">
                            Địa chỉ: {patientAddress}
                        </div>
                        <div className="page-info-item">
                            Mã hồ sơ: {profileCode}
                        </div>
                        <div className="page-info-item">
                            Lý do: {profileReason}
                        </div>
                        <div className="page-info-item">
                            Ngày đăng ký: {profileDate}
                        </div>
                    </div>
                </div>
                <div className="profiledetail-page-cost">
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
                            <div className='cost-text'>BN thanh toán</div>
                        </div>
                    </div>
                </div>
                <div className="profiledetail-sub-title">
                    Thông tin dịch vụ
                </div>
                <div className="service-list-wrap">
                    <TablePager<ServiceListTableColumns, ServiceListTableDatas>
                        tableType={TableType.ServiceInfoTable}
                        batchActionElements={onRenderActionButtons()}
                        rowData={rows}
                        dataTotal={datas}
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
                    title={'Thêm dịch vụ'}
                    hidden={!showDialog}
                    customContent={renderBodyForm()}
                    // closeWithPromise={this.onLogoutAction.bind(this)}
                    // confirm={this.handlecClosePopup.bind(this)}
                    confirmButtonText={'Lưu'}
                    confirmWithPromise={onSave}
                    closeButtonText='Hủy bỏ'
                    close={closeForm}
                    loading={loadingButton}
                />
            </div>
        </div>
    )
}

export default ProfileDetailPage