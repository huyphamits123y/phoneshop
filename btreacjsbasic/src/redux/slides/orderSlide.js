
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
        //     addOrderProduct: (state, action) => {
        //         const { orderItem } = action.payload;
        //         const itemOrder = state.orderItems.find((item) => item.product === orderItem.product);
        //         if (itemOrder) {
        //             itemOrder.amount += orderItem.amount;
        //         } else {
        //             state.orderItems.push(orderItem);
        //         }
        //         saveStateToLocalStorage(state);
        //     },
        //     increaseAmount: (state, action) => {
        //         const { idProduct } = action.payload;
        //         const itemOrder = state.orderItems.find((item) => item.product === idProduct);
        //         if (itemOrder) {
        //             itemOrder.amount++;
        //         }
        //         saveStateToLocalStorage(state);
        //     },
        //     decreaseAmount: (state, action) => {
        //         const { idProduct } = action.payload;
        //         const itemOrder = state.orderItems.find((item) => item.product === idProduct);
        //         if (itemOrder && itemOrder.amount > 1) {
        //             itemOrder.amount--;
        //         }
        //         saveStateToLocalStorage(state);
        //     },
        //     removeOrderProduct: (state, action) => {
        //         const { idProduct } = action.payload;
        //         state.orderItems = state.orderItems.filter((item) => item.product !== idProduct);
        //         saveStateToLocalStorage(state);
        //     }
        // }
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            // Tìm kiếm đơn hàng dựa trên product và userId
            const itemOrder = state.orderItems.find(
                (item) => item.product === orderItem.product && item.userId === orderItem.userId
            );
            if (itemOrder) {
                // Nếu đã tồn tại đơn hàng của user này, tăng số lượng
                itemOrder.amount += orderItem.amount;
            } else {
                // Nếu chưa có, thêm mới
                state.orderItems.push(orderItem);
            }
            saveStateToLocalStorage(state); // Hàm lưu state vào local storage
        },
        increaseAmount: (state, action) => {
            const { idProduct, userId } = action.payload;
            // Tìm kiếm đơn hàng dựa trên product và userId
            const itemOrder = state.orderItems.find(
                (item) => item.product === idProduct && item.userId === userId
            );
            if (itemOrder) {
                itemOrder.amount++;
            }
            saveStateToLocalStorage(state); // Hàm lưu state vào local storage
        },
        decreaseAmount: (state, action) => {
            const { idProduct, userId } = action.payload;
            // Tìm kiếm đơn hàng dựa trên product và userId
            const itemOrder = state.orderItems.find(
                (item) => item.product === idProduct && item.userId === userId
            );
            if (itemOrder && itemOrder.amount > 1) {
                itemOrder.amount--;
            }
            saveStateToLocalStorage(state); // Hàm lưu state vào local storage
        },
        removeOrderProduct: (state, action) => {
            const { idProduct, userId } = action.payload;
            // Lọc ra các đơn hàng không khớp với product và userId
            state.orderItems = state.orderItems.filter(
                (item) => item.product !== idProduct || item.userId !== userId
            );
            saveStateToLocalStorage(state); // Hàm lưu state vào local storage
        },
        removeAllUserProducts: (state, action) => {
            const { userId } = action.payload;
            state.orderItems = state.orderItems.filter(item => item.userId !== userId);
            saveStateToLocalStorage(state);
        },


    },
});

export const { addOrderProduct, removeOrderProduct, increaseAmount, decreaseAmount, removeAllUserProducts } = orderSlide.actions;

export default orderSlide.reducer;












