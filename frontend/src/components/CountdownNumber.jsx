/**
 * CountdownNumber — Displays a single large purple number with a pop animation.
 *
 * The component is keyed by `value`, so React unmounts and remounts it whenever
 * the number changes, retriggering the CSS pop animation each time.
 *
 * @param {Object} props
 * @param {number} props.value — The number to display (e.g. 1, 2, 3 …)
 */
import './CountdownNumber.css';

export default function CountdownNumber({ value }) {
  return (
    /* Key by value forces a remount on every change → CSS animation replays */
    <span key={value} className="countdown-number">
      {value}
    </span>
  );
}