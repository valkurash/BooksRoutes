import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  searchTermChanged,
  selectedCountriesChanged,
  selectedLanguagesChanged,
  loadCountriesLanguages,
  fetchBooks,
  showBooks
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
    fetchBooks: PropTypes.func.isRequired,
    showBooks: PropTypes.func.isRequired,
    countries: PropTypes.array,
    selectedCountries: PropTypes.array,
    languages: PropTypes.array,
    selectedLanguages: PropTypes.array,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    defaultPageSize: PropTypes.number.isRequired,
    existedQueries: PropTypes.array
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
      fetchBooks,
      showBooks,
      selectedCountries,
      selectedLanguages,
      languages,
      countries,
      loading,
      error,
      defaultPageSize,
      existedQueries
    } = this.props;

    const defaultQuery = `?page=1&pageSize=${defaultPageSize}`;
    const term = searchTerm ? `&searchTerm=${searchTerm}` : "";
    const country =
      selectedCountries && selectedCountries.length
        ? `&selectedCountries=${selectedCountries}`
        : "";
    const lang =
      selectedLanguages && selectedLanguages.length
        ? `&selectedLanguages=${selectedLanguages}`
        : "";

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
          onChange={e => {
            const newTerm = e.target.value
              ? `&searchTerm=${e.target.value}`
              : "";
            const filter = `${newTerm}${country}${lang}`;
            const q = `${defaultQuery}${filter}`;
            searchTermChanged(e.target.value);
            if (existedQueries.indexOf(q) > -1) {
              showBooks(q, filter);
            } else {
              fetchBooks(q, filter);
            }
          }}
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
                onChange={e => {
                  const newCountry =
                    e.target.value && e.target.value.length
                      ? `&selectedCountries=${e.target.value}`
                      : "";
                  const filter = `${term}${newCountry}${lang}`;
                  const q = `${defaultQuery}${filter}`;
                  selectedCountriesChanged(e.target.value);
                  if (existedQueries.indexOf(q) > -1) {
                    showBooks(q, filter);
                  } else {
                    fetchBooks(q, filter);
                  }
                }}
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
                onChange={e => {
                  const newLang =
                    e.target.value && e.target.value.length
                      ? `&selectedLanguages=${e.target.value}`
                      : "";
                  const filter = `${term}${country}${newLang}`;
                  const q = `${defaultQuery}${filter}`;
                  selectedLanguagesChanged(e.target.value);
                  if (existedQueries.indexOf(q) > -1) {
                    showBooks(q, filter);
                  } else {
                    fetchBooks(q, filter);
                  }
                }}
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
      error: state.get("filters").error,
      defaultPageSize: state.get("books").defaultPageSize,
      existedQueries: state
        .get("books")
        .entities.keySeq()
        .toArray()
    };
  },
  {
    searchTermChanged,
    selectedCountriesChanged,
    selectedLanguagesChanged,
    loadCountriesLanguages,
    fetchBooks,
    showBooks
  }
)(FilterBooks);
