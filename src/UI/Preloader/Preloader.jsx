import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from 'prop-types';

export const Preloader = ({ color, size }) =>
  <ClipLoader
    color={color}
    cssOverride={{ display: 'block', margin: 'auto' }}
    size={size}
  />;

Preloader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};
