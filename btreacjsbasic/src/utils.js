import { orderContant } from "./contant"

export const isJsonString = (data) => {
    try {
        JSON.parse(data)

    } catch (error) {
        return false
    }
    return true
}
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error)
    })
export const renderOptions = (arr) => {
    let results = []
    if (arr) {
        results = arr?.map((opt) => {
            return {
                value: opt,
                label: opt
            }
        })
        results.push({
            label: 'Them type',
            value: 'add_type'
        })
        return results
    }

}
export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(',', '.')
        return `${result} VND`
    } catch (error) {
        return null
    }
}
export const initFacebookSDK = () => {
    // Kiểm tra nếu Facebook SDK đã được tải
    if (window.FB) {
        window.FB.XFBML.parse();
    }

    let locale = "vi_VN"; // Ngôn ngữ Vietnamese

    // Hàm init của Facebook SDK
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: process.env.REACT_APP_FB_ID, // Sử dụng biến môi trường để lưu App ID
            cookie: true, // Cho phép sử dụng cookies
            xfbml: true, // Phân tích các social plugins trên trang
            version: "v8.6", // Sử dụng phiên bản Facebook API
        });
    };

    // Tải SDK không đồng bộ
    (function (d, s, id) {
        console.log(s); // In ra thẻ script để kiểm tra
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = `https://connect.facebook.net/${locale}/sdk.js`; // Đường dẫn tới SDK của Facebook
        fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
};
export const convertDataChart = (data, type) => {

    try {
        const object = {}
        Array.isArray(data) && data.forEach((opt) => {

            if (!object[opt[type]]) {
                object[opt[type]] = 1
            } else {
                object[opt[type]] += 1
                console.log('c:getbase64', object[opt[type]], typeof (object[opt[type]]))
            }
            console.log('object', object)


        });
        const results = Array.isArray(Object.keys(object)) && Object.keys(object)?.map((item) => {
            return {
                name: orderContant.deliveryMethod[item],
                value: object[item]
            }
        })
        return results

    } catch (e) {
        return []

    }

}
