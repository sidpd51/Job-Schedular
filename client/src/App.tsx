import { Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';

const App = () => {

  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"*"} element={<h1>Page not found!</h1>} />
    </Routes>
    
  );
};

export default App;