import React, { Component } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import CustomSnackbarContentWrapper from "../decorators/customSnackBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import RouteMapSuggestion from "./RouteMapSuggestion";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form/immutable";
import { stateSelector as newBookSelector } from "../../ducks/newBook";

const validate = values => {
  const errors = {};
  if (!values.get("title")) {
    errors.title = true;
  }
  if (!values.get("authors")) {
    errors.authors = true;
  }
  if (!values.get("route")) {
    errors.route = true;
  }

  return errors;
};

const renderTextField = ({ input, meta: { touched, error }, ...custom }) => (
  <TextField error={touched && error} {...input} {...custom} />
);

class BookForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.any,
    handleClose: PropTypes.any,
    close: PropTypes.bool,
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
  };

  render() {
    const {
      handleSubmit,
      handleClose,
      close,
      pristine,
      submitting,
      loading,
      loaded,
      error
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={24}>
            <Grid item xs={12} md={4}>
              <Field
                component={renderTextField}
                name="title"
                id="title"
                label="Название книги"
                margin="normal"
                fullWidth
              />
              <Field
                component={renderTextField}
                name="authors"
                label="Автор"
                helperText="Если авторов несколько, перечислите их через запятую"
                margin="normal"
                fullWidth
              />
              <Field
                component={renderTextField}
                name="route"
                label="Название или описание маршрута"
                helperText="Предложите свой маршрут"
                margin="normal"
                multiline
                rows="4"
                fullWidth
              />
              <Field
                component={renderTextField}
                name="googleMyMaps"
                label="Ссылка на маршрут в Google My Maps"
                helperText="Этот маршрут должен быть доступен для просмотра всем пользователям, имеющим ссылку"
                margin="normal"
                fullWidth
              />
              <Button
                type="submit"
                disabled={pristine || submitting}
                variant="raised"
                color="secondary"
                size="large"
                style={{ margin: "15px 0" }}
              >
                Отправить
              </Button>
              {loading && (
                <CircularProgress
                  className="loader"
                  style={{ display: "block", margin: "auto" }}
                  size={50}
                />
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              <FormLabel component="legend" style={{ margin: "15px 0 0 0" }}>
                Точки маршрута
              </FormLabel>
              <FormLabel
                component="legend"
                style={{ margin: "10px 0 15px 0", fontSize: ".8rem" }}
              >
                Если маршрут включает более сложную геометрию, например, пути
                или целые области, то лучше составить его в{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com/maps/d/u/0/"
                >
                  Google My Maps
                </a>{" "}
                и указать ссылку на него в этой форме.
              </FormLabel>
              <RouteMapSuggestion />
            </Grid>
          </Grid>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={!close && !!error}
          autoHideDuration={6000}
        >
          <CustomSnackbarContentWrapper
            onClose={handleClose}
            variant="error"
            message={
              error
                ? error.statusText
                : "Произошла ошибка, повторите попытку позднее"
            }
          />
        </Snackbar>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={!close && loaded}
          autoHideDuration={6000}
        >
          <CustomSnackbarContentWrapper
            onClose={handleClose}
            variant="success"
            message="Ваше предложение принято, спасибо!"
          />
        </Snackbar>
      </div>
    );
  }
}
export default connect((state, props) => ({
  initialValues: newBookSelector(state),
  loading: newBookSelector(state).get("loading"),
  loaded: newBookSelector(state).get("loaded"),
  error: newBookSelector(state).get("error"),
  close: props.close,
  handleClose: props.handleClose,
  onSubmit: props.onSubmit
}))(reduxForm({ form: "newBook", validate })(BookForm));
