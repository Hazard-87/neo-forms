import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Result from '../pages/Result'
import Camera from '../pages/Camera'

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/camera" element={<Camera />} />
        </Route>
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesComponent
