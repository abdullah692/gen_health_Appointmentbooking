import React from 'react'
import logo from '../../assets/images/logo.png'

function Header(props) {
  return (
    <div>
      <div className="flex justify-center mb-6">
        <img src={logo} alt="logo" className="h-12 mt-10" />
        <p className="ml-8 mt-10 text-[26px] text-[#14226D]">Genesis Health</p>
      </div>
    </div>
  )
}

export default Header
