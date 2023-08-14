import React, {useEffect, useState} from 'react'
import './PaidManagerPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import {Label} from '@fluentui/react/lib/Label'
import {DatePicker} from '../../../common/datePicker/DatePicker'
import TablePager from '../../../common/tablePager/TablePager'
import {PaidListTableColumns, PaidListTableDatas, PatientReceptionTableColumns, PatientReceptionTableDatas, TableType, UserGender} from '../../../model/enum/tableTypeEnum'
import {PaidStatus} from '../paidDetailManagerPage/PaidDetailManagerPage'
import {Dropdown} from '../../../common/dropdown/DropDown'
import PatientListCommandBar from '../patientListPage/PatientListCommandBar'
import { PatientRecordService } from '../../../api/apiPage/apiPage'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

function PaidManagerPage() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0)
    const [rows, setRow] = useState<PatientReceptionTableColumns[]>([createData(new Date(), '', '', true, '', new Date(), 0, '')])
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
    const onSearch = (newValue: string) => {
        console.log(newValue);

    }

    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.PaidManagerTable}
            />
        ])
    }

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

    return (
        <div className='paidmanager-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Thanh toán ngoại trú', href: '/admin/danh-sach-benh-nhan' },
                ]}
            />
            <div className="paidmanager-page-title">
                Danh sách bệnh nhân
            </div>
            <div className="paidmanager-page-header">
                <div className="paidmanager-page-status">
                    <Label>Chọn trạng thái</Label>
                    <div className="status-option">
                        <Dropdown
                            placeholder="--"
                            options={[]}
                            selectedKey={1}
                            onChange={(_, selected) => { }}
                            errorMessage={''}
                        // onFocus={() => { this.getDistrictOptions.bind(this)(Number(patientAddress.province?.key)) }}
                        />
                    </div>
                </div>
                <div className="search-date">
                    <Label>Thời gian tiếp nhận:</Label>
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
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
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
                    navigateLink={"/admin/thanh-toan-ngoai-tru/chi-tiet-thanh-toan/"}
                    isLoading={loading}

                />
            </div>
        </div>
    )
}

export default PaidManagerPage