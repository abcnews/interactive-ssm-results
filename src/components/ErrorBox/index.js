const React = require('react');
const styles = require('./styles.css').default;

class ErrorBox extends React.Component {
  componentDidMount() {
    console.error(this.props.error);
  }

  render() {
    return <pre className={styles.root}>{this.props.error.stack}</pre>;
  }
}

module.exports = ErrorBox;
