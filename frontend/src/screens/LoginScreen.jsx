/**
 * LoginScreen — First screen (/) in the MindBridge flow.
 *
 * Collects the student's Name and Student ID, then navigates to /streak.
 * Reads/writes name and studentId from MoodContext.
 * Uses: ScreenWrapper, InputField (×2), PrimaryButton
 */
import { useNavigate } from 'react-router-dom';
import { useMood } from '../context/MoodContext';
import ScreenWrapper from '../components/ScreenWrapper';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import './LoginScreen.css';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { name, setName, studentId, setStudentId } = useMood();

  const handleGetStarted = () => {
    // Navigate to streak screen (validation can be added later)
    navigate('/streak');
  };

  return (
    <ScreenWrapper showBack={false}>
      {/* Branding header */}
      <div className="login__header">
        <p className="login__welcome">Welcome to</p>
        <h1 className="login__brand">MindBridge</h1>
        <p className="login__tagline">Your Daily Wellness Companion</p>
      </div>

      {/* Login prompt */}
      <p className="login__prompt">Please Log in to Proceed</p>

      {/* Input fields */}
      <div className="login__form">
        <InputField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <InputField
          label="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter your Student ID"
        />
      </div>

      {/* Get started button */}
      <PrimaryButton label="Get started" onClick={handleGetStarted} />

      {/* Consent notice */}
      <p className="login__consent">
        By continuing, you consent to your journal entries being analysed
        for mood tracking.
      </p>
    </ScreenWrapper>
  );
}