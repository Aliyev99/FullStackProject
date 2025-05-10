import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/Basket";
import agent from "../../app/api/agent";

interface BasketState{
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
};


export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Basket.get();     
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    },
);

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, size: string, quantity: number}>(
    'basket/addBasketItemAsync',
    async ({productId, size='', quantity = 1}, thunkAPI) => {
        try {
            return await agent.Basket.add(productId, size, quantity);
            
        } catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, {productId: number, size: string, quantity: number, name?: string}>(
    'basket/removeBasketItemAsync',
    async ({productId, size='', quantity = 1}, thunkAPI) => {
        try {
            return await agent.Basket.delete(productId, size, quantity);
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    }
)


export const basketSlice = createSlice({
    name: 'basketSLice',
    initialState: initialState, 
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        clearBasket: (state) => {
            state.basket = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBasketAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle'
        }),

        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.productId + action.meta.arg.size
            console.log(state.status)
        }),
        
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            state.basket = action.payload
            console.log(action.payload);
        }),


        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.size + action.meta.arg.name;
            console.log(state.status);
        }),
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {productId, size, quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(x => x.productId == productId && x.selectedSize == size);
            if (itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity;

            if (state.basket!.items[itemIndex].quantity <= 0){
                state.basket?.items.splice(itemIndex, 1);
            }

            state.status='idle';

        }),
        builder.addMatcher(isAnyOf(removeBasketItemAsync.rejected, addBasketItemAsync.rejected, fetchBasketAsync.rejected), (_state, action) => {
            console.log(action.payload)
        })
       
    }
})


export const {setBasket, clearBasket} = basketSlice.actions;
