import axios from "axios"
export const axiosJWT = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true, // Đảm bảo rằng cookie được gửi kèm với yêu cầu
});
export const createOrder = async (access_token, data) => {

    try {
        const res = await axiosJWT.post('/api/order/create', data, {
            headers: {
                token: `Bearer ${access_token}`,

            }

        })
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
export const getListsOrder = async (id) => {

    try {
        const res = await axiosJWT.get(`/api/order/payment-order/${id}`)
        return res.data;
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
};
export const deleteOrder = async (id, access_token) => {
    const res = await axiosJWT.delete(`/api/order/delete-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,

        }
    })
    return res.data
}
export const paymentorder = async (id) => {

    try {
        const res = await axiosJWT.post(`/api/order/payment-order-success/${id}`)
        return res.data;
    } catch (error) {
        console.log('eror', error)
    }
};
export const sendEmailOrder = async (email, id) => {

    try {
        const res = await axiosJWT.post(`/api/order/email/${email}/${id}`)
        return res.data;
    } catch (error) {
        console.log('eror', error)
    }
};
export const getAllOrder = async () => {
    try {
        const res = await axiosJWT.get('/api/order/get-all-order');

        return res.data;
    } catch (error) {
        console.error("Error fetching order", error);
        throw error;
    }
};