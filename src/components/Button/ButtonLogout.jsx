import { Button } from 'antd'
import styles from './ButtonLogout.module.css'

const ButtonLogout = ({ onClick }) => {
    return (
        <Button
            className={styles.button}
            danger
            type="primary"
            onClick={onClick}
        >
            LOGOUT
        </Button>
    )
}

export default ButtonLogout
