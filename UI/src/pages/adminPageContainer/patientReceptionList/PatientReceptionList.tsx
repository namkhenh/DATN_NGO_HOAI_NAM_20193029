import React, {useEffect, useState} from 'react'
import './PatientReceptionList.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb';
import {SearchBoxView} from '../../../common/searchBox/SearchBox';
import {Label} from '@fluentui/react';
import {DatePicker} from '../../../common/datePicker/DatePicker';
import TablePager from '../../../common/tablePager/TablePager';
import {PatientReceptionTableColumns, PatientReceptionTableDatas, TableType, UserGender} from '../../../model/enum/tableTypeEnum';
import PatientListCommandBar from '../patientListPage/PatientListCommandBar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { PatientRecordService } from '../../../api/apiPage/apiPage';
import { utils, writeFile } from 'xlsx';
import DialogView from '../../../common/dialog/Dialog';
import { useStateValue } from '../../../context/StateProvider';
import { MessageBarStatus } from '../../../model/enum/messageBarEnum';
import { actionType } from '../../../context/Reducer';

function PatientReceptionList() {
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0)
    const [rows, setRow] = useState<PatientReceptionTableColumns[]>([createData(new Date(), '', '', true, '', new Date(), 0, '')])
    const [dataExport, setDataExport] = useState<any[]>([])
    const [datas, setData] = useState<PatientReceptionTableDatas[]>([{
        profileId: '',
        profileCode: '',
        profileTime: new Date(),
        profileReason: '',
        patientId: '',
        patientCode: '',
        patientName: '',
        emergencyStatus: true,
        patientDateOfBirth: new Date(),
        patientGender: 0,
        patientPhoneNumber: '',
        patientIdentityNumber: '',
        patientAddress: '',
    }])
    const [loading, setLoading] = useState<boolean>(false)
    const [{ selection }, dispatch] = useStateValue()
    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }
    const onSearch = (newValue: string) => {
        console.log(newValue);

    }

    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.PatientReceptionListTable}
                export={exportToExcel}
                showDeleteProfile={() => setShowDialog(true)}
            />
        ])
    }

    const exportToExcel = () => {
        //Tạo dữ liệu để xuất ra file Excel
        const data = [
            ['Mã hồ sơ', 'Ngày đăng kí', 'Mã bệnh nhân', 'Cấp cứu', 'Tên bệnh nhân', 'Ngày sinh', 'Giới tính', 'Số điện thoại'],
            ...dataExport
        ];

        // Tạo workbook và worksheet
        const workbook = utils.book_new();
        const worksheet = utils.aoa_to_sheet(data);

        // Thêm worksheet vào workbook
        utils.book_append_sheet(workbook, worksheet, 'Danh sách bệnh nhân');

        // Xuất file Excel
        writeFile(workbook, 'danh_sach_benh_nhan.xlsx');
    };

    function createData(
        profileTimeI: Date,
        profileCode: string,
        patientCode: string,
        emergencyStatusI: boolean,
        patientName: string,
        patientDateOfBirthI: Date,
        patientGenderI: number,
        patientPhoneNumber: string,
    ): PatientReceptionTableColumns {
        let patientDateOfBirth: string = `${new Date(patientDateOfBirthI).getDate()}/${new Date(patientDateOfBirthI).getMonth() + 1}/${new Date(patientDateOfBirthI).getFullYear()}`
        let profileTime: string = `${new Date(profileTimeI).getDate()}/${new Date(profileTimeI).getMonth() + 1}/${new Date(profileTimeI).getFullYear()} -- ${new Date(profileTimeI).getHours()}h:${new Date(profileTimeI).getMinutes()}`
        let emergencyStatus: JSX.Element = emergencyStatusI ? <CheckCircleIcon color='success' /> : <UnpublishedIcon color='error' />
        let patientGender: string = patientGenderI === UserGender.Male ? 'Nam' : 'Nữ'
        return {
            profileCode,
            profileTime,
            patientCode,
            emergencyStatus,
            patientName,
            patientDateOfBirth,
            patientGender,
            patientPhoneNumber
        };
    }

    const getPatient = () => {
        let requestBody = {
            pageIndex: currentPage,
            pageSize: 10,
            searchTerm: ''
        }
        setLoading(true)
        PatientRecordService.getPagingPatientRecord(requestBody).then(res => {
            if (res.success) {
                setLoading(false)
                let rows: PatientReceptionTableColumns[] = []
                let datas: PatientReceptionTableDatas[] = []
                let dataExport: any[] = []
                !!res.data?.items && res.data.items.forEach((element: any) => {
                    rows.push(createData(element?.createdDate, element?.code, element?.user?.code, element?.emergency, element?.user?.fullName, element?.user?.dateOfBirth, element?.user?.sex, element?.user?.phoneNumber))
                    datas.push({
                        profileId: element?.id,
                        profileCode: element?.code,
                        profileTime: element?.createdDate,
                        profileReason: '',
                        patientId: element?.user?.id,
                        patientCode: element?.user?.code,
                        patientName: element?.user?.fullName,
                        emergencyStatus: element?.emergency,
                        patientDateOfBirth: element?.user?.dateOfBirth,
                        patientGender: element?.user?.sex,
                        patientPhoneNumber: element?.user?.phoneNumber,
                        patientIdentityNumber: element?.user?.cmnd,
                        patientAddress: '',
                    })
                    dataExport.push([element?.code, `${new Date(new Date()).getDate()}/${new Date(new Date()).getMonth() + 1}/${new Date(new Date()).getFullYear()} --  ${new Date(new Date()).getHours()}h:${new Date(new Date()).getMinutes()}`, element?.user?.code, true ? 'Đúng' : 'Không', element?.user?.fullName, `${new Date(element?.user?.dateOfBirth).getDate()}/${new Date(element?.user?.dateOfBirth).getMonth() + 1}/${new Date(element?.user?.dateOfBirth).getFullYear()}`, element?.user?.sex === UserGender.Male ? 'Nam' : 'Nữ', element?.user?.phoneNumber])
                })
                setRow(rows)
                setData(datas)
                setDataExport(dataExport)
                setTotalItems(!!res.data?.metaData ? res.data.metaData.totalCount : 0)
            } else {
                setLoading(false)
                setRow([])
            }
        })
    }

    useEffect(() => {
        getPatient()
    }, [currentPage])

    const onSave = () => {
        setLoadingButton(true)
        const result = PatientRecordService.deletePatientRecord(selection.selectedItems[0]?.profileId).then(res => {
            setLoadingButton(false)
            if (res.success) {
                showMessageBar('Xóa hồ sơ thành công!', true, MessageBarStatus.Success)
                setShowDialog(false)
                getPatient()
            } else {
                showMessageBar('Xóa hồ sơ thất bại!', true, MessageBarStatus.Error)
            }
        })
        return result
    }

    return (
        <div className='patientlist-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Tiếp đón bệnh nhân', href: '/tiep-don-benh-nhan' },
                ]}
            />
            <div className="patientlist-page-title">
                Danh sách bệnh nhân
            </div>
            <div className="patientlist-page-search">
                <div className="search-date">
                    <Label>Ngày đăng ký:</Label>
                    <div className="search-date-item">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Chọn một giá trị"
                            isRequired={false}
                            // strings={defaultDatePickerStrings}
                            // onSelectDate={(date) => { onChangeOneFieldForm(PatientProfileModelProperty.patientDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`) }}
                            value={new Date()}
                            // parseDateFromString={()}'
                            maxDate={new Date()}
                        />
                    </div>
                    <div className='line' style={{ width: '12px', height: '1px', backgroundColor: '#000000', margin: '0 8px' }}></div>
                    <div className="search-date-item">
                        <DatePicker
                            placeholder="Chọn một giá trị"
                            ariaLabel="Chọn một giá trị"
                            isRequired={false}
                            // strings={defaultDatePickerStrings}
                            // onSelectDate={(date) => { onChangeOneFieldForm(PatientProfileModelProperty.patientDateBirth, `${date?.getMonth()}/${date?.getDay()}/${date?.getFullYear()}`) }}
                            value={new Date()}
                            // parseDateFromString={()}'
                            maxDate={new Date()}
                        />
                    </div>
                </div>
                <div className="search-id">
                    <SearchBoxView
                        placeholder='Mã bệnh nhân/ Số điện thoại/ CMND'
                        onSearch={onSearch}
                    />
                </div>
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
            {/* <DataTable/> */}

            <div className="patient-list-table">
                <TablePager<PatientReceptionTableColumns, PatientReceptionTableDatas>
                    tableType={TableType.PatientReceptionListTable}
                    batchActionElements={onRenderActionButtons()}
                    rowData={rows}
                    dataTotal={datas}
                    hasCheckBox
                    hasTablePaging
                    page={currentPage - 1}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={totalItems}
                    hasNavigate
                    navigateLink={"/admin/tiep-don-benh-nhan/chi-dinh-dich-vu/"}
                    isLoading={loading}
                />
            </div>
            <DialogView
                title={'Xóa hồ sơ'}
                hidden={!showDialog}
                customContent={<span>Bạn có chắc chắn muốn xóa hồ sơ <strong>{selection.selectedItems[0]?.profileCode}</strong><br />Thao tác này không thể khôi phục!</span>}
                // closeWithPromise={this.onLogoutAction.bind(this)}
                // confirm={this.handlecClosePopup.bind(this)}
                confirmButtonText={'Lưu'}
                confirmWithPromise={onSave}
                closeButtonText='Hủy bỏ'
                close={() => setShowDialog(false)}
                loading={loadingButton}
            />
        </div>
    )
}

export default PatientReceptionList