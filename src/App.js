import './App.css';
import { Divider } from '@mui/material';
import HeaderComponent from './HeaderComponent/HeaderComponent';
import UserDisplay from './UserDisplay/UserDisplay';
import React, { useState } from 'react';
import AdminComponent from './AdminComponent/AdminComponent';

export const PlebContext = React.createContext()

function App() {
  const [AuthTokens, setAuthTokens] = useState([
    {
      'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJhMzUwMDVmMDM1MjJjMzhhMjgxZmIiLCJpYXQiOjE2NTYzNzA0MzJ9.9nMBSBHRwavDF3_nSmiwx5wvFek_kRaLnHOahuWzriA',
      'name':"user 1"
    },
    {
      'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJhMzUxYTVmMDM1MjJjMzhhMjgxZmQiLCJpYXQiOjE2NTYzNzA0NTh9.3O1N60lFziOdupxdZSg_F1aS8-K5BlBC-F6ZSbJXE6g',
      'name':"user 2"
    },
    {
      'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJhMzUzNDVmMDM1MjJjMzhhMjgxZmYiLCJpYXQiOjE2NTYzNzA0ODR9.VHvr3JMSuEmKowGMdkThGCLnz5LVUt_domawmfOZIv4',
      'name':"user 3"
    },
    {
      'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJhMzU2ZDVmMDM1MjJjMzhhMjgyMDEiLCJpYXQiOjE2NTYzNzA1NDF9.6A786RZX-BPlW0z3Tfc5T740MZ4pt5QjKZsRsrnGBGE',
      'name':"Admin"
    }
  ])

  const [selectedAuth, setselectedAuth] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJhMzUwMDVmMDM1MjJjMzhhMjgxZmIiLCJpYXQiOjE2NTYzNzA0MzJ9.9nMBSBHRwavDF3_nSmiwx5wvFek_kRaLnHOahuWzriA')

  const ChangeAuth = (token) =>{
    setselectedAuth(token)
  }

  return (
    <PlebContext.Provider value={{AuthTokens,selectedAuth,ChangeAuth,setAuthTokens}} >
      <div className="App">
        <div id="mainHeader" style={{height:"12vh",marginBottom:"5vh",padding:"0",width:"100%"}}>
          <HeaderComponent/>
          <Divider/>    
        </div>
        <div className="container-fluid" id="main-content">
          {
            selectedAuth === AuthTokens[3].token ? <AdminComponent/> : <UserDisplay/>
          }
        </div>
      </div>
    </PlebContext.Provider>
  );
}

export default App;
