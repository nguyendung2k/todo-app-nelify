import React, { useEffect } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import styles from './ModalEditTodo.module.css'

const ModalEditTodo = ({ visible, okCancel, onOk, editTodo, setEditTodo }) => {
    const [form] = Form.useForm()

    const handleEditTitle = (e) => {
        setEditTodo((pre) => {
            return { ...pre, title: e.target.value }
        })
    }

    const handleEditDescription = (e) => {
        setEditTodo((pre) => {
            return { ...pre, description: e.target.value }
        })
    }

    useEffect(() => {
        form.setFieldsValue({
            title: editTodo.title,
            description: editTodo.description,
        })
    })

    return (
        <Modal
            key={Math.random.toString()}
            className={styles.modal}
            visible={visible}
            onCancel={okCancel}
            footer={null}
            title="EDIT-TODO"
        >
            <Form
                labelCol={{
                    span: 5,
                }}
                form={form}
                onFinish={onOk}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your title',
                        },
                    ]}
                >
                    <Input onChange={handleEditTitle} />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your description',
                        },
                    ]}
                >
                    <Input.TextArea
                        style={{ resize: 'none' }}
                        onChange={handleEditDescription}
                    />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 18,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.btn__edit}
                    >
                        OK
                    </Button>
                    <Button htmlType="button" onClick={okCancel}>
                        CANCEL
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalEditTodo
