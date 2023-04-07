import { createSlice } from "@reduxjs/toolkit";
const initialModalState = { visible: false, type: 'add', name: '', phone: '' };
const modalSlice = createSlice({
    name: 'modal',
    initialState: initialModalState,
    reducers: {
        show(state, action) {
            state.visible = true;
            state.type = action.payload;
        },

        hide(state) {

            state.visible = false;
        },
        setForm(state, action) {
            //Gets a object {name : name , phone : phone} and sets the modal form accordingly.
            //Used to set the form in update feature.
            state.name = action.payload.name;
            state.phone = action.payload.phone;
        },
        updateForm(state, action) {
            //This is the function which updates the input field  being typed with its latest value onChange.
            //In payload  , receives the name of the input field and the new value
            state[action.payload.name] = action.payload.value;
        },

        clearForm(state) {
            state.name = '';
            state.phone = '';
        }
    },
});

export const modalAction = modalSlice.actions;
export default modalSlice.reducer;