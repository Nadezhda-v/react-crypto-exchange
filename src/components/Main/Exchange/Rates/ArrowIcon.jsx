import PropTypes from 'prop-types';

export const ArrowIcon = ({ change }) => (
  change !== 0 && change > 0 ?
    (<svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 0.5L8.39711 6.5H0.602886L4.5 0.5Z" fill="#00FFA3" ></path>
    </svg>
    ) : (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 6.5L0.602886 0.5H8.39711L4.5 6.5Z" fill="red"></path>
    </svg>
    )
);

ArrowIcon.propTypes = {
  change: PropTypes.number,
};
