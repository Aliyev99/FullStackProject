import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { Token, User } from "../../app/models/User";
import { store } from "../../app/store/store";
import { clearBasket, setBasket } from "../basket/basketSlice";
import { toast } from "react-toastify";

interface InitialState{
    user: User | null;
    logged: boolean;
}

const initialState: InitialState = {
    user: null,
    logged: false
}

export const loginAsync = createAsyncThunk<User, FieldValues>(
    'login-async',
    async (data, thunkAPI) => {
        try {
            const response = await agent.Accaunt.login(data);
            const user: User = response.userDTO;
            store.dispatch(setBasket(user.basket));
            localStorage.setItem('token', JSON.stringify(response.tokenDTO));
            return user;
        } catch (error: any) {
            // console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const fetchCurrentuUserAsync = createAsyncThunk<User>(
    'fetchUser-async',
    async (_, thunkAPI) => {
        try {
            const user = await agent.Accaunt.fetchUser();
            store.dispatch(setBasket(user.basket))
            // console.log(user);
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const logoutAsync = createAsyncThunk<void>(
    'logout-async',
    async (_, thunkAPI) => {
        try {
            await agent.Accaunt.logout();
            store.dispatch(clearBasket());
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const refreshAsync = createAsyncThunk<Token, {oldToken: string, originalRequest: any}>(
    'refresh-async',
    async ({oldToken, originalRequest}, thunkAPI) => {
        try {
            console.log('hi')
            const response = await agent.Accaunt.refresh(oldToken);
            // console.log(response)
            localStorage.setItem('token', JSON.stringify(response));
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error, originalRequest: originalRequest});
        }
    }
)

export const accauntSlice = createSlice({
    name: 'account-slice',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        }
    },
    
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentuUserAsync.fulfilled, (state, action) => {
            const tokenStr = localStorage.getItem('token');
            if (tokenStr){
                state.user = action.payload;
                state.user.basket
            }
                
            // console.log(action.payload)
        }), 
        builder.addCase(fetchCurrentuUserAsync.rejected, (state, _) => {
            state.user = null;
        }),
        
        
       
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            // console.log(action.payload)
        }),
        builder.addCase(logoutAsync.fulfilled, (state, _action) => {
            state.user = null;
            localStorage.removeItem('token');
            toast.info('You logged out succesfully!');
            // console.log(action.payload)
        }),

        builder.addMatcher(isAnyOf(loginAsync.rejected, logoutAsync.rejected), (_state, action) => {
            console.log(action.payload)
            // throw action.payload;
        })


        // builder.addCase(refreshAsync.rejected, (state, action) => {
        //     localStorage.removeItem('token');
        //     state.user = null;
        //     console.log(action.payload)
        // }),
    }
})


export const {setUser} = accauntSlice.actions;