import React, { useEffect, useState } from 'react'
import './AppointmentReceptionPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import { Label } from '@fluentui/react/lib/Label'
import { DatePicker } from '../../../common/datePicker/DatePicker'
import { SearchBoxView } from '../../../common/searchBox/SearchBox'
import TablePager from '../../../common/tablePager/TablePager'
import { AppointmentReceptionTableColumns, AppointmentReceptionTableDatas, TableType, UserGender } from '../../../model/enum/tableTypeEnum'
import { ExaminationScheduleService } from '../../../api/apiPage/apiPage'
import { AppointmentStatus } from '../../../model/enum/appointmentEnum'
function AppointmentReceptionPage() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalItems, setTotalItems] = useState<number>(0)
    const [row, setRow] = useState<AppointmentReceptionTableColumns[]>([createData('', new Date(), '', '', new Date(), 0, '', '')])
    const [data, setData] = useState<AppointmentReceptionTableDatas[]>([{
        appointmentId: '',
        appointmentCode: '',
        appointmentTime: '',
        patientCode: '',
        patientName: '',
        patientDateOfBirth: '',
        patientGender: 0,
        patientPhoneNumber: '',
        patientIdentityNumber: '',
    }])
    const [loading, setLoading] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>('')

    
    function createData(
        appointmentCode: string,
        appointmentTimeI: Date,
        patientCode: string,
        patientName: string,
        patientDateOfBirthI: Date,
        patientGenderI: number,
        patientPhoneNumber: string,
        patientIdentityNumber: string,
    ): AppointmentReceptionTableColumns {
        let appointmentTime: string = `${new Date(appointmentTimeI).getDate()}/${new Date(appointmentTimeI).getMonth() + 1}/${new Date(appointmentTimeI).getFullYear()} --  ${new Date(appointmentTimeI).getHours()}h:${new Date(appointmentTimeI).getMinutes()}`
        let patientGender: string = patientGenderI === UserGender.Male ? 'Nam' : 'Nữ'
        let patientDateOfBirth: string = `${new Date(patientDateOfBirthI).getDate()}/${new Date(patientDateOfBirthI).getMonth() + 1}/${new Date(patientDateOfBirthI).getFullYear()}`
        return {
            appointmentCode,
            appointmentTime,
            patientCode,
            patientName,
            patientDateOfBirth,
            patientGender,
            patientPhoneNumber,
            patientIdentityNumber,
        };
    }

    const getSchedule = () => {
        let requestBody = {
            pageIndex: currentPage,
            pageSize: 10,
            searchTerm: searchTerm,
        }
        setLoading(true)
        ExaminationScheduleService.getPagingSchedule(requestBody).then(res => {
            if (res.success) {
                setLoading(false)
                let rows: AppointmentReceptionTableColumns[] = []
                let datas: AppointmentReceptionTableDatas[] = []
                !!res.data?.items && res.data.items.forEach((element: any) => {
                    if (element?.patientReceptionStatus === AppointmentStatus.Success) {
                        rows.push(createData(element?.code, element?.timeOfExamination, element?.user?.code, element?.user?.fullName, element?.user?.dateOfBirth, element?.user?.sex, element?.user?.phoneNumber, element?.user?.cmnd))
                        datas.push({
                            appointmentId: element?.id,
                            appointmentCode: element?.code,
                            appointmentTime: element?.timeOfExamination,
                            patientCode: element?.user?.code,
                            patientName: element?.user?.fullName,
                            patientDateOfBirth: element?.user?.dateOfBirth,
                            patientGender: element?.user?.sex,
                            patientPhoneNumber: element?.user?.phoneNumber,
                            patientIdentityNumber: element?.user?.cmnd,
                        })
                    }
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
        getSchedule()
    }, [])

    return (
        <div className='patientlist-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Tiếp đón bệnh nhân đặt khám', href: '/tiep-don-dat-kham' },
                ]}
            />
            <div className="patientlist-page-title">
                Danh sách bệnh nhân đặt khám
            </div>
            <div className="patientlist-page-search">
                <div className="search-date">
                    <Label>Thời gian:</Label>
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
                        placeholder='Mã đặt lịch/ Mã bệnh nhân/ CMND'
                        onSearch={() => {}}
                    />
                </div>
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
            {/* <DataTable/> */}

            <div className="patient-list-table">
                <TablePager<AppointmentReceptionTableColumns, AppointmentReceptionTableDatas>
                    tableType={TableType.AppointmentReceptionTable}
                    rowData={row}
                    dataTotal={data}
                    hasCheckBox={false}
                    hasTablePaging
                    page={currentPage - 1}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={totalItems}
                    hasNavigate
                    navigateLink={"/admin/tiep-don-dat-kham/chi-tiet-dat-kham/"}
                    isLoading={loading}

                />
            </div>
        </div>
    )
}

export default AppointmentReceptionPage