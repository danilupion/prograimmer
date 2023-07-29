import { useCallback } from 'react';

import { File } from './types.ts';

type FileNodeProps = {
  file: File;
  level: number;
  onDoubleClick?: (file: string) => void;
};

const FileNode = ({ file, level, onDoubleClick }: FileNodeProps) => {
  const doubleClickHandler = useCallback(() => {
    if (onDoubleClick) {
      onDoubleClick(file.fullPath);
    }
  }, [file.fullPath, onDoubleClick]);

  const paddingLeft = `${level * 20}px`;

  if (file.type === 'file') {
    return (
      <div key={file.name} style={{ paddingLeft }} onDoubleClick={doubleClickHandler}>
        {file.name}
      </div>
    );
  }
};

export default FileNode;
