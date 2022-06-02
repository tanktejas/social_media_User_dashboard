import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import './wingets.css'
import { useParams } from 'react-router-dom'

const WidgetsDropdown = () => {
  const params = useParams()
  const [loginuserallreqinfo, setlri] = useState({ is: true })
  const [user, setuser] = useState([])
  const [curruserpost, setpost] = useState([])
  const [isuserfetched, setis] = useState(true)

  useEffect(() => {
    fetch('https://md112.herokuapp.com/getuserfriend', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => data.json())
      .then((data) => {
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
          if (data[i].email == params.user) {
            setlri(data[i])
            console.log(loginuserallreqinfo)
            break
          }
        }
      })

    // gettig all login user
    fetch('https://md112.herokuapp.com/getallloginuser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => data.json())
      .then((data) => {
        setuser(data)
      })

    //getting current user post
    fetch('https://md112.herokuapp.com/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => data.json())
      .then((data) => {
        let allpost = []
        // console.log(params.user)
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
          if (data[i].nameofuser == params.user) {
            allpost.push(data[i])
          }
        }
        setis(false)
        setpost(allpost)
      })
  }, [])

  if (loginuserallreqinfo.is || user.length == 0 || isuserfetched) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  }
  console.log(curruserpost)
  // console.log(loginuserallreqinfo)
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={<></>}
          title="Total Users"
          action={<></>}
          chart={
            <>
              <div className="mainuserdis">
                <div className="up">
                  <h1>{user.length}</h1>
                </div>
                <div className="down">
                  <h3>Users</h3>
                </div>
              </div>
            </>
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={<></>}
          title="Total friend"
          action={<></>}
          chart={
            <>
              <div className="mainuserdis">
                <div className="up">
                  <h1>{loginuserallreqinfo.accept}</h1>
                </div>
                <div className="down">
                  <h3>Friends</h3>
                </div>
              </div>
            </>
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={<></>}
          title="Pending Request"
          action={<></>}
          chart={
            <>
              <div className="mainuserdis">
                <div className="up">
                  <h1>{loginuserallreqinfo?.pending?.length}</h1>
                </div>
                <div className="down">
                  <h3>Pending Requests</h3>
                </div>
              </div>
            </>
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={<></>}
          title="Posted Post"
          action={<></>}
          chart={
            <div className="mainuserdis">
              <div className="up">
                <h1>{curruserpost.length}</h1>
              </div>
              <div className="down">
                <h3>Posts</h3>
              </div>
            </div>
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
