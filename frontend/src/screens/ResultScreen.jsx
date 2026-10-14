/**
 * ResultScreen — Conditional result card screen (/result).
 *
 * Reads mood from MoodContext and shows:
 *   - mood >= 67:  GREEN card
 *   - mood 34–66:  BLUE card
 *   - mood <= 33:  RED card
 *
 * Uses: ScreenWrapper, Card (variant="square"), MoodDots, CircularArrowButton
 */
import { useNavigate } from 'react-router-dom';
import { useMood } from '../context/MoodContext';
import ScreenWrapper from '../components/ScreenWrapper';
import Card from '../components/Card';
import MoodDots from '../components/MoodDots';
import CircularArrowButton from '../components/CircularArrowButton';
import './ResultScreen.css';

export default function ResultScreen() {
  const navigate = useNavigate();
  const { mood } = useMood();

  /**
   * Determine card colour and message based on mood value.
   *   >= 67:  Green (positive)
   *   34–66:  Blue (neutral)
   *   <= 33:  Red (needs support)
   */
  let cardColor, cardMessage;
  if (mood >= 67) {
    cardColor = '#22C55E'; // green
    cardMessage = 'After analyzing you receive a GREEN card';
  } else if (mood >= 34) {
    cardColor = '#60A5FA'; // blue
    cardMessage = 'After analyzing you receive a BLUE card. Take it easy today.';
  } else {
    cardColor = '#F87171'; // red
    cardMessage = 'After analyzing you receive a RED card. We recommend speaking to support services.';
  }

  return (
    <ScreenWrapper showBack={true}>
      {/* Result card with conditional colour and message */}
      <Card color={cardColor} variant="square">
        <p>{cardMessage}</p>
      </Card>

      {/* Row of 4 coloured dots */}
      <MoodDots />

      {/* Circular arrow button to continue */}
      <CircularArrowButton
        onClick={() => navigate('/dashboard')}
        aria-label="Go to progress dashboard"
      />
    </ScreenWrapper>
  );
}