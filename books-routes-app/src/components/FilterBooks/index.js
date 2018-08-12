import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  searchTermChanged,
  selectedCountriesChanged,
  selectedLanguagesChanged,
  loadCountriesLanguages
} from "../../actions/booksActions";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class FilterBooks extends Component {
  static propTypes = {
    searchTerm: PropTypes.string,
    searchTermChanged: PropTypes.func.isRequired,
    selectedCountriesChanged: PropTypes.func.isRequired,
    selectedLanguagesChanged: PropTypes.func.isRequired,
    loadCountriesLanguages: PropTypes.func.isRequired,
    countries: PropTypes.array,
    selectedCountries: PropTypes.array,
    languages: PropTypes.array,
    selectedLanguages: PropTypes.array,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
  };
  componentDidMount() {
    const { loading, loaded, loadCountriesLanguages } = this.props;
    if (!loading && !loaded) loadCountriesLanguages();
  }
  render() {
    const {
      searchTerm,
      searchTermChanged,
      selectedCountriesChanged,
      selectedLanguagesChanged,
      selectedCountries,
      selectedLanguages,
      languages,
      countries,
      loading,
      error
    } = this.props;

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        <TextField
          id="search"
          label="Искать книгу..."
          type="search"
          margin="normal"
          helperText="по названию или автору"
          value={searchTerm}
          onChange={e => searchTermChanged(e.target.value)}
          style={{ margin: "0 10px 25px", maxWidth: 700 }}
          fullWidth
        />
        {!error && (
          <div>
            <FormControl
              disabled={loading}
              style={{
                margin: "0 10px 25px",
                minWidth: 120,
                maxWidth: 300
              }}
            >
              <InputLabel htmlFor="select-multiple-checkbox">Страна</InputLabel>
              <Select
                multiple
                value={selectedCountries}
                onChange={e => selectedCountriesChanged(e.target.value)}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {countries.map(country => (
                  <MenuItem key={country.ru_name} value={country.ru_name}>
                    <Checkbox
                      checked={selectedCountries.indexOf(country.ru_name) > -1}
                    />
                    <ListItemText primary={country.ru_name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              disabled={loading}
              style={{
                margin: "0 10px 25px",
                minWidth: 120,
                maxWidth: 300
              }}
            >
              <InputLabel htmlFor="select-multiple-checkbox">Язык</InputLabel>
              <Select
                multiple
                value={selectedLanguages}
                onChange={e => selectedLanguagesChanged(e.target.value)}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {languages.map(language => (
                  <MenuItem key={language.ru_name} value={language.ru_name}>
                    <Checkbox
                      checked={selectedLanguages.indexOf(language.ru_name) > -1}
                    />
                    <ListItemText primary={language.ru_name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </div>
    );
  }
}
export default connect(
  state => {
    return {
      searchTerm: state.get("filters").searchTerm,
      selectedCountries: state.get("filters").selectedCountries,
      selectedLanguages: state.get("filters").selectedLanguages,
      languages: state.get("filters").languages,
      countries: state.get("filters").countries,
      loading: state.get("filters").loading,
      loaded: state.get("filters").loaded,
      error: state.get("filters").error
    };
  },
  {
    searchTermChanged,
    selectedCountriesChanged,
    selectedLanguagesChanged,
    loadCountriesLanguages
  }
)(FilterBooks);
