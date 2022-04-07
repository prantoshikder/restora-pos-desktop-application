import { getDataFromDatabase } from 'helpers';
import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import SystemMenu from './components/partials/SystemMenu';
import { ContextData } from './contextApi';
import Contact from './pages/Contact';
import Currency from './pages/Currency';
import DashBoard from './pages/DashBoard';
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
import OnGoingOrder from './pages/OnGoingOrder';
import ItemSalesReport from './pages/report/ItemSalesReport';
import SalesReport from './pages/report/SalesReport';
import ApplicationSettings from './pages/settings/ApplicationSettings';
import TodaysOrder from './pages/TodaysOrder';

export default function App() {
  window.get_settings.send('get_settings', { status: true });

  const [cartItems, setCartItems] = useState([]);
  const [reRenderOnSettings, setReRenderOnSettings] = useState(false);

  const [settings, setSettings] = useState({
    appStatus: 'free',
    site_align: 'ltr',
    theme: 'light',
    powerbytxt: '© Copyright Restora POS',
    discountrate: 0,
    servicecharge: 0,
    vat: 0,
  });

  const [languageData, setLanguageData] = useState(null);

  useEffect(() => {
    getDataFromDatabase('get_settings_response', window.get_settings).then(
      (result) => {
        setSettings({
          ...settings,
          ...result,
          currency_icon: result.currency_icon ? result.currency_icon : '$',
        });
      }
    );
  }, [reRenderOnSettings]);

  useEffect(() => {
    setReRenderOnSettings(true);
  }, [settings]);

  console.log('settings app', settings);

  return (
    <ContextData.Provider value={{ cartItems, setCartItems }}>
      <Router>
        <SystemMenu settings={settings} />
        <Routes>
          {/* POS System */}
          <Route path="/" element={<Home settings={settings} />} />
          <Route
            path="/on_going_order"
            element={<OnGoingOrder settings={settings} />}
          />
          <Route
            path="/todays_order"
            element={<TodaysOrder settings={settings} />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<DashBoard settings={settings} />}
          />

          {/* Food Management */}
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

          {/* Application Settings */}
          <Route
            path="/application_setting"
            element={
              <ApplicationSettings
                settings={settings}
                setReRenderOnSettings={setReRenderOnSettings}
                reRenderOnSettings={reRenderOnSettings}
              />
            }
          />
          <Route path="/currency" element={<Currency settings={settings} />} />
          <Route path="/language" element={<Language settings={settings} />} />

          {/* Sales Report */}
          <Route
            path="/sales_report"
            element={
              <SalesReport languageData={languageData} settings={settings} />
            }
          />
          <Route
            path="/items_sales_report"
            element={<ItemSalesReport settings={settings} />}
          />
          <Route path="/contact" element={<Contact settings={settings} />} />
        </Routes>
      </Router>
    </ContextData.Provider>
  );
}
