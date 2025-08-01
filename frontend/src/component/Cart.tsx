'use client'

import * as React from 'react';
import PropTypes from 'prop-types';

import { Stack, Typography, ListItemText, ListItem, List, IconButton, Button, Snackbar, Alert } from '@mui/material';
import { Remove, Close } from '@mui/icons-material'

import util from '@/service/util';

import iCartComponent from '@/model/cartModel';

import stockService from '@/service/stockService';
import iStockRequest from '@/model/request/stockrequest';
import iProductResponse from '@/model/response/productResponse';

//import util from 'service/util';

const defaultAlert = { open: false, message: '', severity: 'success' }
function Cart({ products, setProducts, setCheckOut, setLoading }: iCartComponent) {
  const [alert, setAlert] = React.useState(defaultAlert);

  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  const showError = (msg: string) => {
    setAlert({ ...alert, open: true, message: msg, severity: 'error' })
  }

  const handleCloseAlert = () => {
    setAlert(defaultAlert);
  }

  const handleRemove = (code: string) => {
    const lst = [...products];
    const i = lst.findIndex((x, i) => x.code === code);
    lst[i].number -= 1;
    setProducts(lst);
  }

  const handleRemoveAll = (code: string) => {
    const lst = products.filter((x, i) => x.code !== code);
    setProducts(lst);
  }

  const checkOut = async () => {
    try {
      setLoading(true);

      let model = [] as Array<iStockRequest>

      products.forEach((x: iProductResponse, i: number) => {
        model.push({ orderNumber: x.number, productCode: x.code } as iStockRequest)
        return x;
      })

      const res = await stockService.checkOut(model);
      if (res.isSuccess) {
        setTotalPrice(res.data);
        setCheckOut(true);
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
      <Typography variant='h5' component={'div'} mb={1}>Shoping cart</Typography>
      {
        products.length > 0 &&
        (
          <List disablePadding>
            {products.map((product) => (
              <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                <ListItemText
                  sx={{ mr: 2 }}
                  className='font-20'
                  primary={product.name + `  (${product.number})`}
                  secondary={`${util.numberWithCommas(product.price * product.number)} THB`}
                />
                <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={2}>
                  <React.Fragment>
                    {
                      product.number > 1 && (
                        <IconButton onClick={(e) => { handleRemove(product.code) }}>
                          <Remove />
                        </IconButton>
                      )
                    }

                    <IconButton onClick={(e) => { handleRemoveAll(product.code) }}>
                      <Close />
                    </IconButton>
                  </React.Fragment>
                </Stack>

              </ListItem>
            ))}
          </List>
        )
      }
      {
        totalPrice > 0 && (
          <Typography variant='h6' component={'div'} mb={2} mt={2}>คิดเป็นเงินจำนวน {util.numberWithCommas(totalPrice)} บาท</Typography>
        )
      }

      {
        products.length > 0 && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={5} sx={{ mt: '30px' }}>
            <Button
              variant='outlined'
              sx={{ width: '130px' }}
              onClick={(e) => {
                setProducts([]);
                setTotalPrice(0)
              }}
            >
              {totalPrice > 0 ? 'เริ่มใหม่' : 'ล้างตระกร้า'}
            </Button>
            <Button
              variant='contained'
              sx={{ width: '130px' }}
              onClick={checkOut}
              disabled={totalPrice > 0}
            >
              Check out
            </Button>
          </Stack>
        )
      }

    </React.Fragment>
  );
}

export default Cart;
