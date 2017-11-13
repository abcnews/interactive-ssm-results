const classNames = require('classnames/bind');
const PropTypes = require('prop-types');
const React = require('react');
// const Text = require('../Text');
const styles = require('./styles.scss');

const cx = classNames.bind(styles);

const Politician = ({ politician }) => ([
  <div className={styles.root}>
    <div>{politician.politician_name}</div>
    <div className={cx('party', politician.party_code )}>{politician.party_name}</div>
    <div className={cx('vote', politician.vote_id )}>{politician.vote_name}</div>
  </div>
]);

Politician.propTypes = {
  politician: PropTypes.object
};

Politician.defaultProps = {
  politician: []
};

module.exports = Politician;
