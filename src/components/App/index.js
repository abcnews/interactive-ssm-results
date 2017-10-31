const PropTypes = require('prop-types');
const React = require('react');
const xhr = require('xhr');
const styles = require('./styles.scss');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '██████████'
    };

    this.fetchData();
  }

  fetchData() {
    xhr({ json: true, url: this.props.dataURL }, (err, response, body) => {
      if (!err) {
        this.setState(body);
      }
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <h1>{this.state.title}</h1>
      </div>
    );
  }
}

App.propTypes = {
  dataURL: PropTypes.string.isRequired
};

module.exports = App;
