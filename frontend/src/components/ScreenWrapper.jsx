/**
 * ScreenWrapper — Layout wrapper for every screen in MindBridge.
 *
 * Renders an optional back-arrow button, an optional title,
 * and the screen's children content inside a consistent container.
 *
 * @param {Object} props
 * @param {boolean}  [props.showBack=true] — Whether to show the back-arrow button
 * @param {string}   [props.title]         — Optional title in the top bar
 * @param {React.ReactNode} props.children  — Screen content
 */
import './ScreenWrapper.css';

export default function ScreenWrapper({ showBack = true, title, children }) {
  /**
   * Navigate back one step in browser history.
   * Works because our app has a linear forward flow.
   */
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="screen-wrapper">
      {/* Top bar with optional back arrow and title */}
      <div className="screen-wrapper__topbar">
        {showBack && (
          <button
            className="screen-wrapper__back"
            onClick={handleBack}
            aria-label="Go back"
          >
            {/* Inline SVG back arrow icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {title && <h2 className="screen-wrapper__title">{title}</h2>}
      </div>

      {/* Main content area */}
      <div className="screen-wrapper__content">
        {children}
      </div>
    </div>
  );
}