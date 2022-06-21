import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Details from './components/Details';
import Form from './components/Form';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/home/:id' element={<Details/>}/>
    <Route path='/game' element={<Form/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
