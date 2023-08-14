import React, { useEffect, useState } from 'react'
import './DepartmentManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb';
import TablePager from '../../../common/tablePager/TablePager';
import { AccountManagerTableDatas, DepartmentManagerColumns, DepartmentManagerDatas, TableType } from '../../../model/enum/tableTypeEnum';
import PatientListCommandBar from '../patientListPage/PatientListCommandBar';
import { TextField } from '../../../common/textField/TextField';
import Skeleton from '@mui/material/Skeleton';
import DialogView from '../../../common/dialog/Dialog';
import { Label } from '@fluentui/react';
import { Autocomplete, TextField as TextFieldView } from '@mui/material';
import { DepartmentService, UserService } from '../../../api/apiPage/apiPage';
import { AccountStatus } from '../accountManagerPage/AccountManagerPage';
import { MessageBarStatus } from '../../../model/enum/messageBarEnum';
import { useStateValue } from '../../../context/StateProvider';
import { actionType } from '../../../context/Reducer';

enum ActionDepartment {
    Create,
    Edit,
    Delete
}

function DepartmentManagerPage() {
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingForm, setLoadingForm] = useState<boolean>(false)
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0)
    const [rows, setRow] = useState<DepartmentManagerColumns[]>([createData('', '', '')])
    const [datas, setData] = useState<DepartmentManagerDatas[]>([{
        id: '',
        code: '',
        name: '',
        doctor: ''
    }])
    const [action, setAction] = useState <ActionDepartment>()
    const [departmentcode, setDepartmentCode] = useState<string>()
    const [departmentname, setDepartmentName] = useState<string>()
    const [departmentdoctor, setDepartmentDoctor] = useState<AccountManagerTableDatas>()
    const [doctorList, setDoctorList] = useState<AccountManagerTableDatas[]>([])
    const [{ selection }, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.DepartmentManagerTable}
                showDepartmentCreate={() => { setShowDialog(true); setAction(ActionDepartment.Create) }}
                showDepartmentEdit={() => { setShowDialog(true); setAction(ActionDepartment.Edit) }}
                showDepartmentDelete={() => { setShowDialog(true); setAction(ActionDepartment.Delete) }}
            />
        ])
    }

    function createData(
        departmentcode: string,
        departmentname: string,
        departmentdoctor: string,
    ): DepartmentManagerColumns {
        return {
            departmentcode,
            departmentname,
            departmentdoctor,
        };
    }

    const getDoctor = () => {
        let requestBody = {
            pageIndex: currentPage,
            pageSize: 1000,
            searchTerm: ''
        }
        UserService.getUserPaging(requestBody).then(res => {
            let datas: AccountManagerTableDatas[] = []
            !!res.data?.items && res.data.items.forEach((element: any) => {
                datas.push({
                    id: element?.id,
                    userName: element?.userName,
                    roles: element?.roles,
                    fullName: element?.fullName,
                    status: element?.status,
                    email: element?.email
                })
            })
            setDoctorList(datas.filter(item => item.roles[0]?.code === 'bac-si'))
        })
    }

    const getDepartment = () => {
        let requestBody = {
            pageIndex: currentPage,
            pageSize: 10,
            searchTerm: ''
        }
        setLoading(true)
        DepartmentService.getDepartmentPaging(requestBody).then(res => {
            setLoading(false)
            let rows: DepartmentManagerColumns[] = []
            let datas: DepartmentManagerDatas[] = []
            !!res.data?.items && res.data.items.forEach((element: any) => {
                rows.push(createData(element?.code, element?.name, element?.user?.fullName))
                datas.push({
                    id: element?.id,
                    code: element?.code,
                    name: element?.name,
                    doctor: element?.user?.fullName
                })
            })
            setRow(rows)
            setData(datas)
            setTotalItems(!!res.data?.metaData ? res.data.metaData.totalCount : 0)
        })
    }

    useEffect(() => {
        getDepartment()
    }, [currentPage])

    useEffect(() => {
        if (showDialog) {
            getDoctor()
        }
        if (action === ActionDepartment.Edit) {
            setLoadingForm(true)
            DepartmentService.getDepartmentDetail(selection.selectedItems[0]?.id).then(res => {
                setLoadingForm(false)
                if (res.success) {
                    setDepartmentCode(res.data?.code)
                    setDepartmentName(res.data?.name)
                    setDepartmentDoctor({
                        id: res.data?.user?.id,
                        userName: res.data?.user?.userName,
                        roles: res.data?.user?.roles,
                        fullName: res.data?.user?.fullName,
                        status: res.data?.user?.status,
                        email: res.data?.user?.email
                    })
                } else {
                    showMessageBar("Đã có lỗi xảy ra!", true, MessageBarStatus.Error)
                }
            })
        }
    }, [showDialog])
    
    const renderTitleForm = () => {
        switch (action) {
            case ActionDepartment.Create:
                return 'Tạo phòng'
            case ActionDepartment.Edit:
                return 'Chỉnh sửa phòng'
            case ActionDepartment.Delete:
                return 'Xóa phòng'
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
                                label='Mã phòng'
                                placeholder='--'
                                required={true}
                                value={departmentcode}
                                onChange={(_, value) => { setDepartmentCode(value) }}
                            />
                        </div>
                        <div className="account-create-field">
                            <TextField
                                label='Tên phòng'
                                placeholder='--'
                                required={true}
                                value={departmentname}
                                onChange={(_, value) => { setDepartmentName(value) }}
                            />
                        </div>
                        <div className="account-create-field">
                            <Label required>Bác sĩ phụ trách</Label>
                            <Autocomplete
                                disablePortal
                                id="assignrole-box-select"
                                options={doctorList}
                                value={departmentdoctor}
                                noOptionsText={'Không có lựa chọn'}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                getOptionLabel={(option) => option.fullName}
                                sx={{}}
                                renderInput={(params) => <TextFieldView {...params} label="" placeholder='Chọn bác sĩ' />}
                                onChange={(_, selected) => {
                                    setDepartmentDoctor(selected!)
                                }}
                                loading={doctorList?.length === 0}
                                loadingText={<>Vui lòng đợi...</>}
                            />
                        </div>
                    </div>

                }
            </div>
        )
    }

    const onSave = () => {
        if (action === ActionDepartment.Create) {
            let requestBody = {
                id: '00000000-0000-0000-0000-000000000000',
                code: departmentcode,
                name: departmentname,
                appUserId: departmentdoctor?.id
            }
            setLoadingButton(true)
            DepartmentService.createDepartment(requestBody).then(res => {
                setLoadingButton(false)
                if (res.success) {
                    closeForm()
                    showMessageBar("Tạo phòng thành công!", true, MessageBarStatus.Success)
                    getDepartment()
                } else {
                    showMessageBar("Tạo phòng thất bại!", true, MessageBarStatus.Error)
                }
            })
        }
        if (action === ActionDepartment.Edit) {
            let requestBody = {
                id: selection.selectedItems[0]?.id,
                code: departmentcode,
                name: departmentname,
                appUserId: departmentdoctor?.id
            }
            setLoadingButton(true)
            DepartmentService.updateDepartment(requestBody).then(res => {
                setLoadingButton(false)
                if (res.success) {
                    closeForm()
                    showMessageBar("Sửa phòng thành công!", true, MessageBarStatus.Success)
                    getDepartment()
                } else {
                    showMessageBar("Sửa phòng thất bại!", true, MessageBarStatus.Error)
                }
            })
        }
        if (action === ActionDepartment.Delete) {
            setLoadingButton(true)
            DepartmentService.deleteDepartment(selection.selectedItems[0]?.id).then(res => {
                setLoadingButton(false)
                if (res.success) {
                    closeForm()
                    showMessageBar("Xóa phòng thành công!", true, MessageBarStatus.Success)
                    getDepartment()
                } else {
                    closeForm()
                    showMessageBar("Xóa phòng thất bại!", true, MessageBarStatus.Error)
                }
            })
        }
        return new Promise((res) => { })
    }

    const closeForm = () => {
        setShowDialog(false)
        setLoadingForm(false)
        setAction(undefined)
        setDepartmentCode('')
        setDepartmentName('')
        setDoctorList([])
    }

    return (
        <div className="accountmanager-page">
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: "Quản lý phòng ban", href: "/quan-ly-tai-khoan" },
                ]}
            />
            <div className="accountmanager-page-title">Danh sách phòng ban</div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
            <div className="patient-list-table">
                <TablePager<DepartmentManagerColumns, DepartmentManagerDatas>
                    tableType={TableType.DepartmentManagerTable}
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
                customContent={action === ActionDepartment.Delete ? <div className=''>Bạn có chắc chắn muốn xóa phòng <strong>{selection.selectedItems[0]?.name}</strong><br />Thao tác này không thể khôi phục!</div> : renderBody()}
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

export default DepartmentManagerPage