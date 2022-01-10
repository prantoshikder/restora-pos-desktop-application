import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import SystemMenu from './components/partials/SystemMenu';
import AddAddons from './pages/foodManagement/manageAddons/AddAddons';
import AddonsAssignList from './pages/foodManagement/manageAddons/AddonsAssignList';
import AddonsList from './pages/foodManagement/manageAddons/AddonsList';
import AddCategory from './pages/foodManagement/manageCategory/AddCategory';
import CategoryList from './pages/foodManagement/manageCategory/CategoryList';
import AddFood from './pages/foodManagement/manageFood/AddFood';
import FoodAvailability from './pages/foodManagement/manageFood/FoodAvailability';
import FoodList from './pages/foodManagement/manageFood/FoodList';
import FoodVariant from './pages/foodManagement/manageFood/FoodVariant';
import MenuType from './pages/foodManagement/manageFood/MenuType';
import Home from './pages/Home';
import ItemSalesReport from './pages/report/ItemSalesReport';
import SalesReport from './pages/report/SalesReport';
import ApplicationSettings from './pages/settings/ApplicationSettings';

export default function App() {
  return (
    <Router>
      <SystemMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add_category" element={<AddCategory />} />
        <Route path="/category_list" element={<CategoryList />} />
        <Route path="/add_food" element={<AddFood />} />
        <Route path="/food_list" element={<FoodList />} />
        <Route path="/food_variant" element={<FoodVariant />} />
        <Route path="/food_availability" element={<FoodAvailability />} />
        <Route path="/food_menuType" element={<MenuType />} />
        <Route path="/add_addons" element={<AddAddons />} />
        <Route path="/addons_list" element={<AddonsList />} />
        <Route path="/addons_assign_list" element={<AddonsAssignList />} />
        <Route path="/sales_report" element={<SalesReport />} />
        <Route path="/items_sales_report" element={<ItemSalesReport />} />
        <Route path="/application_setting" element={<ApplicationSettings />} />
      </Routes>
    </Router>
  );
}
