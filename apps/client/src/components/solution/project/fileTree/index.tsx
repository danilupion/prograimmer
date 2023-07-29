import FileTreeNode from './FileTreeNode.tsx';
import { FileOrFolder, FileType } from './types.ts';

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
  const fileStructure = generateFileStructure(files);

  return (
    <div>
      <FileTreeNode files={fileStructure} onDoubleClick={onDoubleClick} />
    </div>
  );
};

export default FileTree;
