import React from 'react'
import { Input, AutoComplete } from 'antd'
import styles from './SearchTodo.module.css'

const SearchTodo = ({ changeTitleAndDescription }) => {
    return (
        <AutoComplete
            className={styles.search}
            onSearch={(value) => {
                changeTitleAndDescription(value)
            }}
        >
            <Input.Search placeholder="Search..." size="normal" enterButton />
        </AutoComplete>
    )
}

export default SearchTodo
