/**
 * App.jsx — Root component for MindBridge MVP.
 *
 * Wraps the app in MoodProvider (global state) and BrowserRouter (routing).
 * Defines all 8 routes in the navigation flow:
 *   / → /streak → /mood → /breathe → /result → /dashboard → /journal → /service → /
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MoodProvider } from './context/MoodContext';

/* Screen imports */
import LoginScreen from './screens/LoginScreen';
import StreakScreen from './screens/StreakScreen';
import MoodCheckerScreen from './screens/MoodCheckerScreen';
import BreatheScreen from './screens/BreatheScreen';
import ResultScreen from './screens/ResultScreen';
import DashboardScreen from './screens/DashboardScreen';
import JournalScreen from './screens/JournalScreen';
import ServiceScreen from './screens/ServiceScreen';

function App() {
  return (
    <MoodProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/streak" element={<StreakScreen />} />
          <Route path="/mood" element={<MoodCheckerScreen />} />
          <Route path="/breathe" element={<BreatheScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/journal" element={<JournalScreen />} />
          <Route path="/service" element={<ServiceScreen />} />
        </Routes>
      </BrowserRouter>
    </MoodProvider>
  );
}

export default App;
