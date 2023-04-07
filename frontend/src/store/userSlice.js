import { createSlice } from "@reduxjs/toolkit";
const initialUsersState = {users:[]};

const userSlice = createSlice({
    name : 'user',
    initialState : initialUsersState,
    reducers : {

        setUser(state , action){
            state.users = action.payload;
        },

        addUser(state , action){
           state.users = [...state.users , action.payload];
           state.users.sort(function(a, b) {
            return a.name.localeCompare(b.name);
          });
           
        },

        updateUser(state , action){
            state.users = state.users.map((user)=>{
                if(user.phone===action.payload.phone)
                {
                    return { ...user, name : action.payload.name};
                }
                else{
                    return user;
                }
            });
            state.users.sort(function(a, b) {
                return a.name.localeCompare(b.name);
              });
        },

        deleteUser(state , action){
            state.users = state.users.filter((user)=>{
                return user.phone!=action.payload;
            });
        }

    }});

    export const userActions = userSlice.actions;
    export default userSlice.reducer;