/**
 * BreathBlobs — Animated blob visualisation for the breathing exercise.
 *
 * Adapted from the 21st.dev "AnimatedBlobs" component with these MindBridge
 * customisations:
 *   • "use client" directive removed (not needed in Vite)
 *   • <style jsx> block replaced with plain CSS in BreatheScreen.css
 *   • <span>Blobs</span> label removed
 *   • Outer container class → "breath-blobs"
 *   • Blob colours → MindBridge purple palette:
 *       #6B21A8, #A855F7, #C4B5FD, #E9D5FF
 *   • Height reduced from 80vmin → 50vmin
 *   • Accepts a `scale` prop (number, default 1) applied via inline transform
 *
 * No new dependencies — pure CSS animations only.
 *
 * @param {Object} props
 * @param {number} [props.scale=1] — Scale multiplier applied to the outer wrapper
 */
export default function BreathBlobs({ scale = 1 }) {
  return (
    <div
      className="breath-blobs"
      style={{ transform: `scale(${scale})` }}
    >
      <div className="breath-blobs__spin">
        <div className="breath-blobs__blob breath-blobs__blob--1" />
        <div className="breath-blobs__blob breath-blobs__blob--2" />
        <div className="breath-blobs__blob breath-blobs__blob--3" />
        <div className="breath-blobs__blob breath-blobs__blob--4" />
      </div>
    </div>
  );
}