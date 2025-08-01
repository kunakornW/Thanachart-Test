import common from '@/service/common'

const controller = 'Product';

interface iProductService {
    getProduct: Function
}

const service = {} as iProductService;

service.getProduct = () => {
    return common.fetchData('GET', `${controller}/Order`, null, null, null);
}

export default service;