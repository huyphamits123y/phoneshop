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