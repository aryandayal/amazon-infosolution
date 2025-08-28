import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ChangeCpPassword from "./pages/user/ChangeCpPassword";
import PopUp from "./pages/user/PopUp";
import UserGroupAssociation from "./pages/user/UserGroupAssociation";
import SupportTicket from "./pages/user/SupportTicket";
import GroupVehicleAsso from "./pages/user/GroupVehicleAsso";
import ManageGroups from "./pages/user/ManageGroups";
import SensorStatusReport from "./pages/sensors/SensorStatusReport";
import UnauthorisedSensorUsage from "./pages/sensors/UnauthorisedSensorUsage";
import EventLogs from "./pages/reports/EventLogs";
import Stoppage from "./pages/reports/basic-reports/Stoppage";
import OverSpeed from "./pages/reports/basic-reports/OverSpeed";
import AllVehicleStoppageReport from "./pages/reports/basic-reports/AllVehicleStoppageReport";
import TripSummaryLocation from "./pages/reports/trip-summary/TripSummaryLocation";
import TripSummarySite from "./pages/reports/trip-summary/TripSummarySite";
import TripSummaryTime from "./pages/reports/trip-summary/TripSummaryTime";
import FleetDayWiseKmsSummary from "./pages/reports/performance-reports/FleetDayWiseKmsSummary";
import KmsSummary from "./pages/reports/performance-reports/KmsSummary";
import MonthWiseKmsSummary from "./pages/reports/performance-reports/MonthWiseKmsSummary";
import VehicleHectareReport from "./pages/reports/performance-reports/VehicleHectareReport";
import VehiclePerformance from "./pages/reports/performance-reports/VehiclePerformance";
import HistoryTracking from "./pages/map/HistoryTracking";
import RouteMapper from "./pages/map/RouteMapper";
import SiteDetails from "./pages/map/SiteDetails";
import FuelDistanceGraph from "./pages/fuel/FuelDistanceGraph"; 
import FuelTimeGraph from "./pages/fuel/FuelTimeGraph";
import FuelFill from "./pages/fuel/FuelFill";
import FuelRemoval from "./pages/fuel/FuelRemoval";
import FuelConsumption from "./pages/fuel/FuelConsumption";
import AddRoute from "./pages/routes/AddRoute";
import RestrictedRouteList from "./pages/routes/RestrictedRouteList";
import RouteDeviation from "./pages/routes/RouteDeviation";
import RouteList from "./pages/routes/RouteList";
import DeviceStatus from "./pages/admin/DeviceStatus";
import ManageDevices from "./pages/admin/vehicles/ManageDevices";
import ImeiMapWithVehicles from "./pages/admin/vehicles/ImeiMapWithVehicles";
import AddEditVehicles from "./pages/admin/vehicles/AddEditVehicles";
import CheckImeiStatus from "./pages/admin/vehicles/CheckImeiStatus";
import AddNewDeviceVehicles from "./pages/admin/vehicles/AddNewDeviceVehicles";
import ProviderBilling from "./pages/admin/billing/ProviderBilling";
import SimSubscription from "./pages/admin/billing/SimSubscription";
import ProCustomerBilling from "./pages/admin/billing/ProCustomerBilling";
import VehicleBillRecovery from "./pages/admin/billing/VehicleBillRecovery";
import AddUpdateCompany from "./pages/admin/company/AddUpdateCompany";
import AddUpdateUsers from "./pages/admin/company/AddUpdateUsers";
import UserRoles from "./pages/admin/company/UserRoles";
import UserSupportTicket from "./pages/admin/company/UserSupportTicket";
import LoginPage from "./pages/Login";
import ProviderSupportTicket from "./pages/ProviderSupportTicket";
import SupportHelp from "./pages/SupportHelp";


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />\

        {/* ------------User Routes------------ */}
        <Route path="/user/change-cp-password" element={<ChangeCpPassword />} />
        <Route path="/user/pop-up" element={<PopUp />} />
        <Route path="/user/user-group-association" element={<UserGroupAssociation />} />
        <Route path="/user/group-vehicle-asso" element={<GroupVehicleAsso />} />
        <Route path="/user/support-ticket" element={<SupportTicket />} />
        <Route path="/user/manage-groups" element={<ManageGroups />} />

        {/* -----------------Sensor Routes---------------- */}
        <Route path="/sensors/sensor-status-report" element={<SensorStatusReport />} />
        <Route path="/sensors/unauthorised-sensor-usage" element={<UnauthorisedSensorUsage />} />


        {/* -----------------Reports Routes---------------- */}
        <Route path="/reports/event-logs" element={<EventLogs />} />
        {/* -----------------Reports SubRoutes basic-report ---------------- */}
        <Route path="/reports/basic-reports/stoppage" element={<Stoppage />} />
        <Route path="/reports/basic-reports/overspeed" element={<OverSpeed />} />
        <Route path="/reports/basic-reports/all-vehicle-stoppage-report" element={<AllVehicleStoppageReport />} />
        {/* -----------------Reports SubRoutes trip-summary ---------------- */}
        <Route path="/reports/trip-summary-site" element={<TripSummarySite />} />
        <Route path="/reports/trip-summary-location" element={<TripSummaryLocation/>} />
        <Route path="/reports/trip-summary-time" element={<TripSummaryTime />} />
        {/* -----------------Reports SubRoutes performance-report ---------------- */}
        <Route path="/reports/performance-reports/vehicle-performance" element={<VehiclePerformance />} />
        <Route path="/reports/performance-reports/kms-summary" element={<KmsSummary />} />
        <Route path="/reports/performance-reports/fleet-day-wise-kms-summary" element={<FleetDayWiseKmsSummary />} />
        <Route path="/reports/performance-reports/month-wise-kms-summary" element={<MonthWiseKmsSummary />} />
        <Route path="/reports/performance-reports/vehicle-hectare-report" element={<VehicleHectareReport/>} />
           {/* -----------------Map Routes---------------- */}
        <Route path="/map/route-mapper" element={<RouteMapper />} />
        <Route path="/map/site-details" element={<SiteDetails />} />
        <Route path="/map/history-tracking" element={<HistoryTracking />} />
          {/* -----------------Fuel Routes---------------- */}
        <Route path="/fuel/fuel-distance-graph" element={<FuelDistanceGraph />} />
        <Route path="/fuel/fuel-time-graph" element={<FuelTimeGraph />} />
        <Route path="/fuel/fuel-fill" element={<FuelFill />} />
        <Route path="/fuel/fuel-removal" element={<FuelRemoval />} />
        <Route path="/fuel/fuel-consumption" element={<FuelConsumption />} />
             {/* -----------------Routes Routes---------------- */}
        <Route path="/routes/add-route" element={<AddRoute />} />
        <Route path="/routes/route-list" element={<RouteList />} />
        <Route path="/routes/restricted-route-list" element={<RestrictedRouteList />} />
        <Route path="/routes/route-deviation" element={<RouteDeviation />} />
         {/* -----------------Admin Routes---------------- */}
        <Route path="/admin/device-status" element={<DeviceStatus />} />
            {/* -----------------Admin SubRoute---------------- */}
        <Route path="/admin/vehicles/manage-devices" element={<ManageDevices />} />
              <Route path="/admin/vehicles/imei-map-with-vehicles" element={<ImeiMapWithVehicles />} />
                    <Route path="/admin/vehicles/add-edit-vehicles" element={<AddEditVehicles />} />
                          <Route path="/admin/vehicles/check-imei-status" element={<CheckImeiStatus />} />
                                <Route path="/admin/vehicles/add-new-devices-vehicles" element={<AddNewDeviceVehicles />} />
        {/* -----------------Admin Billing SubRoutes---------------- */}
         <Route path="/admin/billing/provider-billing" element={<ProviderBilling />} />
         <Route path="/admin/billing/sim-subscription" element={<SimSubscription />} />
         <Route path="/admin/billing/pro-customer-billing" element={<ProCustomerBilling />} />
         <Route path="/admin/billing/vehicle-bill-recovery" element={<VehicleBillRecovery />} />
          {/* -----------------Admin Company SubRoutes---------------- */}
         <Route path="/admin/company/add-update-company" element={<AddUpdateCompany />} />
         <Route path="/admin/company/add-update-users" element={<AddUpdateUsers />} />
         <Route path="/admin/company/user-roles" element={<UserRoles />} />
         <Route path="/admin/company/user-support-ticket" element={<UserSupportTicket />} />

             {/* -----------------Provider-support-page---------------- */}
            <Route path="/provider-support-ticket" element={<ProviderSupportTicket />} />

               {/* -----------------Support-help---------------- */}
            <Route path="/support" element={<SupportHelp />} />


                   {/* -----------------Login-page---------------- */}
                   <Route path="/logout" element={<LoginPage />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
