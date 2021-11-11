import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import { getCategories } from '../../categorySlice';

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    padding: 0,
    margin: '16px 0',
    listStyleType: 'none',

    '& > li': {
      padding: '0 8px',
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters, isFreeShip: !filters.isFreeShip };
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Khuyến mãi',
    isActive: () => true,
    isVisible: (filters) => Boolean(filters.isPromotion),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = {
        ...filters,
        isPromotion: !filters.isPromotion,
      };
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters) => {
      return (
        Object.keys(filters).includes('salePrice_gte') &&
        Object.keys(filters).includes('salePrice_lte') &&
        (Number(filters['salePrice_gte']) > 0 || Number(filters['salePrice_lte'] > 0))
      );
    },
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = {
        ...filters,
        salePrice_gte: 0,
        salePrice_lte: 0,
      };
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 4,
    getLabel: (filters, categories) => {
      return categories.find((o) => o.id === filters['category.id']).name;
    },
    isActive: () => true,
    isVisible: (filters) => Object.keys(filters).includes('category.id'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = {
        ...filters,
        'category.id': null,
      };
      return newFilters;
    },
    onToggle: () => {},
  },
];

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();
  const categories = useSelector(getCategories);

  const currentFilter = useMemo(() => {
    return FILTER_LIST.filter((o) => o.isVisible(filters));
  }, [filters]);

  return (
    <Box component="ul" className={classes.root}>
      {currentFilter.map((item) => (
        <li key={item.id}>
          <Chip
            label={item.getLabel(filters, categories)}
            color={item.isActive(filters) ? 'primary' : 'default'}
            clickable={!item.isRemovable}
            onClick={
              item.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = item.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              !item.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = item.onRemove(filters);
                    onChange(newFilters);
                  }
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
