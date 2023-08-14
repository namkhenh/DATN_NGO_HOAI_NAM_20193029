import React, { useEffect, useState } from 'react'
import './ServiceManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb';
import TablePager from '../../../common/tablePager/TablePager';
import { DepartmentManagerDatas, ServiceManagerTableColumns, ServiceManagerTableDatas, TableType } from '../../../model/enum/tableTypeEnum';
import PatientListCommandBar from '../patientListPage/PatientListCommandBar';
import { TextField } from '../../../common/textField/TextField';
import Skeleton from '@mui/material/Skeleton';
import DialogView from '../../../common/dialog/Dialog';
import { Label } from '@fluentui/react';
import { Autocomplete, TextField as TextFieldView } from '@mui/material';
import { DepartmentService, MedicalExaminationService, } from '../../../api/apiPage/apiPage';
import { MessageBarStatus } from '../../../model/enum/messageBarEnum';
import { useStateValue } from '../../../context/StateProvider';
import { actionType } from '../../../context/Reducer';

enum ActionService {
    Create,
    Edit,
    Delete
}

function ServiceManagerPage() {
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingForm, setLoadingForm] = useState<boolean>(false)
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0)
    const [rows, setRow] = useState<ServiceManagerTableColumns[]>([createData('', '', '', '', 0)])
    const [datas, setData] = useState<ServiceManagerTableDatas[]>([{
        id: '',
        code: '',
        name: '',
        departmentId: '',
        cost: 0
    }])
    const [action, setAction] = useState<ActionService>()
    const [servicecode, setserviceCode] = useState<string>()
    const [servicename, setserviceName] = useState<string>()
    const [servicecost, setserviceCost] = useState<number>()
    const [servicedepartment, setservicedepartment] = useState<DepartmentManagerDatas>()
    const [departmentList, setdepartmentList] = useState<DepartmentManagerDatas[]>([])
    const [{ selection }, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.ServiceManagerTable}
                showServiceCreate={() => { setShowDialog(true); setAction(ActionService.Create) }}
                showServiceEdit={() => { setShowDialog(true); setAction(ActionService.Edit) }}
                showServiceDelete={() => { setShowDialog(true); setAction(ActionService.Delete) }}
            />
        ])
    }

    function createData(
        servicecode: string,
        servicename: string,
        servicedepartment: string,
        servicedoctor: string,
        servicecost: number,
    ): ServiceManagerTableColumns {
        return {
            servicecode,
            servicename,
            servicedepartment,
            servicedoctor,
            servicecost,
        };
    }

    const getDepartment = () => {
        let requestBody = {
            pageIndex: currentPage,
            pageSize: 1000,
            searchTerm: ''
        }
        DepartmentService.getDepartmentPaging(requestBody).then(res => {
            let datas: DepartmentManagerDatas[] = []
            !!res.data?.items && res.data.items.forEach((element: any) => {
                datas.push({
                    id: element?.id,
                    code: element?.code,
                    name: element?.name,
                    doctor: ''
                })
            })
            setdepartmentList(datas)
        })
    }

    const getService = () => {
        let requestBody = {
            pageIndex: currentPage,
            pageSize: 10,
            searchTerm: ''
        }
        setLoading(true)
        MedicalExaminationService.getServicePaging(requestBody).then(res => {
            setLoading(false)
            let rows: ServiceManagerTableColumns[] = []
            let datas: ServiceManagerTableDatas[] = []
            !!res.data?.items && res.data.items.forEach((element: any) => {
                rows.push(createData(element?.code, element?.name, element?.department?.name, element?.department?.user?.fullName, element?.amountOfMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })))
                datas.push({
                    id: element?.id,
                    code: element?.code,
                    name: element?.name,
                    departmentId: element?.departmentId,
                    cost: element?.amountOfMoney.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                })  
            })
            setRow(rows)
            setData(datas)
            setTotalItems(!!res.data?.metaData ? res.data.metaData.totalCount : 0)
        })
    }

    useEffect(() => {
        getService()
    }, [currentPage])

    useEffect(() => {
        if (showDialog) {
            getDepartment()
        }
        // if (action === ActionService.Edit) {
        //     setLoadingForm(true)
        //     MedicalExaminationService.get(selection.selectedItems[0]?.id).then(res => {
        //         setLoadingForm(false)
        //         if (res.success) {
        //             setserviceCode(res.data?.code)
        //             setserviceName(res.data?.name)
        //             setserviceCost(res.data?.amountOfMoney)
        //             setservicedepartment({
        //                 id: res.data?.departmentId,
        //                 name: res.data?.department?.name,
        //                 code: res.data?.department?.code,
        //                 doctor: res.data?.department?.user?.fullName
        //             })
        //         } else {
        //             showMessageBar("Đã có lỗi xảy ra!", true, MessageBarStatus.Error)
        //         }
        //     })
        // }
    }, [showDialog])

    const renderTitleForm = () => {
        switch (action) {
            case ActionService.Create:
                return 'Tạo dịch vụ'
            case ActionService.Edit:
                return 'Chỉnh sửa dịch vụ'
            case ActionService.Delete:
                return 'Xóa dịch vụ'
            default:
                return ''
        }
    }

    const renderBody = () => {
        return (
            <div className="account-create-form">
                {loadingForm ? (
                    <div className="account-create-wrap">
                        <Skeleton variant="rounded" height={40} className='account-create-field' />
                        <Skeleton variant="rounded" height={40} className='account-create-field' />
                        <Skeleton variant="rounded" height={40} className='account-create-field' />
                    </div>

                ) :
                    <div className="account-create-wrap">
                        <div className="account-create-field">
                            <TextField
                                label='Mã dịch vụ'
                                placeholder='--'
                                required={true}
                                value={servicecode}
                                onChange={(_, value) => { setserviceCode(value) }}
                            />
                        </div>
                        <div className="account-create-field">
                            <TextField
                                label='Tên dịch vụ'
                                placeholder='--'
                                required={true}
                                value={servicename}
                                onChange={(_, value) => { setserviceName(value) }}
                            />
                        </div>
                        <div className="account-create-field">
                            <Label required>Phòng thực hiện</Label>
                            <Autocomplete
                                disablePortal
                                id="assignrole-box-select"
                                options={departmentList}
                                value={servicedepartment}
                                noOptionsText={'Không có lựa chọn'}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                getOptionLabel={(option) => option.name}
                                sx={{}}
                                renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn phòng' />}
                                onChange={(_, selected) => {
                                    setservicedepartment(selected!)
                                }}
                                loading={departmentList?.length === 0}
                                loadingText={<>Vui lòng đợi...</>}
                            />
                        </div>
                        <div className="account-create-field">
                            <TextField
                                label='Giá dịch vụ'
                                type='number'
                                placeholder='--'
                                required={true}
                                value={servicecost?.toString()}
                                onChange={(_, value) => { setserviceCost(Number(value)) }}
                            />
                        </div>
                    </div>

                }
            </div>
        )
    }

    const onSave = () => {
        if (action === ActionService.Create) {
            let requestBody = {
                id: '00000000-0000-0000-0000-000000000000',
                code: servicecode,
                name: servicename,
                departmentId: servicedepartment?.id,
                amountOfMoney: servicecost
            }
            setLoadingButton(true)
            MedicalExaminationService.createService(requestBody).then(res => {
                setLoadingButton(false)
                if (res.success) {
                    closeForm()
                    showMessageBar("Tạo dịch vụ thành công!", true, MessageBarStatus.Success)
                    setRow([createData('', '', '', '', 0)])
                    setData([{
                        id: '',
                        code: '',
                        name: '',
                        departmentId: '',
                        cost: 0
                    }])
                    getService()
                } else {
                    showMessageBar("Tạo dịch vụ thất bại!", true, MessageBarStatus.Error)
                }
            })
        }
        if (action === ActionService.Edit) {
            let requestBody = {
                id: selection.selectedItems[0]?.id,
                code: servicecode,
                name: servicename,
                departmentId: servicedepartment?.id,
                amountOfMoney: servicecost
            }
            setLoadingButton(true)
            MedicalExaminationService.updateService(requestBody).then(res => {
                setLoadingButton(false)
                if (res.success) {
                    closeForm()
                    showMessageBar("Sửa dịch vụ thành công!", true, MessageBarStatus.Success)
                    setRow([createData('', '', '', '', 0)])
                    setData([{
                        id: '',
                        code: '',
                        name: '',
                        departmentId: '',
                        cost: 0
                    }])
                    getService()
                } else {
                    showMessageBar("Sửa dịch vụ thất bại!", true, MessageBarStatus.Error)
                }
            })
        }
        if (action === ActionService.Delete) {
            setLoadingButton(true)
            MedicalExaminationService.deleteService(selection.selectedItems[0]?.id).then(res => {
                setLoadingButton(false)
                if (res.success) {
                    closeForm()
                    showMessageBar("Xóa dich vụ thành công!", true, MessageBarStatus.Success)
                    setRow([createData('', '', '', '', 0)])
                    setData([{
                        id: '',
                        code: '',
                        name: '',
                        departmentId: '',
                        cost: 0
                    }])
                    getService()
                } else {
                    closeForm()
                    showMessageBar("Xóa dich vụ thất bại!", true, MessageBarStatus.Error)
                }
            })
        }
        return new Promise((res) => { })
    }

    const closeForm = () => {
        setShowDialog(false)
        setLoadingForm(false)
        setAction(undefined)
        setserviceCode('')
        setserviceName('')
        setserviceCost(0)
        setdepartmentList([])
    }

    return (
        <div className="accountmanager-page">
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: "Quản lý dịch vụ", href: "/quan-ly-dich-vu" },
                ]}
            />
            <div className="accountmanager-page-title">Danh sách dịch vụ</div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
            <div className="patient-list-table">
                <TablePager<ServiceManagerTableColumns, ServiceManagerTableDatas>
                    tableType={TableType.ServiceManagerTable}
                    batchActionElements={onRenderActionButtons()}
                    rowData={rows}
                    dataTotal={datas}
                    hasCheckBox
                    hasTablePaging
                    page={currentPage - 1}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={totalItems}
                    isLoading={loading}
                />
            </div>
            <DialogView
                title={renderTitleForm()}
                hidden={!showDialog}
                customContent={action === ActionService.Delete ? <div className=''>Bạn có chắc chắn muốn xóa dịch vụ <strong>{selection.selectedItems[0]?.name}</strong><br />Thao tác này không thể khôi phục!</div> : renderBody()}
                // closeWithPromise={this.onLogoutAction.bind(this)}
                // confirm={this.handlecClosePopup.bind(this)}
                confirmButtonText={'Lưu'}
                confirmWithPromise={onSave}
                closeButtonText='Hủy bỏ'
                close={closeForm}
                loading={loadingButton}
            />
        </div>
    );
}

export default ServiceManagerPage