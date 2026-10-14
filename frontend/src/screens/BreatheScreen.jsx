/**
 * BreatheScreen — Breathing exercise screen (/breathe).
 *
 * Shows the breathing wave diagram (inline SVG placeholder) and
 * implements 4-7-8 box breathing with animated blobs:
 *   • Breathe In:  4 seconds, blobs scale up
 *   • Hold:        7 seconds, blobs stay scaled
 *   • Breathe Out: 8 seconds, blobs scale down
 *
 * Two buttons (both variant="primary" per Figma):
 *   1. "Press here & Just Breathe" — starts the 4-7-8 cycle (no navigation)
 *   2. "Continue" — navigates to /result
 *
 * Uses: ScreenWrapper, BreathingWave, BreathBlobs, CountdownNumber, PrimaryButton (×2)
 */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenWrapper from '../components/ScreenWrapper';
import BreathingWave from '../components/BreathingWave';
import BreathBlobs from '../components/BreathBlobs';
import CountdownNumber from '../components/CountdownNumber';
import PrimaryButton from '../components/PrimaryButton';
import './BreatheScreen.css';

/**
 * 4-7-8 breathing phase definitions.
 *
 * Each phase has:
 *   - name:    internal identifier
 *   - duration: seconds the phase lasts
 *   - scale:   blob scale factor (1.4 = expanded, 1.0 = resting)
 *   - label:   user-facing text shown during the phase
 */
const PHASES = [
  { name: 'Breathe In',  duration: 4, scale: 1.4, label: 'Breathe In'  },
  { name: 'Hold',        duration: 7, scale: 1.4, label: 'Hold'        },
  { name: 'Breathe Out', duration: 8, scale: 1.0, label: 'Breathe Out' },
];

export default function BreatheScreen() {
  const navigate = useNavigate();

  // ---- Local breathing state ----
  const [isBreathing, setIsBreathing] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);       // 0, 1, or 2
  const [secondsElapsed, setSecondsElapsed] = useState(0); // counts UP within current phase

  // Ref to hold the interval ID for cleanup
  const intervalRef = useRef(null);

  /**
   * Start the 4-7-8 breathing cycle.
   * Resets all counters and sets isBreathing to true.
   */
  const handleBreathe = () => {
    setIsBreathing(true);
    setPhaseIndex(0);
    setSecondsElapsed(0);
  };

  /**
   * Timer effect — runs while isBreathing is true.
   * Increments secondsElapsed every 1 second.
   * When secondsElapsed reaches the current phase duration, advances
   * to the next phase or completes the cycle.
   */
  useEffect(() => {
    if (!isBreathing) return;

    intervalRef.current = setInterval(() => {
      setSecondsElapsed((prev) => {
        const currentPhase = PHASES[phaseIndex];

        // Check if current phase is complete
        if (prev + 1 >= currentPhase.duration) {
          if (phaseIndex < 2) {
            // More phases remaining → advance to next phase
            setPhaseIndex(phaseIndex + 1);
            return 0; // reset seconds for new phase
          } else {
            // All 3 phases complete → end the cycle
            clearInterval(intervalRef.current);
            setIsBreathing(false);
            setPhaseIndex(0);
            return 0;
          }
        }

        // Phase still in progress → increment
        return prev + 1;
      });
    }, 1000);

    // Cleanup interval on unmount or when dependencies change
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isBreathing, phaseIndex]);

  // ---- Compute current phase data ----
  const currentPhase = PHASES[phaseIndex];
  const remainingSeconds = currentPhase.duration - secondsElapsed;

  return (
    <ScreenWrapper showBack={true}>
      {/* Breathing wave SVG diagram (always visible) */}
      <BreathingWave />

      {/* Encouragement text */}
      <p className="breathe__text">
        While waiting for next page lets do breathing exercise !!
      </p>

      {/* ---- Breathing visualisation area ---- */}
      <div className="breathe__visualisation">
        {/* Phase label — only shown while breathing */}
        {isBreathing && (
          <p className="breathe__phase-label" aria-live="polite">
            {currentPhase.label}
          </p>
        )}

        {/* Animated blobs — scale driven by current phase */}
        <BreathBlobs scale={isBreathing ? currentPhase.scale : 1} />

        {/* Countdown number — only shown while breathing */}
        {isBreathing && (
          <div className="breathe__countdown">
            <CountdownNumber value={secondsElapsed + 1} />
            <p className="breathe__remaining">
              {remainingSeconds}s remaining in phase
            </p>
          </div>
        )}

        {/* Resting state message — only shown when NOT breathing */}
        {!isBreathing && (
          <p className="breathe__ready-text">
            Press below when you're ready
          </p>
        )}
      </div>

      {/* ---- Buttons ---- */}

      {/* Button 1: Start the4-7-8 breathing cycle (does NOT navigate) */}
      <PrimaryButton
        label="Press here & Just Breathe"
        onClick={handleBreathe}
        disabled={isBreathing}
        variant="primary"
      />

      {/* Button 2: Navigate to result screen */}
      <PrimaryButton
        label="Continue"
        onClick={() => navigate('/result')}
        variant="primary"
      />
    </ScreenWrapper>
  );
}