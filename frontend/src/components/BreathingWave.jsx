/**
 * BreathingWave — Inline SVG placeholder for the breathing wave diagram.
 *
 * Shows a wave curve with 7 labelled phases:
 *   Inhale → Hold → Exhale → Hold → Exhale → "little more" → Inhale
 *
 * Coloured dots mark key positions along the curve.
 * This is a static placeholder that will be replaced with a
 * 21st.dev interactive component in a future iteration.
 */
import './BreathingWave.css';

export default function BreathingWave() {
  return (
    <div className="breathing-wave">
      <svg
        viewBox="0 0 600 220"
        className="breathing-wave__svg"
        aria-label="Breathing exercise wave diagram showing phases: Inhale, Hold, Exhale, Hold, Exhale, little more, Inhale"
      >
        {/* Wave curve path */}
        <path
          d="M 30 160
             C 60 160, 80 40, 110 40
             C 140 40, 150 40, 170 40
             C 190 40, 210 160, 240 160
             C 260 160, 270 160, 290 160
             C 310 160, 330 160, 350 160
             C 370 160, 390 160, 410 160
             C 440 160, 470 50, 510 50
             C 540 50, 570 50, 570 50"
          fill="none"
          stroke="#6B21A8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Coloured dots on the curve */}
        {/* Purple dot — start (Inhale begins) */}
        <circle cx="30" cy="160" r="6" fill="#6B21A8" />
        {/* Cyan dot — peak (Hold) */}
        <circle cx="110" cy="40" r="6" fill="#06B6D4" />
        {/* Olive green dot — valley (Exhale) */}
        <circle cx="240" cy="160" r="6" fill="#65A30D" />
        {/* Orange dot — second peak (Inhale) */}
        <circle cx="510" cy="50" r="6" fill="#F59E0B" />

        {/* Phase labels below the curve */}
        <text x="30" y="200" className="breathing-wave__label">Inhale</text>
        <text x="110" y="200" className="breathing-wave__label">Hold</text>
        <text x="205" y="200" className="breathing-wave__label">Exhale</text>
        <text x="290" y="200" className="breathing-wave__label">Hold</text>
        <text x="365" y="200" className="breathing-wave__label">Exhale</text>
        <text x="430" y="200" className="breathing-wave__label">little more</text>
        <text x="530" y="200" className="breathing-wave__label">Inhale</text>
      </svg>
    </div>
  );
}