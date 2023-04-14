import { Button, Card, CardContent, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import Calculator from "./Calculator";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function Dashboard() {

    const [userHistory, setUserHistory] = useState();

    const getUserHistory = () => {
        var username = window.localStorage.getItem("username");
        fetch("http://localhost:3000/api/user/history?username=" + username).then((response) => response.json())
            .then((response) => {
                if (response.status == "Success") {
                    setUserHistory(response.data);
                    console.log(response.data);
                } else {
                    alert(response.err);
                }
            });
    }

    const logOutUser = () => {
        window.localStorage.removeItem("username");
        window.location.href = "/";
    }

    return (
        <div>
            <Button onClick={getUserHistory}>History</Button>
            <Button onClick={() => { window.location.href = "/"; }}> Logout</Button>
            <Calculator /> <br /><br />
            <div>
                <h1> User History </h1> < br />
                {userHistory && (
                    <List>
                        {userHistory.map((value) => {
                            return <ListItem>{value.operation}</ListItem>
                        })}
                    </List>
                )}
            </div>
        </div>
    );
}


export default Dashboard;