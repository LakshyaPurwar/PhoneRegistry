import React, { useState } from 'react'

import './ListItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/userSlice';
import { modalAction } from '../../store/modalSlice';





const ListItem = (props) => {

    const [deleting, setDeleting] = useState(false);
    const [error , setError] = useState(false);

    const dispatch = useDispatch();

    const deleteUser = async (phone) => {

        setDeleting(true);

        try {

            const deleteUrl = 'https://phone-registry-backend.onrender.com/api/v1/user/delete'
            const response = await fetch(deleteUrl, {
                method: 'POST',
                body: JSON.stringify({phone : phone}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            window.alert('Deleted Successfully');
            setDeleting(false);
            return true;

        } catch (error) {
            setError(error.message);
            setDeleting(false);
            return false;

        }

        



    }

    const handleUpdate = () => {
        dispatch(modalAction.setForm({ name: props.name, phone: props.phone }));
        dispatch(modalAction.show('update'));

    }

    const handleDelete = () => {
        const ok = window.confirm('Sure you wanna delete ? ');
        if(ok)
        {
            const deleted = deleteUser(Number(props.phone));
            console.log(deleted && Number(props.phone));
            dispatch(userActions.deleteUser(props.phone));
        }
       
    }

    return (
        <div className='listItem'>
            <div className="name">Name : {props.name}</div>
            <div className="phone">Phone : {props.phone}</div>
            <div className="listItemAction">
                <button className="update" onClick={handleUpdate}>Update</button>
                <button className="delete" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default ListItem