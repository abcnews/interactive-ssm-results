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
      result: null,
      national: null,
      states: [],
      divisions: [],
      house: null,
      senate: null,
      politicians: []
    };

    this.fetchData();
  }

  fetchData() {
    xhr({ json: true, url: this.props.dataURL }, (err, response, body) => {
      if (!err) {
        const national = body[0].filter(x => x.electorate_level === 'national')[0];

        this.setState({
          result: national.result,
          national,
          states: body[0].filter(x => x.electorate_level === 'state'),
          divisions: body[0].filter(x => x.electorate_level === 'division'),
          house: body[1][0],
          senate: body[1][1],
          mps: body[2].filter(x => x.house_id === 'r'),
          senators: body[2].filter(x => x.house_id === 's')
        });
      }
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <National
          result={this.state.result}
          electorate={this.state.national}
          house={this.state.house}
          senate={this.state.senate}
        />
        <States result={this.state.result} electorates={this.state.states} senators={this.state.senators} />
        <Divisions result={this.state.result} electorates={this.state.divisions} mps={this.state.mps} />
      </div>
    );
  }
}

App.propTypes = {
  dataURL: PropTypes.string.isRequired
};

module.exports = App;
