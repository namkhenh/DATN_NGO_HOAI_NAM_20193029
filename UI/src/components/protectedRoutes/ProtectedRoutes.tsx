import React from 'react'
import {Navigate, Outlet} from 'react-router'
import {AccountRoleEnum} from '../../model/enum/accPermissionEnum'

const useAuth = () => {
    let user: any
    const _user = localStorage.getItem('user')
    console.log(_user);
    
    if (_user) {
        user = JSON.parse(_user)
    }
    if (user) {
        return {
            auth: true,
            role: user.role
        }
    } else {
        return {
            auth: false,
            role: null
        }
    }
}

interface ProtectedRoutesProps {
    roleRequired?: AccountRoleEnum
}

function ProtectedRoutes(props: ProtectedRoutesProps) {
    const { auth, role } = useAuth()
    console.log(auth);
    
    if (props.roleRequired) {
        console.log(role >= props.roleRequired);
        return auth ? (
            role >= props.roleRequired ? (
                <Outlet />
            ) : (
                <Navigate to='/tu-choi' replace/>
            )
        ) : (
            <Navigate to='/dang-nhap' />
        )
    } else {
        return auth ? <Outlet /> : <Navigate to='/dang-nhap' />
    }
}

export default ProtectedRoutes