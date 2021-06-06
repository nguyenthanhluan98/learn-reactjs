import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import Header from 'components/Header';
import AlbumFeature from 'features/Ablum';
import ArticleList from 'features/Blog/components/ArticleList';
import CounterFeature from 'features/Counter';
import ProductFeature from 'features/Product';
import TodoFeature from 'features/Todo';
import { Route, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#EFEFEF',
    minHeight: '900px',
  },
}));

function App() {
  const classes = useStyles();
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const productList = await categoryApi.getAll();
  //     console.log(productList);
  //   };

  //   fetchProducts();
  // }, []);

  // const [articles, setArticles] = useState([]);

  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     const listarticle = await articleApi.getAll();
  //     setArticles(listarticle);
  //   };
  //   fetchArticles();
  // });

  // console.log(articles);

  return (
    <div className={classes.root}>
      <Header />
      <Switch>
        {/* <Route path="/" component={TodoFeature} exact /> */}
        <Route path="/" component={CounterFeature} exact />
        <Route path="/todo-list" component={TodoFeature} />
        <Route path="/album" component={AlbumFeature} />
        <Route path="/blog" component={ArticleList} />
        <Route path="/products" component={ProductFeature} />
        {/* <Route component={NotFoundFeature} /> */}
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
