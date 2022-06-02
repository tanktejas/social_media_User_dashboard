import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import AppHeaderDropdown from './header/AppHeaderDropdown'
import { logo } from 'src/assets/brand/logo'

// css import
import '../CSS/header.css'
import { useState } from 'react'
import { useEffect } from 'react'

const AppHeader = () => {
  const params = useParams()
  const [user, setuser] = useState([])
  const [status, setstat] = useState(false)
  // fetching all login data from server

  useEffect(() => {
    fetch('https://md112.herokuapp.com/getallloginuser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => data.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].email == params.user) {
            setuser(data[i])
            // console.log(data[i])
            break
          }
        }
      })
  }, [])

  if (user.length == 0) {
    return <h1>Loading....</h1>
  }
  const name = user.nickname.length < user.name.length ? user.nickname : user.name
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid className="maincontainer">
        {/* main nav bar  */}

        <CHeaderNav>
          <CNavItem>
            <CNavLink to="/dashboard" className="usedash" component={NavLink}>
              {name}&apos;s Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      {/* <CHeaderDivider /> */}
      {/* route show header  */}
      {/* <CContainer fluid><AppBreadcrumb /></CContainer> */}
    </CHeader>
  )
}

export default AppHeader
