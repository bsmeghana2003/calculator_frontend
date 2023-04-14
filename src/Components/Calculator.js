import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import './Calculator.css';
import { ButtonGroup, Chip, TextField } from "@mui/material";

const Calculator = () => {

    const [numberEntered, setNumberEntered] = useState(0);
    const [firstNumber, setFirstNumber] = useState(0);
    const [firstNumberEntered, setFirstNumberEntered] = useState(false);
    const [operator, setOperator] = useState("");
    const [secondNumber, setSecondNumber] = useState(0);
    const [secondNumberEntered, setSecondNumberEntered] = useState(false);
    const [result, setResult] = useState("");
    const [showResult, setShowResult] = useState(false);

    const digits = operator => {

        if (firstNumberEntered) {
            setSecondNumber(numberEntered);
            setFirstNumberEntered(true);
            handleShowResult("");
        }
        else {
            setFirstNumber(numberEntered);
            setFirstNumberEntered(true);
            setOperator(operator);
            setNumberEntered("");
        }
    }

    // && !secondNumberEntered
    const handleShowResult = () => {
        var username = window.localStorage.getItem("username");
        if (!firstNumberEntered === '') {

            alert("Please give correct inputs");
            return;
        }
        var resultValue = 0;
        const secondNumberEntered = numberEntered;
        switch (operator) {
            case "+":
                resultValue = parseInt(firstNumber) + parseInt(secondNumberEntered);
                break;
            case "-":
                resultValue = parseInt(firstNumber) - parseInt(secondNumberEntered);
                break;
            case "*":
                resultValue = parseInt(firstNumber) * parseInt(secondNumberEntered);
                break;
            case "/":
                resultValue = secondNumberEntered == 0 ? 0 : parseInt(firstNumber) / parseInt(secondNumberEntered);
                break;
        }
        var entryToBeAdded = firstNumber + " " + operator + " " + secondNumberEntered + " = " + resultValue;
        fetch("http://localhost:3000/api/user/history/save", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                username: username,
                entryToBeAdded: entryToBeAdded
            })
        }).then((response) => response.json())
            .then((response) => {
                // Nothing to do
            });

        setResult(resultValue);
        setShowResult(true);
    }

    const inputHandler = event => {
        setNumberEntered(event.target.value);
    }

    const clearAllvalues = event => {
        setFirstNumber(0);
        setFirstNumberEntered(false);
        setSecondNumber(0);
        setSecondNumberEntered(false);
        setNumberEntered("");
        setOperator("");
        setResult(0);
        setShowResult(false);
    }

    return (
        <div>
            <Card sx={{ minWidth: 105 }} variant="outlined">
                <CardContent>
                    <TextField type="number" id="outlined-basic" label="Enter Number" variant="outlined" onChange={inputHandler} value={numberEntered} /> <br /><br />
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button variant="contained" onClick={() => digits('+')}>+</Button>
                        <Button variant="contained" onClick={() => digits('-')}>-</Button>
                        <Button variant="contained" onClick={() => digits('*')}>*</Button>
                        <Button variant="contained" onClick={() => digits('/')}>/</Button>
                        <Button variant="contained" onClick={() => digits('=')}>=</Button>
                        <Button variant="contained" onClick={() => digits('CE')}>CE</Button>
                    </ButtonGroup> <br />
                    {showResult && (
                        <Chip variant="outlined">
                            {firstNumber} {operator} {secondNumber} = {result}
                        </Chip>
                    )}
                </CardContent>
            </Card>
        </div>
    )

};

export default Calculator;