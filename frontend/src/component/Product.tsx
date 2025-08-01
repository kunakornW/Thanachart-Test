'use client'

import * as React from 'react';

import { Card, CardContent, Typography, CardActionArea, Snackbar, Alert, Grid } from '@mui/material';

import productService from '@/service/productService';
import stockService from '@/service/stockService';

import iProductComponent from '@/model/productModel';
import iProductResponse from '@/model/response/productResponse';
import iStockResponse from '@/model/response/stockResponse';
import iStockRequest from '@/model/request/stockrequest';

const defaultAlert = { open: false, message: '', severity: 'success' }

function Product({ setLoading, products, setProducts }: iProductComponent) {
    const [alert, setAlert] = React.useState(defaultAlert);

    const [lstProduct, setLstProduct] = React.useState<Array<iProductResponse>>([]);

    const showError = (msg: string) => {
        setAlert({ ...alert, open: true, message: msg, severity: 'error' })
    }

    const handleCloseAlert = () => {
        setAlert(defaultAlert);
    }

    React.useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProducts = async () => {
        try {
            setLoading(true);
            const res = await productService.getProduct();
            if (res.isSuccess) {
                setLstProduct(res.data);
            }
        }
        catch (e: any) {
            showError(e.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleChooseProduct = async (product: iProductResponse) => {
        try {
            setLoading(true);

            let lst = [...products];
            const obj = lst.find((x, i) => x.code === product.code);
            let orderNumber = 0;

            if (obj) {
                orderNumber = obj.number + 1;
            }
            else {
                orderNumber = 1;
            }

            let model = {
                orderNumber: orderNumber,
                productCode: product.code
            } as iStockRequest;

            const res = await stockService.checkStock(model)
            if (res.isSuccess) {
                var data = res.data as iStockResponse;
                if (data.canOrder) {
                    if (orderNumber > 1) {
                        const i = lst.findIndex((x, i) => x.code === product.code);
                        lst[i].number = orderNumber;
                    }
                    else {
                        lst.push({ ...product, number: orderNumber });
                    }

                    setProducts(lst);
                }
                else {
                    showError('ไม่สามารถเลือกสินค้าเนื่องจากไม่มีสินค้าใน stock')
                }
            }
        }
        catch (e: any) {
            showError(e.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert
                    onClose={handleCloseAlert}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>

            <Grid container direction={'row'} justifyContent={'flex-start'} alignItems={'center'} spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <Typography variant='h5' component={'div'} width={'100%'} >เลือกสินค้า</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography variant='body1' fontStyle={'italic'} sx={{ color: 'green' }} component={'div'} width={'100%'} >* Choose product by clicking on the product.</Typography>
                </Grid>
                {
                    lstProduct.map((x, i) => (
                        <CardActionArea key={'p-' + i} onClick={(e) => { handleChooseProduct(x); }}>
                            <Card>

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {x.name} (ราคา {x.price} บาท)
                                    </Typography>
                                </CardContent>

                            </Card>
                        </CardActionArea>
                    ))
                }
            </Grid>
        </React.Fragment>

    )
}

export default Product;