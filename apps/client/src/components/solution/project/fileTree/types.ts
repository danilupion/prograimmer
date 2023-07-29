export enum FileType {
  File = 'file',
  Folder = 'folder',
}

export type File = {
  name: string;
  type: FileType.File;
  fullPath: string;
};

export type Folder = {
  name: string;
  type: FileType.Folder;
  children: FileOrFolder[];
  fullPath: string;
};

export type FileOrFolder = File | Folder;
