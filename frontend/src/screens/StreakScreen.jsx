/**
 * StreakScreen — Check-in streak screen (/streak).
 *
 * Shows congratulations message and a gold star with "5 Days!".
 * Uses: ScreenWrapper, GoldStar, PrimaryButton
 */
import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import GoldStar from '../components/GoldStar';
import PrimaryButton from '../components/PrimaryButton';
import './StreakScreen.css';

export default function StreakScreen() {
  const navigate = useNavigate();

  return (
    <ScreenWrapper showBack={true}>
      {/* MindBridge heading */}
      <h1 className="streak__heading">MindBridge</h1>

      {/* Congratulations message */}
      <div className="streak__message">
        <p className="streak__congrats">Well Done! &amp; Congratulations!</p>
        <p className="streak__subtitle">You Have checked in for</p>
      </div>

      {/* Gold star badge with "5 Days!" */}
      <GoldStar text="5 Days!" />

      {/* Continue button */}
      <PrimaryButton
        label="Continue"
        onClick={() => navigate('/mood')}
      />
    </ScreenWrapper>
  );
}