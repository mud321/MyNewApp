import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
    },
    reducers: {
        getProducts: (state, action) => {
            state.product.push({ ...action.payload });
        },

        incrementQty: (state, action) => {
            const itemPresent = state.product.find(
                (item) => item.id === action.payload.id
            );

            if (itemPresent) {
                itemPresent.quantity = (itemPresent.quantity || 0) + 1;
            } else {
                console.warn("Item not found for increment:", action.payload.id);
            }
        },

        decrementQty: (state, action) => {
            const itemPresent = state.product.find(
                (item) => item.id === action.payload.id
            );

            if (itemPresent) {
                if (itemPresent.quantity === 1) {
                    // Remove item from product list
                    state.product = state.product.filter(
                        (item) => item.id !== action.payload.id
                    );
                } else if (itemPresent.quantity > 1) {
                    itemPresent.quantity--;
                }
            } else {
                console.warn("Item not found for decrement:", action.payload.id);
            }
        },
    },
});

export const { getProducts, incrementQty, decrementQty } = productSlice.actions;

export default productSlice.reducer;
