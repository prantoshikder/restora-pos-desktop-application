import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import AddCategory from './pages/foodManagement/manageCategory/AddCategory';
import Home from './pages/Home';
import Report from './pages/report/Report';
import ApplicationSettings from './pages/settings/ApplicationSettings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add_category" element={<AddCategory />} />
        <Route path="/report" element={<Report />} />
        <Route path="/application_setting" element={<ApplicationSettings />} />
      </Routes>
    </Router>
  );
}
