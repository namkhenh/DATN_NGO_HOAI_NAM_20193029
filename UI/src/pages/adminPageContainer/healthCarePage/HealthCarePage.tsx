import React, {useState} from 'react'
import './HealthCarePage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb'
import {Label} from '@fluentui/react/lib/Label'
import {Dropdown} from '../../../common/dropdown/DropDown'
import {DatePicker} from '../../../common/datePicker/DatePicker'
import TablePager from '../../../common/tablePager/TablePager'
import {HealthCareTableColumns, HealthCareTableDatas, TableType, UserGender} from '../../../model/enum/tableTypeEnum'
import PatientListCommandBar from '../patientListPage/PatientListCommandBar'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

export enum HealthCareStatus {
    WaitCare,
    Caring,
    WaitConclude,
    Concluded
}



function HealthCarePage() {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.HealthCareTable}
            />
        ])
    }

    function createData(
        profileCode: string,
        patientCode: string,
        emergencyStatusI: number,
        patientName: string,
        serviceName: string,
        healthCareStatusI: number,
        patientGenderI: number,
        patientDateOfBirth: string,
        patientPhoneNumber: string,
    ): HealthCareTableColumns {
        let emergencyStatus: JSX.Element = emergencyStatusI ? <CheckCircleIcon color='success' /> : <UnpublishedIcon color='error' />
        let patientGender: string = patientGenderI === UserGender.Male ? 'Nam' : 'Nữ'
        let healthCareStatus: string = healthCareStatusI === HealthCareStatus.WaitCare ? 'Chờ khám' : (healthCareStatusI === HealthCareStatus.Caring ? 'Đang khám' : (healthCareStatusI === HealthCareStatus.WaitConclude ? 'Chờ kết luận' : 'Đã kết luận'))
        return {
            profileCode,
            patientCode,
            emergencyStatus,
            patientName,
            serviceName,
            healthCareStatus,
            patientGender,
            patientDateOfBirth,
            patientPhoneNumber
        };
    }

    const rows: HealthCareTableColumns[][] = [
        [
            createData(
                'HS12345',
                'BN12345',
                0,
                'Ngô Hoài Nam',
                'Khám Nhi',
                0,
                0,
                '23/05/2001',
                '0123456789'
            ),
            createData(
                'HS12346',
                'BN12346',
                0,
                'Ngô Hoài Nam',
                'Khám Nhi',
                2,
                0,
                '23/05/2001',
                '0123456789'
            ),
        ], [
            createData(
                'HS12347',
                'BN12347',
                0,
                'Ngô Hoài Nam',
                'Khám Nhi',
                3,
                0,
                '23/05/2001',
                '0123456789'
            ),
        ]
    ];

    const datas: HealthCareTableDatas[][] = [
        [
            {
                profileId: 'sdklghsdhjfjk34234',
                profileCode: 'HS12345',
                patientId: 'asdawds2312edawsd',
                patientCode: 'BN23455',
                emergencyStatus: true,
                patientName: 'Ngô Hoài Nam',
                serviceName: 'Khám Nhi',
                healthCareStatus: 0,
                patientGender: 0,
                patientDateOfBirth: '22/03/2002',
                patientPhoneNumber: '0123456789',
            },
            {
                profileId: 'lkjfdlkdj2324jkh',
                profileCode: 'HS12348',
                patientId: 'asdawds2312edawsd',
                patientCode: 'BN23458',
                emergencyStatus: true,
                patientName: 'Ngô Hoài Nam',
                serviceName: 'Khám Nhi',
                healthCareStatus: 0,
                patientGender: 0,
                patientDateOfBirth: '22/03/2002',
                patientPhoneNumber: '0123456789',
            }
        ],
        [
            {
                profileId: 'adfsgfg324234dfhdf',
                profileCode: 'HS12347',
                patientId: 'asdawds2312edawsd',
                patientCode: 'BN23457',
                emergencyStatus: true,
                patientName: 'Ngô Hoài Nam',
                serviceName: 'Khám Nhi',
                healthCareStatus: 0,
                patientGender: 0,
                patientDateOfBirth: '22/03/2002',
                patientPhoneNumber: '0123456789',
            },
        ]
    ];
    
    return (
        <div className='healthcare-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'KCB ngoại trú', href: '/admin/kham-chua-benh' },
                ]}
            />
            <div className="healthcare-page-title">
                Danh sách bệnh nhân
            </div>
            <div className="healthcare-page-header">
                <div className="healthcare-page-status">
                    <Label>Chọn phòng khám</Label>
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
                <div className="healthcare-page-status">
                    <Label>Trạng thái</Label>
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
                <div className="healthcare-page-statistical">
                    <div className="statistical-item">
                        Chờ khám: 1
                    </div>
                    <div className="statistical-item">
                        Đang khám: 1
                    </div>
                    <div className="statistical-item">
                        Chờ kết luận: 1
                    </div>
                    <div className="statistical-item">
                        Đã kết luận: 1
                    </div>
                </div>
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>
            <div className="patient-list-table">
                <TablePager<HealthCareTableColumns, HealthCareTableDatas>
                    tableType={TableType.HealthCareTable}
                    batchActionElements={onRenderActionButtons()}
                    rowData={rows[currentPage]}
                    dataTotal={datas[currentPage]}
                    hasCheckBox
                    page={currentPage}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={10}
                    hasTablePaging
                    hasNavigate
                    navigateLink={"/admin/kham-chua-benh/chi-tiet-kham-benh/"}
                    isLoading={false}

                />
            </div>
        </div>
    )
}

export default HealthCarePage