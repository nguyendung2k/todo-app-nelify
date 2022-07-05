import React from 'react'
import { Button, Row, Col } from 'antd'
import styles from './Header.module.css'

const HeaderComponent = ({ onClick }) => {
    return (
        <>
            <Row>
                <Col span={18}>
                    <header className={styles.header}>TODO-LIST</header>
                </Col>
                <Col>
                    <Button
                        className={styles.button}
                        danger
                        type="primary"
                        onClick={onClick}
                    >
                        LOGOUT
                    </Button>
                </Col>
            </Row>
        </>
    )
}
export default HeaderComponent
