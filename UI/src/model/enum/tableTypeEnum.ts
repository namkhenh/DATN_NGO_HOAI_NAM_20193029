import { AccountStatus } from "../../pages/adminPageContainer/accountManagerPage/AccountManagerPage";
import { PermissionStatus } from "../../pages/adminPageContainer/addRolePage/AddRolePage";
import { HealthCareStatus } from "../../pages/adminPageContainer/healthCarePage/HealthCarePage";
import { PaidStatus } from "../../pages/adminPageContainer/paidDetailManagerPage/PaidDetailManagerPage";
import { RoleStatus } from "../../pages/adminPageContainer/roleManagerPage/RoleManagerPage";
import { AccountRoleEnum } from "./accPermissionEnum"
import { AppointmentStatus } from "./appointmentEnum"

export enum TableType {
    // PatientListTable,
    ApproveCalendarTable,
    AppointmentReceptionTable,
    PatientReceptionListTable,
    ServiceManagerTable,
    ServiceInfoTable,
    AddServiceManagerTable,
    PaidContentTable,
    PaidManagerTable,
    HealthCareTable,
    AccountManagerTable,
    RoleManagerTable,
    PermissionTable,
    UserAssignTable,
    AddUserAssignTable,
    DepartmentManagerTable,
}

export interface ApproveCalendarTableColumns {
    appointmentCode: string
    appointmentTime: string
    appointmentStatus: JSX.Element
    patientCode: string
    patientName: string
    patientDateOfBirth: string
    patientGender: string
    patientPhoneNumber: string
}

export interface ApproveCalendarTableDatas {
    id: string
    code: string
    time: Date
    reason: string
    patientId: string
    status: number
}

export interface AppointmentReceptionTableColumns {
    appointmentCode: string
    appointmentTime: string
    patientCode: string
    patientName: string
    patientDateOfBirth: string
    patientGender: string
    patientPhoneNumber: string
    patientIdentityNumber: string
}

export interface AppointmentReceptionTableDatas {
    appointmentId: string
    appointmentCode: string
    appointmentTime: string
    patientCode: string
    patientName: string
    patientDateOfBirth: string;
    patientGender: number;
    patientPhoneNumber: string;
    patientIdentityNumber: string;
}

export interface PatientReceptionTableColumns {
    profileCode: string
    profileTime: string
    patientCode: string
    emergencyStatus: JSX.Element
    patientName: string
    patientDateOfBirth: string
    patientGender: string
    patientPhoneNumber: string
}

export interface PatientReceptionTableDatas {
    profileId: string;
    profileCode: string;
    profileTime: Date;
    profileReason: string;
    patientId: string;
    patientCode: string;
    patientName: string;
    emergencyStatus: boolean
    patientAvatar?: string;
    patientDateOfBirth: Date;
    patientGender: number;
    patientPhoneNumber?: string;
    patientIdentityNumber?: string;
    patientAddress: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianRelation?: string
}

export interface ServiceListTableColumns {
    serviceCode: string
    serviceName: string
    designatedRoom?: string
    designatedDoctor?: string
    serviceCost: string
    patientPaid?: string
    task?: JSX.Element
}

export interface ServiceListTableDatas {
    serviceId: string
    serviceCode: string
    serviceName: string
    designatedRoom?: string
    designatedFaculty?: string
    designatedDoctor?: string
    serviceCost: number
    patientPaid?: boolean
    patientRecordServiceId: string
}

export interface PaidListTableColumns {
    profileCode: string
    patientCode: string
    profileDate: string
    profileTime: string
    patientName: string
    patientDateOfBirth: string
    patientPhone: string
}

export interface PaidListTableDatas {
    profileId: string
    profileCode: string
    patientCode: string
    profileTime: Date
    patientName: string
    patientDateOfBirth: Date
    patientPhone: string
}

export interface HealthCareTableColumns {
    profileCode: string
    patientCode: string
    emergencyStatus: JSX.Element
    patientName: string
    serviceName: string
    healthCareStatus: string
    patientGender: string
    patientDateOfBirth: string
    patientPhoneNumber: string
}

export interface HealthCareTableDatas {
    profileId: string
    profileCode: string
    patientId: string
    patientCode: string
    emergencyStatus: boolean
    patientName: string
    serviceName: string
    healthCareStatus: number
    patientGender: number
    patientDateOfBirth: string
    patientPhoneNumber: string
}

export enum ApproveCalendarAction {
    Accept,
    Refuse,
    Cancel,
    Export,
    Delete
}

export interface AccountManagerTableColumns {
    userName: string
    role: string
    fullName: string
    phoneNumber: string
    insuranceNumber: string
    gender: string
    status: JSX.Element
}

export interface IUserRole {
    id: string
    code: string
    name: string
    status: RoleStatus
    decription: string
    startDate: Date
    endDate: Date
}

export enum UserGender {
    Male,
    Female
}

export interface IAppUserRole {
    appUserId: string
    role: IUserRole
    roleId: string
}
export interface AccountManagerTableDatas {
    id: string
    userName: string
    // startAt?: string
    // endAt?: string
    roles: IUserRole[]
    fullName: string
    status: AccountStatus
    email?: string
    // used: boolean
}

export interface RoleManagerTableColumns {
    roleCode: string
    roleName: string
    roleDescription: string
    roleStatus: JSX.Element
}
export interface RoleManagerTableDatas {
    id: string
    code: string
    name: string
    description: string
    startDate?: Date
    endDate?: Date
    status: boolean
}

export interface MenuTableDatas {
    id: string
    code: string
    name: string
    path: string
    // isDeleted: boolean
    // actions?: ActionTableDatas[]
}
export interface PermissionActionTableDatas {
    action: ActionTableDatas
    actionId: string
    isLocked: boolean
    permissionId: string
}

export interface PermissionManagerTableColumns {
    permissionCode: string
    permissionName: string
    permissionMenu: string
    permissionStatus: JSX.Element
}
export interface PermissionManagerTableDatas {
    id: string
    name: string
    code: string
    path: string
    menuId: string
    status: boolean
    roleId: string
    startAt?: Date
    endAt?: Date
}

export interface ActionManagerTableColumns {
    actionName: string
}
export interface ActionTableDatas {
    id: string
    code: string
    name: string
    menuId: string
    path: string
}

export interface UserAssignTableColumns {
    userName: string
    fullName: string
    phoneNumber: string
    insuranceNumber: string
    task?: JSX.Element
}
export interface UserAssignTableDatas {
    id: string
    userName: string
    fullName: string
    phoneNumber: string
    insuranceNumber: string
}

export interface DepartmentManagerColumns {
    departmentcode: string
    departmentname: string
    departmentdoctor: string
}

export interface DepartmentManagerDatas {
    id: string
    code: string
    name: string
    doctor: string
}
export interface ServiceManagerTableColumns {
    servicecode: string
    servicename: string
    servicedepartment: string
    servicedoctor: string
    servicecost: number
}

export interface ServiceManagerTableDatas {
    id: string
    code: string
    name: string
    departmentId: string
    cost: number
}