import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../buttons'

import google from '../../assets/img/google.png'
import logo from '../../assets/img/logo.svg'
import { signin } from '../../auth/Google'
import { PRIVACY_POLICY, SIGNING_IN, TERMS_CONDITIONS } from '../../constants/routes'

export default function Index({ className = '' }) {
  const navigate = useNavigate()

  return (
    <footer className={`container sm:py-[100px] py-[75px] ${className}`}>
      <div className="flex sm:flex-row flex-col gap-[40px] sm:justify-between">
        <div className="flex sm:flex-row flex-col sm:items-center sm:gap-0 gap-[10px]">
          <Link className="flex gap-[10px] " to="/">
            <img src={logo} alt="" />
            <div className="text-[18px] font-bold">Recap</div>
          </Link>
          <div className="sm:ml-[42px] sm:text-[15px] text-[12px] text-gray-500">© 2023 Recap Labs, Inc.</div>
        </div>
        <div className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-[20px] gap-[40px]">
          <div className="flex sm:flex-row flex-col sm:items-center sm:gap-[20px] gap-[15px]">
            <Link to={TERMS_CONDITIONS} className="block text-[15px] font-semibold text-gray-500">
              Terms and Conditions
            </Link>
            <Link to={PRIVACY_POLICY} className="block text-[15px] font-semibold text-gray-500">
              Privacy
            </Link>
            <button
              onClick={() => {
                navigate(`/${SIGNING_IN}`)
                signin()
              }}
              className="block text-[15px] font-semibold text-gray-500"
            >
              Sign in
            </button>
          </div>
          <Link to="#" className="sm:ml-[20px]">
            <Button>
              <img src={google} alt="" />
              Add to Chrome
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
