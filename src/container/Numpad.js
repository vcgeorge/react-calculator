import React from "react";
import styles from "../styles.css";
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "="];
const dataOperations = ["MC", "C", "CE"];
const operations = ["/", "*", "+", "-"];

function Numpad({ handleClick }) {
  const renderButton = (id) => (
    <span id={id} key={id} onClick={handleClick}>
      {id}
    </span>
  );
  return (
    <div className={styles.bottomBox}>
      <div className={styles.inner}>
        <div className={styles.symb}>
          {dataOperations.map((id) => renderButton(id))}
        </div>
        <div className={styles.number}>
          {numbers.map((id) => renderButton(id))}
        </div>
      </div>
      <div className={styles.symbol}>
        {operations.map((id) => renderButton(id))}
      </div>
    </div>
  );
}

export default Numpad;
