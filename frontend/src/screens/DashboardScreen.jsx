/**
 * DashboardScreen — Progress dashboard screen (/dashboard).
 *
 * Shows 4 weekly progress cards with different colours,
 * a secondary "Survey of Previous month" button,
 * and a circular arrow to navigate to /journal.
 *
 * Uses: ScreenWrapper, Card (variant="row" ×4), PrimaryButton (secondary), CircularArrowButton
 */
import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import CircularArrowButton from '../components/CircularArrowButton';
import './DashboardScreen.css';

export default function DashboardScreen() {
  const navigate = useNavigate();

  /** Weekly data for the 4 dashboard row cards */
  const weeks = [
    { label: 'Present Week', color: '#22C55E', data: '********' },
    { label: 'Week 3',       color: '#E5B94E', data: '***********' },
    { label: 'Week 2',       color: '#60A5FA', data: '********' },
    { label: 'Week 1',       color: '#F87171', data: '***********' },
  ];

  return (
    <ScreenWrapper showBack={true}>
      {/* Section heading */}
      <h2 className="dashboard__heading">Survey of current month</h2>

      {/* 4 weekly progress cards */}
      <div className="dashboard__cards">
        {weeks.map((week) => (
          <Card key={week.label} color={week.color} variant="row">
            <div className="dashboard__row-content">
              <span className="dashboard__row-label">{week.label}</span>
              <span className="dashboard__row-data">{week.data}</span>
            </div>
          </Card>
        ))}
      </div>

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