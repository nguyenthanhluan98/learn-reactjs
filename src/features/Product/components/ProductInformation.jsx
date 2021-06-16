import React from 'react';
import PropTypes from 'prop-types';

ProductInformation.propTypes = {};

function ProductInformation({ product }) {
  console.log({ product });

  return (
    <div>
      <p>{product.name}</p>
    </div>
  );
}

export default ProductInformation;
