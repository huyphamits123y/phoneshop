import { createSlice } from '@reduxjs/toolkit'




const initialState = {
    name: '',
    email: '',
    access_token: '',
    isLoading: false,
    phone: '',
    address: '',
    avatar: '',
    id: '',
    isAdmin: false
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', access_token = '', address = '', avatar = '', phone = '', _id = '', isAdmin } = action.payload
            // const { name, email, access_token } = action.payload
            console.log('action', action)
            state.name = name;
            // state.name = name;
            state.email = email;
            state.access_token = access_token
            state.address = address;
            state.avatar = avatar;
            state.id = _id;
            state.phone = phone;
            state.isAdmin = isAdmin;


        },
        resetUser: (state) => {


            state.name = '';
            state.email = '';
            state.access_token = '';
            state.address = '';
            state.avatar = '';
            state.phone = '';
            state.id = '';
            state.isAdmin = false;
        }

    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer