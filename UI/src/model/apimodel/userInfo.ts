import {IDropdownOption} from "@fluentui/react";
import { RoleManagerTableDatas } from "../enum/tableTypeEnum";

export interface IUserAddress {
    province: IProvince;
    district: IDistrict;
    commune: ICommune;
    address?: string;
}

export interface IProvince {
    id: string
    code: number
    name: string
    codeName: string
    divisonType: string
    phoneCode: number
}

export const ProvinceDefault = {
    id:  "",
    code:  0,
    name:  "",
    codeName:  "",
    divisonType:  "",
    phoneCode:  0,
}

export interface IDistrict {
    id: string
    code: number
    name: string
    codeName: string
    divisonType: string
    provinceId: number
}

export const DistricDefault = {
    id:  "",
    code:  0,
    name:  "",
    codeName:  "",
    divisonType:  "",
    provinceId:  0,
}
export interface ICommune {
    id: string
    name: string
    code: number
    codeName: string
    divisonType: string
    districtId: number
}

export const CommuneDefault = {
    id:  "",
    code:  0,
    name:  "",
    codeName:  "",
    divisonType:  "",
    districtId:  0,
}

export interface ICountry {
    flag: string
    name: string
}

export interface IEthnic {
    id: number
    name: string
}

export interface IUserInfoViewModel {
    id: string;
    code: string;
    userName: string;
    status: boolean,
    phoneNumber: string;
    fullName: string;
    email: string;
    cmnd: string;
    dateOfBirth: Date;
    sex: number,
    provinceId: string;
    districtId: string;
    wardId: string;
    province: IProvince;
    district: IDistrict;
    ward: ICommune;
    address: string;
    religion: number
    roles: RoleManagerTableDatas[],
    guardianName: string,
    guardianPhone: string,
    guardianRelation: number,
}

export const UserInfoDefaultView = {
    id: '',
    code: '',
    userName: '',
    status: true,
    phoneNumber: '',
    fullName: '',
    email: '',
    cmnd: '',
    dateOfBirth:  new Date(),
    sex: 0,
    provinceId: '',
    districtId: '',
    wardId: '',
    province: ProvinceDefault,
    district: DistricDefault,
    ward: CommuneDefault,
    address: '',
    religion: 0,
    roles: [],
    guardianName: '',
    guardianPhone: '',
    guardianRelation: 0,
}

export enum UserInfoModelProperty {
    id = 'id',
    code = 'code',
    userName = 'userName',
    status = 'status',
    phoneNumber = 'phoneNumber',
    fullName = 'fullName',
    email = 'email',
    cmnd = 'cmnd',
    dateOfBirth = 'dateOfBirth',
    sex = 'sex',
    provinceId = 'provinceId',
    districtId = 'districtId',
    wardId = 'wardId',
    province = 'province',
    district = 'district',
    ward = 'ward',
    address = 'address',
    religion = 'religion',
    roles = 'roles',
    guardianName = 'guardianName',
    guardianPhone = 'guardianPhone',
    guardianRelation = 'guardianRelation',
}

export enum UserAddressModelProperty {
    province = "province",
    district = "district",
    commune = "commune",
    address = "address",
}

export enum UserInfoDetailTabType {
    MainInfo = "0",
    OtherInfo = "1"
}

export const UserSexView = [
    {
        key: 0,
        text: 'Nam'
    },
    {
        key: 1,
        text: 'Nữ'
    }
]


export const UserDisableAcount = [
    {
        key: 0,
        text: 'Tôi muốn tạo tài khoản khác'
    },
    {
        key: 1,
        text: 'Xóa tài khoản vĩnh viễn, tôi sẽ quay lại sau'
    },
    {
        key: 2,
        text: 'Khác'
    }
]

export const ReligionEnum = [
    {
        key: 0,
        text: 'None'
    },
    {
        key: 1,
        text: 'Christianity'
    },
    {
        key: 2,
        text: 'Christian'
    },
    {
        key: 3,
        text: 'RomanCatholicism'
    },
    {
        key: 4,
        text: 'Buddhism'
    },
    {
        key: 5,
        text: 'Islam'
    },
    {
        key: 6,
        text: 'Hinduism'
    },
    {
        key: 7,
        text: 'Judaism'
    },
    {
        key: 8,
        text: 'Shintoism'
    },
    {
        key: 9,
        text: 'Atheism'
    },
    {
        key: 10,
        text: 'Confucianism'
    },
    {
        key: 11,
        text: 'Taoism'
    },
    {
        key: 12,
        text: 'Protestantism'
    },
    {
        key: 13,
        text: 'Catholicism'
    },
]

export const Relation = [
    {
        key: 0,
        text: 'Cha'
    },
    {
        key: 1,
        text: 'Mẹ'
    },
    {
        key: 2,
        text: 'Con trai'
    },
    {
        key: 3,
        text: 'Con gái'
    },
    {
        key: 6,
        text: 'Chồng'
    },
    {
        key: 7,
        text: 'Vợ'
    },
    {
        key: 8,
        text: 'Anh trai'
    },
    {
        key: 9,
        text: 'Chị gái'
    },
    {
        key: 10,
        text: 'Chú'
    },
    {
        key: 11,
        text: 'Dì'
    },
    {
        key: 12,
        text: 'Cháu trai'
    },
    {
        key: 13,
        text: 'Cháu gái'
    }
]





