import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import AddCategory from './pages/foodManagement/manageCategory/AddCategory';
import CategoryList from './pages/foodManagement/manageCategory/CategoryList';
import AddFood from './pages/foodManagement/manageFood/AddFood';
import FoodList from './pages/foodManagement/manageFood/FoodList';
import Home from './pages/Home';
import Report from './pages/report/Report';
import ApplicationSettings from './pages/settings/ApplicationSettings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add_category" element={<AddCategory />} />
        <Route path="/category_list" element={<CategoryList />} />
        <Route path="/add_food" element={<AddFood />} />
        <Route path="/food_list" element={<FoodList />} />
        <Route path="/report" element={<Report />} />
        <Route path="/application_setting" element={<ApplicationSettings />} />
      </Routes>
    </Router>
  );
}
