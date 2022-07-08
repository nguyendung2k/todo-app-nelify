import { Button } from 'antd'
import styles from './ButtonDeleteRowTable.module.css'

const ButtonDeleteRowTodo = ({ disabled, onClick }) => {
    const checkRole = localStorage.getItem('ROLE')
    return (
        <>
            {checkRole === '1' ? (
                <Button
                    className={styles.btn}
                    type="danger"
                    onClick={onClick}
                    disabled={disabled}
                >
                    DELETE
                </Button>
            ) : (
                []
            )}
        </>
    )
}

export default ButtonDeleteRowTodo
