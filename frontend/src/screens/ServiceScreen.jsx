/**
 * ServiceScreen — Service recommendation screen (/service).
 *
 * Shows a recommendation message, a green service card,
 * an encouraging sign-off, and a "Done" button that resets
 * all state and navigates back to login (/).
 *
 * Uses: ScreenWrapper, Card (variant="row"), PrimaryButton
 */
import { useNavigate } from 'react-router-dom';
import { useMood } from '../context/MoodContext';
import ScreenWrapper from '../components/ScreenWrapper';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import './ServiceScreen.css';

export default function ServiceScreen() {
  const navigate = useNavigate();
  const { reset } = useMood();

  /** Reset all state and return to login */
  const handleDone = () => {
    reset();
    navigate('/');
  };

  return (
    <ScreenWrapper showBack={true}>
      {/* Recommendation message */}
      <p className="service__message">
        Based on your Today's Journal Entry I suggest you speak to the
        following people, Trust me, They Know Better than Me And Speaking
        to the Right HUMAN, is ALWAYS THE BEST THING
      </p>

      {/* Service recommendation card */}
      <Card color="#22C55E" variant="row">
        <div className="service__card-content">
          {/* Green square indicator */}
          <span className="service__card-icon" aria-hidden="true" />
          <span className="service__card-label">Support Service 1</span>
          <span className="service__card-data">********</span>
        </div>
      </Card>

      {/* Encouraging sign-off */}
      <p className="service__signoff">
        SEE YOU SOON! JUST REMEMBER, YOU CAN DO THIS!
      </p>

      {/* Done button — resets state and goes to login */}
      <PrimaryButton label="Done" onClick={handleDone} />
    </ScreenWrapper>
  );
}