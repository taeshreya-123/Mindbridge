/**
 * InputField — Reusable form input used on Login (×2) and Journal (×1).
 *
 * Renders either a single-line <input> or a multi-line <textarea>
 * depending on the `multiline` prop.
 *
 * @param {Object} props
 * @param {string}   props.label           — Field label text
 * @param {string}   props.value           — Controlled value
 * @param {function} props.onChange         — Change handler: (e) => void
 * @param {string}   [props.placeholder]   — Placeholder text
 * @param {boolean}  [props.multiline=false] — If true, renders <textarea>
 */
import './InputField.css';

export default function InputField({
  label,
  value,
  onChange,
  placeholder = '',
  multiline = false,
  type = 'text',
}) {
  return (
    <div className="input-field">
      <label className="input-field__label">{label}</label>
      {multiline ? (
        <textarea
          className="input-field__textarea"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={5}
        />
      ) : (
        <input
          className="input-field__input"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}