const classNames = require('classnames/bind');
const debounce = require('debounce');
const loadScript = require('load-script');
const React = require('react');
const PropTypes = require('prop-types');
const unique = require('array-unique');
const xhr = require('xhr');
const styles = require('./styles.scss');

const cx = classNames.bind(styles);

const DEBOUNCE_PERIOD = 500;
const ELECTORATE_PROPERTY = 'Elect_div';
const JS_LEAFLET = 'https://unpkg.com/leaflet@1.2.0/dist/leaflet.js';
const JS_LEAFLET_UNDERNEATH = 'https://unpkg.com/leaflet-underneath@3.0.0/dist/leaflet-underneath.js';
const LEAFLET_LAT_LNG = { lat: -35.3082, lng: 149.1244 };
const LEAFLET_ZOOM = 11;
const LEAFLET_UNDERNEATH_DEFAULT_RADIUS = 1;
const LEAFLET_UNDERNEATH_FEATURE_ID = feature => feature.properties[ELECTORATE_PROPERTY];
const LEAFLET_UNDERNEATH_LAYERS = ['ssm-2017-electorates-ao2dkw'];
const LEAFLET_UNDERNEATH_QUERY_OPTIONS = { onlyInside: true };
const LEAFLET_UNDERNEATH_SUBDOMAINS = ['a', 'b', 'c', 'd'];
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibmV3cy1vbjFpbmUiLCJhIjoiR3FlZFZlVSJ9._30EFE9XYhQitqf4gzRG-g';
const MAPBOX_GEOCODING_TYPES_ADDRESS = 'address,neighborhood,locality,place';
const MAPBOX_GEOCODING_TYPES_POSTCODE = 'postcode';
const MAPBOX_GEOCODING_URL_ROOT = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const MAPBOX_TILE_URL = `https://{s}.tiles.mapbox.com/v4/news-on1ine.1o3dijei/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`;
const MAX_RESULTS = 3;

// Proof of concept by Andrew: https://jsfiddle.net/ak22/a2p3vsgm/5/

class ElectorateFinder extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: [] };

    this.clearAll = this.clearAll.bind(this);
    this.getInputRef = this.getInputRef.bind(this);
    this.getMapRef = this.getMapRef.bind(this);
    this.init = this.init.bind(this);
    this.find = debounce(this.find.bind(this), DEBOUNCE_PERIOD);
    this.pick = this.pick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  clearAll(event) {
    this.clearInput();
    this.clearResults();

    if (event) {
      this.inputEl.focus();
    }
  }

  clearInput() {
    this.inputEl.value = '';
  }

  clearResults() {
    this.setState({ results: [] });
  }

  electorateAtLatLng(latLng, cb) {
    this.underneath.query(
      latLng,
      (err, results) => {
        if (err || !results.length) {
          return cb();
        }

        cb(electorateIdFromName(results[0].properties[ELECTORATE_PROPERTY]));
      },
      null,
      LEAFLET_UNDERNEATH_QUERY_OPTIONS
    );
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
      return this.findByPostcode(query, results => this.setState({ results }));
    }

    this.findByAddress(query, results => this.setState({ results }));
  }

  findByAddress(query, cb) {
    this.findRemote(query, MAPBOX_GEOCODING_TYPES_ADDRESS, cb);
  }

  findByName(query) {
    return this.findLocal(query, this.props.electorates, 'electorate_name');
  }

  findByMP(query) {
    return this.findLocal(query, this.props.mps, 'politician_name');
  }

  findByPostcode(query, cb) {
    this.findRemote(query, MAPBOX_GEOCODING_TYPES_POSTCODE, cb);
  }

  findLocal(query, list, key) {
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
        .filter((result, index) => index < MAX_RESULTS)
    );
  }

  findRemote(query, types, cb) {
    fetchJSON(
      `${MAPBOX_GEOCODING_URL_ROOT}${encodeURIComponent(query)}.json?access_token=${encodeURIComponent(
        MAPBOX_ACCESS_TOKEN
      )}&country=au&types=${encodeURIComponent(types)}`,
      data => {
        if (!data || !data.features.length) {
          return;
        }

        const results = [];
        let numChecked = 0;

        data.features.filter((feature, index) => index < MAX_RESULTS).forEach(feature => {
          this.electorateAtLatLng(
            L.latLng({
              lat: feature.center[1],
              lng: feature.center[0]
            }),
            result => {
              numChecked++;

              if (result) {
                results.push(result);
              }

              if (numChecked === Math.min(data.features.length, MAX_RESULTS)) {
                cb(unique(results));
              }
            }
          );
        });
      }
    );
  }

  getInputRef(el) {
    this.inputEl = el;
  }

  getMapRef(el) {
    this.mapEl = el;
  }

  init() {
    if (this.hasMap) {
      return;
    }

    loadDependencies(() => {
      this.map = L.map(this.mapEl);
      this.map.on('load', () => (this.hasMap = true));
      this.map.setView(L.latLng(LEAFLET_LAT_LNG), LEAFLET_ZOOM);
      this.underneath = L.underneath(MAPBOX_TILE_URL, this.map, {
        featureId: LEAFLET_UNDERNEATH_FEATURE_ID,
        defaultRadius: LEAFLET_UNDERNEATH_DEFAULT_RADIUS,
        layers: LEAFLET_UNDERNEATH_LAYERS,
        subdomains: LEAFLET_UNDERNEATH_SUBDOMAINS
      });
    });
  }

  onInputChange(event) {
    event.persist();

    this.clearResults();
    this.find(event);
  }

  pick(event) {
    this.props.onElectorateChosen(event.currentTarget.dataset.electorate);
    this.clearAll();
  }

  render() {
    return (
      <div className={styles.root}>
        <div ref={this.getMapRef} className={styles.map} hidden />
        <div className={cx('inner', { open: this.state.results.length })}>
          <div className={styles.search}>
            <input
              ref={this.getInputRef}
              className={styles.input}
              type="text"
              autoComplete="off"
              placeholder="Enter your address, electorate, or MP"
              onFocus={this.init}
              onChange={this.onInputChange}
            />
            <button className={styles.clear} onClick={this.clearAll} />
          </div>
          {this.state.results.length ? (
            <div className={styles.results}>
              {this.state.results.map(result => {
                const electorate = this.props.electorates.filter(x => x.electorate_id === result)[0];

                return (
                  electorate && (
                    <button className={styles.result} key={result} data-electorate={result} onClick={this.pick}>
                      {electorate.electorate_name}
                      <small>{electorate.state_name}</small>
                    </button>
                  )
                );
              })}
            </div>
          ) : null}
        </div>
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

const electorateIdFromName = name => name.toLowerCase().replace(/[^a-z]/g, '');

const cachedJSON = {};

const fetchJSON = (url, cb) => {
  if (cachedJSON[url]) {
    return cb(cachedJSON[url]);
  }

  xhr(
    {
      json: true,
      url
    },
    (err, response, body) => {
      if (err) {
        return cb();
      }

      if (!cachedJSON[url]) {
        cachedJSON[url] = body;
      }

      cb(cachedJSON[url]);
    }
  );
};

let areDependenciesLoaded;

const loadDependencies = cb =>
  areDependenciesLoaded
    ? cb()
    : loadScript(JS_LEAFLET, () => {
        loadScript(JS_LEAFLET_UNDERNEATH, () => {
          areDependenciesLoaded = true;
          cb();
        });
      });

module.exports = ElectorateFinder;
