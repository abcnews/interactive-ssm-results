const PropTypes = require('prop-types');
const React = require('react');
const xhr = require('xhr');
const { adjective } = require('../../util');
const Abbreviation = require('../Abbreviation');
const Card = require('../Card');
const CardGrid = require('../CardGrid');
const Result = require('../Result');
const Share = require('../Share');
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
        {this.getElectoratesForLevel('national').map(electorate => (
          <Card
            key={electorate.electorate_id}
            id={electorate.electorate_id}
            top={[
              <Text key="heading" heading={4} headingStyle={3} nomargin>
                {electorate.electorate_name}
              </Text>,
              <Result key="result" electorate={electorate} bar integer large percentage />,
              <Share key="share" target={electorate.electorate_id} />
            ]}
            bottom={[
              <Turnout key="turnout" electorate={electorate} />,
              <Text key="heading-next" heading={4} align="center">
                So what happens next?
              </Text>,
              <Text key="text-next-a" todo>
                Stuff about what we think will happen in parliament. There is such a lot of talk going around about
                branding, but how do you use it to help you reach more people and market your products or services?
              </Text>,
              <Text key="heading-reps" heading={5} headingStyle={4} nomargin>
                {this.state.houses[0].house_name}
              </Text>,
              <Result
                key="result-reps"
                electorate={this.state.houses[0]}
                bar
                integer
                percentage
                prediction
                units={'members'}
              />,
              <br key="break" />,
              <Text key="heading-senate" heading={5} headingStyle={4} nomargin>
                {this.state.houses[1].house_name}
              </Text>,
              <Result
                key="result-senate"
                electorate={this.state.houses[1]}
                bar
                integer
                percentage
                prediction
                units={'members'}
              />,
              <Text key="text-next-b" todo>
                More stuff about what we think will happen in parliament. There is such a lot of talk going around about
                branding, but how do you use it to help you reach more people and market your products or services?
              </Text>
            ]}
          />
        ))}
        <CardGrid
          cards={this.getElectoratesForLevel('state').map(electorate => ({
            id: electorate.electorate_id,
            top: [
              <Text key="heading" heading={4} nomargin>
                <Abbreviation title={electorate.electorate_name}>{electorate.electorate_name_short}</Abbreviation>
              </Text>,
              <Result key="result" electorate={electorate} bar percentage />
            ],
            middle: <Result electorate={electorate} integer />,
            bottom: [
              <Share key="share" target={electorate.electorate_id} />,
              <Turnout key="turnout" electorate={electorate} />,
              <Text key="heading" heading={4} align="center">
                {`Which ${adjective(electorate.electorate_name)} senators are likely to support same-sex marriage?`}
              </Text>
            ]
          }))}
        />
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
