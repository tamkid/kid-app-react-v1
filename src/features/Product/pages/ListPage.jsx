import { Container, Grid, Pagination, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import productApi from '../../../api/productApi';
import ProductParams from '../../../constances/product-params';
import FilterViewer from '../components/Filters/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';
import SkeletonProductList from '../components/SkeletonProductList';
import queryString from 'query-string';

const useStyle = makeStyles((theme) => ({
  pagination: {
    marginTop: '30px',
    paddingBottom: '20px',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
  },
}));

function ListPage(props) {
  const classes = useStyle();

  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState(() => ({
    ...queryParams,
    _page: Number.parseInt(queryParams._page) || 1,
    _limit: Number.parseInt(queryParams._limit) || ProductParams.LIMIT_DEFAULT,
    _sort: queryParams._sort || 'salePrice:ASC',
  }));

  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    total: 10,
  });

  useEffect(() => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filter),
    });
  }, [history, filter]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filter);
        setProductList(data);
        setPagination(pagination);
        console.log('FETCH PRODUCTS', { data, pagination });
      } catch (error) {
        console.log('ERROR FETCH PRODUCTS', error);
      }
      setLoading(false);
    })();
  }, [filter]);

  const handlePageChange = (event, page) => {
    setFilter((prev) => ({
      ...prev,
      _page: page,
    }));
  };

  const handleChangeSort = (newSortValue) => {
    setFilter((prev) => ({
      ...prev,
      _sort: newSortValue,
      _page: 1,
    }));
  };

  const handleFiltersChange = (newFilters) => {
    const objNewFilters = {
      ...filter,
      ...newFilters,
    };

    // handle category
    if (Object.keys(objNewFilters).includes('category.id') && !objNewFilters['category.id']) {
      delete objNewFilters['category.id'];
    }

    // handle price
    if (
      Object.keys(objNewFilters).includes('salePrice_gte') &&
      Object.keys(objNewFilters).includes('salePrice_lte')
    ) {
      if (
        Number.parseInt(objNewFilters.salePrice_gte) === 0 &&
        Number.parseInt(objNewFilters.salePrice_lte) === 0
      ) {
        delete objNewFilters['salePrice_gte'];
        delete objNewFilters['salePrice_lte'];
      }
    }

    // handle service
    if (!objNewFilters['isPromotion']) delete objNewFilters['isPromotion'];
    if (!objNewFilters['isFreeShip']) delete objNewFilters['isFreeShip'];

    setFilter({
      ...objNewFilters,
      _page: 1,
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item sx={{ width: '250px' }}>
            <Paper elevation={0}>
              <ProductFilters currentFilters={filter} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <Paper elevation={0}>
              <ProductSort currentValue={filter._sort} onChange={handleChangeSort} />

              <FilterViewer filters={filter} onChange={handleFiltersChange} />

              {loading ? (
                <SkeletonProductList length={ProductParams.LIMIT_DEFAULT} />
              ) : (
                <ProductList data={productList} />
              )}
              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
