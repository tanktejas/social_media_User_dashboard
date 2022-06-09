import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
// import Cardd from './Card/card'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { saveAs } from 'file-saver'
import PropTypes from 'prop-types'

// for menu icon
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from '@material-ui/core'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { useEffect } from 'react'

import './index.css'
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))
const Dashboard = () => {
  // fetching  all user from api
  const params = useParams()
  const [user, setuser] = useState([])
  const [loginuser, setuserlogin] = useState({ is: true })
  const [loginuserallreqinfo, setlri] = useState({ is: true })
  const [curruserpost, setpost] = useState([])
  const [isuserfetched, setis] = useState(true)
  const [nameofdashboardowener, setowener] = useState('')

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
        setuser(data)
      })

    // find particular login user data
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
            setuserlogin(data[i])
            break
          }
        }
      })

    //geting current user friends.
    fetch('https://md112.herokuapp.com/getuserfriend', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => data.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].email == params.user) {
            setlri(data[i])

            break
          }
        }
      })

    //finding currusers posts.
    fetch('https://md112.herokuapp.com/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => data.json())
      .then((data) => {
        let allpost = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].nameofuser == params.user) {
            allpost.push(data[i])
            setowener(data[i].currnamenotmail)
          }
        }
        setis(false)
        setpost(allpost)
      })
  }, [])

  // const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  // const url = `https://md112.herokuapp.com/${img}`
  const [anchorEl, setAnchorEl] = React.useState(false)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (user.length == 0 || loginuser.is || loginuserallreqinfo.is || isuserfetched) {
    return <h1>Loading....</h1>
  }
  // for (let i = 0; i < loginuserallreqinfo.acceptreq.length; i++) {}
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  if (curruserpost.is) {
    setpost([])
  }
  // send friend request
  const sendfriendrequest = (from, to) => {
    const reqobj = {
      userfrom: from,
      userto: to,
    }

    fetch('https://md112.herokuapp.com/sentreq', {
      method: 'POST',
      body: JSON.stringify(reqobj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => data.json())
      .then((data) => {})

    window.location.reload()
  }
  const accept = (from, to) => {
    const acceptobj = {
      userwhooaccept: from,
      reqofthisuser: to,
    }

    fetch('https://md112.herokuapp.com/acceptreq', {
      method: 'POST',
      body: JSON.stringify(acceptobj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => data.json())
      .then((data) => {})
  }

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  // remove image as per user request.
  function removeimage(key) {
    fetch('https://md112.herokuapp.com/deletepost', {
      method: 'POST',
      body: JSON.stringify({ key: key, nameofuser: nameofdashboardowener }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => {
        window.location.reload()
        return data.json()
      })
      .then((data) => {})
  }
  console.log(nameofdashboardowener)
  return (
    <>
      <WidgetsDropdown loginuserallreqinfo={loginuserallreqinfo} />
      <CCard className="mb-4"></CCard>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              <div className="allpostsofthisuser">
                <h2>Your Uploaded Posts</h2>
                <div className="posts">
                  {curruserpost.map((item) => {
                    const url = `https://md112.herokuapp.com/${item.Key}`
                    return (
                      <div className="card1" key="sdsd">
                        <div className="upper">
                          <h4>Name :{item.name}</h4>

                          <h5>desc :{item.desc}</h5>
                        </div>
                        <div className="image">
                          <img src={url}></img>
                        </div>
                        <div className="remove">
                          <button
                            onClick={() => {
                              removeimage(item.Key)
                            }}
                          >
                            Remove Image
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/*table for all user showcase  */}
              <h2 className="userfriend">All Users</h2>

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Level</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Make Friend</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {user.map((item, index) => {
                    {
                      /* check if user accepted  */
                    }

                    let isalreadyfriend = true
                    loginuserallreqinfo.acceptreq.map((item1) => {
                      if (item1 == item.email) {
                        isalreadyfriend = 0
                      }
                    })
                    {
                      /* check if user already requested  */
                    }
                    let isalreadyreq = 0
                    loginuserallreqinfo.sentreq.map((item1) => {
                      if (item1 == item.email) isalreadyreq = 1
                    })

                    {
                      /* check is requfor this user is panding  */
                    }
                    let ispanding = 0
                    loginuserallreqinfo.pending.map((item1) => {
                      if (item1 == item.email) ispanding = 1
                    })

                    if (
                      isalreadyfriend &&
                      !isalreadyreq &&
                      item.email != params.user &&
                      !ispanding
                    ) {
                      return (
                        <CTableRow
                          className="formobile"
                          id="formobile"
                          v-for="item in tableItems"
                          key={index}
                        >
                          <CTableDataCell className="text-center">
                            <CAvatar size="md" src={item.picture} />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.nickname}</div>
                            <div className="small text-medium-emphasis">
                              <span>New</span> | Registered: {item.updated_at.substring(0, 10)}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="clearfix">
                              <p>{item.status}</p>
                            </div>
                            <CProgress thin color="blue" value="blue" />
                          </CTableDataCell>

                          <CTableDataCell className="last">
                            <input
                              type="button"
                              className="buttonformakingfriend"
                              value={`Reqest to ${item.email}`}
                              onClick={(e) => {
                                const mailtosend = e.target.value.substring(10)

                                sendfriendrequest(params.user, mailtosend)
                              }}
                            />
                          </CTableDataCell>
                        </CTableRow>
                      )
                    } else {
                      return null
                    }
                  })}
                </CTableBody>
              </CTable>

              {/* table for showing friend of user  */}

              <h2 className="userfriend">Your Friends</h2>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Level</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Make Friend</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {user.map((it, idx) => {
                    return loginuserallreqinfo.acceptreq.map((item, index) => {
                      if (it.email == item && item != params.user) {
                        return (
                          <CTableRow
                            className="formobile"
                            id="formobile"
                            v-for="item in tableItems"
                            key={index}
                          >
                            <CTableDataCell className="text-center">
                              <CAvatar size="md" src={it.picture} />
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{it.nickname}</div>
                              <div className="small text-medium-emphasis">
                                <span>New</span> | Registered: {it.updated_at.substring(0, 10)}
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="clearfix">
                                <p>{it.status}</p>
                              </div>
                              <CProgress thin color="blue" value="blue" />
                            </CTableDataCell>

                            <CTableDataCell className="last">
                              <input
                                type="button"
                                className="buttonformakingfriend"
                                value={`Online since 12 minutes (pro user)`}
                                onClick={(e) => {
                                  const mailtosend = e.target.value.substring(10)
                                }}
                                disabled
                              />
                            </CTableDataCell>
                          </CTableRow>
                        )
                      }
                    })
                  })}
                </CTableBody>
              </CTable>

              {/* pending friend request  */}

              <h2 className="userfriend">Pending request</h2>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Level</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Make Friend</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {user.map((it, idx) => {
                    return loginuserallreqinfo.pending.map((item, index) => {
                      if (it.email == item && item != params.user) {
                        return (
                          <CTableRow
                            className="formobile"
                            id="formobile"
                            v-for="item in tableItems"
                            key={index}
                          >
                            <CTableDataCell className="text-center">
                              <CAvatar size="md" src={it.picture} />
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{it.nickname}</div>
                              <div className="small text-medium-emphasis">
                                <span>New</span> | Registered: {it.updated_at.substring(0, 10)}
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="clearfix">
                                <p>{it.status}</p>
                              </div>
                              <CProgress thin color="blue" value="blue" />
                            </CTableDataCell>

                            <CTableDataCell className="last">
                              <input
                                type="button"
                                className="buttonformakingfriend"
                                value={`Accept ` + it.email}
                                onClick={(e) => {
                                  const mailtosend = e.target.value.substring(7)
                                  accept(params.user, mailtosend)
                                  window.location.reload()
                                }}
                              />
                            </CTableDataCell>
                          </CTableRow>
                        )
                      }
                    })
                  })}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
