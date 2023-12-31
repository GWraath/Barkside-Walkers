import * as React from 'react';
import { Button, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CurrentUserContext } from '../App';
import { useNavigate } from "react-router-dom";

export default function Login() {
  let { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  const [LUserName, setLUserName] = useState('')
  const [LPassWord, setLPassWord] = useState('')
  const [users, setUsers] = useState('')
  const [validateMsg, setValidateMsg] = useState('')
  let navigate = useNavigate();

  // if (currentUser !== undefined) {
  //   navigate('/transactions');
  // }

  //get the users
  useEffect(() => {
    console.log('Fetching user information')
    axios.get('http://localhost:8063/api/users/')
      .then(response => { console.log(response.data.data); setUsers(response.data.data); })
      .catch(error => { console.log(error) })
  }, [])

  //username & password in if condition, seperate if telling user which to change
  //more states for error message, results, username didn't match, password matches but user doesn't
  //etc - redirect if both are successful
  //where to think about, where to store information (context) available to all refresh will remove
  //stored data - localStorage https://blog.logrocket.com/using-localstorage-react-hooks/

  //validate the logins
  const validateLogin = () => {
    let matchedUserName = false
    for (let u of users) {
      if (LUserName === u.username) {
        matchedUserName = true
        if (LPassWord === u.password) {
          console.log(u.username, u.password, u.UserAdmin)
          setCurrentUser(u)
          localStorage.setItem('currentUser', JSON.stringify(u))
          navigate('/transactions');
        }
        else {
          setValidateMsg('Incorrect password, please try again.');
        }
      }
    }
    if (!matchedUserName) {
      setValidateMsg('Incorrect username, please register first.');
    }
  }

  return (
    <>
      {validateMsg}
      <div><label>Username</label></div>
      <TextField type="text" value={LUserName} onChange={e => setLUserName(e.target.value)}></TextField>
      <div><label>Password</label></div>
      <TextField type='password' value={LPassWord} onChange={e => setLPassWord(e.target.value)}></TextField>
      <div><Button size="small" onClick={validateLogin}>Login</Button></div>
    </>
  );
}