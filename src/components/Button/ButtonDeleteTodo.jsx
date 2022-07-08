import { Button } from 'antd'
import styles from './ButtonDeleteTodo.module.css'
const ButtonDeleteTodo = ({ onClick }) => {
    const checkRole = localStorage.getItem('ROLE')

    return (
        <>
            {checkRole === '1' ? (
                <Button className={styles.btn__delete} danger onClick={onClick}>
                    DELETE
                </Button>
            ) : (
                <Button disabled className={styles.btn__delete}>
                    DELETE
                </Button>
            )}
        </>
    )
}

export default ButtonDeleteTodo
