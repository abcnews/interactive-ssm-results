const PropTypes = require('prop-types');
const React = require('react');
const Bar = require('../Bar');
const Integer = require('../Integer');
const Percentage = require('../Percentage');
const Sides = require('../Sides');

const Result = ({ electorate, bar, prediction, percentage, integer, large, units }) => (
  <div>
    {bar && <Bar value={electorate.response_yes_percentage} large={large} prediction={prediction} />}
    {(percentage || integer) && (
      <Sides>
        <div>
          {percentage && <Percentage value={electorate.response_yes_percentage} yes large={large} />}
          {integer && <Integer value={electorate.response_yes_count} units={units} yes large={large} />}
        </div>
        <div>
          {percentage && <Percentage value={electorate.response_no_percentage} no large={large} />}
          {integer && <Integer value={electorate.response_no_count} units={units} no large={large} />}
        </div>
      </Sides>
    )}
  </div>
);

Result.propTypes = {
  electorate: PropTypes.object.isRequired,
  large: PropTypes.bool,
  bar: PropTypes.bool,
  prediction: PropTypes.bool,
  percentage: PropTypes.bool,
  integer: PropTypes.bool,
  units: PropTypes.string
};

Result.defaultProps = {
  electorate: {},
  large: false,
  bar: false,
  prediction: false,
  percentage: false,
  integer: false,
  units: 'votes'
};

module.exports = Result;
