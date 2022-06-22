/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import SearchTodo from "./SearchTodo";
import TableTodo from "./TableTodo";
import ButtonAddTodo from "../Button/ButtonAddTodo";

import { Row, Col, Skeleton, Button } from 'antd'

const Todo = ({ datas, columns, onClick, rowSelection, deleteTodosRow, selectedRowKeys, hasSelected, changeTitle, changeDescription, title, description }) => {
    let dataSearch

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1200);
    }, [])





    {
        description === null || title === null ? dataSearch = [...datas] : (dataSearch = datas.filter((data) => data.title.toUpperCase().indexOf(title.toUpperCase()) !== -1 || data.description.toUpperCase().indexOf(description.toUpperCase()) !== -1))
    }

    return (
        <>
            <Row>
                <Col span={8}>
                    <ButtonAddTodo onClick={onClick} />
                </Col>
                <Col span={8} offset={8}>
                    <SearchTodo changeTitle={changeTitle}
                        changeDescription={changeDescription} />
                </Col>
            </Row>
            <Row>
                <Button style={{ width: '92px' }} type="danger"
                    onClick={() => deleteTodosRow(selectedRowKeys)
                    }
                    disabled={!hasSelected}>
                    DELETE
                </Button>
                <Skeleton style={{ marginTop: '10px' }} active loading={loading}>
                    <TableTodo columns={columns} datas={dataSearch}
                        rowSelection={rowSelection} />
                </Skeleton>
            </Row>
        </>
    )
}

export default Todo

