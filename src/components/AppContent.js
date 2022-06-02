import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = () => {
  const Element = routes[0].element
  return (
    <CContainer lg>
      <Routes>
        <Route
          path={routes[0].path}
          exact={routes[0].exact}
          name={routes[0].name}
          element={<Element />}
        />
      </Routes>
    </CContainer>
  )
}

export default React.memo(AppContent)
