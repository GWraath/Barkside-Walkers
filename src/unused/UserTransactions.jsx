import * as React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Box, Typography,
Container, Link} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import PlantPages from '../components/DebtPages';
import {PageTypeContext, UsersContext} from './App'
import { useNavigate } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// const cards = [response];

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A8E51'
    }
  },
}
);

export default function UserTransactions() {
  const {setPageType} = useContext(PageTypeContext);
  const {users, setUsers} = useContext(UsersContext);
  const [page, setPage] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [userList, setUserList] = useState(0)
  const UsersPerPage = 6;
  let navigate = useNavigate();

  //get and set the current logged in user
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  
  //if a non admin is trying to gain access, this will stop it.
  const doNotProceed = () => {
    console.log(currentUser)
    if (currentUser===null || currentUser.UserAdmin===0){
        navigate('/pna');
        }
      }
  doNotProceed()
  
  //gets users
  useEffect(()=> {
    setPageType('users')
    const offset = UsersPerPage * (page-1)
    const axUsers=`http://localhost:8080/api/users?limit=${UsersPerPage}&offset=${offset}`
    console.log(axUsers)
    axios.get(axUsers)
    .then(response=> {console.log(response); setUsers(response.data)})
    .catch(error => {console.log(error)})
    },[page, deleted])

    useEffect(()=> {
      axios.get(`http://localhost:8080/api/users`)
      .then(response=> {console.log(response); setUserList(response.data)})
      .catch(error => {console.log(error)})
      },[])

  //deletes the user
  const userDelete = (deluserid) => {
    const axPlants=`http://localhost:8080/api/users/`+deluserid
        console.log(axPlants)
        axios.delete(axPlants)
        .then(response=> {console.log(response); setDeleted(true)})
        .catch(error => {console.log(error)})
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Typography
            component="h1"
            variant="h6"
            align="center"
            color="text.primary"
            gutterBottom
            >
          {currentUser ? <Button variant='outlined' size="small" href={"/usernew/"}>Add a user</Button> : null}
          </Typography>
          <Grid container spacing={4}>
            {users.map((user, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" className='capitalise'>
                      {user.FName}
                    </Typography>
                    <Typography>
                      {user.Owed}
                    </Typography>
                    <Typography>
                      {user.Verified}
                    </Typography>
                    <Typography>
                      {user.Paid}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={"/userinfo/"+user.id}>View</Button>
                    <Button size="small" href={"/userinfoedit/"+user.id}>Edit</Button>
                    <Button size="small" onClick={()=>{userDelete(user.id)}}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
        <PlantPages pageHandler={setPage} list={userList.length}/>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Choose a page to explore more!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}