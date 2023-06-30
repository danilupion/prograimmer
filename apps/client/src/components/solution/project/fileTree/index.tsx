import { useCallback } from 'react';

enum FileType {
  File = 'file',
  Folder = 'folder',
}

type File = {
  name: string;
  type: FileType.File;
  fullPath: string;
};

type Folder = {
  name: string;
  type: FileType.Folder;
  children: FileOrFolder[];
  fullPath: string;
};

type FileOrFolder = File | Folder;

const generateFileStructure = (paths: string[]): FileOrFolder[] => {
  return paths.reduce<FileOrFolder[]>((accumulator, path) => {
    const parts = path.split('/');
    let currentLevel: FileOrFolder[] = accumulator;

    parts.forEach((part, index) => {
      let existingPath = currentLevel.find(
        (f) =>
          f.name === part &&
          f.type === (index === parts.length - 1 ? FileType.File : FileType.Folder),
      );

      if (!existingPath) {
        const newPath: FileOrFolder =
          index === parts.length - 1
            ? {
                name: part,
                type: FileType.File,
                fullPath: path,
              }
            : {
                name: part,
                type: FileType.Folder,
                children: [],
                fullPath: parts.slice(0, index + 1).join('/'),
              };
        currentLevel.push(newPath);
        existingPath = newPath;
      }

      if (existingPath.type === FileType.Folder) {
        currentLevel = existingPath.children;
      }
    });

    return accumulator;
  }, []);
};
interface FileTreeProps {
  files: string[];
  onDoubleClick?: (file: string) => void;
}

const FileTree = ({ files, onDoubleClick }: FileTreeProps) => {
  const renderTree = (files: FileOrFolder[], level = 0) => {
    return files.map((file) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const doubleClickHandler = useCallback(() => {
        console.log('double click', file);
        if (file.type === FileType.File && onDoubleClick) {
          onDoubleClick(file.fullPath);
        }
      }, [file]);

      const paddingLeft = `${level * 20}px`;

      if (file.type === 'file') {
        return (
          <div key={file.name} style={{ paddingLeft }} onDoubleClick={doubleClickHandler}>
            {file.name}
          </div>
        );
      }

      if (file.type === 'folder') {
        return (
          <div key={file.name}>
            <div style={{ paddingLeft }}>{file.name}</div>
            {file.children && renderTree(file.children, level + 1)}
          </div>
        );
      }

      return null;
    });
  };

  return <div>{renderTree(generateFileStructure(files))}</div>;
};

export default FileTree;
