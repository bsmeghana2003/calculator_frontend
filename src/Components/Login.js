import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const handleSignup = () => {
    window.location.href = "/signup";
}

const LoginPage = () => {

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePassowordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleCheckForEnter = (event) => {
        if (event.which == 13) {
            loginUser();
        }
    }

    const loginUser = () => {
        fetch("http://localhost:3000/api/user/login?username=" + username + "&password=" + password).then((response) => response.json())
            .then((response) => {
                if (response.status == "Success") {
                    window.localStorage.setItem("username", username);
                    window.location.href = "/dashboard";
                } else {
                    alert(response.err);
                }
            });
    }


    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <div>
            <Card sx={{ width: 300, height: 350, border: 2, marginLeft: "40%", marginTop: "5%" }}>
                <CardContent>
                    <TextField id="standard-basic" label="Username" variant="standard" onChange={handleUsernameChange} value={username} />
                    <TextField id="standard-basic" label="Passoword" variant="standard" type="password" onChange={handlePassowordChange} value={password} onKeyUp={handleCheckForEnter} />
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={loginUser}>Login</Button>
                    <Button size="small" onClick={handleSignup}>Signup</Button>
                </CardActions>
            </Card>
        </div>

    );
}

export default LoginPage;