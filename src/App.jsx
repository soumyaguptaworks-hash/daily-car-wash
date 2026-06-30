import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './store';

import AppShell      from './components/AppShell';
import Splash        from './pages/Splash';
import Onboarding    from './pages/Onboarding';
import Login         from './pages/Login';
import Home          from './pages/Home';
import Plans         from './pages/Plans';
import Schedule      from './pages/Schedule';
import Book          from './pages/Book';
import Bookings      from './pages/Bookings';
import Track         from './pages/Track';
import Vehicles      from './pages/Vehicles';
import Addresses     from './pages/Addresses';
import Wallet        from './pages/Wallet';
import Notifications from './pages/Notifications';
import Chat          from './pages/Chat';
import Help          from './pages/Help';
import Profile       from './pages/Profile';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          {/* auth flow — no shell */}
          <Route path="/"            element={<Splash />} />
          <Route path="/onboarding"  element={<Onboarding />} />
          <Route path="/login"       element={<Login />} />

          {/* main app — inside shell with bottom nav */}
          <Route element={<AppShell />}>
            <Route path="/home"          element={<Home />} />
            <Route path="/plans"         element={<Plans />} />
            <Route path="/bookings"      element={<Bookings />} />
            <Route path="/profile"       element={<Profile />} />

            {/* sub-pages (show back btn, no nav change needed) */}
            <Route path="/schedule"      element={<Schedule />} />
            <Route path="/book"          element={<Book />} />
            <Route path="/track/:id"     element={<Track />} />
            <Route path="/vehicles"      element={<Vehicles />} />
            <Route path="/addresses"     element={<Addresses />} />
            <Route path="/wallet"        element={<Wallet />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/chat"          element={<Chat />} />
            <Route path="/help"          element={<Help />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
