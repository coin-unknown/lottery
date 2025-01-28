import { useRef, useState } from 'react';
import styles from './CopyLinkInput.module.scss';

const CopyLinkInput = ({ link }) => {
  const inputRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    }
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="text"
        value={link}
        readOnly
        className={styles.input}
      />
      <button onClick={handleCopy} className={styles.button}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default CopyLinkInput;