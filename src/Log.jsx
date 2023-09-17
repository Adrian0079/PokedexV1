import React, { useState } from 'react'
import {app} from "./fb"
import { Button, Container, TextField, Typography } from '@mui/material';



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
    <div>
      
      <Typography variant='h2'>{register ? "Sign up" : "Log in"}</Typography>
      <Container maxWidth="xs"
        sx={{
          border: 4,
          boxShadow: 5,
          pb: 2,
        }}>
          <form onSubmit = {submitHandler}>
            <TextField type="email" id="emailF" label="E - mail"/>
            <TextField type="password" id="pwF" label="Password"/>
            <Button type="submit">
              {" "}
              {register ? "Registrate" : "Inicia sesión"}
            </Button>
          </form>
      </Container>
      
      <Button onClick={()=>setRegister(!register)}>
        {register
            ?"Ya tienes una cuenta? ¡Inicia sesión!"
            :"No tienes una cuenta, registrate gratis"    
        }
      </Button>

    </div>
  )
}

export default Log
