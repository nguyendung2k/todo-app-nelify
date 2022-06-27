import React from "react";
import { Button } from "antd";
import styles from "./ButtonAddTodo.module.css";

const ButtonAddTodo = ({ onClick }) => {
    const checkRole = localStorage.getItem("ROLE");

    return (
        <>
            {checkRole === "1" && (
                <Button
                    className={styles["btn__add-todo"]}
                    type="primary"
                    onClick={onClick}
                >
                    ADD
                </Button>
            )}
        </>
    );
};

export default ButtonAddTodo;
