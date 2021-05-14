import React,{useState,useEffect} from "react"
import './Register.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactFormValidation from "react-form-input-validation";
import { routeLink, useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";

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

export default function Register(){
    const classes = useStyles();
    const [user,setUser] = useState({
        full_name: "",
        email: "",
        phone_no: "",
        password: "",
        confirm_password: ""
    })
    const { register, handleSubmit, reset, errors } = useForm();
    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log(data);
    };
    useEffect( () =>{
        console.log("Load")
    })   
    return (
        <Container className="register-card" component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircleOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <TextField variant="outlined" id="full_name" label="Full Name" type="text" name="full_name" autoComplete="full_name" margin="normal" required fullWidth error={Boolean(errors.full_name)} helperText={errors.full_name?.message}
                                inputRef={register({required: "Full Name is Required"})}
                            />   
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <TextField id="email" variant="outlined" label="Email address" type="email" name="email" autoComplete="email" margin="normal" required fullWidth error={Boolean(errors.email)} helperText={errors.email?.message}
                                inputRef={register({required: "Email Address is Required",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please Enter Valid Email Address',
                                    }
                                })}
                            /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <TextField value={user.phone_no} onChange={e => setUser({...user,phone_no:e.target.value})} variant="outlined" margin="normal" required fullWidth name="phone_no" label="Phone Number" type="text" id="phone_no" autoComplete="phone_no" error={Boolean(errors.phone_no)} helperText={errors.phone_no?.message}
                                inputRef={register({required: "Phone Number is Required"})}
                            />  
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <TextField value={user.password} onChange={e => setUser({...user,password:e.target.value})} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" error={Boolean(errors.password)} helperText={errors.password?.message}
                                inputRef={register({required: "Password is Required"})}
                            /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <TextField value={user.confirm_password} onChange={e => setUser({...user,confirm_password:e.target.value})} variant="outlined" margin="normal" required fullWidth name="confirm_password" label="Confirm Password" type="password" id="confirm_password" autoComplete="confirm_password" error={Boolean(errors.confirm_password)} helperText={errors.confirm_password?.message}
                                inputRef={register({required: "Confirm Password is Required"})}
                            />
                        </div>
                    </div>
                    <div style={{margin: '0 auto', display: "flex"}} className="mb-1 justify-content-center">
                        <Button type="submit" variant="contained" color="primary" className={classes.submit}>Sign Up</Button>
                        {/* <Button type="submit" variant="contained" color="secondary" style={{marginleft: '1rem'}} className={classes.submit}>Reset</Button> */}
                    </div>
                    <Grid container>
                        {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item style={{margin: '0px auto', display: "flex"}}>
                            <Link href="/" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
  );
}