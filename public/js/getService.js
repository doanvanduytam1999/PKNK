import axios from 'axios';

export const getService = (id) => {

    const url = 'https://pknk.herokuapp.com/api/v1/Customers/getService';
    axios({
            method: 'POST',
            url,
            data: {
                id: id
            },

        })
        .then(res => {
            console.log(res.data.data.Services);

            if (res.data.status === "success") {
                return res.data.data.Services;
            }
        })

}

/* export const logout = async() => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'https://pknk.herokuapp.com/api/v1/Customers/logout',
        });
        if(res.data.status === 'success') {
            location.assign('/');
        }
    }catch(err) {
        showAlert('error', 'Error loggin out! try again')
    }
} */