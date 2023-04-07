import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { modalAction } from '../../store/modalSlice';


import './ModalForm.css';
import { userActions } from '../../store/userSlice';






const ModalForm = () => {

    const { visible, type, name, phone } = useSelector((state) => { return state.modal });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const users = useSelector((state) => { return state.user.users });

    const addUser = async (user) => {
        setIsSubmitting(true);

        try {
            const addUrl = 'http://localhost:4000/api/v1/user/create';
            const updateUrl = 'http://localhost:4000/api/v1/user/update';
            const url = type === 'add' ? addUrl : updateUrl;
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }

            });



            if (!response.ok) {
                const data = await response.json();
                console.log(data)
                throw new Error(data.message);
            }

            setIsSubmitting(false);
            return true;





        } catch (error) {

            console.log(error.message)
            setIsSubmitting(false);
            setError(error.message);
            return false;

        }


    }

    const dispatch = useDispatch();

    const closeModal = (event) => {
        event.preventDefault();
        console.log('backdrop clicked');
        dispatch(modalAction.hide());
    }

    const handleClick = async (event) => {

        event.preventDefault();

        if (type == 'add') {
            let error = '';
            const phoneRegex = /^[6789]\d{9}$/;
            if(!name || !phone){
                setError('All fields are required');
            }
            else if (!phoneRegex.test(phone)) {
                setError('invalid phone number');
            }
            else{
                const added = await addUser({ name, phone });
                if (added) {
                    dispatch(userActions.addUser({ name, phone }));
                    dispatch(modalAction.clearForm());
                    closeModal(event);
                
            }

            }
            



        }
        else if (type == 'update') {
            const updated = await addUser({ name, phone });
            updated && dispatch(userActions.updateUser({ name, phone }));
            dispatch(modalAction.clearForm());
            closeModal(event);

        }


    }

    const handleChange = (event) => {
        event.preventDefault();
        dispatch(modalAction.updateForm({ name: event.target.name, value: event.target.value }));
    }


    return (
        <>
            <div className={`backdrop ${visible && 'visible'}`} onClick={closeModal} > </div >

            <form className={`form ${visible && 'visible'}`} onClick={() => { console.log('form clicked') }}>


                {error && <div className="error">* {error}</div>}

                <div className='control'>
                    <label htmlFor='name'>Name</label>
                    <input className='input' type='text' id='name' name='name' value={name} onChange={handleChange} />
                </div>

                <div className='control'>
                    <label htmlFor='phone'>Phone</label>
                    <input className='input' type='text' id='phone' name='phone' value={phone} onChange={handleChange} disabled={type === 'update'} />
                </div>

                <div className="action">
                    {type === 'add' && <button className='btn add' type='submit' onClick={handleClick}>{isSubmitting ? 'Submitting ...' : 'Add User'}</button>}
                    {type === 'update' && <button className='btn update' type='submit' onClick={handleClick}>{isSubmitting ? 'Submitting ...' : 'Update User'}</button>}
                    <button className='btn cancel' onClick={closeModal}>Cancel</button>
                </div>

            </form>




        </>
    )
}

export default ModalForm