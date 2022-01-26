import { useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import SystemMenu from './components/partials/SystemMenu';
import { ContextData } from './contextApi';
import Currency from './pages/Currency';
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
// import Home from './pages/Home';
import Language from './pages/Language/';
import ItemSalesReport from './pages/report/ItemSalesReport';
import SalesReport from './pages/report/SalesReport';
import ApplicationSettings from './pages/settings/ApplicationSettings';

export default function App() {
  const [direction, setDirection] = useState('ltr');
  const [cartItems, setCartItems] = useState([]);

  return (
    <ContextData.Provider value={{ cartItems, setCartItems }}>
      <Router>
        <SystemMenu direction={direction} />
        <Routes>
          <Route
            path="/"
            element={<ApplicationSettings direction={direction} />}
          />

          {/* <Route path="/" element={<Home direction={direction} />} /> */}

          <Route
            path="/add_category"
            element={<AddCategory direction={direction} />}
          />
          <Route
            path="/category_list"
            element={<CategoryList direction={direction} />}
          />
          <Route path="/add_food" element={<AddFood direction={direction} />} />
          <Route
            path="/food_list"
            element={<FoodList direction={direction} />}
          />
          <Route
            path="/food_variant"
            element={<FoodVariant direction={direction} />}
          />
          <Route
            path="/food_availability"
            element={<FoodAvailability direction={direction} />}
          />
          <Route
            path="/food_menuType"
            element={<MenuType direction={direction} />}
          />
          <Route
            path="/add_addons"
            element={<AddAddons direction={direction} />}
          />
          <Route
            path="/addons_list"
            element={<AddonsList direction={direction} />}
          />
          <Route
            path="/addons_assign_list"
            element={<AddonsAssignList direction={direction} />}
          />
          <Route
            path="/application_setting"
            element={<ApplicationSettings direction={direction} />}
          />
          <Route
            path="/currency"
            element={<Currency direction={direction} />}
          />
          <Route
            path="/language"
            element={<Language direction={direction} />}
          />
          <Route
            path="/sales_report"
            element={<SalesReport direction={direction} />}
          />
          <Route
            path="/items_sales_report"
            element={<ItemSalesReport direction={direction} />}
          />
        </Routes>
      </Router>
    </ContextData.Provider>
  );
}
