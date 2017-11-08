const PropTypes = require('prop-types');
const React = require('react');
const xhr = require('xhr');
const Card = require('../Card');
const National = require('../National');
const Result = require('../Result');
const Share = require('../Share');
const States = require('../States');
const Text = require('../Text');
const Turnout = require('../Turnout');
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
        {this.getElectoratesForLevel('division').map(electorate => (
          <Card
            key={electorate.electorate_id}
            id={electorate.electorate_id}
            top={[
              <Text key="heading" heading={4} nomargin>
                {electorate.electorate_name}
                <small>{electorate.state_name}</small>
              </Text>,
              <Result key="result" electorate={electorate} bar percentage />
            ]}
            bottom={[
              <Result key="result" electorate={electorate} integer />,
              <Share key="share" target={electorate.electorate_id} />,
              <Turnout key="turnout" electorate={electorate} />
            ]}
          />
        ))}
      </div>
    );
  }
}

App.propTypes = {
  dataURL: PropTypes.string.isRequired
};

module.exports = App;
