import { makeStyles } from '@material-ui/core/styles';
import Header from 'components/Header';
import AlbumFeature from 'features/Ablum';
import ArticleList from 'features/Blog/components/ArticleList';
import CounterFeature from 'features/Counter';
import ProductFeature from 'features/Product';
import TodoFeature from 'features/Todo';
import { Route, Switch } from 'react-router-dom';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#EFEFEF',
    minHeight: '900px',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Switch>
        {/* <Route path="/" component={TodoFeature} exact /> */}
        <Route path="/products" component={ProductFeature} />
        <Route path="/counter" component={CounterFeature} />
        <Route path="/todo-list" component={TodoFeature} />
        <Route path="/album" component={AlbumFeature} />
        <Route path="/blog" component={ArticleList} />

        {/* <Route component={NotFoundFeature} /> */}
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
