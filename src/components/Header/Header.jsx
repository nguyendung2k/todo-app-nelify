import React from 'react'
import { Button, Row, Col } from 'antd'
import styles from './Header.module.css'
import ButtonLogout from '../Button/ButtonLogout'

const Header = ({ onClick }) => {
    return (
        <Row>
            <Col span={18}>
                <header className={styles.header}>TODO-LIST</header>
            </Col>
            <Col>
                <ButtonLogout onClick={onClick} />
            </Col>
        </Row>
    )
}
export default Header
