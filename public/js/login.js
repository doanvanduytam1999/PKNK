import axios from 'axios';
import { showAlert } from './alert';

export const login =  (username, password) => {
    const url = 'http://localhost:4000/api/v1/Customers/login';   
    axios({ 
            method: 'POST',
            url,
            data: {
                username : username,
                password: password
            },
            
        })
        .then(res => {
            if (res.data.status === "success") {
                showAlert('success', 'Đăng nhập thành công !!!');
                window.setTimeout(() => {
                    location.assign('/')
                }, 1500);
            }
        })
        .catch(err => {
            showAlert('error','Đăng nhập thất bại !!!');
        })
}

export const logout = async() => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:4000/api/v1/Customers/logout',
        });
        if(res.data.status === 'success') {
            location.assign('/');
        }
    }catch(err) {
        showAlert('error', 'Error loggin out! try again')
    }
}
