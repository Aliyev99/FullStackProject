import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { MetaData } from "../../app/models/Pagination";
import { JewelryFilter } from "../../app/models/JewelryFilter";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/store";
import { ProductParams } from "../../app/models/productParams";

interface CatalogState {
    productsLoaded: boolean,
    filtersLoaded: boolean,
    status: string,
    productParams: ProductParams,
    metaData: MetaData | null,
    filters: JewelryFilter | null
}

function initParams() {
    return {
        orderBy: 'name',
        brands: [],
        materials: [],
        minPrice: 0,
        maxPrice: 100000000,
        gemstones: [],
        pageSize: 6,
        pageNumber: 1
    }
}


const productsAdapter = createEntityAdapter<Jewelry>();

function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);

    if (productParams.brands.length > 0) params.append('brands', productParams.brands.toString())
    if (productParams.materials.length > 0) params.append('materials', productParams.materials.toString())
    if (productParams.gemstones.length > 0) params.append('gemstones', productParams.gemstones.toString())

    return params;
}


export const fetchProductsAsync = createAsyncThunk<Jewelry[], string, {state: RootState}>(
    'fetchProductsAsync',
    async (productType, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams)
        try {
            const response = (await agent.Catalog.jewelries(productType, params));
            thunkAPI.dispatch(setMetaData(response.metaData))
            
            return response.items;
        } catch (error) {
            console.log(error)
        }

    }
)

export const fetchFilters = createAsyncThunk<JewelryFilter>(
    'fetchFilters',
    async (_, thunkAPI) => {
        try {
            return agent.Catalog.filters();
        } catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Jewelry, { id: string }>(
    'fetchProductAsync',
    async ({ id }, thunkAPI) => {
        try {
            return agent.Catalog.details(id)
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    }
)

export const fetchRecomendedProductsAsync = createAsyncThunk<Product[], {id: number, name: string, type: string}>(
    'fetchRecomendedProductsAsync',
    async ({id, name, type}, thunkAPI) => {
        try {
            return await agent.Catalog.recomendeds(id, name, type);
        } catch (error) {
            thunkAPI.rejectWithValue(error);
        }
    }
)


export const catalogSLice = createSlice({
    name: 'catalog-slice',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        filters: null,
        metaData: null,
        productParams: initParams()
    }),
    reducers: {
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        setProductParams: (state, action) => {
            state.productParams = { ...state.productParams, ...action.payload }
            state.productsLoaded = false;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.filters = action.payload;
            state.filtersLoaded = true;
            state.status = 'idle';
        })

        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.productsLoaded = true;
            state.status = 'idle';
        })

        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.setOne(state, action.payload);
            state.status = 'idle';
        })



        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        })

        builder.addCase(fetchRecomendedProductsAsync.fulfilled, (state, action) => {
            
        })



    })
})


export const { setMetaData, setProductParams } = catalogSLice.actions;
export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);

