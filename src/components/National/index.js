const PropTypes = require('prop-types');
const React = require('react');
const { shareText } = require('../../util');
const Card = require('../Card');
const Count = require('../Count');
const Share = require('../Share');
const Text = require('../Text');
const Turnout = require('../Turnout');

const National = ({ result, electorate, house, senate }) =>
  electorate && (
    <Card
      key={electorate.electorate_id}
      id={electorate.electorate_id}
      top={[
        <Text key="heading" heading={4} headingStyle={3} nomargin>
          {electorate.electorate_name}
        </Text>,
        <Count key="count" electorate={electorate} bar integer large percentage units={'votes'} />,
        <Share
          key="share"
          target={electorate.electorate_id}
          text={shareText('Australia', electorate.response_yes_percentage)}
        />
      ]}
      bottom={[
        <Turnout key="turnout" electorate={electorate} />,
        <Text key="heading-next" heading={4} align="center">
          So what happens next?
        </Text>
      ].concat(
        result === 'y'
          ? [
              <Text key="text-result-yes-pre" todo>
                [TODO: Stuff about what we think will happen in parliament due to Yes result.]
              </Text>,
              <Text key="heading-house" heading={5} headingStyle={4} nomargin>
                {house.house_name}
              </Text>,
              <Count key="count-house" electorate={house} bar integer percentage prediction units={'members'} />,
              <br key="break" />,
              <Text key="heading-senate" heading={5} headingStyle={4} nomargin>
                {senate.house_name}
              </Text>,
              <Count key="count-senate" electorate={senate} bar integer percentage prediction units={'members'} />,
              <Text key="text-result-yes-post">
                [TODO: More stuff about what we think will happen in parliament due to Yes result.]
              </Text>
            ]
          : [
              <Text key="text-result-no" todo>
                Stuff about what we think will happen in parliament due to No result. There is such a lot of talk going
                around about branding, but how do you use it to help you reach more people and market your products or
                services?
              </Text>
            ]
      )}
    />
  );

National.propTypes = {
  result: PropTypes.string,
  electorate: PropTypes.object,
  house: PropTypes.object,
  senate: PropTypes.object
};

National.defaultProps = {
  result: '',
  electorate: null,
  house: {},
  senate: {}
};

module.exports = National;
