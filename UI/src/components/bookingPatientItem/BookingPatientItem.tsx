import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import './BookingPatientItem.scss'
import Button from '@mui/material/Button';
import {ButtonVariantType} from '../../model/enum/buttonEnum';

interface IBookingPatientItemProps {
    index: number
    name: string
    dateBirth: Date
    sex: number
    phone?: string
    selectProfile: (index: number) => void
    editProfile: (action: string, index: number) => void
    isSelected?: boolean
}

function BookingPatientItem(props: IBookingPatientItemProps) {
    const { index, name, dateBirth, sex, phone, selectProfile, editProfile, isSelected } = props
    return (
        <div className='booking-patient-item' style={{ border: isSelected ? '1px solid #00A2FF' : '1px solid #ffffff' }} onClick={() => {
            selectProfile(index);;
        }}>
            <Checkbox checked={isSelected} />
            <div className="booking-patient-info">
                <div className="booking-patient-name">{name}</div>
                <div className="booking-patient-time">{new Date().getTime() !== new Date(dateBirth).getTime() && `Ngày sinh: ${new Date(dateBirth).getDate()}/${new Date(dateBirth).getMonth() + 1}/${new Date(dateBirth).getFullYear()} - ${sex === 0 ? 'Nam' : 'Nữ'}`}</div>
                {phone && <div className="booking-patient-phone">{`SĐT: ${phone}`}</div>}
            </div>
            {isSelected && !!index && <Button variant={ButtonVariantType.Text} onClick={(e) => {
                e.stopPropagation()
                editProfile("Edit", index)
            }}>
                <ModeEditOutlineOutlinedIcon sx={{ fontSize: '32px', color: '#00A2FF' }} />
            </Button>}
        </div>
    )
}

export default BookingPatientItem