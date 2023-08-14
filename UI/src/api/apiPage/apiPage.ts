import { Endpoint as api, send } from "../helpers"

export class UserService {
    public static login = (object: any) => {
        return send(`${api.authentication}`, 'POST', object)
    }
    public static register = (object: any) => {
        return send(`${api.register}`, 'POST', object)
    }
    public static getUserById = (id: string) => {
        return send(`${api.get_user_by_Id}?Id=${id}`, 'GET')
    }
    public static getUserPaging = (object: any) => {
        return send(`${api.get_user_paging}`, 'POST', object)
    }
    public static updateUser = (object: any) => {
        return send(`${api.update_user}`, 'POST', object)
    }
    public static deleteUser = (id: string) => {
        return send(`${api.delete_user}?Id=${id}`, 'DELETE')
    }
    public static assignRole = (id: string, object: any) => {
        return send(`${api.assign_role}?userId=${id}`, 'POST', object)
    }
    public static checkUserRole = (id: string) => {
        return send(`${api.check_user_role}?userId=${id}`, 'GET')
    }
    public static changePassword = (object: any) => {
        return send(`${api.change_password}`, 'POST', object)
    }
    public static lockAcc = (id: string) => {
        return send(`${api.lock_acc}?UserId=${id}`, 'POST')
    }
    public static resetPassword = (object: any) => {
        return send(`${api.reset_password}`, 'POST', object)
    }
    public static getUserByCode = (code: string) => {
        return send(`${api.find_user_by_code}?code=${code}`, 'POST')
    }
}

export class DepartmentService {
    public static createDepartment = (object: any) => {
        return send(`${api.create_department}`, 'POST', object)
    }
    public static getDepartmentPaging = (object: any) => {
        return send(`${api.get_department_paging}`, 'POST', object)
    }
    public static updateDepartment = (object: any) => {
        return send(`${api.update_department}`, 'POST', object)
    }
    public static getDepartmentDetail = (id: string) => {
        return send(`${api.get_department_by_id}?Id=${id}`, 'GET')
    }
    public static deleteDepartment = (id: string) => {
        return send(`${api.delete_department}?Id=${id}`, 'DELETE')
    }
}

export class MedicalExaminationService {
    public static createService = (object: any) => {
        return send(`${api.create_medicalexaminationservice}`, 'POST', object)
    }
    public static getServicePaging = (object: any) => {
        return send(`${api.get_medicalexaminationservice_paging}`, 'POST', object)
    }
    public static updateService = (object: any) => {
        return send(`${api.update_medicalexaminationservice}`, 'POST', object)
    }
    public static deleteService = (id: string) => {
        return send(`${api.delete_medicalexaminationservice}?Id=${id}`, 'DELETE')
    }
    public static getAllService = () => {
        return send(`${api.get_all_medicalexaminationservice}`, 'GET')
    }
}

export class MenuService {
    public static getMenu = () => {
        return send(`${api.get_menu}`, 'GET')
    }
    public static getMenuById = (id: string) => {
        return send(`${api.get_menu_by_id}?Id=${id}`, 'GET')
    }
}

export class RoleService {
    public static getRoleDetail = (id: string) => {
        return send(`${api.get_role_detail}?Id=${id}`, 'GET')
    }
    public static getRoleAll = () => {
        return send(`${api.get_role_all}`, 'GET')
    }
    public static getRolePaging = (object: any) => {
        return send(`${api.get_role_paging}`, 'POST', object)
    }
    public static createRole = (object: any) => {
        return send(`${api.create_role}`, 'POST', object)
    }
    public static updateRole = (object: any) => {
        return send(`${api.update_role}`, 'POST', object)
    }
    public static deleteRole = (id: any) => {
        return send(`${api.delete_role}?Id=${id}`, 'DELETE')
    }
    public static deleteListRole = (id: any) => {
        return send(`${api.delete_list_role}`, 'POST', id)
    }
    public static assignUser = (id: string, object: any) => {
        return send(`${api.assign_user}?roleId=${id}`, 'POST', object)
    }
}

export class ActionService {
    public static getAction = () => {
        return send(`${api.get_action}`, 'GET')
    }
    public static getActionByMenuId = (id: string) => {
        return send(`${api.get_action_by_menuId}?Id=${id}`, 'GET')
    }
}

export class PermissionActionService {
    public static createPermissionAction = (object: any) => {
        return send(`${api.create_permission_action}`, 'POST', object)
    }
    public static updatePermissionAction = (object: any) => {
        return send(`${api.update_permission_action}`, 'POST', object)
    }
}

export class PermissionService {
    public static getPermission = (object: any) => {
        return send(`${api.get_permission}`, 'POST', object)
    }
    public static getPermissionById = (id: string) => {
        return send(`${api.get_permission_by_Id}?Id=${id}`, 'GET')
    }
    public static getPermissionByRoleId = (id: string) => {
        return send(`${api.get_permission_by_roleId}?roleId=${id}`, 'POST')
    }
    public static createPermission = (object: any) => {
        return send(`${api.create_permission}`, 'POST', object)
    }
    public static updatePermission = (object: any) => {
        return send(`${api.update_permission}`, 'POST', object)
    }
    public static deletePermission = (id: string) => {
        return send(`${api.delete_permission}?Id=${id}`, 'DELETE')
    }
}

export class AddressService {
    public static getProvince = () => {
        return send(`${api.province}`, 'GET')
    }
    public static getDistrict = (id: string) => {
        return send(`${api.district}?Id=${id}`, 'GET')
    }
    public static getCommune = (id: string) => {
        return send(`${api.commune}?Id=${id}`, 'GET')
    }
}

export class ExaminationScheduleService {
    public static createSchedule = (object: any) => {
        return send(`${api.create_medicalexaminationschedule}`, 'POST', object)
    }
    public static updateSchedule = (object: any) => {
        return send(`${api.update_medicalexaminationschedule}`, 'POST', object)
    }
    public static deleteSchedule = (id: string) => {
        return send(`${api.delete_medicalexaminationschedule}?Id=${id}`, 'DELETE')
    }
    public static deleteListSchedule = (object: any) => {
        return send(`${api.delete_list_medicalexaminationschedule}`, 'POST', object)
    }
    public static getPagingSchedule = (object: any) => {
        return send(`${api.get_medicalexaminationschedule_paging}`, 'POST', object)
    }
    public static getAllSchedule = () => {
        return send(`${api.get_all_medicalexaminationschedule}`, 'GET')
    }
    public static getScheduleByUser = (id: string) => {
        return send(`${api.get_medicalexaminationschedule_by_user}?userId=${id}`, 'GET')
    }
    public static getScheduleByCreater = (id: string) => {
        return send(`${api.get_medicalexaminationschedule_by_creater}?Id=${id}`, 'GET')
    }
    public static getScheduleById = (id: string) => {
        return send(`${api.get_medicalexaminationschedule_by_id}?Id=${id}`, 'GET')
    }
    public static updateStatusSchedule = (id: string, status: number) => {
        return send(`${api.update_status_medicalexaminationschedule}?Id=${id}&PatientReceptionStatus=${status}`, 'POST')
    }
}

export class ExaminationSchedulePatientRecordService {
    public static createSchedulePatientRecord = (object: any) => {
        return send(`${api.create_patientrecordservice}`, 'POST', object)
    }
    public static createListSchedulePatientRecord = (object: any) => {
        return send(`${api.create_list_patientrecordservice}`, 'POST', object)
    }
    // public static updateSchedulePatientRecord = (object: any) => {
    //     return send(`${api.update_medicalexaminationschedule}`, 'POST', object)
    // }
    public static deleteSchedulePatientRecord = (id: string) => {
        return send(`${api.delete_patientrecordservice}?Id=${id}`, 'DELETE')
    }
    public static deleteListSchedulePatientRecord = (object: any) => {
        return send(`${api.delete_list_patientrecordservice}`, 'POST', object)
    }
    public static getPagingSchedulePatientRecord = (object: any) => {
        return send(`${api.get_patientrecordservice_paging}`, 'POST', object)
    }
    public static getAllSchedulePatientRecord = () => {
        return send(`${api.get_all_patientrecordservice}`, 'GET')
    }
}

export class PatientRecordService {
    public static createPatientRecord = (object: any) => {
        return send(`${api.create_patientrecord}`, 'POST', object)
    }
    public static createPatientRecordBySchedule = (object: any) => {
        return send(`${api.create_patientrecord_by_schedule}`, 'POST', object)
    }
    public static updatePatientRecord = (object: any) => {
        return send(`${api.update_patientrecord}`, 'POST', object)
    }
    public static deletePatientRecord = (id: string) => {
        return send(`${api.delete_patientrecord}?Id=${id}`, 'DELETE')
    }
    public static getPagingPatientRecord = (object: any) => {
        return send(`${api.get_patientrecord_paging}`, 'POST', object)
    }
    public static getAllPatientRecord = () => {
        return send(`${api.get_all_patientrecord}`, 'GET')
    }
    public static getDetailPatientRecord = (id: string) => {
        return send(`${api.get_detail_patientrecord}?Id=${id}`, 'GET')
    }
}

export class PaymentService {
    public static createPayment = (object: any) => {
        return send(`${api.create_payment}`, 'POST', object)
    }
}