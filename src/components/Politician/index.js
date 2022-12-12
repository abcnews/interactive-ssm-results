const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./styles.scss').default;

const Politician = ({ politician }) => [
  <div key={politician.politician_name} className={styles.root}>
    <div>{politician.politician_name}</div>
    <div className={styles.party}>{politician.party_name}</div>
    <div className={`${styles.vote} ${styles[politician.vote_id]}`}>
      {politician.vote_name_override || politician.vote_name}
    </div>
  </div>,
];

Politician.propTypes = {
  politician: PropTypes.object,
};

Politician.defaultProps = {
  politician: [],
};

module.exports = Politician;
