const PropTypes = require('prop-types');
const React = require('react');
const xhr = require('xhr');
const Bar = require('../Bar');
const Card = require('../Card');
const CardGrid = require('../CardGrid');
const Integer = require('../Integer');
const Percentage = require('../Percentage');
const Share = require('../Share');
const Sides = require('../Sides');
const Text = require('../Text');
const WaffleGrid = require('../WaffleGrid');
const styles = require('./styles.scss');

const TEMP_YES = 6792673;
const TEMP_TURNOUT = 12350315;
const TEMP_ELIGIBLE = 16039370;

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

  renderVotes(electorate, { bar = true, percentage = true, integer = true, large = false }) {
    return (
      <div>
        {bar && <Bar value={TEMP_YES / TEMP_TURNOUT} large={large} />}
        <Sides>
          <div>
            {percentage && <Percentage value={TEMP_YES / TEMP_TURNOUT} yes large={large} />}
            {integer && <Integer value={TEMP_YES} units="votes" yes large={large} />}
          </div>
          <div>
            {percentage && <Percentage value={(TEMP_TURNOUT - TEMP_YES) / TEMP_TURNOUT} no large={large} />}
            {integer && <Integer value={TEMP_TURNOUT - TEMP_YES} units="votes" no large={large} />}
          </div>
        </Sides>
      </div>
    );
  }

  renderTurnout(electorate) {
    return (
      <div>
        <Text heading={4} align={'center'}>
          Who returned their ballot?
        </Text>
        <WaffleGrid
          waffles={[
            { label: 'Total', value: TEMP_TURNOUT, total: TEMP_ELIGIBLE },
            {
              label: '18 - 24 yrs',
              value: electorate.turnout_18to24_count,
              total: electorate.turnout_18to24_eligible
            },
            {
              label: '25 - 34 yrs',
              value: electorate.turnout_25to34_count,
              total: electorate.turnout_25to34_eligible
            },
            {
              label: '35 - 44 yrs',
              value: electorate.turnout_35to44_count,
              total: electorate.turnout_35to44_eligible
            },
            {
              label: '45 - 54 yrs',
              value: electorate.turnout_45to54_count,
              total: electorate.turnout_45to54_eligible
            },
            {
              label: '55 - 64 yrs',
              value: electorate.turnout_55to64_count,
              total: electorate.turnout_55to64_eligible
            },
            {
              label: '65 + yrs',
              value: electorate.turnout_65plus_count,
              total: electorate.turnout_65plus_eligible
            }
          ]}
        />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.getElectoratesForLevel('national').map(electorate => (
          <Card
            key={electorate.electorate_id}
            id={electorate.electorate_id}
            top={
              <div>
                <Text heading={4} headingStyle={3} nomargin>
                  {electorate.electorate_name}
                </Text>
                {this.renderVotes(electorate, { large: true })}
                <Share target={electorate.electorate_id} />
              </div>
            }
            bottom={
              <div>
                {this.renderTurnout(electorate)}
                <Text>
                  Stuff about what we think will happen in parliament. There is such a lot of talk going around about
                  branding, but how do you use it to help you reach more people and market your products or services?
                </Text>
              </div>
            }
          />
        ))}
        <CardGrid
          cards={this.getElectoratesForLevel('state').map(electorate => ({
            id: electorate.electorate_id,
            top: (
              <div>
                <Text heading={4} nomargin>
                  {electorate.electorate_name}
                </Text>
                {this.renderVotes(electorate, { integer: false })}
              </div>
            ),
            middle: this.renderVotes(electorate, { bar: false, percentage: false }),
            bottom: (
              <div>
                <Share target={electorate.electorate_id} />
                {this.renderTurnout(electorate)}
                <Text>
                  Stuff about what we think will happen in parliament. There is such a lot of talk going around about
                  branding, but how do you use it to help you reach more people and market your products or services?
                </Text>
              </div>
            )
          }))}
        />
        {this.getElectoratesForLevel('division').map(electorate => (
          <Card
            key={electorate.electorate_id}
            id={electorate.electorate_id}
            top={
              <div>
                <Text heading={4} nomargin>
                  {electorate.electorate_name}
                </Text>
                {this.renderVotes(electorate, { integer: false })}
              </div>
            }
            bottom={
              <div>
                {this.renderVotes(electorate, { bar: false, percentage: false })}
                <Share target={electorate.electorate_id} />
                {this.renderTurnout(electorate)}
                <Text>
                  Stuff about what we think will happen in parliament. There is such a lot of talk going around about
                  branding, but how do you use it to help you reach more people and market your products or services?
                </Text>
              </div>
            }
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
