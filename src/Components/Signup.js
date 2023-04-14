import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const Signup = () => {

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePassowordChange = (event) => {
        setPassword(event.target.value);
    }

    const signUpUser = () => {
        fetch("http://localhost:3000/api/user/add", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((response) => response.json())
            .then((response) => {
                alert(response.data);
                window.location.href = "/";
            });
    }
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    return (
        <Card sx={{ width: 300, height: 350, border: 2, marginLeft: "40%", marginTop: "5%" }}>
            <CardContent>
                <h1>Please provide details to sign you up</h1>
                <TextField id="standard-basic" label="Username" variant="standard" onChange={handleUsernameChange} value={username} />
                <TextField id="standard-basic" label="Passoword" variant="standard" type="password" onChange={handlePassowordChange} value={password} />
            </CardContent>
            <CardActions>
                <Button size="small" onClick={signUpUser}>Signup</Button>
            </CardActions>
        </Card>
    );
}

export default Signup;