import React, { useEffect, useState } from 'react'
import './AddRolePage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { TextField } from '../../../common/textField/TextField'
import { DatePicker } from '../../../common/datePicker/DatePicker'
import {
    ActionTableDatas,
    PermissionManagerTableColumns,
    PermissionManagerTableDatas,
    TableType
} from '../../../model/enum/tableTypeEnum'
import TablePager from '../../../common/tablePager/TablePager'
import PatientListCommandBar from '../patientListPage/PatientListCommandBar'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import { Label } from '@fluentui/react/lib/Label'
import Switch from '@mui/material/Switch'
import DialogView from '../../../common/dialog/Dialog'
import Checkbox from "@mui/material/Checkbox";
import { useStateValue } from '../../../context/StateProvider'
import { MessageBarStatus } from '../../../model/enum/messageBarEnum'
import { actionType } from '../../../context/Reducer'
import { Dropdown } from '../../../common/dropdown/DropDown'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ContentPasteOffOutlinedIcon from "@mui/icons-material/ContentPasteOffOutlined";
import { RoleAction } from '../roleManagerPage/RoleManagerPage'
import Button from '@mui/material/Button'
import { ButtonColorType, ButtonVariantType, LoadingPosition } from '../../../model/enum/buttonEnum'
import { ActionService, MenuService, PermissionActionService, PermissionService, RoleService } from '../../../api/apiPage/apiPage'
import { IDropdownOption } from '@fluentui/react'
import Skeleton from '@mui/material/Skeleton'
import SubmitButton from '../../../common/button/SubmitButton'
import { useParams } from 'react-router-dom'

export enum PermissionStatus {
    Able,
    Enable
}

export enum PermissionAction {
    Create,
    Edit,
    Delete
}

interface AddRolePageProps {
    actionType: RoleAction
}

function AddRolePage(props: AddRolePageProps) {
    const roleIdFromProps = useParams().id;
    const [roleId, setRoleId] = useState<string>()
    const [roleName, setRoleName] = useState<string>()
    const [roleCode, setRoleCode] = useState<string>()
    const [roleDescription, setRoleDescription] = useState<string>()
    const [roleStatus, setRoleStatus] = useState<boolean>(true)
    const [roleStartTime, setRoleStart] = useState<Date>(new Date())
    const [roleEndTime, setRoleEnd] = useState<Date>(new Date())

    const [permissionName, setPermissionName] = useState<string>()
    const [permissionCode, setPermissionCode] = useState<string>()
    const [permissionStatus, setPermissionStatus] = useState<boolean>(true)
    const [permissionStartTime, setPermissionStart] = useState<Date>(new Date())
    const [permissionEndTime, setPermissionEnd] = useState<Date>(new Date())

    const [menuOption, setMenuOption] = useState<IDropdownOption[]>([])
    const [selectMenuId, setSelectMenu] = useState<string>()

    const [isLoadingAction, setLoadingAction] = useState<boolean>(false)
    const [loadingButtonRole, setLoadingButtonRole] = useState<boolean>(false)
    const [loadingButtonPer, setLoadingButtonPer] = useState<boolean>(false)
    const [loadingPermission, setLoadingPermission] = useState<boolean>(false)
    const [loadingPerDetail, setLoadingPerDetail] = useState<boolean>(false)
    const [loadingRoleDetail, setLoadingRoleDetail] = useState<boolean>(false)

    const [rows, setRow] = useState<PermissionManagerTableColumns[]>([createData('', '', '')])
    const [datas, setData] = useState<PermissionManagerTableDatas[]>([{
        id: '',
        code: '',
        name: '',
        path: '',
        roleId: '',
        menuId: '',
        status: true
    }]
    )

    const [actions, setAction] = useState<ActionTableDatas[]>([])
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [permissionAction, setPermissionAction] = useState<PermissionAction>()
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [{ selection }, dispatch] = useStateValue();
    
    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.PermissionTable}
                showPermissionCreate={() => { setShowDialog(true); setPermissionAction(PermissionAction.Create) }}
                showPermissionEdit={() => { setShowDialog(true); setPermissionAction(PermissionAction.Edit) }}
                showPermissionDelete={() => { setShowDialog(true); setPermissionAction(PermissionAction.Delete) }}
            />
        ])
    }

    useEffect(() => {
        if (props.actionType === RoleAction.Edit) {
            setRoleId(roleIdFromProps!)
            setLoadingPermission(true)
            setLoadingRoleDetail(true)
        }
        MenuService.getMenu().then(res => {
            let menuOption: IDropdownOption[] = []
            if (res.success) {
                res.data?.forEach((element: any) => {
                    menuOption.push({
                        key: element.id,
                        text: element.name,
                    })
                    setMenuOption(menuOption)
                })
            }
        })
    }, [])

    useEffect(() => {
        if (!!selectMenuId) {
            setLoadingAction(true)
            ActionService.getActionByMenuId(selectMenuId).then(res => {
                let actionOption: ActionTableDatas[] = []
                if (res.success) {
                    setLoadingAction(false)
                    res.data?.forEach((element: any) => {
                        actionOption.push({
                            id: element.id,
                            code: element.code,
                            name: element.name,
                            path: element.code,
                            menuId: element.menuId,
                        })
                        setAction(actionOption)
                    })
                }
            })
        }
    }, [selectMenuId])

    useEffect(() => {
        if (roleId) {
            if (loadingRoleDetail) {
                RoleService.getRoleDetail(roleId).then(res => {
                    if (res.success) {
                        setRoleCode(res.data?.code)
                        setRoleName(res.data?.name)
                        setRoleDescription(res.data?.description ? res.data?.description : '')
                        setRoleStatus(res.data?.status)
                        setRoleStart(res.data?.startDate)
                        setRoleEnd(res.data?.endDate)
                        setLoadingRoleDetail(false)
                    } else {
                        setLoadingRoleDetail(false)
                    }
                })
            }

            if (loadingPermission) {
                setRow([createData('', '', '')])
                setData([{
                    id: '',
                    code: '',
                    name: '',
                    path: '',
                    roleId: '',
                    menuId: '',
                    status: true
                }])
                PermissionService.getPermissionByRoleId(roleId).then(res => {
                    if (res.success) {
                        let rows: PermissionManagerTableColumns[] = []
                        let datas: PermissionManagerTableDatas[] = []
                        !!res.data && res.data?.forEach((e: any) => {
                            rows.push(createData(e.code, e.name, e.menu.name, e.status))
                            datas.push({
                                id: e.id,
                                code: e.code,
                                name: e.name,
                                roleId: e.roleId,
                                path: e.path,
                                menuId: e.menuId,
                                status: e.status
                            })
                        })
                        setLoadingPermission(false)
                        setRow(rows)
                        setData(datas)
                    } else {
                        setLoadingPermission(false)
                        setRow([])
                        setData([])
                    }
                })
            }
        }
    }, [loadingPermission, loadingRoleDetail])

    const changePermission = () => {
        let requestBodyCreatePermission = {
            id: permissionAction === PermissionAction.Create ? '00000000-0000-0000-0000-000000000000' : selection.selectedItems[0]?.id,
            code: permissionCode,
            name: permissionName,
            path: '',
            status: permissionStatus,
            startDate: permissionStartTime,
            endDate: permissionEndTime,
            roleId: roleId,
            menuId: selectMenuId
        }
       
        if (permissionAction === PermissionAction.Create) {
            setLoadingButtonPer(true)
            const result = PermissionService.createPermission(requestBodyCreatePermission).then(res => {
                if (res.success) {
                    let requestBodyPerAct = {
                        permissionActions: {
                            key: res.data?.id,
                            value: selected
                        }
                    }
                    showMessageBar("Tạo quyền thành công!", true, MessageBarStatus.Success)
                    PermissionActionService.createPermissionAction(requestBodyPerAct).then(res => {
                        if (res.success) {
                            setLoadingButtonPer(false)
                            closeForm()
                            setLoadingPermission(true)
                            showMessageBar("Gán thao tác thành công!", true, MessageBarStatus.Success)
                        } else {
                            setLoadingButtonPer(false)
                            closeForm()
                            setLoadingPermission(true)
                            showMessageBar(`Gán thao tác thất bại! \n${res.message ? res.message : ''}`, true, MessageBarStatus.Error)
                        }
    
                    })
                } else {
                    setLoadingButtonPer(false)
                    showMessageBar(`Tạo quyền thất bại! \n${res.message ? res.message : ''}`, true, MessageBarStatus.Error)
                }
            })
            return result
        }
        if (permissionAction === PermissionAction.Edit) {
            setLoadingButtonPer(true)
            let requestBodyPerAct = {
                permissionActions: {
                    key: selection.selectedItems[0]?.id,
                    value: selected
                }
            }
            const result = Promise.all([PermissionService.updatePermission(requestBodyCreatePermission), PermissionActionService.updatePermissionAction(requestBodyPerAct)]).then(res => {
                if (res[0].success) {
                    showMessageBar("Cập nhật quyền thành công!", true, MessageBarStatus.Success)
                    if (res[1].success) {
                        showMessageBar("Gán thao tác thành công!", true, MessageBarStatus.Success)
                        setLoadingPermission(true)
                        closeForm()
                    } else {
                        showMessageBar("Gán thao tác thất bại!", true, MessageBarStatus.Error)
                        setLoadingPermission(true)
                        closeForm()
                    }
                } else {
                    showMessageBar("Cập nhật quyền thất bại!", true, MessageBarStatus.Error)
                }
            }).finally(() => setLoadingButtonPer(false))
            return result
        }
        return new Promise((res) => { })
    }

    const changeRole = () => {
        let requestCreateRole = {
            id: roleId,
            code: roleCode,
            name: roleName,
            status: roleStatus,
            startDate: roleStartTime,
            endDate: roleEndTime,
            description: roleDescription
        }
        setLoadingButtonRole(true)
        if (props.actionType === RoleAction.Create) {
            const result = RoleService.createRole(requestCreateRole).then(res => {
                if (res.success) {
                    setRoleId(res.data?.id)
                    setLoadingRoleDetail(true)
                    setRow([])
                    setData([])
                    setLoadingButtonRole(false)
                    showMessageBar("Tạo vai trò thành công!", true, MessageBarStatus.Success)
                } else {
                    setLoadingButtonRole(false)
                    showMessageBar(`Tạo vai trò thất bại! \n${res.message ? res.message : ''}`, true, MessageBarStatus.Error)
                }
            })
            return result
        } else {
            console.log(requestCreateRole.endDate);
            console.log(roleEndTime);
            
            const result = RoleService.updateRole(requestCreateRole).then(res => {
                if (res.success) {
                    setLoadingButtonRole(false)
                    setLoadingRoleDetail(true)
                    showMessageBar("Cập nhật vai trò thành công!", true, MessageBarStatus.Success)
                } else {
                    setLoadingButtonRole(false)
                    showMessageBar(`Cập nhật vai trò thất bại! \n${res.message ? res.message : ''}`, true, MessageBarStatus.Error)
                }
            })
            return result
        }
       
    }

    const deletePermission = () => {
        if (permissionAction === PermissionAction.Delete) {
            setLoadingButtonPer(true)
            const result = PermissionService.deletePermission(selection.selectedItems[0]?.id).then(res => {
                if (res.success) {
                    setLoadingButtonPer(false)
                    closeForm()
                    setLoadingPermission(true)
                    showMessageBar("Xóa vai trò thành công!", true, MessageBarStatus.Success)
                } else {
                    setLoadingButtonPer(false)
                    closeForm()
                    showMessageBar("Xóa vai trò thất bại!", true, MessageBarStatus.Error)
                }
            })
            return result
        }
        return new Promise((res) => { })
    }

    function createData(
        permissionCode: string,
        permissionName: string,
        permissionMenu: string,
        permissionStatusI?: PermissionStatus
    ): PermissionManagerTableColumns {
        let permissionStatus: JSX.Element = permissionStatusI ? <div className='status-element'><CheckCircleOutlineOutlinedIcon sx={{ color: '#2da55b86' }} />Hoạt động</div> : <div className='status-element'><NotInterestedOutlinedIcon sx={{ color: '#ff4646b4' }} />Vô hiệu hóa</div>
        return {
            permissionCode,
            permissionName,
            permissionMenu,
            permissionStatus
        };
    }

    const renderTitleForm = () => {
        switch (permissionAction) {
            case PermissionAction.Create:
                return 'Tạo quyền'
            case PermissionAction.Edit:
                return 'Chỉnh sửa quyền'
            case PermissionAction.Delete:
                return 'Xóa quyền'
            default:
                return ''
        }
    }

    const renderBodyForm = () => {
        switch (permissionAction) {
            case PermissionAction.Create:
            case PermissionAction.Edit:
                return renderBodyCreateForm()
            case PermissionAction.Delete:
                return renderBodyDeleteForm()
            default:
                break;
        }
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newSelected: string[] = []
        if (event.target.checked) {
            actions.forEach((row: ActionTableDatas, i) => { return newSelected.push(row.id) });
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, rowChild: ActionTableDatas) => {
        let rowChildText: string = rowChild.id
        const selectedIndex = selected.indexOf(rowChildText);
        let newSelected: readonly string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, rowChildText);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (rowChild: any) => {
        let rowChildText: string = rowChild[Object.keys(rowChild)[0]]
        return selected.indexOf(rowChildText) !== -1;
    };

    const renderBodyCreateForm = () => {
        return ( 
            <div className="permission-create-form">
                {loadingPerDetail ? (
                    <div className="permission-create-wrap">
                        <Skeleton variant="rounded" height={40} className='permission-create-item' />
                        <Skeleton variant="rounded" height={40} className='permission-create-item' />
                        <Skeleton variant="rounded" height={40} className='permission-create-item' />
                        <Skeleton variant="rounded" height={40} className='permission-create-item' />
                        <Skeleton variant="rounded" height={40} className='permission-create-item' />
                        <Skeleton variant="rounded" height={40} className='permission-create-item' />
                    </div>
                ) : (
                        <div className="permission-create-wrap">
                            <div className="permission-create-item">
                                <TextField
                                    label='Mã quyền'
                                    required
                                    placeholder='--'
                                    value={permissionCode}
                                    onChange={(_, value) => {
                                        setPermissionCode(value)
                                    }}
                                />
                            </div>
                            <div className="permission-create-item">
                                <TextField
                                    label='Tên quyền'
                                    required
                                    placeholder='--'
                                    value={permissionName}
                                    onChange={(_, value) => {
                                        setPermissionName(value)
                                    }}
                                />
                            </div>
                            <div className="permission-create-item">
                                <DatePicker
                                    placeholder="Chọn một giá trị"
                                    ariaLabel="Chọn một giá trị"
                                    label='Thời gian bắt đầu'
                                    isRequired={true}
                                    onSelectDate={(date) => {
                                        setPermissionStart(date!)
                                    }}
                                    value={new Date(permissionStartTime)}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="permission-create-item">
                                <DatePicker
                                    placeholder="Chọn một giá trị"
                                    ariaLabel="Chọn một giá trị"
                                    label='Thời gian kết thúc'
                                    isRequired={true}
                                    onSelectDate={(date) => {
                                        setPermissionEnd(date!)
                                    }}
                                    value={new Date(permissionEndTime)}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="permission-create-item">
                                <Dropdown
                                    placeholder="--"
                                    label="Menu"
                                    options={menuOption}
                                    selectedKey={selectMenuId}
                                    required
                                    onChange={(_, selected) => {
                                        setSelectMenu(String(selected?.key))
                                        setSelected([])
                                    }}
                                    errorMessage={''}
                                />
                            </div>
                            <div className="permission-create-item">
                                <Label required>Trạng thái</Label>
                                <Switch
                                    checked={permissionStatus}
                                    onChange={(_, checked) => { setPermissionStatus(checked) }}
                                />
                            </div>
                        </div>
                )}
                
                <div className="role-assign-list">
                    {isLoadingAction ?
                        (
                            Array.from({ length: 5 }).map((item, index) => (
                                <>
                                    <Skeleton variant="rounded" height={30}
                                        style={{ opacity: 1 - 0.15 * index, marginBottom: '8px' }} />
                                </>
                            ))
                        ) :
                        (actions.length !== 0 ?
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox" align='center'>
                                                <Checkbox
                                                    color="primary"
                                                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                                                    checked={actions.length > 0 && selected.length === actions.length}
                                                    onChange={handleSelectAllClick}
                                                    inputProps={{
                                                        "aria-label": "select all desserts",
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align='center'>Tên thao tác</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {actions.map((row, index) => {
                                            const isItemSelected = isSelected(row);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={index}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox" align='center'>
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                "aria-labelledby": labelId,
                                                            }}
                                                            onClick={(event) => { handleClick(event, row) }}
                                                        />
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" align='center'>
                                                        {row.name}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer> :
                            <div className="role-assign-list-nodata">
                                <ContentPasteOffOutlinedIcon />
                                Không có dữ liệu để hiển thị
                            </div>)}
                </div>
            </div>
        )
    }

    const renderBodyDeleteForm = () => {
        return (
            <div className="permission-delete-form">
                <div className=''>Bạn có chắc chắn muốn xóa quyền <strong>{selection.selectedItems[0]?.name}</strong><br />Thao tác này không thể khôi phục!</div>
            </div>
        )
    }

    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    useEffect(() => {
        if (permissionAction === PermissionAction.Create) {
            // setPermissionCode('')
            // setPermissionName('')
            // setSelectMenu('')
            // setPermissionStatus(true)
            // setSelected([])
            // setAction([])
        }

        if (permissionAction === PermissionAction.Edit) {
            setLoadingPerDetail(true)
            let actionsId: string[] = [] 
            PermissionService.getPermissionById(selection.selectedItems[0]?.id).then(res => {
                if (res.success) {
                    setLoadingPerDetail(false)
                    setPermissionCode(res.data?.code)
                    setPermissionName(res.data?.name)
                    setPermissionStart(res.data?.startDate)
                    setPermissionEnd(res.data?.endDate)
                    setSelectMenu(res.data?.menuId)
                    setPermissionStatus(res.data?.status)
                    !!res.data?.actions && res.data?.actions.forEach((action: ActionTableDatas) => {
                        actionsId.push(action?.id)
                    })
                    setSelected(actionsId)
                } else {
                    setLoadingPerDetail(false)
                    showMessageBar("Đã có lỗi xảy ra!", true, MessageBarStatus.Error)
                }
            })
        }
    }, [showDialog])

    const closeForm = () => {
        setShowDialog(false)
        setPermissionCode('')
        setPermissionName('')
        setPermissionStart(new Date())
        setPermissionEnd(new Date())
        setPermissionStatus(true)
        setSelectMenu('')
        setAction([])
        setSelected([])
        setLoadingPerDetail(false)
        setPermissionAction(undefined)
    }

    return (
        <div className='addrole-page'>
            <BreadCrumb
                breadcrumbItem={props.actionType === RoleAction.Create ? [
                    { key: 1, text: 'Quản lý vai trò', href: '/admin/quan-ly-vai-tro' },
                    { key: 2, text: 'Thêm mới vai trò', href: '/quan-ly-vai-tro/them-moi-vai-tro' },
                ] :
                    [
                        { key: 1, text: 'Quản lý vai trò', href: '/admin/quan-ly-vai-tro' },
                        { key: 2, text: 'Chi tiết vai trò', href: '/quan-ly-vai-tro/chi-tiet-vai-tro' },
                    ]}
            />
            <div className="addrole-page-title">
                {props.actionType === RoleAction.Create ? 'Thêm mới vai trò' : 'Chi tiết vai trò'}
            </div>
            <div className="addrole-page-body">
                <div className="addrole-page-sub-title">
                    Thông tin vai trò
                </div>
                {loadingRoleDetail ? (
                    <div className="addrole-page-wrap">
                        <Skeleton variant="rounded" height={40} className='addrole-info-item' />
                        <Skeleton variant="rounded" height={40} className='addrole-info-item' />
                        <Skeleton variant="rounded" height={40} className='addrole-info-item' />
                        <Skeleton variant="rounded" height={40} className='addrole-info-item' />
                        <Skeleton variant="rounded" height={40} className='addrole-info-item' />
                        <Skeleton variant="rounded" height={40} className='addrole-info-item' />
                    </div>
                ) :
                    <div className="addrole-page-wrap">
                        <div className="addrole-info-item">
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
                        <div className="addrole-info-item">
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
                        <div className="addrole-info-item">
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
                        <div className="addrole-info-item">
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
                        <div className="addrole-info-item">
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
                        <div className="addrole-info-item">
                            <Label required>Trạng thái</Label>
                            <Switch
                                checked={roleStatus}
                                onChange={(_, checked) => { setRoleStatus(checked) }}
                            />
                        </div>
                    </div>}
                <div className="add-role-button">
                    <Button variant={ButtonVariantType.Outlined} color={ButtonColorType.Inherit}>Hủy</Button>
                    {true && <SubmitButton
                        id={'common-dialog-default'}
                        text={props.actionType === RoleAction.Create ? 'Tạo' : 'Cập nhật'}
                        // disable={!canUpdate}
                        buttonVariantType={ButtonVariantType.Contained}
                        promise={changeRole}
                        loading={loadingButtonRole}
                        loadingPosition={LoadingPosition.Center}

                    />}
                </div>
                {!!roleId &&
                    <>
                        <div className="addrole-page-sub-title">
                            Danh sách quyền
                        </div>
                        <div className="addrole-page-wrap">
                            <TablePager<PermissionManagerTableColumns, PermissionManagerTableDatas>
                                tableType={TableType.PermissionTable}
                                batchActionElements={onRenderActionButtons()}
                                rowData={rows}
                                dataTotal={datas}
                                hasCheckBox
                                hasTablePaging={false}
                                page={currentPage}
                                handleChangePage={(page) => { setCurrentPage(page) }}
                                total={10}
                                className='addrole-page-table'
                                isLoading={loadingPermission}
                            />
                        </div>
                    </>

                }
            </div>
            <DialogView
                title={renderTitleForm()}
                hidden={!showDialog}
                customContent={renderBodyForm()}
                // closeWithPromise={this.onLogoutAction.bind(this)}
                // confirm={this.handlecClosePopup.bind(this)}
                confirmButtonText={'Lưu'}
                confirmWithPromise={permissionAction === PermissionAction.Delete ? deletePermission : changePermission}
                closeButtonText='Hủy bỏ'
                close={closeForm}
                loading={loadingButtonPer}
            />
        </div>
    )
}

export default AddRolePage