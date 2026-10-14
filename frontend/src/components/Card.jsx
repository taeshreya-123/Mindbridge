/**
 * Card — Reusable card component used on Result, Dashboard, and Service screens.
 *
 * Supports two variants:
 *   - "square": Large card for the Result screen (coloured background, centered content)
 *   - "row":    Horizontal row card for Dashboard and Service screens
 *
 * @param {Object} props
 * @param {string}          props.color    — CSS colour value (e.g. "#22C55E")
 * @param {"square"|"row"}  props.variant  — Card layout type
 * @param {React.ReactNode} props.children  — Card content
 */
import './Card.css';

export default function Card({ color, variant = 'row', children }) {
  return (
    <div
      className={`card card--${variant}`}
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
}