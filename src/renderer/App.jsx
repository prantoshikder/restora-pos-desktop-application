import 'bootstrap/dist/css/bootstrap.min.css';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import AddCategory from './pages/foodManagement/manageCategory/AddCategory';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add_category" element={<AddCategory />} />
      </Routes>
    </Router>
  );
}
