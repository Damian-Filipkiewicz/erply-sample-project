import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';
import { Login } from './pages/Login';
import { ProductList } from './pages/ProductList';
import routes from './routes/index.js';

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route index path={routes.login} element={<Login/>}/>
        <Route index path={routes.productList} element={<RequireAuth><ProductList/></RequireAuth>}/>
        <Route path="*" element={<Navigate to="/login"/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
