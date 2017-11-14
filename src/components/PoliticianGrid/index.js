const classNames = require('classnames/bind');
const PropTypes = require('prop-types');
const React = require('react');
const Politician = require('../Politician');
const styles = require('./styles.scss');

const cx = classNames.bind(styles);

const PoliticianGrid = ({ politicians }) => (
  <div className={cx('root', { odd: politicians.length % 2 })}>
    {politicians.map((politician, index) => <Politician key={index} politician={politician} />)}
  </div>
);

PoliticianGrid.propTypes = {
  politicians: PropTypes.arrayOf(PropTypes.object)
};

PoliticianGrid.defaultProps = {
  politicians: [Politician.defaultProps]
};

module.exports = PoliticianGrid;
