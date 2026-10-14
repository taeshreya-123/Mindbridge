/**
 * GoldStar — Inline SVG star shape with centred text.
 *
 * Used on the Streak screen to display the "5 Days!" badge.
 * Uses an SVG <polygon> for the star shape with an absolutely
 * positioned text overlay.
 *
 * @param {Object} props
 * @param {string} [props.text="5 Days!"] — Text displayed inside the star
 */

export default function GoldStar({ text = '5 Days!' }) {
  return (
    <div className="gold-star" aria-label={text}>
      {/* SVG star polygon */}
      <svg
        className="gold-star__svg"
        viewBox="0 0 200 200"
        width="160"
        height="160"
        aria-hidden="true"
      >
        <polygon
          points="100,10 125,70 190,78 140,125 155,190 100,160 45,190 60,125 10,78 75,70"
          fill="#E5B94E"
          stroke="#D4A83E"
          strokeWidth="2"
        />
      </svg>
      {/* Text overlay centred on the star */}
      <span className="gold-star__text">{text}</span>
    </div>
  );
}