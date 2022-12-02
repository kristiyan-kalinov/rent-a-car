import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Login } from './components/auth/login/Login';
import { Register } from './components/auth/register/Register';
import { Layout } from './components/layout/Layout';
import { UserForm } from './components/users/user-form/UserForm';
import { User } from './components/users/user/User';
import { UsersList } from './components/users/users-list/UsersList';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { NonAuthenticatedGuard } from './utils/guards/NonAuthenticatedGuard';
import { AdminGuard } from './utils/guards/AdminGuard';
import { VehicleForm } from './components/vehicles/vehicle-form/VehicleForm';
import { Vehicle } from './components/vehicles/vehicle/Vehicle';
import { VehiclesList } from './components/vehicles/vehicles-list/VehiclesList';
import { RentalEventsList } from './components/rental-events/rental-events-list/RentalEventsList';
import { RentalEventForm } from './components/rental-events/rental-event-form/RentalEventForm';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<NonAuthenticatedGuard> <Register /> </NonAuthenticatedGuard>} />
        <Route exact path="/login" element={<NonAuthenticatedGuard> <Login /> </NonAuthenticatedGuard>} />
        <Route exact path="/" element={<AuthenticatedRoute><Layout /></AuthenticatedRoute>}>
              <Route path="/users-list" element={<AdminGuard><UsersList /></AdminGuard>} />
              <Route path="/user/:id" element={<AdminGuard><User /></AdminGuard>} />
              <Route path="/user/create" element={<AdminGuard><UserForm /></AdminGuard>} />
              <Route path="/user/edit/:id" element={<AdminGuard><UserForm /></AdminGuard>} />

              <Route path="/vehicles-list" element={<VehiclesList />} />
              <Route path="/vehicle/:id" element={<Vehicle />} />
              <Route path="/vehicle/create" element={<AdminGuard><VehicleForm /></AdminGuard>} />
              <Route path="/vehicle/edit/:id" element={<AdminGuard><VehicleForm /></AdminGuard>} />

              <Route path="/rental-events-list" element={<AdminGuard><RentalEventsList /></AdminGuard>} />
              <Route path="/rental-event/create" element={<RentalEventForm />} />
              <Route path="/my-rents" element={<RentalEventsList />} />
              <Route path="/rents/:id" element={<RentalEventsList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
