import logo from './logo.svg';
import './App.css';

import { Link, Route, Switch } from 'react-router-dom';

import { useEffect } from 'react';

import CounterFeature from 'features/Counter';
import TodoFeature from 'features/Todo';
import categoryApi from 'api/categoryApi';
import Header from 'features/Header';
import Footer from 'features/Footer';
import NotFoundFeature from 'features/NotFound';
import AlbumFeature from 'features/Ablum';

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await categoryApi.getAll();
      console.log(productList);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        {/* <Route path="/" component={TodoFeature} exact /> */}
        <Route path="/" component={CounterFeature} exact />
        <Route path="/todo-list" component={TodoFeature} />
        <Route path="/album" component={AlbumFeature} />
        <Route component={NotFoundFeature} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
