export default class Endpoint {
    static get baseUrl(): string {
        
        return 'https://localhost:7059/api'
    }


    //user
    static get authentication(): string { return Endpoint.baseUrl + Endpoint._authentication }
    static get register(): string { return Endpoint.baseUrl + Endpoint._register }
    static get get_user_paging(): string { return Endpoint.baseUrl + Endpoint._get_user_paging }
    static get get_user_by_Id(): string { return Endpoint.baseUrl + Endpoint._get_user_by_Id }
    static get update_user(): string { return Endpoint.baseUrl + Endpoint._update_user }
    static get delete_user(): string { return Endpoint.baseUrl + Endpoint._delete_user }
    static get assign_role(): string { return Endpoint.baseUrl + Endpoint._assign_role }
    static get check_user_role(): string { return Endpoint.baseUrl + Endpoint._check_user_role }
    static get change_password(): string { return Endpoint.baseUrl + Endpoint._change_password }
    static get lock_acc(): string { return Endpoint.baseUrl + Endpoint._lock_acc }
    static get reset_password(): string { return Endpoint.baseUrl + Endpoint._reset_password }
    static get find_user_by_code(): string { return Endpoint.baseUrl + Endpoint._find_user_by_code }

    //menu
    static get get_menu(): string { return Endpoint.baseUrl + Endpoint._get_menu }
    static get get_menu_by_id(): string { return Endpoint.baseUrl + Endpoint._get_menu_by_id }

    //action
    static get get_action(): string { return Endpoint.baseUrl + Endpoint._get_action }
    static get get_action_by_menuId(): string { return Endpoint.baseUrl + Endpoint._get_action_by_menuId }

    //permission
    static get create_permission(): string { return Endpoint.baseUrl + Endpoint._create_permission }
    static get update_permission(): string { return Endpoint.baseUrl + Endpoint._update_permission }
    static get delete_permission(): string { return Endpoint.baseUrl + Endpoint._delete_permission }
    static get get_permission(): string { return Endpoint.baseUrl + Endpoint._get_permission }
    static get get_permission_by_roleId(): string { return Endpoint.baseUrl + Endpoint._get_permission_by_roleId }
    static get get_permission_by_Id(): string { return Endpoint.baseUrl + Endpoint._get_permission_by_Id }

    //permission-action
    static get create_permission_action(): string { return Endpoint.baseUrl + Endpoint._create_permission_action }
     static get update_permission_action(): string { return Endpoint.baseUrl + Endpoint._update_permission_action }
    static get delete_permission_action(): string { return Endpoint.baseUrl + Endpoint._delete_permission_action }

    //role
    static get get_role_detail(): string { return Endpoint.baseUrl + Endpoint._get_role_detail }
    static get get_role_all(): string { return Endpoint.baseUrl + Endpoint._get_role_all }
    static get get_role_paging(): string { return Endpoint.baseUrl + Endpoint._get_role_paging }
    static get create_role(): string { return Endpoint.baseUrl + Endpoint._create_role }
    static get update_role(): string { return Endpoint.baseUrl + Endpoint._update_role }
    static get delete_role(): string { return Endpoint.baseUrl + Endpoint._delete_role }
    static get delete_list_role(): string { return Endpoint.baseUrl + Endpoint._delete_list_role }
    static get assign_user(): string { return Endpoint.baseUrl + Endpoint._assign_user }

    //address
    static get province(): string { return Endpoint.baseUrl + Endpoint._province }
    static get district(): string { return Endpoint.baseUrl + Endpoint._district }
    static get commune(): string { return Endpoint.baseUrl + Endpoint._commune }

    //department
    static get create_department(): string { return Endpoint.baseUrl + Endpoint._create_department }
    static get update_department(): string { return Endpoint.baseUrl + Endpoint._update_department }
    static get delete_department(): string { return Endpoint.baseUrl + Endpoint._delete_department }
    static get get_department_by_id(): string { return Endpoint.baseUrl + Endpoint._get_department_by_id }
    static get get_department_paging(): string { return Endpoint.baseUrl + Endpoint._get_department_paging }
    static get get_all_department(): string { return Endpoint.baseUrl + Endpoint._get_all_department }

    //service
    static get create_medicalexaminationservice(): string { return Endpoint.baseUrl + Endpoint._create_medicalexaminationservice }
    static get update_medicalexaminationservice(): string { return Endpoint.baseUrl + Endpoint._update_medicalexaminationservice }
    static get delete_medicalexaminationservice(): string { return Endpoint.baseUrl + Endpoint._delete_medicalexaminationservice }
    static get delete_list_medicalexaminationservice(): string { return Endpoint.baseUrl + Endpoint._delete_list_medicalexaminationservice }
    static get get_medicalexaminationservice_paging(): string { return Endpoint.baseUrl + Endpoint._get_medicalexaminationservice_paging }
    static get get_all_medicalexaminationservice(): string { return Endpoint.baseUrl + Endpoint._get_all_medicalexaminationservice }

    //examination schedule
    static get create_medicalexaminationschedule(): string { return Endpoint.baseUrl + Endpoint._create_medicalexaminationschedule }
    static get update_medicalexaminationschedule(): string { return Endpoint.baseUrl + Endpoint._update_medicalexaminationschedule }
    static get delete_medicalexaminationschedule(): string { return Endpoint.baseUrl + Endpoint._delete_medicalexaminationschedule }
    static get delete_list_medicalexaminationschedule(): string { return Endpoint.baseUrl + Endpoint._delete_list_medicalexaminationschedule }
    static get get_medicalexaminationschedule_paging(): string { return Endpoint.baseUrl + Endpoint._get_medicalexaminationschedule_paging }
    static get get_all_medicalexaminationschedule(): string { return Endpoint.baseUrl + Endpoint._get_all_medicalexaminationschedule }
    static get get_medicalexaminationschedule_by_user(): string { return Endpoint.baseUrl + Endpoint._get_medicalexaminationschedule_by_user }
    static get get_medicalexaminationschedule_by_creater(): string { return Endpoint.baseUrl + Endpoint._get_medicalexaminationschedule_by_creater }
    static get get_medicalexaminationschedule_by_id(): string { return Endpoint.baseUrl + Endpoint._get_medicalexaminationschedule_by_id }
    static get update_status_medicalexaminationschedule(): string { return Endpoint.baseUrl + Endpoint._update_status_medicalexaminationschedule }

    //examination schedule patient record
    static get create_patientrecordservice(): string { return Endpoint.baseUrl + Endpoint._create_patientrecordservice }
    static get create_list_patientrecordservice(): string { return Endpoint.baseUrl + Endpoint._create_list_patientrecordservice }
    static get delete_patientrecordservice(): string { return Endpoint.baseUrl + Endpoint._delete_patientrecordservice }
    static get delete_list_patientrecordservice(): string { return Endpoint.baseUrl + Endpoint._delete_list_patientrecordservice }
    static get get_patientrecordservice_paging(): string { return Endpoint.baseUrl + Endpoint._get_patientrecordservice_paging }
    static get get_all_patientrecordservice(): string { return Endpoint.baseUrl + Endpoint._get_all_patientrecordservice }

    //patient record
    static get create_patientrecord(): string { return Endpoint.baseUrl + Endpoint._create_patientrecord }
    static get create_patientrecord_by_schedule(): string { return Endpoint.baseUrl + Endpoint._create_patientrecord_by_schedule }
    static get get_all_patientrecord(): string { return Endpoint.baseUrl + Endpoint._get_all_patientrecord }
    static get get_patientrecord_paging(): string { return Endpoint.baseUrl + Endpoint._get_patientrecord_paging }
    static get update_patientrecord(): string { return Endpoint.baseUrl + Endpoint._update_patientrecord }
    static get delete_patientrecord(): string { return Endpoint.baseUrl + Endpoint._delete_patientrecord }
    static get get_detail_patientrecord(): string { return Endpoint.baseUrl + Endpoint._get_detail_patientrecord }

    //payment
    static get create_payment(): string { return Endpoint.baseUrl + Endpoint._create_payment }


    

    //menu
    private static _get_menu = "/Menu/rpc/Portal/menu/get"
    private static _get_menu_by_id = "/Menu/rpc/Portal/menu/get-menu-by-id"

    //action
    private static _get_action = "/Action/rpc/Portal/action/get"
    private static _get_action_by_menuId = "/Action/rpc/Portal/action/get-all-action-by-menuId"

    //permission
    private static _create_permission = "/Permission/rpc/Portal/permission/create"
    private static _update_permission = "/Permission/rpc/Portal/permission/update"
    private static _delete_permission = "/Permission/rpc/Portal/permission/delete"
    private static _get_permission = "/Permission/rpc/Portal/permission/get-all-permission-paging"
    private static _get_permission_by_roleId = "/Permission/rpc/Portal/permission/get-permission-by-roleId"
    private static _get_permission_by_Id = "/Permission/rpc/Portal/permission/get-permission-by-Id"

    //permission-action
    private static _create_permission_action = "/PermissionAction/rpc/Portal/permissionaction/create"
    private static _update_permission_action = "/PermissionAction/rpc/Portal/permissionaction/update"
    private static _delete_permission_action = "/PermissionAction/rpc/Portal/permissionaction/delete"

    //role
    private static _get_role_detail = "/Role/Portal/detail"
    private static _get_role_all = "/Role/rpc/Portal/role/get"
    private static _get_role_paging = "/Role/rpc/Portal/role/get-paging"
    private static _create_role = "/Role/rpc/Portal/role/create"
    private static _update_role = "/Role/rpc/Portal/role/update"
    private static _delete_role = "/Role/rpc/Portal/role/delete"
    private static _delete_list_role = "/Role/rpc/Portal/role/delete-list-role"
    private static _assign_user = "/Role/rpc/Portal/role/assign-users-to-role"

    //user
    private static _authentication = "/User/rpc/Portal/user/authentication"
    private static _register = "/User/rpc/Portal/user/register"
    private static _get_user_paging = "/User/rpc/Portal/user/get-user-paging"
    private static _get_user_by_Id = "/User/rpc/Portal/user/get-user-by-id"
    private static _update_user = "/User/rpc/Portal/user/update"
    private static _delete_user = "/User/rpc/Portal/user/delete"
    private static _assign_role = "/Role/rpc/Portal/role/assign-roles-to-user"
    private static _check_user_role = "/User/rpc/Portal/user/checkuser-by-userId"
    private static _reset_password = "/User/rpc/Portal/user/resetpassword"
    private static _change_password = "/User/rpc/Portal/user/changepassword"
    private static _lock_acc = "/User/rpc/Portal/user/lock"
    private static _find_user_by_code = "/User/rpc/Portal/user/find-by-code"

    //address
    private static _province = "/Province/rpc/Portal/province/get"
    private static _district = "/Province/rpc/Portal/province/get-district-by-provinceId"
    private static _commune = "/Province/rpc/Portal/province/get-ward-by-districtId"

    //department
    private static _create_department = "/Department/rpc/Portal/department/create"
    private static _update_department = "/Department/rpc/Portal/department/update"
    private static _delete_department = "/Department/rpc/Portal/department/delete"
    private static _get_department_by_id = "/Department/rpc/Portal/department/get-by-id"
    private static _get_department_paging = "/Department/rpc/Portal/department/get-paging"
    private static _get_all_department = "/Department/rpc/Portal/department/get"

    //service
    private static _create_medicalexaminationservice = "/MedicalExaminationService/rpc/Portal/medicalexaminationservice/create"
    private static _update_medicalexaminationservice = "/MedicalExaminationService/rpc/Portal/medicalexaminationservice/update"
    private static _delete_medicalexaminationservice = "/MedicalExaminationService/rpc/Portal/medicalexaminationservice/delete"
    private static _delete_list_medicalexaminationservice = "/MedicalExaminationService/rpc/Portal/medicalexaminationservice/delete-list"
    private static _get_medicalexaminationservice_paging = "/MedicalExaminationService/rpc/Portal/medicalexaminationservice/get-paging"
    private static _get_all_medicalexaminationservice = "/MedicalExaminationService/rpc/Portal/medicalexaminationservice/get"

    //examination schedule
    private static _create_medicalexaminationschedule = "/MedicalExaminationSchedule/rpc/Portal/medicalexaminationschedule/create"
    private static _update_medicalexaminationschedule = "/MedicalExaminationSchedule/rpc/Portal/medicalexaminationschedule/update"
    private static _delete_medicalexaminationschedule = "/MedicalExaminationSchedule/rpc/Portal/medicalexaminationschedule/delete"
    private static _delete_list_medicalexaminationschedule = "/MedicalExaminationSchedule/rpc/Portal/medicalexaminationschedule/delete-list"
    private static _get_medicalexaminationschedule_paging = "/MedicalExaminationSchedule/rpc/Portal/medicalexaminationschedule/get-paging"
    private static _get_all_medicalexaminationschedule = "/MedicalExaminationSchedule/rpc/Portal/medicalexaminationschedule/get"
    private static _get_medicalexaminationschedule_by_user = "/MedicalExaminationSchedule/rpc/Portal/medicalexaminationschedule/get-paging-by-userId"
    private static _get_medicalexaminationschedule_by_creater = "/MedicalExaminationSchedule/rpc/Portal/medicalexaminationschedule/get-by-createBy"
    private static _get_medicalexaminationschedule_by_id = "/MedicalExaminationSchedule/rpc/Portal/medicalexaminationschedule/get-by-id"
    private static _update_status_medicalexaminationschedule = "/MedicalExaminationSchedule/rpc/Portal/medicalexaminationschedule/update-status"

    //examination schedule patient record
    private static _create_patientrecordservice = "/MedicalExaminationSchedulePatientRecord/rpc/Portal/patientrecordservice/create"
    private static _create_list_patientrecordservice = "/MedicalExaminationSchedulePatientRecord/rpc/Portal/patientrecordservice/create-list"
    private static _delete_patientrecordservice = "/MedicalExaminationSchedulePatientRecord/rpc/Portal/patientrecordservice/delete"
    private static _delete_list_patientrecordservice = "/MedicalExaminationSchedulePatientRecord/rpc/Portal/patientrecordservice/delete-list"
    private static _get_patientrecordservice_paging = "/MedicalExaminationSchedulePatientRecord/rpc/Portal/patientrecordservice/get-paging"
    private static _get_all_patientrecordservice = "/MedicalExaminationSchedulePatientRecord/rpc/Portal/patientrecordservice/get"

    //patient record
    private static _create_patientrecord = "/PatientRecord/rpc/Portal/patientrecord/create"
    private static _create_patientrecord_by_schedule = "/PatientRecord/rpc/Portal/patientrecord/create-by-schedule"
    private static _get_all_patientrecord = "/PatientRecord/rpc/Portal/patientrecord/get"
    private static _get_patientrecord_paging = "/PatientRecord/rpc/Portal/patientrecord/get-paging"
    private static _update_patientrecord = "/PatientRecord/rpc/Portal/patientrecord/update"
    private static _delete_patientrecord = "/PatientRecord/rpc/Portal/patientrecord/delete"
    private static _get_detail_patientrecord = "/PatientRecord/Portal/patientrecord/patientrecord-detail/"

    //payment
    private static _create_payment = "/Payment/rpc/Portal/payment/create-list"
}