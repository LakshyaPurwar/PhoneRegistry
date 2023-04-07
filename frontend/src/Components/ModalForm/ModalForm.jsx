import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { modalAction } from '../../store/modalSlice';


import './ModalForm.css';
import { userActions } from '../../store/userSlice';






const ModalForm = () => {

    const {visible , type , name , phone} = useSelector((state)=>{return state.modal});

    // const [formData , setFormData] = useState({name:'' , phone:null});

    const users = useSelector((state)=>{return state.user.users});
    
    const dispatch = useDispatch();

    const closeModal = (event)=>{
        event.preventDefault();
        console.log('backdrop clicked');
        dispatch(modalAction.hide());
    }

    const handleClick = (event)=>{
        event.preventDefault();
        if(type=='add')
        {
            dispatch(userActions.addUser({name , phone}));
        }
        else if(type=='update')
        {
            dispatch(userActions.updateUser({name , phone}));
        }
        // setFormData({name:'' , phone:''});
        dispatch(modalAction.clearForm());
        // closeModal(event);
        
        //something with the db


    }

    const handleChange = (event)=>{
        event.preventDefault();
        dispatch(modalAction.updateForm({name:event.target.name , value : event.target.value}));
    }


    return (
        <>
        <div className={`backdrop ${visible && 'visible'}`}  onClick={closeModal} > </div >
        
            <form  className={`form ${visible && 'visible'}`} onClick={()=>{console.log('form clicked')}}>
                <div className='control'>
                    <label htmlFor='name'>Name</label>
                    <input  className='input' type='text' id='name' name='name' value={name}  onChange={handleChange} />
                </div>

                    <div className='control'>
                        <label htmlFor='phone'>Phone</label>
                        <input className='input' type='text' id='phone' name='phone' value={phone} onChange={handleChange} disabled={type==='update'}/>
                    </div>
                


                    {type==='add' && <button className='btn' type='submit' onClick={handleClick}>Add User</button>}
                    {type==='update'&& <button className='btn' type='submit' onClick={handleClick}>Update User</button>}
                    <button className='btn' onClick={closeModal}>Cancel</button>
            </form>
         

            
       
        </>
    )
}

export default ModalForm