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
      electorates: [],
      houses: [],
      politicians: []
    };

    this.fetchData();
  }

  fetchData() {
    xhr({ json: true, url: this.props.dataURL }, (err, response, body) => {
      if (!err) {
        this.setState({
          electorates: body[0],
          houses: body[1],
          politicians: body[2]
        });
      }
    });
  }

  getElectoratesForLevel(level) {
    return this.state.electorates.filter(electorate => electorate.electorate_level === level);
  }

  render() {
    return (
      <div className={styles.root}>
        <National
          electorate={this.getElectoratesForLevel('national')[0]}
          reps={this.state.houses[0]}
          senate={this.state.houses[1]}
        />
        <States electorates={this.getElectoratesForLevel('state')} />
        <Divisions electorates={this.getElectoratesForLevel('division')} />
      </div>
    );
  }
}

App.propTypes = {
  dataURL: PropTypes.string.isRequired
};

module.exports = App;
