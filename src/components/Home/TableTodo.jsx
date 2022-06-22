import React from 'react';
import { Table } from 'antd'
import styles from './TableTodo.module.css'

const TableTodo = ({ columns, datas, rowSelection }) => {
    return (
        <Table className={styles.table} dataSource={datas} columns={columns}
            rowSelection={rowSelection}
            pagination={{
                pageSize: 5,
            }}
        >
        </Table>
    )
}

export default TableTodo;