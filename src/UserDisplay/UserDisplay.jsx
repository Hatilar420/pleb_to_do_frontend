import React, { useState } from 'react'
import TaskComponent from '../TaskComponent/TaskComponent';
import TaskNav from '../TaskNavComponent/TaskNav';


export default function UserDisplay() {
  const [SelectedEntry, setSelectedEntry] = useState('Today')
  const selectTag = (value) =>{
    //console.log(value)
    setSelectedEntry(value)
  }
  return (
    <div className="row">
        <div className="col-3 row justify-content-center">
            <TaskNav selectedTag={SelectedEntry} setSelectedTag={selectTag} />
        </div>
        <div className="col-7">
            <TaskComponent selectedTag={SelectedEntry}/>
        </div>
    </div>
  )
}
