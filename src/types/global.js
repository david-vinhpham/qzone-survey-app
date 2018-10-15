import PropTypes from 'prop-types';

export const historyType = PropTypes.objectOf(PropTypes.oneOfType([
  PropTypes.object, PropTypes.number, PropTypes.string, PropTypes.func,
]));

export const locationType = PropTypes.objectOf(PropTypes.oneOfType([
  PropTypes.object, PropTypes.string,
]));

export const classesType = PropTypes.objectOf(PropTypes.string);

export const routesType = PropTypes.arrayOf(PropTypes.object);

export const matchType = PropTypes.objectOf(PropTypes.oneOfType([
  PropTypes.object, PropTypes.string, PropTypes.bool,
]));
