const PropTypes = require('prop-types');
const React = require('react');
const xhr = require('xhr');
const Bar = require('../Bar');
const Card = require('../Card');
const Sides = require('../Sides');
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
        <Card>
          <h4>{this.state.title}</h4>
          <Bar value={this.state.value} large />
          <Sides>
            <div>Left</div>
            <div>Right</div>
          </Sides>
        </Card>
      </div>
    );
  }
}

App.propTypes = {
  dataURL: PropTypes.string.isRequired
};

module.exports = App;
