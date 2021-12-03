import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import routes from './routes/index.js'

const App = () => {
  return (
    <BrowserRouter basename="/">
        <Routes>
          <Route index path={routes.login} element={<Login/>}/>
          <Route index path={routes.base} element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
