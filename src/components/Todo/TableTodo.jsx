import React from 'react'
import { Table } from 'antd'
import styles from './TableTodo.module.css'

const TableTodo = ({ columns, results, rowSelection, checkRole }) => {
    return (
        <Table
            className={styles.table}
            dataSource={results}
            columns={columns}
            rowSelection={checkRole === '2' ? null : rowSelection}
            pagination={{
                pageSize: 5,
            }}
        />
    )
}

export default TableTodo
