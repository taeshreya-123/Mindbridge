/**
 * DashboardScreen — Progress dashboard screen (/dashboard).
 *
 * Shows 4 weekly progress cards with different colours,
 * a secondary "Survey of Previous month" button,
 * and a circular arrow to navigate to /journal.
 *
 * Uses: ScreenWrapper, Card (variant="row" ×4), PrimaryButton (secondary), CircularArrowButton
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/client';
import ScreenWrapper from '../components/ScreenWrapper';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import CircularArrowButton from '../components/CircularArrowButton';
import './DashboardScreen.css';

export default function DashboardScreen() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({ mood_entries: [], checkins: [] });
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest('/dashboard')
      .then(setDashboard)
      .catch((requestError) => {
        console.error('Dashboard load failed:', requestError);
        setError('We could not load your saved progress. Please try again.');
      });
  }, []);

  const moodColors = ['#22C55E', '#E5B94E', '#60A5FA', '#F87171'];

  return (
    <ScreenWrapper showBack={true}>
      {/* Section heading */}
      <h2 className="dashboard__heading">Survey of current month</h2>

      {/* 4 weekly progress cards */}
      <div className="dashboard__cards">
        {dashboard.mood_entries.length === 0 && <p>No saved mood entries yet.</p>}
        {dashboard.mood_entries.map((entry, index) => (
          <Card key={entry.id} color={moodColors[index % moodColors.length]} variant="row">
            <div className="dashboard__row-content">
              <span className="dashboard__row-label">Mood check-in</span>
              <span className="dashboard__row-data">{entry.mood}/100</span>
            </div>
          </Card>
        ))}
        {dashboard.checkins[0] && (
          <Card color="#22C55E" variant="row">
            <div className="dashboard__row-content">
              <span className="dashboard__row-label">Latest streak</span>
              <span className="dashboard__row-data">{dashboard.checkins[0].streak_count} days</span>
            </div>
          </Card>
        )}
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}

      {/* Secondary button: survey of previous month */}
      <PrimaryButton
        label="Survey of Previous month"
        variant="secondary"
        onClick={() => {}} // Placeholder — no action in MVP
      />

      {/* Circular arrow button to journal */}
      <CircularArrowButton
        onClick={() => navigate('/journal')}
        aria-label="Go to journal entry"
      />
    </ScreenWrapper>
  );
}