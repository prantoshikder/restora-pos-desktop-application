import { getDataFromDatabase } from 'helpers';
import { useEffect, useState } from 'react';
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
import Home from './pages/Home';
import Language from './pages/Language/';
import ItemSalesReport from './pages/report/ItemSalesReport';
import SalesReport from './pages/report/SalesReport';
import ApplicationSettings from './pages/settings/ApplicationSettings';

export default function App() {
  window.get_settings.send('get_settings', { status: true });

  const [cartItems, setCartItems] = useState([]);
  const [reRenderOnSettings, setReRenderOnSettings] = useState(false);
  const [settings, setSettings] = useState({
    appStatus: 'free',
    site_align: 'ltr',
    theme: 'light',
  });

  useEffect(() => {
    getDataFromDatabase('get_settings_response', window.get_settings).then(
      (result) => {
        console.log('settings app.js', result[0]);
        setSettings({ ...settings, ...result[0] });
      }
    );
  }, [reRenderOnSettings]);

  return (
    <ContextData.Provider value={{ cartItems, setCartItems }}>
      <Router>
        <SystemMenu settings={settings} />
        <Routes>
          <Route path="/" element={<Home settings={settings} />} />

          <Route
            path="/add_category"
            element={<AddCategory settings={settings} />}
          />
          <Route
            path="/category_list"
            element={<CategoryList settings={settings} />}
          />
          <Route path="/add_food" element={<AddFood settings={settings} />} />
          <Route path="/food_list" element={<FoodList settings={settings} />} />
          <Route
            path="/food_variant"
            element={<FoodVariant settings={settings} />}
          />
          <Route
            path="/food_availability"
            element={<FoodAvailability settings={settings} />}
          />
          <Route
            path="/food_menuType"
            element={<MenuType settings={settings} />}
          />
          <Route
            path="/add_addons"
            element={<AddAddons settings={settings} />}
          />
          <Route
            path="/addons_list"
            element={<AddonsList settings={settings} />}
          />
          <Route
            path="/addons_assign_list"
            element={<AddonsAssignList settings={settings} />}
          />
          <Route
            path="/application_setting"
            element={
              <ApplicationSettings
                settings={settings}
                setReRenderOnSettings={setReRenderOnSettings}
              />
            }
          />
          <Route path="/currency" element={<Currency settings={settings} />} />
          <Route path="/language" element={<Language settings={settings} />} />
          <Route
            path="/sales_report"
            element={<SalesReport settings={settings} />}
          />
          <Route
            path="/items_sales_report"
            element={<ItemSalesReport settings={settings} />}
          />
        </Routes>
      </Router>
    </ContextData.Provider>
  );
}
