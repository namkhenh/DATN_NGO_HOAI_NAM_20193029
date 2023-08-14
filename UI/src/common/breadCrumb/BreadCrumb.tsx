import React from 'react'
import './BreadCrumb.scss'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home'; import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { NavLink } from 'react-router-dom';
interface IBreadcrumbs {
    key: number
    href: string
    text: string
}

interface BreadcrumbsProps {
    breadcrumbItem: IBreadcrumbs[]
}

// function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
//     event.preventDefault();
//     console.info('You clicked a breadcrumb.');
// }

function BreadCrumbView(props: BreadcrumbsProps) {   
    return (
        <div>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <NavLink
                    // underline="hover"
                    // sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    // href="/"
                    to={'/admin/dashboard'}
                    // style={{ display: 'flex', alignItems: 'center' }}
                >
                    <div className="home">
                        <HomeOutlinedIcon fontSize="medium" />
                    </div>
                </NavLink>
                {props.breadcrumbItem?.map((item) => {
                    return props.breadcrumbItem?.indexOf(item) < props.breadcrumbItem?.length - 1 ?
                        <NavLink key={item.key} color="inherit" to={item.href}>
                            <div className="child">
                            {item.text}

                            </div>
                        </NavLink> :
                        <Typography key={item.key} color="text.primary">
                            {item.text}
                        </Typography>
                })}
            </Breadcrumbs>
        </div>
     )
}

export default BreadCrumbView