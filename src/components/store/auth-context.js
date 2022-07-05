import React, { createContext, useEffect, useState } from 'react'
import { ACCOUNTS } from './constant'
import { openNotification } from '../../utils/notice.utils'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('ROLE')) {
            setIsLoggedIn(true)
        }
    }, [])

    const logInHandler = (username, password) => {
        const acc = ACCOUNTS.find(
            (account) =>
                account.username === username && account.password === password
        )
        if (acc) {
            localStorage.setItem('ROLE', acc.role)
            setIsLoggedIn(true)
        } else {
            openNotification('error', 'Account and password not correct!')
        }
    }

    const logOutHandler = () => {
        localStorage.removeItem('ROLE')
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogOut: logOutHandler,
                onLogIn: logInHandler,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }
