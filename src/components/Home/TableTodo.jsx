import React from 'react';
import { Table } from 'antd'
import styles from './TableTodo.module.css'

const TableTodo = ({ columns, datas, rowSelection, checkRole }) => {
    return (
        <Table className={styles.table} dataSource={datas} columns={columns}
            rowSelection={checkRole !== '1' ? rowSelection : null}
            pagination={{
                pageSize: 5,
            }}
        >
        </Table>
    )
}

export default TableTodo;