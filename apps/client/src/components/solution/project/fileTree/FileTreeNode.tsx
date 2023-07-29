import FileNode from './FileNode.tsx';
import FolderNode from './FolderNode.tsx';
import { FileOrFolder, FileType } from './types.ts';

type FileTreeNodeProps = {
  files: FileOrFolder[];
  level?: number;
  onDoubleClick?: (file: string) => void;
};

const FileTreeNode = ({ files, level = 0, onDoubleClick }: FileTreeNodeProps) => {
  return files.map((file) => {
    let node = null;
    switch (file.type) {
      case FileType.File: {
        node = <FileNode file={file} level={level} onDoubleClick={onDoubleClick} />;
        break;
      }
      case FileType.Folder: {
        node = <FolderNode file={file} level={level} onDoubleClick={onDoubleClick} />;
        break;
      }
    }

    return node;
  });
};

export default FileTreeNode;
