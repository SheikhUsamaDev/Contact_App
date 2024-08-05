import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../src/App.css'
import Home from '../src/Pages/Home'
import About from '../src/Pages/About'
import AddEdit from '../src/Pages/AddEdit'
import View from '../src/Pages/View'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Components/Header";
import Search from "./Pages/Search";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <ToastContainer position="top-center"/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/addedit" element={<AddEdit/>} />
          <Route path="/update/:id" element={<AddEdit/>} />
          <Route path="/view/:id" element={<View/>} />
          <Route path="/search" element={<Search/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
