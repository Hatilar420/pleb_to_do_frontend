import React,{useContext} from 'react'
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import { PlebContext } from '../App';

export default function HeaderComponent() {

  const {AuthTokens,ChangeAuth,selectedAuth} = useContext(PlebContext)
  return (
    <div className="row">
            <div className="col-3" id="tasks-header">
                  <div style={{fontSize:"1.5rem",fontWeight:"bold",textAlign:"left",marginLeft:"5vw",marginTop:"3vh",paddingLeft:"10px"}}>
                      TASKS
                  </div>
            </div>
            <div className="col-7 row" id="search-bar">
              <div className='col-11' style={{marginTop:"1vh"}}>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <FilledInput
                    id="filled-adornment-amount"
                    placeholder='Search'
                    startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                  />
                </FormControl>
              </div>
            </div>
            <div className="col row" id="account-set" style={{marginTop:"1vh",padding:"0"}}>
              <div className='col-6'>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="demo-simple-select-label">Account</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="account"
                    value = {selectedAuth}
                    onChange={ (event) => ChangeAuth(event.target.value) }
                  >
                    {
                      AuthTokens.map( x =>{
                          return(
                            <MenuItem value={x.token}>{x.name}</MenuItem>
                          )
                      })
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='col-4 m-1'>
                <Avatar style={{width:"80%",height:"82%"}} alt="Remy Sharp" src="https://i.stack.imgur.com/5Kgaq.jpg?s=192&g=1" />
              </div>
            </div>
    </div>
  )
}
