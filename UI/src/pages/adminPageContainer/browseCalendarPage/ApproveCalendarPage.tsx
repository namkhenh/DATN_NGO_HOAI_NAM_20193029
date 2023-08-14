import React, { useEffect, useState } from 'react'
import './ApproveCalendarPage.scss'
import BreadCrumb from '../../../common/breadCrumb/BreadCrumb';
import { SearchBoxView } from '../../../common/searchBox/SearchBox';
import { Label } from '@fluentui/react';
import { DatePicker } from '../../../common/datePicker/DatePicker';
import TablePager from '../../../common/tablePager/TablePager';
import {
    ApproveCalendarAction,
    ApproveCalendarTableColumns,
    ApproveCalendarTableDatas,
    TableType
} from '../../../model/enum/tableTypeEnum';
import { AppointmentStatus } from '../../../model/enum/appointmentEnum';
import DialogView from '../../../common/dialog/Dialog';
import { useStateValue } from '../../../context/StateProvider';
import { MessageBarStatus } from '../../../model/enum/messageBarEnum';
import { actionType } from '../../../context/Reducer';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import PatientListCommandBar from '../patientListPage/PatientListCommandBar';
import { ExaminationScheduleService } from '../../../api/apiPage/apiPage';



function ApproveCalendarPage() {
    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalItems, setTotalItems] = useState<number>(0)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [appointmentAction, setAppointmentAction] = useState<ApproveCalendarAction>()
    const [row, setRow] = useState<ApproveCalendarTableColumns[]>([createData("", 0, new Date(), "", "", new Date(), 0, "")])
    const [data, setData] = useState<ApproveCalendarTableDatas[]>([{
        id: '',
        time: new Date(),
        reason: '',
        patientId: '',
        code: '',
        status: AppointmentStatus.Waiting
    }])
    const [{ selection }, dispatch] = useStateValue()

    const onSearch = (newValue: string) => {
        setSearchTerm(newValue)
    }

    const onRenderActionButtons = (): JSX.Element[] => {
        return ([
            <PatientListCommandBar
                key={'patient-list-commandbar'}
                // {...props}
                tableType={TableType.ApproveCalendarTable}
                showAppointmentAccept={() => { setShowDialog(true); setAppointmentAction(ApproveCalendarAction.Accept) }}
                showAppointmentRefuse={() => { setShowDialog(true); setAppointmentAction(ApproveCalendarAction.Refuse) }}
                showAppointmentCancel={() => { setShowDialog(true); setAppointmentAction(ApproveCalendarAction.Cancel) }}
                showAppointmentDelete={() => { setShowDialog(true); setAppointmentAction(ApproveCalendarAction.Delete) }}
            />
        ])
    }

    const showMessageBar = (message: string, isOpen: boolean, status: MessageBarStatus) => {
        dispatch({ type: actionType.SET_MESSAGE_BAR, messageBar: { isOpen: isOpen, text: message, status: status } })
    }

    const onSave = () => {
        if (appointmentAction === ApproveCalendarAction.Accept) {
            setLoadingButton(true)
            const result = ExaminationScheduleService.updateStatusSchedule(selection.selectedItems[0]?.id, AppointmentStatus.Success).then(res => {
                if (res.success) {
                    setLoadingButton(false)
                    setShowDialog(false)
                    showMessageBar("Duyệt lịch thành công!", true, MessageBarStatus.Success)
                    getSchedule()
                } else {
                    setLoadingButton(false)
                    setShowDialog(false)
                    showMessageBar("Duyệt lịch thất bại!", true, MessageBarStatus.Error)
                }
            })
            return result
        }
        if (appointmentAction === ApproveCalendarAction.Refuse || appointmentAction === ApproveCalendarAction.Cancel) {
            setLoadingButton(true)
            const result = ExaminationScheduleService.updateStatusSchedule(selection.selectedItems[0]?.id, AppointmentStatus.Cancel).then(res => {
                if (res.success) {
                    setLoadingButton(false)
                    setShowDialog(false)
                    showMessageBar(appointmentAction === ApproveCalendarAction.Refuse ? "Từ chối lịch thành công!" : "Hủy lịch thành công!", true, MessageBarStatus.Success)
                    getSchedule()
                } else {
                    setLoadingButton(false)
                    setShowDialog(false)
                    showMessageBar(appointmentAction === ApproveCalendarAction.Refuse ? "Từ chối lịch thất bại!" : "Hủy lịch thất bại!", true, MessageBarStatus.Error)
                }
            })
            return result
        }
        if (appointmentAction === ApproveCalendarAction.Delete) {
            setLoadingButton(true)
            const result = ExaminationScheduleService.deleteSchedule(selection.selectedItems[0]?.id).then(res => {
                if (res.success) {
                    setLoadingButton(false)
                    setShowDialog(false)
                    showMessageBar("Xóa lịch thành công!", true, MessageBarStatus.Success)
                    getSchedule()
                } else {
                    setLoadingButton(false)
                    setShowDialog(false)
                    showMessageBar("Xóa lịch thất bại!", true, MessageBarStatus.Error)
                }
            })
            return result
        }
        return new Promise(res => {})
    }

    function createData(
        appointmentCode: string,
        appointmentStatusI: number,
        appointmentTimeI: Date,
        patientCode: string,
        patientName: string,
        patientDateOfBirthI: Date,
        patientGenderI: number,
        patientPhoneNumber: string,
        // patientIdentityNumber: string,
        // patientAddress: string,

    ): ApproveCalendarTableColumns {
        // let appointmentId: JSX.Element = (
        //   <NavLink
        //     style={{ color: 'rgba(0, 0, 0, 0.87)'}}
        //     to={`/admin/danh-sach-dat-kham/chi-tiet-dat-kham/${appointmentIdI}`}
        //   >
        //     { appointmentIdI }
        //   </NavLink>
        // );

        let patientGender: string = patientGenderI === 0 ? "Nam" : "Nữ"
        let appointmentTime: string = `${new Date(appointmentTimeI).getDate()}/${new Date(appointmentTimeI).getMonth() + 1}/${new Date(appointmentTimeI).getFullYear()} --  ${new Date(appointmentTimeI).getHours()}h:${new Date(appointmentTimeI).getMinutes()}`
        let patientDateOfBirth: string = `${new Date(patientDateOfBirthI).getDate()}/${new Date(patientDateOfBirthI).getMonth() + 1}/${new Date(patientDateOfBirthI).getFullYear()}`
        let appointmentStatus: JSX.Element = appointmentStatusI === AppointmentStatus.Success ? <div className='appointment-success'>Đã duyệt</div> : (appointmentStatusI === AppointmentStatus.Cancel ? <div className='appointment-cancel'>Đã hủy</div> : <div className='appointment-waiting'>Chờ duyệt</div>)
        return {
            appointmentCode,
            appointmentTime,
            appointmentStatus,
            patientCode,
            patientName,
            patientDateOfBirth,
            patientGender,
            patientPhoneNumber
            // patientPhoneNumber,
            // patientIdentityNumber,
            // patientAddress,

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
                let rows: ApproveCalendarTableColumns[] = []
                let datas: ApproveCalendarTableDatas[] = []
                !!res.data?.items && res.data.items.forEach((element: any) => {
                    rows.push(createData(element?.code, element?.patientReceptionStatus, element?.timeOfExamination, element?.user?.code, element?.user?.fullName, element?.user?.dateOfBirth,
                        element?.user?.sex, element?.user?.phoneNumber))
                    datas.push({
                        id: element?.id,
                        time: element?.timeOfExamination,
                        reason: element?.reason,
                        patientId: element?.appUserId,
                        status: element?.patientReceptionStatus,
                        code: element?.code

                    })
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

    const renderBodyForm = () => {
        switch (appointmentAction) {
            case ApproveCalendarAction.Accept:
                return <span>Bạn có chắc chắn muốn <strong>Đồng ý</strong> lịch khám: <strong>{selection.selectedItems[0]?.code}</strong> vào lúc <strong>{`${new Date(selection.selectedItems[0]?.time).getHours()}h:${new Date(selection.selectedItems[0]?.time).getMinutes()}`}</strong> ngày <strong>{`${new Date(selection.selectedItems[0]?.time).getDate()}/${new Date(selection.selectedItems[0]?.time).getMonth() + 1}/${new Date(selection.selectedItems[0]?.time).getFullYear()}`}</strong></span>
            case ApproveCalendarAction.Refuse:
                return <div className='dialog-content'>
                    <span>Bạn có chắc chắn muốn <strong>Từ chối</strong> lịch khám: <strong>{selection.selectedItems[0]?.code}</strong> vào lúc <strong>{`${new Date(selection.selectedItems[0]?.time).getHours()}h:${new Date(selection.selectedItems[0]?.time).getMinutes()}`}</strong> ngày <strong>{`${new Date(selection.selectedItems[0]?.time).getDate()}/${new Date(selection.selectedItems[0]?.time).getMonth() + 1}/${new Date(selection.selectedItems[0]?.time).getFullYear()}`}</strong></span>
                    <Label>Lý do:</Label>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={'1'}
                    // onChange={}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Khung giờ được chọn đã đầy" />
                        <FormControlLabel value="2" control={<Radio />} label="..." />
                    </RadioGroup>
                </div>
            case ApproveCalendarAction.Cancel:
                return <span>Bạn có chắc chắn muốn <strong>Hủy</strong> lịch khám: <strong>{selection.selectedItems[0]?.code}</strong> vào lúc <strong>{`${new Date(selection.selectedItems[0]?.time).getHours()}h:${new Date(selection.selectedItems[0]?.time).getMinutes()}`}</strong> ngày <strong>{`${new Date(selection.selectedItems[0]?.time).getDate()}/${new Date(selection.selectedItems[0]?.time).getMonth() + 1}/${new Date(selection.selectedItems[0]?.time).getFullYear()}`}</strong></span>
            case ApproveCalendarAction.Delete:
                return <span>Bạn có chắc chắn muốn <strong>Xóa</strong> lịch khám: <strong>{selection.selectedItems[0]?.code}</strong> vào lúc <strong>{`${new Date(selection.selectedItems[0]?.time).getHours()}h:${new Date(selection.selectedItems[0]?.time).getMinutes()}`}</strong> ngày <strong>{`${new Date(selection.selectedItems[0]?.time).getDate()}/${new Date(selection.selectedItems[0]?.time).getMonth() + 1}/${new Date(selection.selectedItems[0]?.time).getFullYear()}`}</strong></span>
        }
    }

    return (
        <div className='patientlist-page'>
            <BreadCrumb
                breadcrumbItem={[
                    { key: 1, text: 'Duyệt lịch đặt khám', href: '/danh-sach-dat-kham' },
                ]}
            />
            <div className="patientlist-page-title">
                Danh sách lịch đặt khám
            </div>
            <div className="patientlist-page-search">
                <div className="search-id">
                    <SearchBoxView
                        placeholder='Mã đặt lịch/ Mã bệnh nhân/ CMND'
                        onSearch={onSearch}
                    />
                </div>
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
            </div>
            <div className='line' style={{ width: '100%', height: '1px', backgroundColor: '#cccccc' }}></div>

            <div className="patient-list-table">
                <TablePager<ApproveCalendarTableColumns, ApproveCalendarTableDatas>
                    tableType={TableType.ApproveCalendarTable}
                    batchActionElements={onRenderActionButtons()}
                    rowData={row}
                    dataTotal={data}
                    hasCheckBox
                    hasTablePaging
                    page={currentPage - 1}
                    handleChangePage={(page) => { setCurrentPage(page) }}
                    total={totalItems}
                    hasNavigate={false}
                    isLoading={loading}

                />
            </div>
            <DialogView
                title={appointmentAction === ApproveCalendarAction.Accept ? 'Xác nhận duyệt đặt khám' : (appointmentAction === ApproveCalendarAction.Refuse ? 'Xác nhận từ chối đặt khám' : (appointmentAction === ApproveCalendarAction.Delete ? 'Xác nhận xóa đặt khám' : 'Xác nhận hủy đặt khám'))}
                hidden={!showDialog}
                customContent={renderBodyForm()}
                confirmButtonText={'Đồng ý'}
                confirmWithPromise={onSave}
                closeButtonText='Hủy bỏ'
                close={() => { setShowDialog(false) }}
                loading={loadingButton}
            />
        </div>
    )
}

export default ApproveCalendarPage