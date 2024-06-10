// import axios from 'axios'
// export const loginUser = async (data) => {

//     const res = await axios.post(`http://localhost:3001/api/user/sign-in`)
//     return res.data;
// }


import axios from 'axios';

export const loginUser = async (data) => {
    try {
        const res = await axios.post('http://localhost:3001/api/user/sign-in', data);
        return res.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error; // Hoặc xử lý lỗi theo cách khác tùy thuộc vào yêu cầu của bạn
    }
};
export const createUser = async (data) => {
    try {
        const res = await axios.post('http://localhost:3001/api/user/sign-up', data);
        return res.data;
    } catch (error) {
        // console.error('Error logging in user:', error);
        throw error; // Hoặc xử lý lỗi theo cách khác tùy thuộc vào yêu cầu của bạn
    }
};
export const getDetailsUser = async (id, access_token) => {
    try {
        const res = await axios.get(`http://localhost:3001/api/user/get-details/${id}`, {
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