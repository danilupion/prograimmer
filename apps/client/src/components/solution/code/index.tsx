import hljs from 'highlight.js';

import styles from './code.module.scss';

interface CodeProps {
  code?: string;
}
const Code = ({ code }: CodeProps) => {
  return (
    <pre className={styles.code}>
      <code
        dangerouslySetInnerHTML={{
          __html: hljs.highlightAuto(code || '').value,
        }}
      />
    </pre>
  );
};

export default Code;
