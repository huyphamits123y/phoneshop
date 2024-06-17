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