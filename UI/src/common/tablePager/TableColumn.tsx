import { TableType } from "../../model/enum/tableTypeEnum";
import { HeadCell } from "./TablePager";

const patientReceptionListStaticColumn: () => HeadCell[] = () => [
    {
        id: 'profileCode',
        label: 'Mã hồ sơ',
    },
    {
        id: 'profileDate',
        label: 'Ngày đăng ký',
    },
    {
        id: 'patientCode',
        label: 'Mã bệnh nhân',
    },
    {
        id: 'emergencyStatus',
        label: 'Cấp cứu',
    },
    {
        id: 'patientName',
        label: 'Tên bệnh nhân',
    },
    {
        id: 'patientDateOfBirth',
        label: 'Ngày sinh',
    },
    {
        id: 'patientGender',
        label: 'Giới tính',
    },
    {
        id: 'patientPhone',
        label: 'Số điện thoại',
    },
]

const accountManagerStaticColumn: () => HeadCell[] = () => [
    {
        id: 'userName',
        label: 'Tên đăng nhập',
    },
    {
        id: 'role',
        label: 'Vai trò',
    },
    {
        id: 'fullName',
        label: 'Họ và tên',
    },
    {
        id: 'phoneNumber',
        label: 'Số điện thoại',
    },
    {
        id: 'insuranceNumber',
        label: 'CMND',
    },
    {
        id: 'gender',
        label: 'Giới tính',
    },
    {
        id: 'status',
        label: 'Trạng thái',
    }
]

const roleManagerStaticColumn: () => HeadCell[] = () => [
    {
        id: 'roleCode',
        label: 'Mã vai trò',
    },
    {
        id: 'roleName',
        label: 'Tên vai trò',
    },
    {
        id: 'roleDescription',
        label: 'Mô tả',
    },
    {
        id: 'roleStatus',
        label: 'Trạng thái',
    },
]

const permissionManagerStaticColumn: () => HeadCell[] = () => [
    {
        id: 'permissionId',
        label: 'Mã quyền',
    },
    {
        id: 'permissionName',
        label: 'Tên quyền',
    },
    {
        id: 'menuName',
        label: 'Menu' 
    },
    {
        id: 'permissionStatus',
        label: 'Trạng thái',
    },
]

const userAssignStaticColumn: () => HeadCell[] = () => [
    {
        id: 'userName',
        label: 'Tên đăng nhập',
    },
    {
        id: 'fullName',
        label: 'Tên hiển thị',
    },
    {
        id: 'phoneNumber',
        label: 'Số điện thoại' 
    },
    {
        id: 'insuranceNumber',
        label: 'CMND',
    },
    {
        id: 'task',
        label: 'Tác vụ'
    }
]

const addUserAssignStaticColumn: () => HeadCell[] = () => [
    {
        id: 'userName',
        label: 'Tên đăng nhập',
    },
    {
        id: 'fullName',
        label: 'Tên hiển thị',
    },
    {
        id: 'phoneNumber',
        label: 'Số điện thoại' 
    },
    {
        id: 'insuranceNumber',
        label: 'CMND',
    },
]

const serviceInfoStaticColumn: () => HeadCell[] = () => [
    {
        id: 'serviceCode',
        label: 'Mã DV',
    },
    {
        id: 'serviceName',
        label: 'Tên DV',
    },
    {
        id: 'designatedRoom',
        label: 'Phòng thực hiện',
    },
    {
        id: 'designatedDoctor',
        label: 'Người chỉ định',
    },
    {
        id: 'serviceCost',
        label: 'Giá dịch vụ' 
    },
    {
        id: 'patientPaid',
        label: 'BN thanh toán'
    },
    {
        id: 'task',
        label: 'Tác vụ'
    },
]

const addServiceManagerStaticColumn: () => HeadCell[] = () => [
    {
        id: 'serviceCode',
        label: 'Mã dịch vụ',
    },
    {
        id: 'serviceName',
        label: 'Tên dịch vụ',
    },
    {
        id: 'serviceCost',
        label: 'Giá dịch vụ'
    },
]

const paidManagerStaticColumn: () => HeadCell[] = () => [
    {
        id: 'profileCode',
        label: 'Mã hồ sơ',
    },
    {
        id: 'patientCode',
        label: 'Mã bệnh nhân',
    },
    {
        id: 'profileDate',
        label: 'Ngày tiếp nhận'
    },
    {
        id: 'profileTime',
        label: 'Giờ tiếp nhận'
    },
    {
        id: 'paidStatus',
        label: 'Trạng thái'
    },
    {
        id: 'patientName',
        label: 'Tên bệnh nhân'
    },
    {
        id: 'patientDateOfBirthe',
        label: 'Ngày sinh'
    },
    {
        id: 'patientPhone',
        label: 'Số điện thoại'
    },
]

const paidContentStaticColumn: () => HeadCell[] = () => [
    {
        id: 'serviceCode',
        label: 'Mã DV',
    },
    {
        id: 'serviceName',
        label: 'Tên DV',
    },
    {
        id: 'designatedRoom',
        label: 'Phòng thực hiện',
    },
    {
        id: 'designatedDoctor',
        label: 'Người chỉ định',
    },
    {
        id: 'serviceCost',
        label: 'Giá dịch vụ'
    },
    {
        id: 'patientPaid',
        label: 'BN thanh toán'
    },
]

const healthCareStaticColumn: () => HeadCell[] = () => [
    {
        id: 'profileCode',
        label: 'Mã hồ sơ',
    },
    {
        id: 'patientCode',
        label: 'Mã bệnh nhân',
    },
    {
        id: 'emergencyStatus',
        label: 'Cấp cứu',
    },
    {
        id: 'patientName',
        label: 'Tên bệnh nhân',
    },
    {
        id: 'serviceName',
        label: 'Tên dịch vụ',
    },
    {
        id: 'healthCareStatus',
        label: 'Trạng thái',
    },
    {
        id: 'patientDateOfBirth',
        label: 'Ngày sinh',
    },
    {
        id: 'patientGender',
        label: 'Giới tính',
    },
    {
        id: 'patientPhone',
        label: 'Số điện thoại',
    },
]

const approveCalendarStaticColumn: () => HeadCell[] = () => [
    {
        id: 'appointmentCode',
        label: 'Mã đặt lịch',
    },
    {
        id: 'appointmentTime',
        label: 'Thời gian đặt khám',
    },
    {
        id: 'appointmentStatus',
        label: 'Trạng thái',
    },
    {
        id: 'patientCode',
        label: 'Mã bệnh nhân',
    },
    {
        id: 'patientName',
        label: 'Tên bệnh nhân',
    },
    {
        id: 'patientDateBirth',
        label: 'Ngày sinh',
    },
    {
        id: 'patientGender',
        label: 'Giới tính',
    },
    {
        id: 'patientPhone',
        label: 'Số điện thoại',
    },
]

const appointmentReceptionStaticColumn: () => HeadCell[] = () => [
    {
        id: 'appointmentCode',
        label: 'Mã đặt lịch',
    },
    {
        id: 'appointmentTime',
        label: 'Thời gian đặt khám',
    },
    {
        id: 'patientCode',
        label: 'Mã bệnh nhân',
    },
    {
        id: 'patientName',
        label: 'Tên bệnh nhân',
    },
    {
        id: 'patientDateBirth',
        label: 'Ngày sinh',
    },
    {
        id: 'patientGender',
        label: 'Giới tính',
    },
    {
        id: 'patientPhone',
        label: 'Số điện thoại',
    },
    {
        id: 'patientIdentify',
        label: 'CMND',
    }
]

const departmentManagerStaticColumn: () => HeadCell[] = () => [
    {
        id: 'departmentcode',
        label: 'Mã phòng',
    },
    {
        id: 'departmentname',
        label: 'Tên phòng',
    },
    {
        id: 'departmentdoctor',
        label: 'Bác sĩ phụ trách',
    }
]

const serviceManagerStaticColumn: () => HeadCell[] = () => [
    {
        id: 'servicecode',
        label: 'Mã DV',
    },
    {
        id: 'servicename',
        label: 'Tên DV',
    },
    {
        id: 'servicedepartment',
        label: 'Phòng thực hiện',
    },
    {
        id: 'servicedoctor',
        label: 'BS chỉ định',
    },
    {
        id: 'servicecost',
        label: 'Giá dịch vụ'
    },
]

export const getColumnWithType: (tableType: TableType) => HeadCell[] = (tableType) => {
    let basicColumns: HeadCell[];
    switch (tableType) {
        case TableType.PatientReceptionListTable: {
            basicColumns = patientReceptionListStaticColumn()
            break;
        }
        case TableType.AccountManagerTable: {
            basicColumns = accountManagerStaticColumn()
            break;
        }
        case TableType.RoleManagerTable: {
            basicColumns = roleManagerStaticColumn()
            break;
        }
        case TableType.PermissionTable: {
            basicColumns = permissionManagerStaticColumn()
            break;
        }
        case TableType.UserAssignTable: {
            basicColumns = userAssignStaticColumn()
            break;
        }
        case TableType.AddUserAssignTable: {
            basicColumns = addUserAssignStaticColumn()
            break;
        }
        case TableType.ServiceInfoTable: {
            basicColumns = serviceInfoStaticColumn()
            break;
        }
        case TableType.AddServiceManagerTable: {
            basicColumns = addServiceManagerStaticColumn()
            break;
        }
        case TableType.PaidManagerTable: {
            basicColumns = paidManagerStaticColumn()
            break;
        }
        case TableType.PaidContentTable: {
            basicColumns = paidContentStaticColumn()
            break;
        }
        case TableType.HealthCareTable: {
            basicColumns = healthCareStaticColumn()
            break;
        }
        case TableType.ApproveCalendarTable: {
            basicColumns = approveCalendarStaticColumn()
            break;
        }
        case TableType.AppointmentReceptionTable: {
            basicColumns = appointmentReceptionStaticColumn()
            break;
        }
        case TableType.DepartmentManagerTable: {
            basicColumns = departmentManagerStaticColumn()
            break;
        }
        case TableType.ServiceManagerTable: {
            basicColumns = serviceManagerStaticColumn()
            break;
        }
        default: {
            basicColumns = []
        }
    }
    return basicColumns
}
    
