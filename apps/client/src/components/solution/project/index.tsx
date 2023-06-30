import FileTree from './fileTree';
import styles from './project.module.scss';

type ProjectProps = {
  files?: string[];
  onFileOpen?: (file: string) => void;
};

const Project = ({ files, onFileOpen }: ProjectProps) => {
  return (
    <div className={styles.project}>
      {!files || !files.length ? (
        <div className={styles.noFiles}>No files loaded</div>
      ) : (
        <div className={styles.files}>
          <FileTree files={files} onDoubleClick={onFileOpen} />
        </div>
      )}
    </div>
  );
};

export default Project;
