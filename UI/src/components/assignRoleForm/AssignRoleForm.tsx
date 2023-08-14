import React, { useEffect, useState } from 'react'
import './AssignRoleForm.scss'
import { Dropdown } from '../../common/dropdown/DropDown'
import { Autocomplete, Button, TextField } from '@mui/material'
import { ButtonVariantType } from '../../model/enum/buttonEnum'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentPasteOffOutlinedIcon from "@mui/icons-material/ContentPasteOffOutlined";
import { RoleManagerTableDatas } from '../../model/enum/tableTypeEnum'
import { RoleStatus } from '../../pages/adminPageContainer/roleManagerPage/RoleManagerPage'
import { RoleService } from '../../api/apiPage/apiPage'
interface RoleTableColumns {
  roleCode: string
  roleName: string
  roleTask: JSX.Element
}

interface AssignRoleFormProps {
  onChangeRoleSelect?: (role: string[]) => void
  roleListSelectFromProps?: RoleManagerTableDatas[]
}



function AssignRoleForm(props: AssignRoleFormProps) {
  const [loadingRoleList, setLoadingRoleList] = useState<boolean>(false)
  const [roleList, setRoleList] = useState<RoleManagerTableDatas[]>([])
  const [roleListSelect, setRoleListSelect] = useState<RoleManagerTableDatas[]>([])
  const [selected, setSelected] = useState<RoleManagerTableDatas>()
  const [rows, setRow] = useState<RoleTableColumns[]>([])

console.log(props.roleListSelectFromProps);


  useEffect(() => {
    setLoadingRoleList(true)
    RoleService.getRoleAll().then(res => {
      if (res.success) {
        let datas: RoleManagerTableDatas[] = []
        !!res.data && res.data?.forEach((e: any) => {
          datas.push({
            id: e.id,
            code: e.code,
            name: e.name,
            description: e.description,
            startDate: e.startDate,
            endDate: e.endDate,
            status: e.status,
          })
        })
        setLoadingRoleList(false)
        setRoleList(datas)
      } else {
        setLoadingRoleList(false)
      }
    })
    setRoleListSelect(props.roleListSelectFromProps || [])
  }, [])

  console.log(roleListSelect);
  
  
  useEffect(() => {
      setRow(roleListSelect.map((e: RoleManagerTableDatas) => {
        return {
          roleCode: e.code, roleName: e.name, roleTask: <IconButton aria-label="delete" size="small" onClick={() => { removeRole(e.id) }}>
            <DeleteIcon color='error' />
          </IconButton>
        }
      }))
      let roleIdList: string[] = []
      roleListSelect.forEach(role => {
        roleIdList.push(role.id)
      })
      props.onChangeRoleSelect!(roleIdList)
  }, [roleListSelect])

  const removeRole = (idDel: string) => {
    setRoleListSelect(roleListSelect.filter((e) => idDel !== e.id))
  }

  return (
    <div className='assignrole-form'>
      <div className="assignrole-action">
        <div className="assignrole-choose">
          <Autocomplete
            disablePortal
            id="assignrole-box-select"
            options={roleList}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.name}
            sx={{ width: 420 }}
            renderInput={(params) => <TextField {...params} label="" placeholder='Chọn vai trò' />}
            onChange={(_, selected) => {
              setSelected(selected!)
            }}
            loading={loadingRoleList}
            loadingText={<>Vui lòng đợi...</>}
          />
        </div>
        <div className="assignrole-assign">
          <Button
            variant={ButtonVariantType.Contained}
            endIcon={<AddCircleOutlineOutlinedIcon />}
            sx={{ textTransform: 'none' }}
            onClick={() => {

              if (!!selected) {
                roleListSelect.filter((role) =>
                  role.id === selected.id
                ).length === 0 &&
                  setRoleListSelect(roleListSelect.concat(selected))
              }
            }}
          >Gán vai trò</Button>
        </div>
      </div>
      <div className="role-assign-list">
        {rows.length !== 0 ?
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Mã vai trò</TableCell>
                  <TableCell>Tên vai trò</TableCell>
                  <TableCell align='center'>Tác vụ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.roleCode}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.roleCode}
                    </TableCell>
                    <TableCell>{row.roleName}</TableCell>
                    <TableCell align='center'>{row.roleTask}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> :
          <div className="role-assign-list-nodata">
            <ContentPasteOffOutlinedIcon />
            Không có dữ liệu để hiển thị
          </div>}
      </div>
    </div>
  )
}

export default AssignRoleForm