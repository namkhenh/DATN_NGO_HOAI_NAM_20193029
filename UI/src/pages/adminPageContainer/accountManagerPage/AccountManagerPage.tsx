import React, { useEffect, useState } from 'react'
import './AccountManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import TablePager from '../../../common/tablePager/TablePager'
import {
    AccountManagerTableColumns,
    AccountManagerTableDatas,
    IAppUserRole,
    RoleManagerTableDatas,
    TableType,
    UserGender
} from '../../../model/enum/tableTypeEnum'
import PatientListCommandBar from '../patientListPage/PatientListCommandBar'
import { AccountRoleEnum } from '../../../model/enum/accPermissionEnum'
import { SearchBoxView } from '../../../common/searchBox/SearchBox'
import DialogView from '../../../common/dialog/Dialog'
import { TextField } from '../../../common/textField/TextField'
import { useStateValue } from '../../../context/StateProvider'
import { MessageBarStatus } from '../../../model/enum/messageBarEnum'
import { actionType } from '../../../context/Reducer'
import { DatePicker } from '../../../common/datePicker/DatePicker'
import { Label } from '@fluentui/react/lib/Label'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import AssignRoleForm from '../../../components/assignRoleForm/AssignRoleForm'
import Switch from '@mui/material/Switch'
import { RoleStatus } from '../roleManagerPage/RoleManagerPage'
import { UserService } from '../../../api/apiPage/apiPage'
import Skeleton from '@mui/material/Skeleton'
import { convertTZ } from '../../../utils/commonFunction'

export enum AccountAction {
    Create,
    Edit,
    Delete,
    ChangePass,
    Enable,
    Able,
    Assign
}

export enum AccountStatus {
    Able,
    Enable
}

function AccountManagerPage() {
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [loadingButton, setLoading] = useState<boolean>(false)
    const [accountAction, setAcountAction] = useState<AccountAction>()
    const [accountId, setAccountId] = useState<string>()
    const [code, setCode] = useState<string>()
    const [fullName, setFullName] = useState<string>()
    const [address, setAddress] = useState<string>()
    const [status, setStatus] = useState<boolean>(true)
    const [userName, setUserName] = useState<string>()
    const [phoneNumber, setPhoneNumber] = useState<string>()
    const [sex, setSex] = useState<number>(0)
    const [religion, setReligion] = useState<number>(0)
    const [provinceId, setProvinceId] = useState<string>()
    const [districtId, setDistrictId] = useState<string>()
    const [wardId, setWardId] = useState<string>()
    const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date())
    const [identify, setIdentify] = useState<string>()
    const [guardiasName, setGuardiasName] = useState<string>()
    const [guardiansPhoneNumber, setGuardiansPhoneNumber] = useState<string>()
    const [relationship, setRelationship] = useState<string>()
    const [password, setpassword] = useState<string>()
    const [repassword, setrepassword] = useState<string>()
    const [loadingAccount, setLoadingAccount] = useState<boolean>(false)
    const [loadingForm, setLoadingForm] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [rows, setRow] = useState<AccountManagerTableColumns[]>([createData('', [], '', '', '', 0, 0)])
    const [datas, setData] = useState<AccountManagerTableDatas[]>([{
        id: '',
        userName: '',
        roles: [],
        fullName: '',
        status: AccountStatus.Able
    }])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0)

    const [{ selection }, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.AccountManagerTable}
                showAccountCreate={() => { setShowDialog(true); setAcountAction(AccountAction.Create) }}
                showAccountEdit={() => { setShowDialog(true); setAcountAction(AccountAction.Edit) }}
                showAccountDelete={() => { setShowDialog(true); setAcountAction(AccountAction.Delete) }}
                showAccountChangePass={() => { setShowDialog(true); setAcountAction(AccountAction.ChangePass) }}
                showAccountEnable={() => { setShowDialog(true); setAcountAction(AccountAction.Enable) }}
                showAccountAble={() => { setShowDialog(true); setAcountAction(AccountAction.Able) }}
                showAccountAssign={() => { setShowDialog(true); setAcountAction(AccountAction.Assign) }}
            />
        ])
    }

    function createData(
        userName: string,
        roleI: RoleManagerTableDatas[],
        fullName: string,
        phoneNumber: string,
        insuranceNumber: string,
        genderI: number,
        statusI: number
    ): AccountManagerTableColumns {
        let role: string = roleI.map(role => {return role.name}).join(", ")
        let gender: string = genderI === 0 ? 'Nam' : 'Nữ'
        let status: JSX.Element = statusI ? <div className='status-element'><CheckCircleOutlineOutlinedIcon sx={{ color: '#2da55b86' }} />Hoạt động</div> : <div className='status-element'><NotInterestedOutlinedIcon sx={{ color: '#ff4646b4' }} />Vô hiệu hóa</div>
        return {
            userName,
            role,
            fullName,
            phoneNumber,
            insuranceNumber,
            gender,
            status
        };
    }

    const getAccount = () => {
        let requestBody = {
            pageIndex: currentPage,
            pageSize: 10,
            searchTerm: searchTerm
        }
        setLoadingAccount(true)
        UserService.getUserPaging(requestBody).then(res => {
            setLoadingAccount(false)
            let rows: AccountManagerTableColumns[] = []
            let datas: AccountManagerTableDatas[] = []
            !!res.data?.items && res.data.items.forEach((element: any) => {
                rows.push(createData(element?.userName, element?.roles, element?.fullName, element?.phoneNumber, element?.cmnd, element?.sex, element?.status))
                datas.push({
                    id: element?.id,
                    userName: element?.userName,
                    roles: element?.roles,
                    fullName: element?.fullName,
                    status: element?.status,
                    email: element?.email
                })
            })
            setRow(rows)
            setData(datas)
            setTotalItems(!!res.data?.metaData ? res.data.metaData.totalCount : 0)
        })
    }

    useEffect(() => {
        getAccount()
    }, [currentPage, searchTerm])

    useEffect(() => {
        if (accountAction === AccountAction.Create) {
            let requestBody = {
                id: accountId,
                code: code,
                fullName: fullName,
                status: status,
                description: "",
                email: "namkhenh81@gmail.com",
                userName: userName,
                phone: phoneNumber,
                sex: sex,
                religion: 0,
                provinceId: '00000000-0000-0000-0000-000000000000',
                districtId: '00000000-0000-0000-0000-000000000000',
                wardId: '00000000-0000-0000-0000-000000000000',
                age: 0,
                dateOfBirth: convertTZ(dateOfBirth),
                cmnd: identify,
                guardiasName: "",
                guardiansPhoneNumber: "",
                relationship: 0
            }
            if (!!accountId) {
                UserService.updateUser(requestBody).then(res => {
                    if (res.success) {
                        setLoading(false)
                        closeForm()
                        showMessageBar("Tạo tài khoản thành công!", true, MessageBarStatus.Success)
                        getAccount()
                    } else {
                        setLoading(false)
                        showMessageBar("Tạo tài khoản thất bại!", true, MessageBarStatus.Error)
                    }

                })
            }
        }
    }, [accountId])

    useEffect(() => {
        if (accountAction === AccountAction.Edit) {
            setLoadingForm(true)
            UserService.getUserById(selection.selectedItems[0]?.id).then(res => {
                setLoadingForm(false)
                if (res.success) {
                    setCode(res.data?.code)
                    setFullName(res.data?.fullName)
                    setStatus(res.data?.status)
                    setUserName(res.data?.userName)
                    setPhoneNumber(res.data?.phoneNumber)
                    setSex(res.data?.sex)
                    setReligion(res.data?.religion)
                    setProvinceId(res.data?.provinceId)
                    setDistrictId(res.data?.districtId)
                    setWardId(res.data?.wardId)
                    setAddress(res.data?.adress)
                    setDateOfBirth(res.data?.dateOfBirth)
                    setIdentify(res.data?.cmnd)
                    setGuardiasName(res.data?.guardiasName)
                    setGuardiansPhoneNumber(res.data?.guardiansPhoneNumber)
                    setRelationship(res.data?.relationship)
                } else {
                    showMessageBar("Đã có lỗi xảy ra!", true, MessageBarStatus.Error)
                }
            })
        }
    }, [showDialog])



    const onSave = () => {
        if (accountAction === AccountAction.Create) {
            let requestBody = {
                password: `User${identify}!`,
                email: 'namkhenh81@gmail.com',
                phoneNumber: phoneNumber
            }
            setLoading(true)
            const result = UserService.register(requestBody).then(res => {
                if (res.success) {
                    setAccountId(res.data?.id)
                    setCode(res.data?.code)
                    setRow([createData('', [], '', '', '', 0, 0)])
                    setData([{
                        id: '',
                        userName: '',
                        roles: [],
                        fullName: '',
                        status: AccountStatus.Able
                    }])
                } else {
                    setLoading(false)
                    closeForm()
                    showMessageBar(`Tạo tài khoản thất bại! \n${res.message ? res.message : ''}`, true, MessageBarStatus.Error)
                }
            })

            return result
        }
        if (accountAction === AccountAction.Edit) {
            let requestBody = {
                id: selection.selectedItems[0]?.id,
                code: code,
                fullName: fullName,
                status: status,
                description: "",
                email: "namkhenh81@gmail.com",
                userName: userName,
                phone: phoneNumber,
                sex: sex,
                religion: religion || 0,
                provinceId: provinceId,
                districtId: districtId,
                wardId: wardId,
                address: address,
                age: 0,
                dateOfBirth: convertTZ(dateOfBirth),
                cmnd: identify,
                guardiasName: guardiasName,
                guardiansPhoneNumber: guardiansPhoneNumber,
                relationship: relationship
            }
            setLoading(true)
            const result = UserService.updateUser(requestBody).then(res => {
                if (res.success) {
                    setLoading(false)
                    closeForm()
                    setRow([createData('', [], '', '', '', 0, 0)])
                    setData([{
                        id: '',
                        userName: '',
                        roles: [],
                        fullName: '',
                        status: AccountStatus.Able
                    }])
                    showMessageBar("Cập nhật tài khoản thành công!", true, MessageBarStatus.Success)
                    getAccount()
                } else {
                    setLoading(false)
                    closeForm()
                    showMessageBar(`Cập nhật tài khoản thất bại! \n${res.message ? res.message : ''}`, true, MessageBarStatus.Error)
                }
            })
            return result
        }
        if (accountAction === AccountAction.Delete) {
            setLoading(true)
            const result = UserService.deleteUser(selection.selectedItems[0]?.id).then(res => {
                if (res.success) {
                    setLoading(false)
                    closeForm()
                    setRow([createData('', [], '', '', '', 0, 0)])
                    setData([{
                        id: '',
                        userName: '',
                        roles: [],
                        fullName: '',
                        status: AccountStatus.Able
                    }])
                    showMessageBar("Xóa tài khoản thành công!", true, MessageBarStatus.Success)
                    getAccount()
                } else {
                    setLoading(false)
                    closeForm()
                    showMessageBar(`Xóa tài khoản thất bại! \n${res.message ? res.message : ''}`, true, MessageBarStatus.Error)
                }
            })
            return result
        }
        if (accountAction === AccountAction.Assign) {
            setLoading(true)
            const result = UserService.assignRole(selection.selectedItems[0]?.id, selectedRoleId).then(res => {
                if (res.success) {
                    setLoading(false)
                    closeForm()
                    setRow([createData('', [], '', '', '', 0, 0)])
                    setData([{
                        id: '',
                        userName: '',
                        roles: [],
                        fullName: '',
                        status: AccountStatus.Able
                    }])
                    showMessageBar("Gán vai trò thành công!", true, MessageBarStatus.Success)
                    getAccount()
                } else {
                    setLoading(false)
                    closeForm()
                    showMessageBar(`Gán vai trò thất bại! \n${res.message ? res.message : ''}`, true, MessageBarStatus.Error)
                }
            })
            return result
        }
        if (accountAction === AccountAction.ChangePass) {
            setLoading(true)
            console.log(selection.selectedItems[0]);
            let requestBody = {
                email: selection.selectedItems[0]?.email,
                password: password
            }
            const result = UserService.resetPassword(requestBody).then(res => {
                if (res.success) {
                    setLoading(false)
                    closeForm()
                    setRow([createData('', [], '', '', '', 0, 0)])
                    setData([{
                        id: '',
                        userName: '',
                        roles: [],
                        fullName: '',
                        status: AccountStatus.Able
                    }])
                    showMessageBar("Đổi mật khẩu thành công!", true, MessageBarStatus.Success)
                    getAccount()
                } else {
                    setLoading(false)
                    closeForm()
                    showMessageBar(`Đổi mật khẩu thất bại! \n${res.message ? res.message : ''}`, true, MessageBarStatus.Error)
                }
            })
            return result
        }

        return new Promise((res) => { })
    }

    const closeForm = () => {
        setShowDialog(false)
        setUserName('')
        setFullName('')
        setIdentify('')
        setPhoneNumber('')
        setDateOfBirth(new Date())
        setSex(0)
        setStatus(true)
        setpassword('')
        setrepassword('')
        setLoadingForm(false)
        setAcountAction(undefined)
    }

    const renderTitleForm = () => {
        switch (accountAction) {
            case AccountAction.Create:
                return 'Tạo tài khoản'
            case AccountAction.Edit:
                return 'Chỉnh sửa tài khoản'
            case AccountAction.ChangePass:
                return 'Đổi mật khẩu'
            case AccountAction.Delete:
                return 'Xóa tài khoản'
            case AccountAction.Enable:
                return 'Khóa tài khoản'
            case AccountAction.Able:
                return 'Mở khóa tài khoản'
            case AccountAction.Assign:
                return 'Thêm vai trò cho tài khoản'
            default:
                return ''
        }
    }
    const [selectedRoleId, setSelectedRoleId] = useState<string[]>()
    const renderBodyForm = () => {
        switch (accountAction) {
            case AccountAction.Create:
            case AccountAction.Edit:
                return renderBodyCreateForm()
            case AccountAction.ChangePass:
                return renderBodyChangePassForm()
            case AccountAction.Delete:
                return renderBodyDeleteForm()
            case AccountAction.Enable:
                return <div className="account-create-form">
                    <div className=''>Bạn có chắc chắn muốn vô hiệu hóa tài khoản <strong>{selection.selectedItems[0]?.fullName}</strong></div>
                </div>
            case AccountAction.Able:
                return <div className="account-create-form">
                    <div className=''>Bạn có chắc chắn muốn khôi phục tài khoản <strong>{selection.selectedItems[0]?.fullName}</strong></div>
                </div>
            case AccountAction.Assign:
                return <AssignRoleForm onChangeRoleSelect={(role: string[]) => { setSelectedRoleId(role) }} roleListSelectFromProps={selection.selectedItems[0]?.roles} />
            default:
                break;
        }
    }

    const renderBodyCreateForm = () => {
        return (
            <div className="account-create-form">
                {loadingForm ? (
                    <div className="account-create-wrap">
                        <Skeleton variant="rounded" height={40} className='account-create-field' />
                        <Skeleton variant="rounded" height={40} className='account-create-field' />
                        <Skeleton variant="rounded" height={40} className='account-create-field' />
                        <Skeleton variant="rounded" height={40} className='account-create-field' />
                        <Skeleton variant="rounded" height={40} className='account-create-field' />
                        <Skeleton variant="rounded" height={40} className='account-create-field' />
                        <Skeleton variant="rounded" height={40} className='account-create-field' />
                    </div>

                ) :
                    <div className="account-create-wrap">
                        <div className="account-create-field">
                            <TextField
                                label='Tên đăng nhập'
                                placeholder='--'
                                required={true}
                                value={userName}
                                onChange={(_, value) => { setUserName(value) }}
                            />
                        </div>
                        <div className="account-create-field">
                            <TextField
                                label='Họ và tên'
                                placeholder='--'
                                required={true}
                                value={fullName}
                                onChange={(_, value) => { setFullName(value) }}
                            />
                        </div>
                        <div className="account-create-field">
                            <TextField
                                label='CMND'
                                placeholder='--'
                                required={true}
                                value={identify}
                                onChange={(_, value) => { setIdentify(value) }}
                            />
                        </div>
                        <div className="account-create-field">
                            <TextField
                                label='Số điện thoại'
                                placeholder='--'
                                required={true}
                                value={phoneNumber}
                                onChange={(_, value) => { setPhoneNumber(value) }}
                                disabled={accountAction === AccountAction.Edit}
                            />
                        </div>
                        <div className="account-create-field">
                            <DatePicker
                                placeholder="Chọn một giá trị"
                                ariaLabel="Chọn một giá trị"
                                label='Ngày sinh'
                                isRequired={true}
                                // strings={defaultDatePickerStrings}
                                onSelectDate={(date) => { setDateOfBirth(date!) }}
                                value={!!dateOfBirth && new Date(dateOfBirth)}
                                // parseDateFromString={()}'
                                maxDate={new Date()}
                            />
                        </div>
                        <div className="account-create-field">
                            <Label required>Giới tính</Label>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={(_, value) => { setSex(Number(value)) }}
                                value={sex}
                            >
                                <FormControlLabel value={UserGender.Male} control={<Radio />} label="Nam" />
                                <FormControlLabel value={UserGender.Female} control={<Radio />} label="Nữ" />
                            </RadioGroup>
                        </div>
                        <div className="account-create-field display-flex">
                            <Label required>Trạng thái</Label>
                            <Switch
                                checked={status}
                                onChange={(_, checked) => { setStatus(checked) }}
                            />
                        </div>
                    </div>

                }
            </div>
        )
    }

    const renderBodyChangePassForm = () => {
        return (
            <div className="account-create-form">
                <div className="account-create-field">
                    <TextField
                        label='Mật khẩu mới'
                        placeholder='--'
                        required={true}
                        type="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                        value={password}
                        onChange={(_, newValue) => setpassword(newValue)}
                    />
                </div>
                <div className="account-create-field">
                    <TextField
                        label='Nhập lại mật khẩu'
                        placeholder='--'
                        required={true}
                        type="password"
                        canRevealPassword
                        revealPasswordAriaLabel="Show password"
                        value={repassword}
                        onChange={(_, newValue) => setrepassword(newValue)}
                    />
                </div>
            </div>
        )
    }

    const renderBodyDeleteForm = () => {
        return (
            <div className="account-create-form">
                <div className=''>Bạn có chắc chắn muốn xóa tài khoản <strong>{selection.selectedItems[0]?.fullName}</strong><br />Thao tác này không thể khôi phục!</div>
            </div>
        )
    }

    return (
        <div className="accountmanager-page">
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: "Quản lý tài khoản", href: "/quan-ly-tai-khoan" },
                ]}
            />
            <div className="accountmanager-page-title">Danh sách tài khoản</div>
            <div className="accountmanager-page-search">
                <SearchBoxView
                    placeholder='User Name/ Họ và tên/ CMND'
                    onSearch={(newValue) => { setSearchTerm(newValue) }}
                    onClear={() => setSearchTerm('')}
                />
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
            <div className="patient-list-table">
                <TablePager<AccountManagerTableColumns, AccountManagerTableDatas>
                    tableType={TableType.AccountManagerTable}
                    batchActionElements={onRenderActionButtons()}
                    rowData={rows}
                    dataTotal={datas}
                    hasCheckBox
                    hasTablePaging
                    page={currentPage - 1}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={totalItems}
                    isLoading={loadingAccount}
                />
            </div>
            <DialogView
                title={renderTitleForm()}
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
    );
}

export default AccountManagerPage