'use client'

import * as React from 'react';

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import { Box, Button, CssBaseline, Grid, Step, StepLabel, Stepper, Backdrop, CircularProgress, Typography } from '@mui/material';
import Cart from '@/component/Cart';
import Product from '@/component/Product';

import iProductResponse from '@/model/response/productResponse';

import AppTheme from '@/shared-theme/AppTheme';
import ColorModeIconDropdown from '@/shared-theme/ColorModeIconDropdown';

import stockService from '@/service/stockService';
import iStockResponse from '@/model/response/stockResponse';

interface iHome {
  props: any
}

export default function Home({ props }: iHome) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const [products, setProducts] = React.useState<Array<iProductResponse>>([]);
  const [stocks, setStocks] = React.useState<Array<iStockResponse>>([]);

  const [isCheckOut, setIsCheckOut] = React.useState<boolean>(false);
  // const [activeStep, setActiveStep] = React.useState<number>(0);
  // const [selectedProducts, setSelectedProdusts] = React.useState<iProductResponse>();

  React.useEffect(() => {
    getStock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isCheckOut) {
      getStock();
    }
  }, [isCheckOut])

  const getStock = async () => {
    try {
      setLoading(true);
      const res = await stockService.getStock();
      if (res.isSuccess) {
        setStocks(res.data);
        setIsCheckOut(false);
      }
    }
    catch (e: any) {
      console.log(e.message);
      // showError(e.message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
        <ColorModeIconDropdown />
      </Box>
      <Grid
        container
        sx={{
          height: {
            xs: '100%',
            sm: 'calc(100dvh - var(--template-frame-height, 0px))',
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        <Grid
          size={{ sm: 12, md: 5, lg: 4 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'start',
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4 },
          }}
        >
          <Product products={products} setLoading={setLoading} setProducts={setProducts} key={'comp-product'} />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 4, lg: 5 }}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            alignItems: 'start',
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: 500,
            }}
          >
            <Cart products={products} setProducts={setProducts} setCheckOut={setIsCheckOut} setLoading={setLoading} />
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 3, lg: 3 }}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            alignItems: 'start',
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: 500,
            }}
          >
            <Grid container direction={'row'} justifyContent={'flex-start'} alignItems={'center'} spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant='h5' component={'div'} width={'100%'} >Stock สินค้า</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                {
                  stocks.map((x: iStockResponse, i: number) => (
                    <Typography key={'st-' + i} variant='body1' component={'p'} width={'100%'} mt={2} >{x.productName}&nbsp;&nbsp;&nbsp;คงเหลือ&nbsp;{x.stock}&nbsp;ชิ้น</Typography>
                  ))
                }
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </AppTheme>


  );
}
