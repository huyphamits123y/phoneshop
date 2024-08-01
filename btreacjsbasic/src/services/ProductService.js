import axios from "axios"
export const axiosJWT = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true, // Đảm bảo rằng cookie được gửi kèm với yêu cầu
});
export const getAllProductHome = async (search) => {
    try {
        console.log('search', search)
        let res = {}
        if (search?.length > 0) {
            res = await axiosJWT.get(`/api/product/get-allsearch?filter=name&filter=${search}`);

        } else {
            res = await axiosJWT.get('/api/product/get-all');

        }

        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
export const getAllProduct = async () => {
    try {
        const res = await axiosJWT.get('/api/product/get-all');

        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
export const getProductType = async (type, page, limit) => {
    try {
        const res = await axiosJWT.get(`/api/product/get-allsearch?filter=type&filter=${type}&limit=${limit}&page=${page}`);

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
        console.log('eror', error)
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
export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`/api/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,

        }
    })
    return res.data
}
export const getAllTypeProduct = async () => {
    const res = await axiosJWT.get('/api/product/get-all-type')
    return res.data
}
