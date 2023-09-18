import React, { useState } from 'react'
import {app} from "./fb"
import { Button, Container, TextField, Typography, createTheme, ThemeProvider, Grid, makeStyles } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { convertLength } from '@mui/material/styles/cssUtils';


//---Design------------------------
const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
          main: '#000000',
          light: '#8afdc0',
          dark: '#2f79ff',
        },
        secondary: {
          main: '#f50057',
          dark: '#75052e',
      },
    },
  });
//---Design------------------------

const Log = (props) => {
    const [register, setRegister] = useState(false);

    const createUser =(email, password)=>{
      app
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .then((userFB)=>{
          console.log("user creado ", userFB);
          props.setUser(userFB);
    })
  }



  const startSession =(email, password)=>{
    app
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userFB)=>{
      console.log("sesion iniciada con: ", userFB.user);
      props.setUser(userFB);
    })
  }  
  
  const submitHandler =(e)=>{
        e.preventDefault();
        const email = e.target.emailF.value;
        const password = e.target.pwF.value;
        console.log(email, password);

        if(register){
          createUser(email, password);
        }

        if(!register){
          startSession(email,password);
        }
        
    };
    
    return (
        
      
        <Container sx={{
                justifyContent: "center",
                
                height: '100vh',
                width: '300%'
                
            }}>

                <Grid container height='100%' alignItems='center'>         
                    <Grid item xs={12}>


                        <Typography variant='h2' sx={{mb:21}}>{register ? "Sign up" : "Log in"}</Typography>
                                        
                            <form onSubmit = {submitHandler}>
                                <Grid container direction='column' alignItems='center' sx={{
                                
                                justifyContent: "center"
                                }}>
                                    <Grid item sx={{
                                        
                                        mt: 1,
                                        width: 500
                                        }}>
                                            <TextField type="email" id="emailF" label="E - mail" sx={{width: 500}}/>
                                    </Grid>

                                    <Grid item sx={{
                                        
                                        mt: 1,
                                        width: 500
                                        }}>
                                        <TextField type="password" id="pwF" label="Password" sx={{width: 500}}/>
                                    </Grid>

                                    <Grid item sx={{
                                        
                                        mt: 1
                                        }}>  
                                        <Button
                                        endIcon={<SendIcon />}
                                        type="submit">
                                        {" "}
                                        {register ? "Sign up" : "Log in"}
                                        </Button>
                                    </Grid>
                                    
                                </Grid>
                            </form>                      
                        <ThemeProvider theme={theme}>
                            <Button
                                
                                startIcon={<AccountBoxIcon />}
                                onClick={()=>setRegister(!register)}>
                                    {register
                                        ?"Do you already have an account? ¡Log in!"
                                        :"Don't have an account?, sign up for FREE"    
                                    }
                            </Button>
                        </ThemeProvider>
                    </Grid>    
            </Grid>
        </Container>
  )
}

export default Log
