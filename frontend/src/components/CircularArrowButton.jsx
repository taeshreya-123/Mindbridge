/**
 * CircularArrowButton — Accessible circular button with a right-arrow icon.
 *
 * Used on Result screen (→ /dashboard) and Dashboard screen (→ /journal).
 *
 * @param {Object} props
 * @param {function} props.onClick   — Click handler (typically navigate)
 * @param {string}   [props.ariaLabel] — Accessible label for screen readers
 */
import './CircularArrowButton.css';

export default function CircularArrowButton({ onClick, ariaLabel = 'Continue' }) {
  return (
    <button
      className="circular-arrow-btn"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9 5l7 7-7 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}