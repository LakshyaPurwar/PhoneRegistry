import React from 'react'

import './ListItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/userSlice';
import { modalAction } from '../../store/modalSlice';




const ListItem = (props) => {

    const dispatch = useDispatch();

    const handleUpdate = ()=>{
        dispatch(modalAction.setForm({name : props.name , phone : props.phone}));
        dispatch(modalAction.show('update'));
       
    }

    const handleDelete = ()=>{
        dispatch(userActions.deleteUser(props.phone));
    }

  return (
    <div className='listItem'>
        <div className="name">Name : {props.name}</div>
        <div className="phone">Phone : {props.phone}</div>
        <div className="action">
            <button className="update" onClick={handleUpdate}>Update</button>
            <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
    </div>
  )
}

export default ListItem