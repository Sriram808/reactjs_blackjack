import Home from './Home';
import Play from './Play';
import { DataProvider } from './context/DataContext';
import {  BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <DataProvider>
      < BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/play' element={<Play/>}/>
        </Routes>
      </ BrowserRouter>
    </DataProvider>
  );
};

export default App;