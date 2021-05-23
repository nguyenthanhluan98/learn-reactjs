import logo from './logo.svg';
import './App.css';
import TodoFeature from './features/Todo';
import AlbumFeature from './features/Ablum';
import { Link, Route, Switch } from 'react-router-dom';
import NotFoundFeature from './features/NotFound';
import { useEffect } from 'react';
import categoryApi from './api/categoryApi';
import Header from './features/Header';
import Footer from './features/Footer';

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
        <Route path="/" component={TodoFeature} exact />
        <Route path="/todo-list" component={TodoFeature} />
        <Route path="/album" component={AlbumFeature} />
        <Route component={NotFoundFeature} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
