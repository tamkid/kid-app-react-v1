import { Box } from '@mui/system';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ListPage from './pages/ListPage';

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box mt={2}>
      <Switch>
        <Route path={match.url} exact component={ListPage} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
