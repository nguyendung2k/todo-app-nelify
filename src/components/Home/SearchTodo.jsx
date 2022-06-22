import React from "react";
import { Input, AutoComplete } from "antd"
import styles from "./SearchTodo.module.css"

const SearchTodo = ({ changeTitle, changeDescription }) => {
    return (
        <AutoComplete
            className={styles.search}
            onSearch={(value) => {
                changeTitle(value)
                changeDescription(value)
            }
            }>
            <Input.Search
                size="normal" enterButton />
        </AutoComplete >
    )
}

export default SearchTodo