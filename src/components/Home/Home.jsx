import React, { useState, useContext, useEffect } from 'react'
import moment from 'moment'
import Header from '../Header/Header'
import ModalAddTodo from '../Modals/ModalAddTodo'
import ModalEditTodo from '../Modals/ModalEditTodo'
import Todo from '../Todo/Todo'
import { Col, Row, Layout, Modal, Spin } from 'antd'
import { openNotification } from '../../utils/notice.utils'
import { AuthContext } from '../store/context/auth-context'
import styles from './Home.module.css'
import ButtonEditTodo from '../Button/ButtonEditTodo'
import ButtonDeleteTodo from '../Button/ButtonDeleteTodo'

const { Content } = Layout
const results = []
const TODO_APP_STORAGE_KEY = 'TODO_APP'
const DATE_FORMAT = 'DD-MM-YYYY'

const Home = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [loading, setLoading] = useState(true)
    const [listTodo, setListTodo] = useState(results)
    const [editTodo, setEditTodo] = useState(null)
    const [isModalEdit, setIsModalEdit] = useState(false)
    const [isModalAdd, setIsModalAdd] = useState(false)
    const [changeValueSearch, setChangeValueSearch] = useState(null)

    const contextLogout = useContext(AuthContext)
    const checkRole = localStorage.getItem('ROLE')
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 150,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'des',
            width: 270,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 200,
        },
        {
            title: 'Action',
            width: 100,
            key: 'action',
            render: (record) => {
                return (
                    <div className={styles.btn__all}>
                        <ButtonEditTodo
                            onClick={() => handleEditTodo(record)}
                        />
                        <ButtonDeleteTodo
                            onClick={() => handleDeleteTodo(record.key)}
                        />
                    </div>
                )
            },
        },
    ]

    const onSelectChange = (key) => {
        setSelectedRowKeys(key)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    useEffect(() => {
        const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY)
        if (storageTodoList) {
            setListTodo(JSON.parse(storageTodoList))
        }
        setTimeout(() => {
            setLoading(false)
        }, 1200)
    }, [])

    const showModalAdd = () => {
        setIsModalAdd(true)
    }

    const showModalEdit = () => {
        setIsModalEdit(true)
    }

    const hideModalEdit = () => {
        setIsModalEdit(false)
    }

    const handleCancel = () => {
        setIsModalAdd(false)
    }

    const changeTitleAndDescription = (changeValueSearch) => {
        setChangeValueSearch(changeValueSearch)
        setSelectedRowKeys([])
    }

    const handleCancelEditForm = () => {
        setIsModalEdit(false)
        setEditTodo(null)
    }

    const onLogout = (values) => {
        Modal.confirm({
            title: 'Confirm Logout!',
            onOk: () => {
                contextLogout.onLogOut(values)
            },
        })
    }

    const handleSubmitForm = (data) => {
        const dateTime = new Date(Date.now()).toString()
        data.date = moment(dateTime).format(DATE_FORMAT)
        data.key = Math.random().toString()
        setListTodo((prevList) => {
            const newData = [data, ...prevList]
            localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(newData))
            return newData
        })
        setIsModalAdd(false)
        openNotification('success', 'ADD-TODO SUCCESSFUL!')
    }

    const handleEditTodo = (record) => {
        showModalEdit(true)
        setEditTodo(record)
    }

    const handleUpdateTodo = () => {
        setListTodo((data) => {
            const updateTodo = data.map((todo) => {
                if (todo.key === editTodo.key) {
                    return editTodo
                } else {
                    return todo
                }
            })
            localStorage.setItem(
                TODO_APP_STORAGE_KEY,
                JSON.stringify(updateTodo)
            )
            return updateTodo
        })
        openNotification('success', 'UPDATE SUCCESSFUL!')
    }

    const handleDeleteTodo = (deleteKey) => {
        Modal.confirm({
            title: 'Confirm Delete!',
            onOk: () => {
                setListTodo((prevList) => {
                    const deleteData = prevList.filter(
                        (item) => item.key !== deleteKey
                    )
                    localStorage.setItem(
                        TODO_APP_STORAGE_KEY,
                        JSON.stringify(deleteData)
                    )
                    return deleteData
                })
                setSelectedRowKeys((prev) => {
                    return prev.filter((key) => key !== deleteKey)
                })
                openNotification('warning', 'DELETE SUCCESSFUL!')
            },
        })
    }

    const handleDeleteRow = (keys) => {
        Modal.confirm({
            title: 'Confirm Delete!',
            onOk: () => {
                setListTodo((prevList) => {
                    const deleteData = prevList.filter(
                        (data) => !keys.includes(data.key)
                    )
                    localStorage.setItem(
                        TODO_APP_STORAGE_KEY,
                        JSON.stringify(deleteData)
                    )
                    return deleteData
                })
                openNotification('warning', 'DELETE SUCCESSFUL!')
                setSelectedRowKeys([])
            },
        })
    }

    return (
        <>
            {loading ? (
                <Spin
                    size="large"
                    className={styles.spin}
                    tip="Loading..."
                    spinning={loading}
                />
            ) : (
                <Layout className={styles.layout}>
                    <Header onClick={onLogout} />
                    <Content>
                        <Row>
                            <Col span={12} offset={6}>
                                <Todo
                                    columns={columns}
                                    results={listTodo}
                                    onClick={showModalAdd}
                                    rowSelection={rowSelection}
                                    deleteTodoRow={handleDeleteRow}
                                    selectedRowKeys={selectedRowKeys}
                                    hasSelected={selectedRowKeys.length > 0}
                                    changeTitleAndDescription={
                                        changeTitleAndDescription
                                    }
                                    changeValueSearch={changeValueSearch}
                                    checkRole={checkRole}
                                />
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            )}
            {/* Modal Add */}
            {isModalAdd && (
                <ModalAddTodo
                    visible={isModalAdd}
                    okCancel={handleCancel}
                    onOk={handleSubmitForm}
                />
            )}
            {/* Modal Edit */}
            {isModalEdit && (
                <ModalEditTodo
                    visible={isModalEdit}
                    okCancel={handleCancelEditForm}
                    onOk={() => {
                        handleEditTodo()
                        handleUpdateTodo()
                        hideModalEdit()
                    }}
                    editTodo={editTodo}
                    setEditTodo={setEditTodo}
                />
            )}
        </>
    )
}

export default Home
