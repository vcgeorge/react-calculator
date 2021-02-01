import React, { useState, useEffect } from "react";
import Numpad from "./container/Numpad";
import History from "./container/History";
import styles from "./styles.css";
import calcStyles from "./calcStyles.css";

export default function App() {
  const localValue = localStorage.getItem("history");
  const historyLocalstore = localValue ? JSON.parse(localValue) : [];
  const [result, setResult] = useState("");
  const [number, setNumber] = useState("");
  const [history, setHistory] = useState(historyLocalstore);

  function isOperator(op) {
    const isOpr = ["+", "-", "*", "/", "="].includes(op);
    return Boolean(isOpr);
  }

  const handleClick = (e) => {
    const value = e.target.id;
    const isCurrentValueOperator = isOperator(value);
    let digits = [...number];
    let lastInput = digits[digits.length - 1] || "";
    const isLastValueOperator = isOperator(lastInput) || false;

    if (!digits.length && isCurrentValueOperator) {
      return;
    }

    if (!isLastValueOperator && value === "=") {
      calculate(true);
    } else if (value === "C") {
      reset();
    } else if (value === "CE") {
      backspace();
    } else if (value === "MC") {
      clearLocal();
    } else {
      if (isCurrentValueOperator && isLastValueOperator) {
        lastInput = value;
        digits = digits.join("");
        setNumber(digits);
      } else {
        setNumber(number + value);
      }
    }
  };

  const calculate = (isSave) => {
    reset();
    const isLastCharSpecialChar = /[\/*+-.]$/i.test(number);
    const isStringHasSpecialChar = /[\/*+-.]/.test(number);
    if (!isLastCharSpecialChar && isStringHasSpecialChar) {
      let checkResult = "";
      if (number.includes("--")) {
        checkResult = number.replace("--", "+");
      } else {
        checkResult = number;
      }
      try {
        setResult((eval(checkResult) || "") + "");
        if (isSave) {
          setHistory((history) => [checkResult, ...history]);
          localStorage.setItem(
            "history",
            JSON.stringify([checkResult, ...history])
          );
        }
      } catch (e) {
        setResult(checkResult);
      }
    }
  };

  const reset = () => {
    setResult("");
    setNumber("");
  };

  const clearLocal = () => {
    localStorage.removeItem("history");
    setHistory([]);
  };

  const backspace = () => {
    setNumber(number.slice(0, -1));
  };

  return (
    <div className={styles.app}>
      <div className={calcStyles.gridContainer}>
        <div className={[calcStyles.calc, styles.calMain].join(" ")}>
          <div className={calcStyles.number}>
            <span>{number}</span>
          </div>
          <div className={calcStyles.result}>
            <span>{result}</span>
          </div>
          <div className={[calcStyles.numpad, styles.calcContent].join(" ")}>
            <div className={styles.topBox}>
              <Numpad handleClick={handleClick} />
            </div>
          </div>
        </div>
        <div className={calcStyles.history}>
          <h5 className={styles.historyHeader}>History</h5>
          <History history={history} />
        </div>
      </div>
    </div>
  );
}
