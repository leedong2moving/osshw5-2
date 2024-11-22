import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPage from './components/Pages/listPage';
import CreatePage from './components/Pages/createPage';
import DetailPage from './components/Pages/detailPage';
import UpdatePage from './components/Pages/updatePage';
import './styles/index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </Router>
  );
};

export default App;

