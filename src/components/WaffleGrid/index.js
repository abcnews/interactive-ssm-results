const PropTypes = require('prop-types');
const React = require('react');
const Waffle = require('../Waffle');
const styles = require('./styles.scss');

const WaffleGrid = ({ waffles }) => (
  <div className={styles.root}>
    {waffles.map((waffle, index) => (
      <Waffle key={index} label={waffle.label} value={waffle.value} total={waffle.total} bold={!index} />
    ))}
  </div>
);

WaffleGrid.propTypes = {
  waffles: PropTypes.arrayOf(PropTypes.object)
};

WaffleGrid.defaultProps = {
  waffles: [Waffle.defaultProps]
};

module.exports = WaffleGrid;
