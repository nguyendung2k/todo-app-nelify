import { notification } from 'antd'

export const getNotificationStyle = (type) => {
    return {
        success: {
            color: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid #b7eb8f',
            backgroundColor: '#f6ffed',
            marginTop: '25px',
        },
        warning: {
            color: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid #ffe58f',
            backgroundColor: '#fffbe6',
            marginTop: '25px',
        },
        error: {
            color: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid #ffa39e',
            backgroundColor: '#fff1f0',
            marginTop: '25px',
        },
        info: {
            color: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid #91d5ff',
            backgroundColor: '#e6f7ff',
            marginTop: '25px',
        },
    }[type]
}

export const openNotification = (type, description) => {
    notification[type]({
        message: 'Cảnh báo',
        description: description,
        style: getNotificationStyle(type),
        duration: 2,
    })
}
