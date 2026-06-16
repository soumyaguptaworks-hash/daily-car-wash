import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Splash        from './pages/Splash';
import Home          from './pages/Home';
import Plans         from './pages/Plans';
import Bookings      from './pages/Bookings';
import Notifications from './pages/Notifications';
import Location      from './pages/Location';
import Profile       from './pages/Profile';
import ClayKit       from './pages/ClayKit';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<Splash />} />
        <Route path="/home"          element={<Home />} />
        <Route path="/plans"         element={<Plans />} />
        <Route path="/bookings"      element={<Bookings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/location"      element={<Location />} />
        <Route path="/profile"       element={<Profile />} />
        <Route path="/clay-ui"       element={<ClayKit />} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
