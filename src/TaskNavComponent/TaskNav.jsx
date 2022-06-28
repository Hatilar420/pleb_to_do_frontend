import React,{useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function TaskNav({selectedTag,setSelectedTag}) {

    const [DayState, setDayState] = useState([
        {
            "Name" :"Today"
        },
        {
            "Name" :"Yesterday"
        },
        {
            "Name" :"Overdue"
        }
    ])

    const [TagState, setTagState] = useState([
        {
            "Name" :"Home"
        },
        {
            "Name" :"Personal"
        },
        {
            "Name" :"Office"
        }
    ])

    const MapList = ({arr}) =>{

        return arr.map( x => {
            return (
                <nav>
                    <List>
                        <MapListItem item={x} />
                    </List>
                </nav>
            )
        })
    }

    const MapListItem = ({item}) =>{
        return (
            <ListItem disablePadding>
                <ListItemButton selected={ item.Name === selectedTag } 
                    onClick={ (event) => setSelectedTag(item.Name)  }>
                    <ListItemIcon>
                        {
                            item.Name === selectedTag ? <CalendarMonthIcon /> : <FormatListBulletedIcon/>
                        }
                    </ListItemIcon>
                    <ListItemText sx={{"width":"20%"}} primary={item.Name} />
                </ListItemButton>
            </ListItem>
        )
    }

  return (
    <div className='col-10'>
        <div id="date-tasks">
            <MapList arr={DayState}/>
        </div>
        <Divider/>
        <div id="date-tasks">
            <MapList arr={TagState}/>
        </div>
    </div>
  )
}
