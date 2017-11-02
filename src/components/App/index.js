const PropTypes = require('prop-types');
const React = require('react');
const xhr = require('xhr');
const Bar = require('../Bar');
const Card = require('../Card');
const Integer = require('../Integer');
const Percentage = require('../Percentage');
const Sides = require('../Sides');
const Text = require('../Text');
const WaffleGrid = require('../WaffleGrid');
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
          <Text heading={4} headingStyle={3} nomargin>
            {this.state.title}
          </Text>
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
          <Text heading={4} align={'center'}>
            Who returned their ballot?
          </Text>
          <WaffleGrid
            waffles={[
              { label: 'Yes', value: this.state.yes, total: this.state.yes + this.state.no },
              { label: 'No', value: this.state.no, total: this.state.yes + this.state.no },
              { label: 'Yes', value: this.state.yes, total: this.state.yes + this.state.no },
              { label: 'No', value: this.state.no, total: this.state.yes + this.state.no },
              { label: 'Yes', value: this.state.yes, total: this.state.yes + this.state.no },
              { label: 'No', value: this.state.no, total: this.state.yes + this.state.no },
              { label: 'Yes', value: this.state.yes, total: this.state.yes + this.state.no },
              { label: 'No', value: this.state.no, total: this.state.yes + this.state.no },
              { label: 'Yes', value: this.state.yes, total: this.state.yes + this.state.no }
            ]}
          />
          <Text>
            Stuff about what we think will happen in parliament. There is such a lot of talk going around about
            branding, but how do you use it to help you reach more people and market your products or services?
          </Text>
        </Card>
      </div>
    );
  }
}

App.propTypes = {
  dataURL: PropTypes.string.isRequired
};

module.exports = App;
