import common from '@/service/common';
import iStockRequest from '@/model/request/stockrequest';

const controller = 'Stock';

interface iStockService {
    getStock: Function,
    checkStock: Function,
    // cancelOrder: Function,
    // updateStock: Function,
    checkOut: Function,
}

const service = {} as iStockService;

service.getStock = () => {
    return common.fetchData('GET', `${controller}/GetStock`, null, null, null);
}

service.checkStock = (model: iStockRequest) => {
    return common.fetchData('POST', `${controller}/CheckStock`, null, model, null);
}

// service.cancelOrder = (model: Array<iStockRequest>) => {
//     return common.fetchData('POST', `${controller}/CancelOrder`, null, null, null);
// }

// service.updateStock = (model: iStockRequest) => {
//     return common.fetchData('POST', `${controller}/UpdateStock`, null, model, null);
// }

service.checkOut = (model: Array<iStockRequest>) => {
    return common.fetchData('POST', `${controller}/CheckOut`, null, model, null);
}

export default service;