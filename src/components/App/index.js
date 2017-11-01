const PropTypes = require('prop-types');
const React = require('react');
const xhr = require('xhr');
const Bar = require('../Bar');
const Card = require('../Card');
const Integer = require('../Integer');
const Percentage = require('../Percentage');
const Sides = require('../Sides');
const styles = require('./styles.scss');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '██████████',
      yes: 1,
      no: 1
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
          <Bar value={this.state.yes / (this.state.yes + this.state.no)} large />
          <Sides>
            <div>
              <Percentage value={this.state.yes / (this.state.yes + this.state.no)} yes large />
              <Integer value={this.state.yes} units="votes" yes large />
            </div>
            <div>
              <Percentage value={this.state.no / (this.state.yes + this.state.no)} no large />
              <Integer value={this.state.no} units="votes" no large />
            </div>
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
