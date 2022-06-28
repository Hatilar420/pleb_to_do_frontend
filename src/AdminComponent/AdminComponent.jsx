import React,{useContext,useEffect,useReducer} from 'react'
import {PlebContext} from '../App'
import ApiList from '../Helperservices/ApiList'
import {genralReducer,genralState,setGenralSuccess} from '../Reducers/genralReducers'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AdminComponent() {
    const {selectedAuth} = useContext(PlebContext)
    const [Tasks, TaskStateDispatch ] = useReducer(genralReducer, genralState)
    const getAllUserTasks = (cb) =>{
        let axios = require('axios').default
        axios.get(ApiList.AdminRoute, {
            headers: {
                "Authorization" : "Bearer " + selectedAuth 
            }}).then((response) =>{
                cb(response.data)
            }).catch((error) => console.log(error)) 
    }
    const setTasks = (data) =>{
        TaskStateDispatch(setGenralSuccess(data))
    }
    const callGetAllUserData = () =>{
        getAllUserTasks(setTasks)
    }
    useEffect(() =>{
        callGetAllUserData()
    },[])

    const MapTableRows = ({arr}) =>{
        return arr.map( x=>{
            let crDate =new Date(x.created_date)
            let dDate = new Date(x.due_date)
            return(
                <tr key={x._id}>
                    <td>{x.name}</td>
                    <td>{dDate.getDate()}/{dDate.getMonth()}/{dDate.getFullYear()}</td>
                    <td>{crDate.getDate()}/{crDate.getMonth()}/{crDate.getFullYear()}</td>
                    <td>{x.completed ? "Completed" : "Not completed"}</td>
                    <td>{ x.tags.map(x => `${x}, `) }</td>
                </tr>
            )
        } )

    }


    const MapAccordians = ({arr}) =>{

        return arr.map( x =>{
            return(
                <Accordion className='m-2'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{x.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <table className='table table-bordered table-hover'>
                            <tr>
                                <th scope="col">
                                    Task name
                                </th>
                                <th scope="col">
                                    Due date
                                </th>
                                <th scope="col">
                                    Creation date
                                </th>
                                <th scope="col">
                                    Is completed ?
                                </th>
                                <th scope="col">
                                    Tags
                                </th>
                            </tr>
                            <MapTableRows arr={x.tasks}/>
                        </table>
                    </AccordionDetails>
                </Accordion>
            )
            
        } )

    }

  return (
    <div className='container'>
        {!Tasks.isLoading ? <MapAccordians arr={Tasks.data}/> : null }
    </div>
  )
}
