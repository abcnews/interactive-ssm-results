const PropTypes = require('prop-types');
const React = require('react');
const xhr = require('xhr');
const Divisions = require('../Divisions');
const National = require('../National');
const States = require('../States');
const styles = require('./styles.scss');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      national: {},
      states: [],
      divisions: [],
      house: {},
      senate: {},
      politicians: []
    };

    this.fetchData();
  }

  fetchData() {
    xhr({ json: true, url: this.props.dataURL }, (err, response, body) => {
      if (!err) {
        this.setState({
          national: body[0].filter(x => x.electorate_level === 'national')[0],
          states: body[0].filter(x => x.electorate_level === 'state'),
          divisions: body[0].filter(x => x.electorate_level === 'division'),
          house: body[1][0],
          senate: body[1][1],
          politicians: body[2]
        });
      }
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <National electorate={this.state.national} house={this.state.house} senate={this.state.senate} />
        <States electorates={this.state.states} />
        <Divisions electorates={this.state.divisions} />
      </div>
    );
  }
}

App.propTypes = {
  dataURL: PropTypes.string.isRequired
};

module.exports = App;
