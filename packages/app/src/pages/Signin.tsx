import { User, toast, useAuth } from '@recap/shared'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { createAuthToken } from '@recap/shared/src/functions'
import { MEETINGS } from '../constants/routes'

export default function Signin() {
  const { onAuthStateChanged, loginWithPopup, error } = useAuth()
  const navigate = useNavigate()

  const login = async () => {
    try {
      await loginWithPopup?.()
    } catch (error) {
      toast.error('An error occurred during login', error)
    }
  }

  // TODO: change type
  const shareLogin = async (user: User) => {
    // Transfer auth to extension
    const {
      data: { token }
    } = (await createAuthToken()) as { data: { token: string } }

    if (user.extensionId) {
      await chrome.runtime.sendMessage(user.extensionId, { type: 'LOGIN', token })
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message, error.err)
    }
  }, [error])

  useEffect(() => {
    // If user already logged in we redirect to meetings page
    const unsubscribe = onAuthStateChanged(async (u: any) => {
      if (u !== null) {
        shareLogin(u)
        navigate(MEETINGS)
      }
    })

    return unsubscribe
  }, [navigate, onAuthStateChanged])

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <button onClick={login} className="google-login-button"></button>
    </div>
  )
}
