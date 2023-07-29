import FileTreeNode from './FileTreeNode.tsx';
import { Folder } from './types.ts';

type FolderNodeProps = {
  file: Folder;
  level: number;
  onDoubleClick?: (file: string) => void;
};

const FolderNode = ({ file, level, onDoubleClick }: FolderNodeProps) => {
  const paddingLeft = `${level * 20}px`;

  return (
    <div key={file.name}>
      <div style={{ paddingLeft }}>{file.name}</div>
      {file.children && (
        <FileTreeNode files={file.children} level={level + 1} onDoubleClick={onDoubleClick} />
      )}
    </div>
  );
};

export default FolderNode;
