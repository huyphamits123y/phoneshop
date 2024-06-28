import axios from "axios"
export const axiosJWT = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true, // Đảm bảo rằng cookie được gửi kèm với yêu cầu
});
export const getAllProduct = async () => {
    try {
        const res = await axiosJWT.get('/api/product/get-all');
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
export const createProduct = async (data) => {

    try {
        const res = await axiosJWT.post('/api/product/create', data)
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
export const getDetailsProduct = async (id) => {

    try {
        const res = await axiosJWT.get(`/api/product/get-details/${id}`)


        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const updatedProduct = async (id, access_token, data) => {

    try {
        const res = await axiosJWT.put(`/api/product/update/${id}`, data, {
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
