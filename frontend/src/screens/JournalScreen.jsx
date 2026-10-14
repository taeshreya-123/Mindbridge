/**
 * JournalScreen — Journal entry screen (/journal).
 *
 * Displays an AI-style message and a multiline text input for
 * the student to write about how they're feeling.
 * Stores the journal entry in MoodContext.
 *
 * Uses: ScreenWrapper, InputField (multiline), PrimaryButton (×2)
 */
import { useNavigate } from 'react-router-dom';
import { useMood } from '../context/MoodContext';
import ScreenWrapper from '../components/ScreenWrapper';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import './JournalScreen.css';

export default function JournalScreen() {
  const navigate = useNavigate();
  const { journalEntry, setJournalEntry } = useMood();

  return (
    <ScreenWrapper showBack={true}>
      {/* AI message */}
      <p className="journal__message">
        Care to write down what you are going Through? I might be an AI but I
        can search and find who can help you know!
      </p>

      {/* Multiline journal input */}
      <InputField
        label="Journal Entry"
        value={journalEntry}
        onChange={(e) => setJournalEntry(e.target.value)}
        placeholder="Write Anything here, I don't judge"
        multiline={true}
      />

      {/* Previous journal entries button (secondary) */}
      <PrimaryButton
        label="Previous Journal Entries"
        variant="secondary"
        onClick={() => {}} // Placeholder — no action in MVP
      />

      {/* Submit button */}
      <PrimaryButton
        label="Submit"
        onClick={() => navigate('/service')}
      />
    </ScreenWrapper>
  );
}