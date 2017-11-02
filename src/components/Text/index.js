const classNames = require('classnames/bind');
const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./styles.scss');

const cx = classNames.bind(styles);

const Text = ({ heading, headingStyle, align, nomargin, children }) =>
  React.createElement(
    heading ? `h${heading}` : 'p',
    {
      className: cx({
        [`h${headingStyle || heading || '_'}`]: heading,
        p: !heading,
        [align]: align,
        nomargin
      })
    },
    children
  );

Text.propTypes = {
  heading: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  headingStyle: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  align: PropTypes.oneOf('left', 'right', 'center'),
  nomargin: PropTypes.bool
};

Text.defaultProps = {
  heading: null,
  headingStyle: null,
  align: '',
  nomargin: false
};

module.exports = Text;
