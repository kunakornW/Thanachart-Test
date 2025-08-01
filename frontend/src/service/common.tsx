import axiosInstant from 'axios';

const axios = axiosInstant.create();

const fetchData = (method: string, path: string, param: any, body: any, additionalHeader: any) => {
    return new Promise((resolve, reject) => {
        axios({
            headers: httpHeaders(additionalHeader),
            method: method,
            url: `https://localhost:7118/${path}`,
            params: param,
            data: JSON.stringify(body)
        })
            .then(response => resolve(response.data))
            .catch(error => reject(new Error(error.message)))
    });

};

const httpHeaders = (additionalHeader: any) => {
    let header = {
        'Pragma': 'no-cache',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    if (additionalHeader) {
        header = { ...header, ...additionalHeader };
    }

    return header;
}

const common = { fetchData };

export default common;