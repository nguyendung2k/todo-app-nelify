import React, { createContext, useEffect, useState } from "react";
import { ACCOUNTS } from './constant'
import { containsWhitespace } from '../../utils/string.utils'
import { openNotification } from '../../utils/notice.utils'

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('ROLE')) {
            setIsLoggedIn(true)
        }
    }, [])

    const logInHandler = (username, password) => {
        const acc = ACCOUNTS.find(account => account.username === username && account.password === password)
        if (acc) {
            localStorage.setItem('ROLE', acc.role)
            setIsLoggedIn(true)
        } else {
            // console.log('222')
            openNotification('error', 'Thông tin tài khoản và mật khẩu không chính xác!!!');
        }
    }

    const logOutHandler = () => {
        localStorage.removeItem('ROLE')
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogOut: logOutHandler,
            onLogIn: logInHandler,
            // role: checkRole,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthContextProvider }
