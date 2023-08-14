import React, { useEffect, useState } from 'react'
import './AssignUserPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { TextField } from '../../../common/textField/TextField'
import { DatePicker } from '../../../common/datePicker/DatePicker'
import { Label } from '@fluentui/react/lib/Label'
import Switch from '@mui/material/Switch'
import TablePager from '../../../common/tablePager/TablePager'
import { TableType, UserAssignTableColumns, UserAssignTableDatas } from '../../../model/enum/tableTypeEnum'
import PatientListCommandBar from '../patientListPage/PatientListCommandBar'
import { AccountStatus } from '../accountManagerPage/AccountManagerPage'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogView from '../../../common/dialog/Dialog'
import { MessageBarStatus } from '../../../model/enum/messageBarEnum'
import { useStateValue } from '../../../context/StateProvider'
import { actionType } from '../../../context/Reducer'
import { SearchBoxView } from '../../../common/searchBox/SearchBox'
import { ButtonColorType, ButtonVariantType, LoadingPosition } from '../../../model/enum/buttonEnum'
import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom'
import { RoleService, UserService } from '../../../api/apiPage/apiPage'
import { Skeleton } from '@mui/material'
import SubmitButton from '../../../common/button/SubmitButton'

function AssignUserPage() {
    const roleIdFromProps = useParams().id;
    const [roleId, setRoleId] = useState<string>(roleIdFromProps || '')
    const [roleName, setRoleName] = useState<string>()
    const [roleCode, setRoleCode] = useState<string>()
    const [roleDescription, setRoleDescription] = useState<string>()
    const [roleStatus, setRoleStatus] = useState<boolean>(true)
    const [roleStartTime, setRoleStart] = useState<Date>(new Date())
    const [roleEndTime, setRoleEnd] = useState<Date>(new Date())
    const [{ selection }, dispatch] = useStateValue();
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [rows, setRow] = useState<UserAssignTableColumns[]>([{
        userName: '',
        fullName: '',
        insuranceNumber: '',
        phoneNumber: ''
    }])
    const [datas, setRowData] = useState<UserAssignTableDatas[]>([{
        id: '',
        userName: '',
        fullName: '',
        insuranceNumber: '',
        phoneNumber: ''
    }])
    const [rowForms, setRowForm] = useState<UserAssignTableColumns[]>([{
        userName: '',
        fullName: '',
        insuranceNumber: '',
        phoneNumber: ''
    }])
    const [dataForms, setdataForm] = useState<UserAssignTableDatas[]>([{
        id: '',
        userName: '',
        fullName: '',
        insuranceNumber: '',
        phoneNumber: ''
    }])
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loadingAccount, setLoadingAccount] = useState<boolean>(false)
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [loadingRoleDetail, setLoadingRoleDetail] = useState<boolean>(false)

    const onSearch = (newValue: string) => {
        console.log(newValue);

    }
    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.UserAssignTable}
                showAddAssignUser={() => { setShowDialog(true) }}
            />
        ])
    }

    useEffect(() => {
        if (!!roleId) {
            setLoadingRoleDetail(true)
            RoleService.getRoleDetail(roleId).then(res => {
                if (res.success) {
                    setRoleId(res?.data?.id)
                    setRoleCode(res?.data?.code)
                    setRoleDescription(res?.data?.description)
                    setRoleName(res?.data?.name)
                    setRoleStart(res?.data?.startDate)
                    setRoleEnd(res?.data?.endDate)
                    setRoleStatus(res?.data?.status)
                    let userFromRole: UserAssignTableDatas[] = []
                    !!res?.data?.users && res?.data?.users.forEach((user: any) => {
                        userFromRole.push({
                            id: user.id,
                            userName: user.userName,
                            fullName: user.fullName,
                            phoneNumber: user.phoneNumber,
                            insuranceNumber: user.cmnd
                        })
                    })
                    setRowData(userFromRole)
                    setLoadingRoleDetail(false)
                } else {
                    setLoadingRoleDetail(false)
                }
            })
        }
    }, [])

    useEffect(() => {
        if (showDialog) {
            let requestBody = {
                pageIndex: 1,
                pageSize: 1000,
                searchTerm: ""
            }
            setLoadingAccount(true)
            UserService.getUserPaging(requestBody).then(res => {
                if (res.success) {
                    setLoadingAccount(false)
                    let rows: UserAssignTableColumns[] = []
                    let dataForms: UserAssignTableDatas[] = []
                    !!res.data?.items && res.data?.items.forEach((element: any) => {
                        rows.push(createDataForm(element?.userName, element?.fullName, element?.phoneNumber, element?.cmnd))
                        dataForms.push({
                            id: element?.id,
                            userName: element?.userName,
                            fullName: element?.fullName,
                            phoneNumber: element?.phoneNumber,
                            insuranceNumber: element?.cmnd
                        })
                    })
                    setRowForm(rows)
                    setdataForm(dataForms)
                } else {
                    setLoadingAccount(false)
                }
            })
        }
    }, [showDialog])

    function createDataForm(
        userName: string,
        fullName: string,
        phoneNumber: string,
        insuranceNumber: string,
    ): UserAssignTableColumns {
        return {
            userName,
            fullName,
            phoneNumber,
            insuranceNumber,
        };
    }

    const renderBodyForm = () => {
        return (
            <div className="adduserassign-form">
                <div className="adduserassign-search">
                    <SearchBoxView
                        placeholder='Tên đăng nhập/ Tên hiển thị'
                        onSearch={onSearch}
                    />
                </div>
                <div className="adduserassign-table">
                    <TablePager<UserAssignTableColumns, UserAssignTableDatas>
                        tableType={TableType.AddUserAssignTable}
                        rowData={rowForms}
                        dataTotal={dataForms}
                        hasCheckBox
                        page={currentPage}
                        handleChangePage={(page) => { setCurrentPage(page) }}
                        total={10}
                        isLoading={loadingAccount}

                    />
                </div>
            </div>
        )
    }

    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onSave = () => {
        closeForm()
        setRowData(selection.selectedItems)
    }

    const assignUser = () => {
        if (!!datas.length) {
            let userId: string[] = []
            datas.forEach(user => {
                userId.push(user?.id)
            })
            setLoadingButton(true)
            const result = RoleService.assignUser(roleId, userId).then(res => {
                if (res.success) {
                    setLoadingButton(true)
                    showMessageBar("Gán người dùng thành công!", true, MessageBarStatus.Success)
                } else {
                    setLoadingButton(true)
                    showMessageBar("Gán người dùng thất bại!", true, MessageBarStatus.Error)
                }
            })
            return result
        }
        return new Promise(res => {})
    }

    useEffect(() => {
        setRow(datas.map((e: UserAssignTableDatas) => {
            return {
                userName: e?.userName,
                fullName: e?.fullName,
                phoneNumber: e?.phoneNumber,
                insuranceNumber: e?.insuranceNumber,
                task: <IconButton aria-label="delete" size="small" onClick={() => { removeRole(e.id) }}>
                    <DeleteIcon color='error' />
                </IconButton>
            }
        }))
    }, [datas])

    const removeRole = (idDel: string) => {
        setRowData(datas.filter((e) => idDel !== e.id))
    }

    const closeForm = () => {
        setShowDialog(false)
        setRowForm([{
            userName: '',
            fullName: '',
            insuranceNumber: '',
            phoneNumber: ''
        }])
        setdataForm([{
            id: '',
            userName: '',
            fullName: '',
            insuranceNumber: '',
            phoneNumber: ''
        }])
    }

    return (
        <div className='assignuser-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Quản lý vai trò', href: '/admin/quan-ly-vai-tro' },
                    { key: 2, text: 'Gán người dùng', href: '/quan-ly-vai-tro/gan-nguoi-dung' },
                ]}
            />
            <div className="assignuser-page-title">
                Gán vai trò cho người dùng
            </div>
            <div className="assignuser-page-body">
                <div className="assignuser-page-sub-title">
                    Thông tin vai trò
                </div>
                {loadingRoleDetail ? (
                    <div className="assignuser-page-wrap">
                        <Skeleton variant="rounded" height={40} className='assignuser-info-item' />
                        <Skeleton variant="rounded" height={40} className='assignuser-info-item' />
                        <Skeleton variant="rounded" height={40} className='assignuser-info-item' />
                        <Skeleton variant="rounded" height={40} className='assignuser-info-item' />
                        <Skeleton variant="rounded" height={40} className='assignuser-info-item' />
                        <Skeleton variant="rounded" height={40} className='assignuser-info-item' />
                    </div>
                ) :
                    <div className="assignuser-page-wrap">
                        <div className="assignuser-info-item">
                            <TextField
                                label='Mã vai trò'
                                required
                                placeholder='--'
                                value={roleCode}
                                onChange={(_, value) => {
                                    setRoleCode(value)
                                }}
                            />
                        </div>
                        <div className="assignuser-info-item">
                            <TextField
                                label='Tên vai trò'
                                required
                                placeholder='--'
                                value={roleName}
                                onChange={(_, value) => {
                                    setRoleName(value)
                                }}
                            />
                        </div>
                        <div className="assignuser-info-item">
                            <TextField
                                label='Mô tả'
                                required
                                placeholder='--'
                                value={roleDescription}
                                onChange={(_, value) => {
                                    setRoleDescription(value)
                                }}
                            />
                        </div>
                        <div className="assignuser-info-item">
                            <DatePicker
                                placeholder="Chọn một giá trị"
                                ariaLabel="Chọn một giá trị"
                                label='Thời gian bắt đầu'
                                isRequired={true}
                                onSelectDate={(date) => {
                                    setRoleStart(date!)
                                }}
                                value={new Date(roleStartTime)}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="assignuser-info-item">
                            <DatePicker
                                placeholder="Chọn một giá trị"
                                ariaLabel="Chọn một giá trị"
                                label='Thời gian kết thúc'
                                isRequired={true}
                                // strings={defaultDatePickerStrings}
                                onSelectDate={(date) => {
                                    setRoleEnd(date!)
                                }}
                                value={new Date(roleEndTime)}
                                minDate={new Date()}
                            />
                        </div>
                        <div className="assignuser-info-item">
                            <Label required>Trạng thái</Label>
                            <Switch
                                checked={roleStatus}
                                onChange={(_, checked) => { setRoleStatus(checked) }}
                            />
                        </div>
                    </div>}
                <div className="assignuser-page-sub-title">
                    Danh sách người dùng
                </div>
                <div className="assignuser-page-wrap">
                    <TablePager<UserAssignTableColumns, UserAssignTableDatas>
                        tableType={TableType.UserAssignTable}
                        batchActionElements={onRenderActionButtons()}
                        rowData={rows}
                        dataTotal={datas}
                        hasCheckBox={false}
                        page={currentPage}
                        handleChangePage={(page) => { setCurrentPage(page) }}
                        total={10}
                        className='assignuser-table'
                        isLoading={loadingRoleDetail}
                    />
                </div>
                <div className="assignuser-page-button">
                    <Button variant={ButtonVariantType.Outlined} color={ButtonColorType.Inherit}>Hủy</Button>
                    {true && <SubmitButton
                        id={'common-dialog-default'}
                        text={'Lưu'}
                        // disable={!canUpdate}
                        buttonVariantType={ButtonVariantType.Contained}
                        promise={assignUser}
                        loading={loadingButton}
                        loadingPosition={LoadingPosition.Center}

                    />}
                </div>
                <DialogView
                    title={'Thêm người dùng'}
                    hidden={!showDialog}
                    customContent={renderBodyForm()}
                    // closeWithPromise={this.onLogoutAction.bind(this)}
                    // confirm={this.handlecClosePopup.bind(this)}
                    confirmButtonText={'Lưu'}
                    confirm={onSave}
                    closeButtonText='Hủy bỏ'
                    close={closeForm}
                />
            </div>
        </div>
    )
}

export default AssignUserPage