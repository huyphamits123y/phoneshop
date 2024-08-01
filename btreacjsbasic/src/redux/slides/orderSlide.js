// import { createSlice } from '@reduxjs/toolkit'
// const initialState = {
//     orderItems: [

//     ],
//     shippingAddress: {

//     },
//     paymentMethod: '',
//     itemsPrice: 0,
//     shippingPrice: 0,
//     taxPrice: 0,
//     totalPrice: 0,
//     user: '',
//     isPaid: false,
//     paidAt: '',
//     isDelivered: false,
//     deliveredAt: '',
// }

// export const orderSlide = createSlice({
//     name: 'order',
//     initialState,

//     reducers: {
//         addOrderProduct: (state, action) => {
//             console.log({ state, action })
//             const { orderItem } = action.payload
//             const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
//             if (itemOrder) {
//                 itemOrder.amount += orderItem?.amount
//             } else {
//                 state.orderItems.push(orderItem)
//             }
//         },
//         removeOrderProduct: (state, action) => {

//             const { idProduct } = action.payload
//             const itemOrder = state?.orderItems?.find((item) => item?.product !== idProduct)
//             itemOrder.orderItem = itemOrder
//         }
//     }
// })

// // Action creators are generated for each case reducer function
// export const { addOrderProduct, removeOrderProduct } = orderSlide.actions

// export default orderSlide.reducer




// import { createSlice } from '@reduxjs/toolkit'
// const saveStateToLocalStorage = (state) => {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('orderState', serializedState);
//     } catch (e) {
//         console.error(e);
//     }
// };
// const loadStateFromLocalStorage = () => {
//     try {
//         const serializedState = localStorage.getItem('orderState');
//         if (serializedState === null) return undefined;
//         return JSON.parse(serializedState);
//     } catch (e) {
//         console.error(e);
//         return undefined;
//     }
// };
// const initialState = loadStateFromLocalStorage() || {
//     orderItems: [],
//     shippingAddress: {},
//     paymentMethod: '',
//     itemsPrice: 0,
//     shippingPrice: 0,
//     taxPrice: 0,
//     totalPrice: 0,
//     user: '',
//     isPaid: false,
//     paidAt: '',
//     isDelivered: false,
//     deliveredAt: '',
// }
// // Hàm để lưu trạng thái vào localStorage

// export const orderSlide = createSlice({
//     name: 'order',
//     initialState,
//     reducers: {
//         addOrderProduct: (state, action) => {
//             console.log({ state, action });
//             const { orderItem } = action.payload;
//             const itemOrder = state.orderItems.find((item) => item.product === orderItem.product);
//             if (orderItem) {

//                 if (itemOrder) {
//                     itemOrder.amount += orderItem.amount;
//                 } else {
//                     state.orderItems.push(orderItem);
//                 }
//                 saveStateToLocalStorage(state);
//             }
//         },
//         increaseAmount: (state, action) => {

//             const { idProduct } = action.payload
//             const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
//             if (itemOrder) {
//                 itemOrder.amount++;
//             }
//             saveStateToLocalStorage(state);
//         },
//         decreaseAmount: (state, action) => {

//             const { idProduct } = action.payload
//             const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
//             // itemOrder.amount--
//             if (itemOrder && itemOrder.amount > 1) {
//                 itemOrder.amount--;
//             }
//             saveStateToLocalStorage(state);
//         },
//         removeOrderProduct: (state, action) => {
//             const { idProduct } = action.payload
//             const itemOrder = state?.orderItems?.find((item) => item?.product !== idProduct)
//             itemOrder.orderItems = itemOrder
//             saveStateToLocalStorage(state);
//         }
//         // removeOrderProduct: (state, action) => {
//         //     const { idProduct } = action.payload;
//         //     state.orderItems = state.orderItems.filter(item => item.product !== idProduct);
//         //     saveStateToLocalStorage(state);
//         // }
//     }
// })

// // Action creators are generated for each case reducer function
// export const { addOrderProduct, removeOrderProduct, increaseAmount, decreaseAmount } = orderSlide.actions

// export default orderSlide.reducer






// import { createSlice } from '@reduxjs/toolkit';

// const saveStateToLocalStorage = (state) => {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('orderState', serializedState);
//     } catch (e) {
//         console.error(e);
//     }
// };

// const loadStateFromLocalStorage = () => {
//     try {
//         const serializedState = localStorage.getItem('orderState');
//         if (serializedState === null) return undefined;
//         return JSON.parse(serializedState);
//     } catch (e) {
//         console.error(e);
//         return undefined;
//     }
// };

// const initialState = loadStateFromLocalStorage() || {
//     orderItems: [],
//     shippingAddress: {},
//     paymentMethod: '',
//     itemsPrice: 0,
//     shippingPrice: 0,
//     taxPrice: 0,
//     totalPrice: 0,
//     user: '',
//     isPaid: false,
//     paidAt: '',
//     isDelivered: false,
//     deliveredAt: '',
// };

// export const orderSlice = createSlice({
//     name: 'order',
//     initialState,
//     reducers: {
//         addOrderProduct: (state, action) => {
//             const { orderItem } = action.payload;
//             const itemOrder = state.orderItems.find((item) => item.product === orderItem.product);

//             if (itemOrder) {
//                 itemOrder.amount += orderItem.amount;
//             } else {
//                 state.orderItems.push(orderItem);
//             }

//             saveStateToLocalStorage(state);
//         },
//         increaseAmount: (state, action) => {
//             const { idProduct } = action.payload;
//             const itemOrder = state.orderItems.find((item) => item.product === idProduct);
//             if (itemOrder) {
//                 itemOrder.amount++;
//             }
//             saveStateToLocalStorage(state);
//         },
//         decreaseAmount: (state, action) => {
//             const { idProduct } = action.payload;
//             const itemOrder = state.orderItems.find((item) => item.product === idProduct);
//             if (itemOrder && itemOrder.amount > 1) {
//                 itemOrder.amount--;
//             }
//             saveStateToLocalStorage(state);
//         },
//         removeOrderProduct: (state, action) => {
//             const { idProduct } = action.payload;
//             state.orderItems = state.orderItems.filter((item) => item.product !== idProduct);
//             saveStateToLocalStorage(state);
//         },
//     },
// });

// export const { addOrderProduct, removeOrderProduct, increaseAmount, decreaseAmount } = orderSlice.actions;

// export default orderSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('orderState', serializedState);
    } catch (e) {
        console.error(e);
    }
};

const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('orderState');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

const initialState = loadStateFromLocalStorage() || {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
};

export const orderSlide = createSlice({
    name: 'order',
    // initialState: {
    //     orderItems: []
    // },
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            const itemOrder = state.orderItems.find((item) => item.product === orderItem.product);
            if (itemOrder) {
                itemOrder.amount += orderItem.amount;
            } else {
                state.orderItems.push(orderItem);
            }
            saveStateToLocalStorage(state);
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state.orderItems.find((item) => item.product === idProduct);
            if (itemOrder) {
                itemOrder.amount++;
            }
            saveStateToLocalStorage(state);
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state.orderItems.find((item) => item.product === idProduct);
            if (itemOrder && itemOrder.amount > 1) {
                itemOrder.amount--;
            }
            saveStateToLocalStorage(state);
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter((item) => item.product !== idProduct);
            saveStateToLocalStorage(state);
        }
    }
});

export const { addOrderProduct, removeOrderProduct, increaseAmount, decreaseAmount } = orderSlide.actions;

export default orderSlide.reducer;












