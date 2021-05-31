import './App.css';

import Header from 'components/Header';
import AlbumFeature from 'features/Ablum';
import CounterFeature from 'features/Counter';
import Footer from 'features/Footer';
import TodoFeature from 'features/Todo';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Button } from '../node_modules/@material-ui/core';
import { useSnackbar } from '../node_modules/notistack/dist';
import articleApi from 'api/articleApi';

function App() {
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

  const { enqueueSnackbar } = useSnackbar();

  const showNoti = () => {
    enqueueSnackbar('Register successfully', { variant: 'success' });
  };

  return (
    <div>
      <Header />
      <Button onClick={showNoti}>Show notification</Button>
      <Switch>
        {/* <Route path="/" component={TodoFeature} exact /> */}
        <Route path="/" component={CounterFeature} exact />
        <Route path="/todo-list" component={TodoFeature} />
        <Route path="/album" component={AlbumFeature} />
        {/* <Route component={NotFoundFeature} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
