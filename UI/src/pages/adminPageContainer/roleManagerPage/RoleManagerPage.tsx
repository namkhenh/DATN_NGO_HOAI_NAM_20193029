import React, { useEffect, useState } from 'react'
import './RoleManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { SearchBoxView } from '../../../common/searchBox/SearchBox';
import TablePager from '../../../common/tablePager/TablePager';
import { RoleManagerTableColumns, RoleManagerTableDatas, TableType } from '../../../model/enum/tableTypeEnum';
import PatientListCommandBar from '../patientListPage/PatientListCommandBar';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import { RoleService } from '../../../api/apiPage/apiPage';
import DialogView from '../../../common/dialog/Dialog';
import { useStateValue } from '../../../context/StateProvider';
import { actionType } from '../../../context/Reducer';
import { MessageBarStatus } from '../../../model/enum/messageBarEnum';

export enum RoleStatus {
    Able,
    Enable
}

export enum RoleAction {
    Create,
    Edit,
    Assign,
    Delete
}

function RoleManagerPage() {
    const [roleSelected, setRoleSelected] = useState<RoleManagerTableDatas>()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [showDialog, setShowDialog] = useState<boolean>()
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [totalItems, setTotalItems] = useState<number>(0)
    const [isLoading, setLoading] = useState<boolean>(false)
    const [rows, setRow] = useState<RoleManagerTableColumns[]>([createData('', '', '')])
    const [datas, setData] = useState<RoleManagerTableDatas[]>([{
        id: '',
        code: '',
        name: '',
        description: '',
        status: true
    }])
    const [{ selection }, dispatch] = useStateValue();
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.RoleManagerTable}
                showRoleDelete={() => { setShowDialog(true) }}
            />
        ])
    }

    useEffect(() => {
        if (selection.selectedCount === 1) {
            setRoleSelected(selection.selectedItems[0])
        }
    }, [selection])

    const getRole = () => {
        let requestBody = {
            pageIndex: currentPage,
            pageSize: 10,
            searchTerm: searchTerm
        }
        setLoading(true)
        setRow([createData('', '', '')])
        RoleService.getRolePaging(requestBody).then(res => {
            setLoading(false)
            let rows: RoleManagerTableColumns[] = []
            let datas: RoleManagerTableDatas[] = []
            !!res.data && res.data?.items?.forEach((element: any) => {
                rows.push(createData(element.code, element.name, element.description, element.status))
                datas.push({
                    id: element.id,
                    code: element.code,
                    name: element.name,
                    description: element.description,
                    status: element.status
                })
            });
            setRow(rows)
            setData(datas)
            setTotalItems(!!res.data ? res.data?.metaData?.totalCount : 0)
        })
    }

    useEffect(() => {
        getRole()
    }, [currentPage, searchTerm])

    function createData(
        roleCode: string,
        roleName: string,
        roleDescription: string,
        roleStatusI?: boolean
    ): RoleManagerTableColumns {
        // let add: JSX.Element = <Checkbox checked={addI === 1} onClick={() => {console.log(addI);
        // }}/>
        // let edit: JSX.Element = <Checkbox checked={editI === 1} />
        // let remove: JSX.Element = <Checkbox checked={removeI === 1} />
        let roleStatus: JSX.Element = roleStatusI ? <div className='status-element'><CheckCircleOutlineOutlinedIcon sx={{ color: '#2da55b86' }} />Hoạt động</div> : (!roleStatusI ? <div className='status-element'><NotInterestedOutlinedIcon sx={{ color: '#ff4646b4' }} />Vô hiệu hóa</div> : <></>)
        return {
            roleCode,
            roleName,
            roleDescription,
            roleStatus
        };
    }

    const onDelete = () => {
        setLoadingButton(true)
        const result = RoleService.deleteRole(roleSelected?.id).then(res => {
            if (res.success) {
                setLoadingButton(false)
                setShowDialog(false)
                showMessageBar("Xóa vai trò thành công!", true, MessageBarStatus.Success)
                getRole()
            } else {
                setLoadingButton(false)
                setShowDialog(false)
                showMessageBar("Xóa vai trò thất bại!", true, MessageBarStatus.Error)
            }
        })
        return result
    }

    return (
        <div className='rolemanager-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Quản lý vai trò', href: '/quan-ly-vai-tro' },
                ]}
            />
            <div className="rolemanager-page-title">
                Danh sách vai trò
            </div>
            <div className="rolemanager-page-search">
                <div className="search-id">
                    <SearchBoxView
                        placeholder='Mã vai trò'
                        onSearch={(newValue) => { setSearchTerm(newValue) }}
                        onClear={() => setSearchTerm('')}
                    />
                </div>
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
            <div className="patient-list-table">
                <TablePager<RoleManagerTableColumns, RoleManagerTableDatas>
                    tableType={TableType.RoleManagerTable}
                    batchActionElements={onRenderActionButtons()}
                    rowData={rows}
                    dataTotal={datas}
                    hasCheckBox
                    hasTablePaging
                    page={currentPage - 1}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={totalItems}
                    hasNavigate
                    navigateLink='/admin/quan-ly-vai-tro/chi-tiet-vai-tro/'
                    isLoading={isLoading}
                />
            </div>
            <DialogView
                title={'Xóa vai trò'}
                hidden={!showDialog}
                customContent={<div className=''>Bạn có chắc chắn muốn xóa vai trò <strong>{roleSelected?.name}</strong><br />Thao tác này không thể khôi phục!</div>}
                // closeWithPromise={this.onLogoutAction.bind(this)}
                // confirm={this.handlecClosePopup.bind(this)}
                confirmButtonText={'Xóa'}
                confirmWithPromise={onDelete}
                closeButtonText='Hủy bỏ'
                close={() => { setShowDialog(false) }}
                loading={loadingButton}
            />
        </div>
    )
}

export default RoleManagerPage