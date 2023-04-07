import React from 'react'

import './List.css';
import ListItem from '../ListItem/ListItem';

const List = ({list}) => {
  return (
    <div className='list'>
        <div className="title">Users List</div>
        {list.map((listItem)=>{
            return <ListItem  key={listItem.phone} name={listItem.name} phone={listItem.phone}/>
        })}
    </div>
  )
}

export default List