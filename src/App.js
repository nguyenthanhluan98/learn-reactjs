import logo from './logo.svg';
import './App.css';

import { Link, Route, Switch } from 'react-router-dom';

import { useEffect } from 'react';

import CounterFeature from 'features/Counter';
import TodoFeature from 'features/Todo';
import categoryApi from 'api/categoryApi';
import Header from 'components/Header';
import Footer from 'features/Footer';
import NotFoundFeature from 'features/NotFound';
import AlbumFeature from 'features/Ablum';
import { useSnackbar } from '../node_modules/notistack/dist/index';
import { Button } from '../node_modules/@material-ui/core/index';

function App() {
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const productList = await categoryApi.getAll();
  //     console.log(productList);
  //   };

  //   fetchProducts();
  // }, []);

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
