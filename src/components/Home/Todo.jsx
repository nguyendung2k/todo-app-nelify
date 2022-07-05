/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react'
import SearchTodo from './SearchTodo'
import TableTodo from './TableTodo'
import ButtonAddTodo from '../Button/ButtonAddTodo'
import { Row, Col, Skeleton, Button } from 'antd'
import styles from './Todo.module.css'

const Todo = ({
    results,
    columns,
    onClick,
    rowSelection,
    deleteTodoRow,
    selectedRowKeys,
    hasSelected,
    changeTitleAndDescription,
    changeValueSearch,
    checkRole,
}) => {
    let dataSearch

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1200)
    }, [])

    {
        changeValueSearch === null
            ? (dataSearch = [...results])
            : (dataSearch = results.filter(
                  (data) =>
                      data.title
                          .toLowerCase()
                          .indexOf(changeValueSearch.toLowerCase()) !== -1 ||
                      data.description
                          .toLowerCase()
                          .indexOf(changeValueSearch.toLowerCase()) !== -1
              ))
    }

    return (
        <>
            <Row>
                <Col span={8}>
                    <ButtonAddTodo onClick={onClick} />
                </Col>
                <Col span={8} offset={8}>
                    <SearchTodo
                        changeTitleAndDescription={changeTitleAndDescription}
                    />
                </Col>
            </Row>
            <Row>
                {checkRole === '1' ? (
                    <Button
                        style={{ width: '92px' }}
                        type="danger"
                        onClick={() => deleteTodoRow(selectedRowKeys)}
                        disabled={!hasSelected}
                    >
                        DELETE
                    </Button>
                ) : (
                    []
                )}
                <Skeleton className={styles.todo} active loading={loading}>
                    <TableTodo
                        columns={columns}
                        results={dataSearch}
                        rowSelection={rowSelection}
                    />
                </Skeleton>
            </Row>
        </>
    )
}

export default Todo
