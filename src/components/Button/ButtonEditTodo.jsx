import { Button } from 'antd'
import styles from './ButtonEditTodo.module.css'

const ButtonEditTodo = ({ onClick }) => {
    const checkRole = localStorage.getItem('ROLE')

    return (
        <>
            {checkRole === '1' ? (
                <Button
                    type="primary"
                    className={styles.btn__edit}
                    onClick={onClick}
                >
                    EDIT
                </Button>
            ) : (
                <Button disabled className={styles.btn__edit}>
                    EDIT
                </Button>
            )}
        </>
    )
}

export default ButtonEditTodo
