import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import BookList from '../components/books/BooksList';
import FilterBooks from '../components/filters/FilterBooks';
import {
  fetchBooks,
  showBooks,
  defaultPageSizeSelector,
  booksDataSelector,
  existedQueriesSelector
} from '../ducks/books';
import history from '../history';
import { filterQuerySelector } from '../ducks/filters';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Map, Record } from 'immutable';
import { IBookData } from '../models';

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 84px)',
    },
    content: { flex: '1 0 auto' },
    footer: {
      boxSizing: 'border-box',
      textAlign: 'center',
      backgroundColor: '#eee',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '20px 0',
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      margin: '30px 0',
      '& .active-page': {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        color: '#fff',
      },
    },
  });

interface IDispatchProps {
  match: {
    params: { pageId: string };
  };
}

interface IProps extends IDispatchProps {
  pageId: string;
  filterQuery: string;
  defaultPageSize: number;
  existedQueries: string[];
  fetchBooks: (fullQuery: string) => void;
  showBooks: (fullQuery: string) => void;
  booksData?: Record<IBooksData>;
}

interface IBooksData {
  entities: Map<string, IBookData>;
  loading: boolean;
  loaded: boolean;
  error: boolean | Error;
  paginationData?: IPaginationData;
}

interface IPaginationData {
  page: number;
  pageSize: number;
  rowCount: number;
  pageCount: number;
}

class BooksPage extends Component<IProps & WithStyles<typeof styles>> {
  componentDidMount() {
    const {
      fetchBooks,
      showBooks,
      pageId,
      defaultPageSize,
      filterQuery,
      existedQueries,
    } = this.props;

    const q = `?page=${pageId}&pageSize=${defaultPageSize}${filterQuery}`;
    existedQueries.indexOf(q) > -1 ? showBooks(q) : fetchBooks(q);
  }

  componentDidUpdate(prevProps: IProps) {
    const {
      existedQueries,
      fetchBooks,
      showBooks,
      pageId,
      defaultPageSize,
      filterQuery,
    } = this.props;

    window.scrollTo(0, 0);
    if (pageId !== prevProps.pageId || filterQuery !== prevProps.filterQuery) {
      if (filterQuery !== prevProps.filterQuery && pageId !== '1') {
        history.push('/books');
      }
      const q = `?page=${pageId}&pageSize=${defaultPageSize}${filterQuery}`;
      existedQueries.indexOf(q) > -1 ? showBooks(q) : fetchBooks(q);
    }
  }

  render() {
    const { classes, theme, booksData, pageId } = this.props;

    const transitionDuration = {
      enter: theme && theme.transitions.duration.enteringScreen,
      exit: theme && theme.transitions.duration.leavingScreen,
    };
    if (!booksData) {
      return null;
    }

    const books = booksData.get('entities');
    const loading = booksData.get('loading');
    const error = booksData.get('error');
    const paginationData = booksData.get('paginationData');

    const pageTitle = parseInt(pageId, 10) > 1 ? ` Страница ${pageId}` : '';
    const totalPages = paginationData
      ? Math.ceil(paginationData.rowCount / paginationData.pageSize)
      : null;
    const pagination =
      totalPages && totalPages > 1
        ? Array.from(Array(totalPages)).map((val, page) => (
            <Button
              key={page + 1}
              component={({ innerRef, ...props }) => (
                <NavLink {...props} to={`/books/page/${page + 1}`} />
              )}
              variant="outlined"
              color="primary"
              className={pageId === (page + 1).toString() ? 'active-page' : ''}
            >
              {page + 1}
            </Button>
          ))
        : null;

    return (
      <div className={classes.wrapper}>
        <Helmet>
          <title>{`Туристические маршруты по мотивам книг${pageTitle}`}</title>
          <meta
            name="description"
            content="Литературные маршруты. Туристический путеводитель по местам из книг. Карта для путешествий и обзорных экскурсий."
          />
          <meta
            name="keywords"
            content="литературные маршруты, путешествия, туризм, экскурсии"
          />
          <meta property="og:url" content="https://booksroutes.info/books/" />
          <meta
            property="og:title"
            content={`Туристические маршруты по мотивам книг${pageTitle}`}
          />
          <meta
            property="og:description"
            content="Литературные маршруты. Туристический путеводитель по местам из книг. Карта для путешествий и обзорных экскурсий."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://booksroutes.info/images/og-image.jpg"
          />
        </Helmet>
        <div className={classes.content}>
          <FilterBooks />
          <BookList books={books} loading={loading} error={error} />
          <div className={classes.pagination}>{pagination}</div>
        </div>
        <footer className={classes.footer}>
          <div className="mui-container mui--text-center">
            Made with ♥ by{' '}
            <a
              href="http://ideas-band.space"
              rel="noopener noreferrer"
              target="_blank"
            >
              Ideas Band LLC
            </a>{' '}
            © 2018 - {new Date().getFullYear()}
          </div>
        </footer>
        <Zoom
          key="secondary"
          in={true}
          timeout={transitionDuration}
          style={{
            transitionDelay:
              transitionDuration && transitionDuration.exit
                ? transitionDuration.exit.toString()
                : '',
          }}
          unmountOnExit={true}
        >
          <Button
            component={({ innerRef, ...props }) => (
              <Link {...props} to="/add" />
            )}
            variant="fab"
            className={classes.fab}
            color="secondary"
          >
            <AddIcon />
          </Button>
        </Zoom>
      </div>
    );
  }
}
export default connect(
  (state, props: IProps) => {
    return {
      defaultPageSize: defaultPageSizeSelector(state),
      pageId: props.match.params.pageId || '1',
      filterQuery: filterQuerySelector(state),
      booksData: booksDataSelector(state),
      existedQueries: existedQueriesSelector(state),
    };
  },
  {
    fetchBooks,
    showBooks,
  }
)(
  withStyles(styles, {
    withTheme: true,
    name: 'BooksPage',
    classNamePrefix: 'books-page-',
  })(BooksPage)
);
