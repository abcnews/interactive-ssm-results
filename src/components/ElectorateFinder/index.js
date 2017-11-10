const debounce = require('debounce');
const loadScript = require('load-script');
const React = require('react');
const PropTypes = require('prop-types');
const unique = require('array-unique');
const xhr = require('xhr');

const styles = require('./styles.scss');

const FIND_DEBOUNCE_PERIOD = 500;
const LEAFLET_SRC = 'https://unpkg.com/leaflet@1.2.0/dist/leaflet.js';
const LEAFLET_UNDERNEATH_SRC = 'https://unpkg.com/leaflet-underneath@3.0.0/dist/leaflet-underneath.js';
const MAPBOX_TOKEN = 'pk.eyJ1IjoibmV3cy1vbjFpbmUiLCJhIjoiR3FlZFZlVSJ9._30EFE9XYhQitqf4gzRG-';
const MAPBOX_GEOCODING_URL_ROOT = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const cache = {};

class ElectorateFinder extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: [] };

    this.getInputRef = this.getInputRef.bind(this);
    this.getMapRef = this.getMapRef.bind(this);
    this.init = this.init.bind(this);
    this.find = debounce(this.find.bind(this), FIND_DEBOUNCE_PERIOD);
    this.pick = this.pick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  clearInput() {
    this.inputEl.value = '';
  }

  clearResults() {
    this.setState({ results: [] });
  }

  init() {
    if (this.map) {
      return;
    }

    loadDependencies(() => {
      this.map = L.map(this.mapEl);
      // this.mapCenter =
    });
  }

  find(event) {
    const query = event.target.value;

    if (query.length < 3) {
      return;
    }

    let results;

    if ((results = this.findByName(query)).length) {
      return this.setState({ results });
    }

    if ((results = this.findByMP(query)).length) {
      return this.setState({ results });
    }

    if (query == +query) {
      return this.findByPostcode(query, (error, results) => this.setState({ results: results || [] }));
    }

    this.findByAddress(query, (error, results) => this.setState({ results: results || [] }));
  }

  findByAddress(query, cb) {
    return []; // TODO: Geocoding
  }

  findByName(query) {
    return this.findInList(query, this.props.electorates, 'electorate_name');
  }

  findByMP(query) {
    return this.findInList(query, this.props.mps, 'politician_name');
  }

  findByPostcode(query, cb) {
    return []; // TODO: Geocoding
  }

  findInList(query, list, key) {
    const _query = query.toLowerCase();

    return unique(
      list
        .reduce((memo, item) => {
          if (item[key].toLowerCase().substr(0, query.length) !== _query) {
            return memo;
          }

          return memo.concat([item.electorate_id]);
        }, [])
        .sort()
    );
  }

  getInputRef(el) {
    this.inputEl = el;
  }

  getMapRef(el) {
    this.mapEl = el;
  }

  onInputChange(event) {
    event.persist();

    this.clearResults();
    this.find(event);
  }

  pick(event) {
    this.props.onElectorateChosen(event.currentTarget.dataset.electorate);
    this.clearInput();
    this.clearResults();
  }

  render() {
    return (
      <div className={styles.root}>
        <div ref={this.getMapRef} className={styles.map} hidden />
        <input
          ref={this.getInputRef}
          className={styles.input}
          type="text"
          autoComplete="off"
          placeholder="Enter your address, electorate, or MP"
          onFocus={this.init}
          onChange={this.onInputChange}
        />
        {this.state.results.length ? (
          <div className={styles.results}>
            {this.state.results.map(result => {
              const electorate = this.props.electorates.filter(x => x.electorate_id === result)[0];

              return (
                electorate && (
                  <button className={styles.result} key={result} data-electorate={result} onClick={this.pick}>
                    {electorate.electorate_name}
                    {' - '}
                    <small>{electorate.state_name}</small>
                  </button>
                )
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

ElectorateFinder.propTypes = {
  electorates: PropTypes.arrayOf(PropTypes.object),
  mps: PropTypes.arrayOf(PropTypes.object),
  onElectorateChosen: PropTypes.func
};

ElectorateFinder.defaultProps = {
  electorates: [],
  mps: [],
  onElectorateChosen: electorate => console.debug(`Electorate chosen: ${electorate}`)
};

let isLoaded;

const loadDependencies = cb => {
  if (isLoaded) {
    return cb();
  }

  loadScript(LEAFLET_SRC, () => {
    loadScript(LEAFLET_UNDERNEATH_SRC, () => {
      isLoaded = true;
      cb();
    });
  });
};

module.exports = ElectorateFinder;
