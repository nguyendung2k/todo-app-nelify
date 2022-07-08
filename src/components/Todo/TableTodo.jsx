import React from 'react'
import { Table } from 'antd'
import styles from './TableTodo.module.css'

const TableTodo = ({ columns, results, rowSelection, checkRole }) => {
    return (
        <Table
            className={styles.table}
            dataSource={results}
            columns={columns}
            rowSelection={checkRole !== '1' ? rowSelection : null}
            pagination={{
                pageSize: 5,
            }}
        />
    )
}

export default TableTodo
