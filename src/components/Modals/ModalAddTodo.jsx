import React from 'react'
import { Modal, Form, Input, Button } from 'antd'
import styles from './ModalAddTodo.module.css'

const ModalAddTodoComponent = ({ visible, okCancel, onOk }) => {
    const [form] = Form.useForm()
    const handleResetForm = () => {
        form.resetFields()
    }

    return (
        <Modal
            key={Math.random.toString()}
            className={styles.modal}
            visible={visible}
            onCancel={okCancel}
            footer={null}
            title="ADD-TODO"
        >
            <Form
                name="basic"
                form={form}
                onFinish={onOk}
                labelCol={{
                    span: 5,
                }}
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
                    <Input
                        placeholder="Max length is 50"
                        maxLength={50}
                        style={{ resize: 'none' }}
                    />
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
                        placeholder="Max length is 200"
                        maxLength={200}
                        style={{ resize: 'none' }}
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
                        className={styles.btn__add}
                    >
                        ADD
                    </Button>
                    <Button htmlType="button" onClick={handleResetForm}>
                        RESET
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAddTodoComponent
