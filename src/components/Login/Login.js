import React,{useState,useEffect} from "react"
import './Login.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactFormValidation from "react-form-input-validation";
import { Link, useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import cookie from 'react-cookies'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    multilineColor:{
        color:'red'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));  

export default function Login(){
    const classes = useStyles();
    const [user,setUser] = useState({
        email: "",
        password: ""
    })
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setWarning(false);
    };
    const [warning_msg, setWarningMessage] = useState("");
    const [show_warning, setWarning] = useState(false);
    const [show_password, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!show_password);
    const handleMouseDownPassword = () => setShowPassword(!show_password);
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async (e) => {
        try {
            const {data} = await axios({
                method: 'post', //you can set what request you want to be
                url: `https://react-auth-3d77f.web.app//auth/users/login`,
                data: user,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            console.log(data.token);
            cookie.save('Token', data.token, { path: '/' })
            // history.push("/");
            return data;
        } catch (e) {
            setWarningMessage(e.response.data.errors[0].msg)
            setWarning(true);
            setTimeout(() => {
                handleClose()
            }, 3000);
            return console.log('Error')
        }
    };

    useEffect( () =>{
        console.log("Load")
    })
   
    return (
        <Container className="login-card" component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField value={user.email} onChange={e => setUser({...user,email:e.target.value})} id="email" variant="outlined" label="Email address" type="email" name="email" autoComplete="email" margin="normal" required fullWidth error={Boolean(errors.email)} helperText={errors.email?.message}
                        inputRef={register({required: "Email Address is Required",
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please Enter Valid Email Address',
                            }
                        })}
                    /> 
                    <TextField value={user.password} onChange={e => setUser({...user,password:e.target.value})} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type={show_password?"text":"password"} id="password" autoComplete="current-password" error={Boolean(errors.password)} helperText={errors.password?.message}
                        inputRef={register({required: "Password is Required"})}
                        InputProps={{ 
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                  {show_password ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" style={{margin: '26px auto', display: "flex"}} className="mb-4" className={classes.submit}>Sign In</Button>
                    <Grid container className="mt-2">
                        {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item style={{margin: '0 auto', display: "flex"}}>
                            <Link to="/register" className="text-material-color ml-1 pointer" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Snackbar open={show_warning} autoHideDuration={3000} onClose={handleClose}>
                <Alert variant="filled" className="text-capitalize" onClose={handleClose} severity="error">
                    {warning_msg}
                </Alert>
            </Snackbar>
        </Container>
  );
}