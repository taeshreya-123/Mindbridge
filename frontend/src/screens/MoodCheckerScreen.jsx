/**
 * MoodCheckerScreen — Mood slider screen (/mood).
 *
 * Displays "How are you feeling today" with a range slider (0–100).
 * Stores the mood value in MoodContext.
 * Uses: ScreenWrapper, PrimaryButton
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api/client';
import { useMood } from '../context/MoodContext';
import ScreenWrapper from '../components/ScreenWrapper';
import PrimaryButton from '../components/PrimaryButton';
import './MoodCheckerScreen.css';

export default function MoodCheckerScreen() {
  const navigate = useNavigate();
  const { mood, setMood } = useMood();
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleNext = async () => {
    setError('');
    setIsSaving(true);
    try {
      await apiRequest('/mood', { method: 'POST', body: JSON.stringify({ mood }) });
      navigate('/breathe');
    } catch (requestError) {
      console.error('Mood save failed:', requestError);
      setError('We could not save your mood. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScreenWrapper showBack={true}>
      {/* Subtitle */}
      <p className="mood__subtitle">Mood Checker</p>

      {/* Main question */}
      <h2 className="mood__question">How are you feeling today</h2>

      {/* Slider area */}
      <div className="mood__slider-area">
        <input
          type="range"
          min="0"
          max="100"
          value={mood}
          onChange={(e) => setMood(Number(e.target.value))}
          className="mood__slider"
          aria-label="Mood level from Bad to Good"
        />

        {/* Mood labels */}
        <div className="mood__labels">
          <span className="mood__label mood__label--bad">BAD</span>
          <span className="mood__label mood__label--meh">MEH</span>
          <span className="mood__label mood__label--good">GOOD</span>
        </div>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <PrimaryButton
        label={isSaving ? 'Saving...' : 'Next'}
        onClick={handleNext}
        disabled={isSaving}
      />
    </ScreenWrapper>
  );
}