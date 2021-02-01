import React from "react";
import styles from "../styles.css";

function History({ history }) {
  return (
    <div className={styles.history}>
      {history.map((item, index) => {
        const result = (eval(item) || "") + "";
        return (
          <div className={styles.topBox} key={index}>
            <p className={styles.historyText}>{`${item} = ${result}`}</p>
          </div>
        );
      })}
    </div>
  );
}

export default History;
