import './App.css';
import React, { useState } from 'react';
import DebtHome from './pages/ApptHome'
import PNF from './pages/PNF';
import { Routes, Route } from 'react-router-dom';
import Navbar from './NavBar';
import Users from './pages/Users';
import Login from './pages/Login';
import { Profile } from './pages/Profile';
import PageNotAllowed from './pages/PNA';
import Theme from './prop-components/Theme';
import { DebtNew } from './pages/ApptNew';

export const DebtContext = React.createContext();
export const UsersContext = React.createContext();
export const CurrentUserContext = React.createContext();
export const PageTypeContext = React.createContext();
export const VariableContext = React.createContext();

function App() {
  const [debts, setDebts] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [pageType, setPageType] = useState('')
  const [variable, setVariable] = useState({})

  return (
    <DebtContext.Provider value={{ debts, setDebts }}>
      <UsersContext.Provider value={{ users, setUsers }}>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <PageTypeContext.Provider value={{ pageType, setPageType }}>
            <VariableContext.Provider value={{variable, setVariable}}>
                <Navbar />
                <Routes>
                  <Route path='/' element={<Theme component={<Login/>}/>}/>
                  <Route path='/debtnew' element={<Theme component={<DebtNew/>}/>} />
                  <Route path='/users' element={<Users />} />
                  <Route path='/transactions' element={<Theme component={<DebtHome/>}/>} />
                  <Route path='/profile' element={<Theme component={<Profile/>}/>} />
                  <Route path='/pna' element={<Theme component={<PageNotAllowed/>}/>} />
                  <Route path='*' element={<Theme component={<PNF/>}/>}/>
                </Routes>
              </VariableContext.Provider>
          </PageTypeContext.Provider>
        </CurrentUserContext.Provider>
      </UsersContext.Provider>
    </DebtContext.Provider>
  );
}

export default App;
