import React,{useState,useContext,useReducer, useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import UpdateCreateComponent from '../UpdateAndCreateDialog/UpdateCreateComponent';
import AddIcon from '@mui/icons-material/Add';
import ApiList from '../Helperservices/ApiList';
import {PlebContext} from '../App'
import {genralReducer,genralState,setGenralSuccess} from '../Reducers/genralReducers'


export default function TaskComponent({selectedTag}) {

    const {selectedAuth} = useContext(PlebContext)
    const [updateIndex,setUpdateIndex] = useState(-1)
    const [OpenCreate,setOpenCreate] = useState(false)
    const closeDialog = (event) => {
        setUpdateIndex(-1)
    }
    const OpenCreateDialog = (event) =>{
        setOpenCreate(!OpenCreate)
    }

    const [Tasks, TaskStateDispatch ] = useReducer(genralReducer, genralState)

    const setTasks = (data) =>{
        TaskStateDispatch(setGenralSuccess(data))
    }

    const CallTasks = () =>{
        getTasks(setTasks)
    }


    const getTasks = (cb) =>{
        let axios = require('axios').default
        axios.get(ApiList.GetTaskRoute, {
            headers: {
                "Authorization" : "Bearer " + selectedAuth 
            }}).then((response) =>{
                cb(response.data)
            }).catch((error) => console.log(error)) 
    }


    useEffect(() =>{
        getTasks(setTasks)
    },[])

    useEffect(() =>{
        getTasks(setTasks)
    },[selectedAuth])

    const MapTasks = ({arr}) =>{
        return(
            <nav>
                <List>
                    {arr.map( x  => {
                        return (<MapTaskItem key={x._id} item={x} />) 
                    })}
                </List>
            </nav>
        )
    }
    const MoveToCompletedTask = (value) =>{
        //Find the index
        let index = -1

        for(let i=0 ; i<Tasks.data[selectedTag].length ; i++ ){
            if(Tasks.data[selectedTag][i]._id === value){
                index = i
            }
        }

        // Set true to completed tasks
        if(index !== -1){
            let newTaskArr = [...Tasks.data[selectedTag]];
            newTaskArr[index].completed = !newTaskArr[index].completed
            let axios = require('axios').default
            let data = {
                name : newTaskArr[index].name,
                due_date:newTaskArr[index].due_date,
                completed :  newTaskArr[index].completed
            }
            axios.put(ApiList.TaskRoute + `${newTaskArr[index]._id}` , data ,{
                headers: {
                    "Authorization" : "Bearer " + selectedAuth 
                }}).then((response) =>{
                    console.log(response.data)
                    CallTasks() 
                }).catch((error) => console.log(error))
        }

    }

    const openUpdateDialog = (value) =>{
        let index = -1
        for(let i=0 ; i<Tasks.data[selectedTag].length ; i++ ){
            if(Tasks.data[selectedTag][i]._id === value){
                index = i
            }
        }
        setUpdateIndex(index)
    }

    const checkDate = (item) =>{
        let dueDate = new Date(item.due_date)
        let currentDate = new Date()
        let utcTimeLeft = Math.floor(dueDate.getTime() / 1000) - Math.floor(currentDate.getTime() / 1000)
        let dateString = `${dueDate.getDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`
        let timeString = `${dueDate.getHours()}:${dueDate.getMinutes()}`
        return (
            utcTimeLeft > 0 ? <div className='text-info'>
                due at { dateString } {timeString} 
                </div> : <div className='text-danger'>
                overdue at { dateString } {timeString}
             </div>
        )
    }

    const MapTaskItem = ({item}) =>{
        return (
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                        <EditIcon onClick={event => openUpdateDialog(item._id)} />
                    </IconButton>
            } disablePadding>
                <ListItemButton onClick={(event) => MoveToCompletedTask(item._id)} >
                    <ListItemIcon>
                        <Checkbox checked={item.completed}/>
                    </ListItemIcon>
                    <ListItemText secondary={checkDate(item)} primary={item.name} />
                </ListItemButton>
            </ListItem>
        )
    }

  return (
    <div>
        <button type="button" onClick={OpenCreateDialog} style={{width:"100%",textAlign:"left",backgroundColor:"rgb(108 117 125 / 26%)",color:"#607d8b"}} className="btn col-5"> <AddIcon/> Add new task</button>
        {
            !Tasks.isLoading ? <MapTasks arr= {Tasks.data[selectedTag]}/> : <div>Loading</div> 
        }
        {
            (updateIndex !== -1) ? <UpdateCreateComponent UpdateorCreate = {true} callTasks = {CallTasks} taskDetail = {Tasks.data[selectedTag][updateIndex]} openDialog={updateIndex !== -1} setOpen={closeDialog}/> : null
        }
        {
            (OpenCreate) ? <UpdateCreateComponent openDialog={OpenCreate} callTasks = {CallTasks} setOpen={OpenCreateDialog} UpdateorCreate={false}  /> : null
        }
    </div>
  )
}
