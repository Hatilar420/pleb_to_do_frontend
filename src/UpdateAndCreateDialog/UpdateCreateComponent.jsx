import React, { useState,useContext } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ApiList from '../Helperservices/ApiList';
import {PlebContext} from '../App'

const tags = [
    "Home",
    "Personal",
    "Office"
]

export default function UpdateCreateComponent({taskDetail,UpdateorCreate,openDialog,setOpen,callTasks}) {

    const {selectedAuth} = useContext(PlebContext)

    const UpdateDialogRender = () =>{
        const [taskName, settaskName] = useState(taskDetail.name)
        const [due,changeDue] = useState(taskDetail.due_date)
        const UpdateName = (event) =>{
            settaskName(event.target.value) 
        }
        const handleTimeChange = (value) =>{
            changeDue( value.toISOString() ) 
        }
        const [SelectedTags, setSelectedTags] = useState(taskDetail.tags)

        const changeSelectedtags = (event) =>{
            setSelectedTags(event.target.value)
        }

        const UpdateTaskEvent = (event) =>{
            let axios = require('axios').default
            let data = {
                name : taskName,
                due_date : due,
                tags : SelectedTags
            }
            axios.put(ApiList.TaskRoute + `${taskDetail._id}` , data ,{
                headers: {
                    "Authorization" : "Bearer " + selectedAuth 
                }}).then((response) =>{
                    console.log(response.data)
                    callTasks()
                    setOpen(event) 
                }).catch((error) => console.log(error))
        }

        const DeleteTaskEvent = (event) =>{
            let axios = require('axios').default
            axios.delete(ApiList.TaskRoute + `${taskDetail._id}` ,{
                headers: {
                    "Authorization" : "Bearer " + selectedAuth 
                }}).then((response) =>{
                    console.log(response.data)
                    callTasks()
                    setOpen(event) 
                }).catch((error) => console.log(error))
        }

        return(
            <Dialog open={openDialog} onClose={setOpen} maxWidth="md" fullWidth>
                <DialogTitle>Update Task</DialogTitle>
                <DialogContent>
                    <div style={{fontSize:"0.9rem",fontWeight:"bold"}}>
                        What are you upto ?
                    </div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="text"
                        variant="standard"
                        value={taskName}
                        fullWidth
                        onChange={UpdateName}
                    />
                </DialogContent>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div style={{fontSize:"0.9rem",fontWeight:"bold",marginBottom:"10px"}}>
                            When do you want to complete it ?
                        </div>
                        <DateTimePicker
                            label="Enter date and time"
                            value={new Date(due)}
                            onChange={handleTimeChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogContent>
                    <InputLabel id="demo-simple-select-label">Tags</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="tags"
                        multiple
                        value = {SelectedTags}
                        onChange={changeSelectedtags}
                    >
                        {tags.map(x => {
                            return(
                                <MenuItem value={x}>{x}</MenuItem>    
                            )
                        })}
                    </Select>
                </DialogContent>
                <DialogContent sx={{width:"100%"}}>
                    <div className='row justify-content-between'>
                        <button type="button" onClick={setOpen} className="btn btn-secondary col-3">Cancel</button>
                        <button type="button" onClick={DeleteTaskEvent} className="btn btn-danger col-3">Delete</button>
                        <button type="button" onClick={UpdateTaskEvent} className="btn btn-primary col-3">Update</button>
                    </div>
                </DialogContent>
        </Dialog>
        )
    }


    const CreateDialogRender = () =>{
        const [taskName, settaskName] = useState(null)
        const [due,changeDue] = useState(Date.now())
        const UpdateName = (event) =>{
            settaskName(event.target.value) 
        }
        const handleTimeChange = (value) =>{
            changeDue( value.toISOString() ) 
        }
        const [SelectedTags, setSelectedTags] = useState([])

        const changeSelectedtags = (event) =>{
            setSelectedTags(event.target.value)
        }
        const CreateTaskEvent = (event) =>{
            let axios = require('axios').default
            let data = {
                name : taskName,
                due_date : due,
                tags : SelectedTags
            }
            axios.post(ApiList.TaskRoute , data ,{
                headers: {
                    "Authorization" : "Bearer " + selectedAuth 
                }}).then((response) =>{
                    console.log(response.data)
                    callTasks()
                    setOpen(event) 
                }).catch((error) => console.log(error))
        }
        return(
            <Dialog open={openDialog} onClose={setOpen} maxWidth="md" fullWidth>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <div style={{fontSize:"0.9rem",fontWeight:"bold"}}>
                        What are you upto ?
                    </div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="text"
                        variant="standard"
                        value={taskName}
                        fullWidth
                        onChange={UpdateName}
                    />
                </DialogContent>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div style={{fontSize:"0.9rem",fontWeight:"bold",marginBottom:"10px"}}>
                            When do you want to complete it ?
                        </div>
                        <DateTimePicker
                            label="Enter date and time"
                            value={new Date(due)}
                            onChange={handleTimeChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogContent>
                    <InputLabel id="demo-simple-select-label">Tags</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="tags"
                            multiple
                            value = {SelectedTags}
                            onChange={changeSelectedtags}
                        >
                            {tags.map(x => {
                                return(
                                    <MenuItem value={x}>{x}</MenuItem>    
                                )
                            })}
                        </Select>
                </DialogContent>
                <DialogContent sx={{width:"100%"}}>
                    <div className='row justify-content-between'>
                        <button type="button" onClick={setOpen} className="btn btn-secondary col-5">Cancel</button>
                        <button type="button" onClick={CreateTaskEvent} className="btn btn-primary col-5">Create</button>
                    </div>
                </DialogContent>
        </Dialog>
        )
    }

    return (
        <div>
            {
                UpdateorCreate ? UpdateDialogRender() : CreateDialogRender()
            }
        </div>
    )


}
