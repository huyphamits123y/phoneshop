// import axios from 'axios'
// export const loginUser = async (data) => {

//     const res = await axios.post(`http://localhost:3001/api/user/sign-in`)
//     return res.data;
// }


import axios from 'axios';

export const axiosJWT = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true, // Đảm bảo rằng cookie được gửi kèm với yêu cầu
});
export const loginUser = async (data) => {
    try {
        const res = await axiosJWT.post('/api/user/sign-in', data);
        return res.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error; // Hoặc xử lý lỗi theo cách khác tùy thuộc vào yêu cầu của bạn
    }
};
export const createUser = async (data) => {
    try {
        const res = await axiosJWT.post('/api/user/sign-up', data);
        return res.data;
    } catch (error) {
        // console.error('Error logging in user:', error);
        throw error; // Hoặc xử lý lỗi theo cách khác tùy thuộc vào yêu cầu của bạn
    }
};
export const getDetailsUser = async (id, access_token) => {
    try {
        const res = await axiosJWT.get(`/api/user/get-details/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,

            }

        })
        return res.data;
    } catch (error) {
        // console.error('Error logging in user:', error);
        throw error; // Hoặc xử lý lỗi theo cách khác tùy thuộc vào yêu cầu của bạn
    }
};
// export const refreshToken = async () => {
//     const res = await axios.post('http://localhost:3001/api/user/refresh-token', {
//         withCredentials: true
//     })



//     return res.data;
// };
export const refreshToken = async () => {
    const res = await axiosJWT.post('/api/user/refresh-token', {}, {
        withCredentials: true
    });

    return res.data;
};
export const logoutUser = async () => {
    const res = await axiosJWT.post('/api/user/log-out')
    return res.data;

};
export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`/api/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,

        }
    })
    return res.data;

};
// export const updateUser = async (id, data) => {
//     const res = await axiosJWT.put(`/api/user/update-user/${id}`, data)
//     return res.data;

// };