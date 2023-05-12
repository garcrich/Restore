import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "aws-sdk/clients/ssm";
import agent from "../../app/api/agent";

const prodcutsAdapter = createEntityAdapter<Product>()

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  'catalog/fetchProductsAsync',
  async () => {
    try {
      return await agent.Catalog.list()
    } catch (error) {
      console.log(error)
    }
  }
)

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: prodcutsAdapter.getInitialState({
    productsLoaded: false,
    status: 'idle'
  }),
  reducers: {}
})