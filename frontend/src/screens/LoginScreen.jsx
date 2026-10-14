/**
 * LoginScreen — First screen (/) in the MindBridge flow.
 *
 * Collects the student's Name and Student ID, then navigates to /streak.
 * Reads/writes name and studentId from MoodContext.
 * Uses: ScreenWrapper, InputField (×2), PrimaryButton
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { useMood } from '../context/MoodContext';
import ScreenWrapper from '../components/ScreenWrapper';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import './LoginScreen.css';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { name, setName, studentId, setStudentId } = useMood();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGetStarted = async () => {
    setError('');

    if (!studentId.trim()) {
      setError('Please enter your Student ID.');
      return;
    }

    if (password.length < 6) {
      setError('Your password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      let data;

      try {
        data = await apiRequest('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ student_id: studentId, password }),
        });
      } catch (loginError) {
        if (loginError.status !== 401) {
          throw loginError;
        }

        if (!name.trim()) {
          throw new Error('Please enter your name to create a new account.');
        }

        data = await apiRequest('/auth/signup', {
          method: 'POST',
          body: JSON.stringify({ full_name: name, student_id: studentId, password }),
        });
      }

      localStorage.setItem('access_token', data.access_token);
      setName(data.user.full_name);
      navigate('/streak');
    } catch (requestError) {
      console.error('Authentication failed:', requestError);
      setError(requestError.message || 'We could not log you in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
        <InputField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choose a password"
          type="password"
        />
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <PrimaryButton
        label={isSubmitting ? 'Creating account...' : 'Get started'}
        onClick={handleGetStarted}
        disabled={isSubmitting}
      />

      {/* Consent notice */}
      <p className="login__consent">
        By continuing, you consent to your journal entries being analysed
        for mood tracking.
      </p>
    </ScreenWrapper>
  );
}