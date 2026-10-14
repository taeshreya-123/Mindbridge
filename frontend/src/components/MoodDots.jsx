/**
 * MoodDots — Row of 4 small coloured dots.
 *
 * No props — renders a fixed decorative row of dots in:
 * green, blue, gold, pink.
 * Used on the Result screen.
 */
import './MoodDots.css';

export default function MoodDots() {
  const dotColors = ['#22C55E', '#60A5FA', '#E5B94E', '#F87171'];

  return (
    <div className="mood-dots" aria-hidden="true">
      {dotColors.map((color, index) => (
        <span
          key={index}
          className="mood-dots__dot"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}