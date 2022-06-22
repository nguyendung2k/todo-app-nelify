import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import HeaderComponent from "../Header/Header";
import ModalAddTodoComponent from "../Modals/ModalAddTodo";
import ModalEditTodo from "../Modals/ModalEditTodo";
import Todo from "./Todo";
import { Col, Row, Button, Layout, Modal, Spin } from "antd";
import { openNotification } from "../../utils/notice.utils";

import styles from "./Home.module.css";

import { AuthContext } from "../store/auth-context";

const { Content } = Layout;
const datas = [];
const TODO_APP_STORAGE_KEY = "TODO_APP";

const Home = () => {
    const checkRole = localStorage.getItem("ROLE");

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            width: 150,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "des",
            width: 450,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            width: 150,
        },
        {
            title: "Action",
            width: 100,
            key: "action",
            render: (record) => {
                return (
                    <div className={styles.btn__all}>
                        {checkRole === "1" ? (
                            <Button
                                type="primary"
                                className={styles.btn__edit}
                                onClick={() => handleEditTodo(record)}
                            >
                                EDIT
                            </Button>
                        ) : (
                            <Button disabled className={styles.btn__edit}>
                                Edit
                            </Button>
                        )}
                        {checkRole === "1" ? (
                            <Button
                                className={styles.btn__delete}
                                danger
                                onClick={() => handleDeleteTodo(record.key)}
                            >
                                DELETE
                            </Button>
                        ) : (
                            <Button disabled className={styles.btn__delete}>
                                Delete
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const hasSelected = selectedRowKeys.length > 0;

    const onSelectChange = (key) => {
        // console.log(key)
        setSelectedRowKeys(key);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const contextLogout = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const [listTodos, setListTodos] = useState(datas);

    const [editTodo, setEditTodo] = useState(null);

    const [isModalEdit, setIsModalEdit] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [title, setTitle] = useState(null);

    const [description, setDescription] = useState(null);

    useEffect(() => {
        const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
        if (storagedTodoList) {
            setListTodos(JSON.parse(storagedTodoList));
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showModalEdit = () => {
        setIsModalEdit(true);
    };

    const hideModalEdit = () => {
        setIsModalEdit(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const changeTitle = (title) => {
        setTitle(title);
        setSelectedRowKeys([]);
    };

    const changeDescription = (description) => {
        setDescription(description);
        setSelectedRowKeys([]);
    };

    const handleCancelEditForm = () => {
        setIsModalEdit(false);
        setEditTodo(null);
    };

    const onLogout = (values) => {
        Modal.confirm({
            title: "Confirm Logout!",
            onOk: () => {
                contextLogout.onLogOut(values);
            },
        });
    };

    const handleSubmitForm = (data) => {
        const dateTime = new Date(Date.now()).toString();

        data.date = moment(dateTime).format("DD-MM-YYYY");
        data.key = Math.random().toString();

        setListTodos((prevList) => {
            const newData = [data, ...prevList];
            localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(newData));
            return newData;
        });
        setIsModalVisible(false);
        openNotification("success", "Thêm Todo thành công!");
    };

    const handleEditTodo = (record) => {
        showModalEdit(true);
        setEditTodo(record);
    };

    const handleUpdateTodo = () => {
        setListTodos((data) => {
            const updateTodo = data.map((todo) => {
                if (todo.key === editTodo.key) {
                    return editTodo;
                } else {
                    return todo;
                }
            });
            localStorage.setItem(
                TODO_APP_STORAGE_KEY,
                JSON.stringify(updateTodo)
            );
            return updateTodo;
        });
        openNotification("success", "UPDATE Thành công");
    };

    const handleDeleteTodo = (deleteKey) => {
        // console.log(key);
        Modal.confirm({
            title: "Confirm Delete!",
            onOk: () => {
                setListTodos((prevList) => {
                    const deleteData = prevList.filter(
                        (item) => item.key !== deleteKey
                    );
                    localStorage.setItem(
                        TODO_APP_STORAGE_KEY,
                        JSON.stringify(deleteData)
                    );
                    return deleteData;
                });
                setSelectedRowKeys((prev) => {
                    return prev.filter((key) => key !== deleteKey);
                });
                openNotification("warning", "DELETE Thành công!");
            },
        });
    };

    const handleDeleteRow = (keys) => {
        console.log(selectedRowKeys);
        Modal.confirm({
            title: "Confirm Delete!",
            onOk: () => {
                setListTodos((prevList) => {
                    const deleteDatas = prevList.filter(
                        (data) => !keys.includes(data.key)
                    );
                    console.log(deleteDatas);
                    localStorage.setItem(
                        TODO_APP_STORAGE_KEY,
                        JSON.stringify(deleteDatas)
                    );
                    return deleteDatas;
                });
                openNotification("warning", "DELETE Thành công!");
                setSelectedRowKeys([]);
            },
        });
    };

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
                    <HeaderComponent onClick={onLogout} />
                    <Content>
                        <Row>
                            <Col span={12} offset={6}>
                                <Todo
                                    columns={columns}
                                    datas={listTodos}
                                    onClick={showModal}
                                    rowSelection={rowSelection}
                                    deleteTodosRow={handleDeleteRow}
                                    selectedRowKeys={selectedRowKeys}
                                    hasSelected={hasSelected}
                                    changeTitle={changeTitle}
                                    changeDescription={changeDescription}
                                    title={title}
                                    description={description}
                                    checkRole={checkRole}
                                />
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            )}
            {/* Modal Add */}
            {isModalVisible && (
                <ModalAddTodoComponent
                    visible={isModalVisible}
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
                        handleEditTodo();
                        handleUpdateTodo();
                        hideModalEdit();
                    }}
                    editTodo={editTodo}
                    setEditTodo={setEditTodo}
                />
            )}
        </>
    );
};
export default Home;
