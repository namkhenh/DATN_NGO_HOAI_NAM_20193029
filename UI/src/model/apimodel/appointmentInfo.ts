import {AppointmentStatus} from "../enum/appointmentEnum";
import {IUserAddress} from "./userInfo";

export interface IAppointmenViewModel {
    patientId?: string;
    patientCode?: string;
    patientAvatar?: string;
    patientName: string;
    patientBirth: Date;
    patientSex: number;
    patientPhoneNumber?: string
    patientIdentityNumber?: string
    patientAddress: IUserAddress
    appointmentTime: Date
    appointmentReason: string
    appointmentStatus?: AppointmentStatus
    appointmentId?: string
    appointmentNumber?: number
    guardianName?: string
    guardianPhone?: string
    guardianRelation?: string
}

export enum AppointmenModelProperty {
    patientId =  'patientId',
    patientAvatar =  'patientAvatar',
    patientName =  'patientName',
    patientBirth = 'patientBirth' ,
    patientSex =  'patientSex',
    patientPhoneNumber = 'patientPhoneNumber' ,
    patientIdentityNumber = 'patientIdentityNumber' ,
    patientAddress ='patientAddress'  ,
    appointmentDate ='appointmentDate'  ,
    appointmentTime = 'appointmentTime' ,
    appointmentReason ='appointmentReason'  ,
    appointmentStatus = 'appointmentStatus' ,
    appointmentId =  'appointmentId',
    appointmentNumber = 'appointmentNumber' ,
    guardianName =  'guardianName',
    guardianPhone =  'guardianPhone',
    guardianRelation = 'guardianRelation'  ,
}

export interface IPatientProfileViewModel {
    patientId: string;
    patientAvatar?: string;
    patientName: string;
    patientSex: number;
    patientDateBirth: string;
    patientPhoneNumber?: string
    patientIdentityNumber?: string;
    patientAddress: IUserAddress;
    guardianName?: string
    guardianPhone?: string
    guardianRelation?: string
}

export enum PatientProfileModelProperty {
    patientId = "patientId",
    patientAvatar = "patientAvatar",
    patientName = "patientName",
    patientSex = "patientSex",
    patientDateBirth = "patientDateBirth",
    patientPhoneNumber = "patientPhoneNumber",
    patientIdentityNumber = "patientIdentityNumber",
    patientAddress = "patientAddress",
    guardianName = "guardianName",
    guardianPhone = "guardianPhone",
    guardianRelation = "guardianRelation",
}

export const PatientProfileDefaultView = {
    patientId: "",
    patientAvatar: "",
    patientName: "",
    patientSex: 0,
    patientDateBirth: "",
    patientPhoneNumber: "",
    patientIdentityNumber: "",
    patientAddress: {
        province: {
            key: 0,
            text: ''
        },
        district: {
            key: 0,
            text: ''
        },
        commune: {
            key: 0,
            text: ''
        },
        address: ''
    },
    guardianName: "",
    guardianPhone: "",
    guardianRelation: "",
}


export interface IAppointmentInfo {
    appointmentDate: Date
    appointmentTime: Date
    appointmentReason: string
}

export enum AppointmentInfoModelProperty {
    appointmentDate = "appointmentDate",
    appointmentTime = "appointmentTime",
    appointmentReason = "appointmentReason",
}