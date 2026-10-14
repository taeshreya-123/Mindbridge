/**
 * PrimaryButton — Reusable button used across 7+ screens.
 *
 * Supports "primary" (purple) and "secondary" (lavender) variants,
 * plus a disabled state.
 *
 * @param {Object} props
 * @param {string}   props.label              — Button text
 * @param {function} props.onClick            — Click handler
 * @param {boolean}  [props.disabled=false]    — Disable the button
 * @param {"primary"|"secondary"} [props.variant="primary"] — Visual style
 */
import './PrimaryButton.css';

export default function PrimaryButton({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
}) {
  return (
    <button
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}