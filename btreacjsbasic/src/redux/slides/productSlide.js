import { createSlice } from '@reduxjs/toolkit'




const initialState = {
  value: 0,
}

export const productSlide = createSlice({
  name: 'product',
  initialState,
  // reducers: {
  //   increment: (state) => {

  //     state.value += 1
  //   },
  //   decrement: (state) => {
  //     state.value -= 1
  //   },
  //   incrementByAmount: (state, action) => {
  //     state.value += action.payload
  //   },
  // },
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { searchProduct } = productSlide.actions

export default productSlide.reducer