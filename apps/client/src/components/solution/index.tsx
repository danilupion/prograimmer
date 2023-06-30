import { SolutionFile } from '@prograimmer/common/model/api/solutions.js';
import { useCallback, useState } from 'react';

import Code from './code';
import Project from './project';

interface SolutionProps {
  files?: SolutionFile[];
}

const Solution = ({ files }: SolutionProps) => {
  const [openFile, setOpenFile] = useState<string>();
  const openFileHandler = useCallback(
    (file: string) => {
      setOpenFile(file);
    },
    [setOpenFile],
  );

  const selectedFile = files && files.find((c) => c.file === openFile);

  return (
    <>
      <Project files={files && files.map((c) => c.file)} onFileOpen={openFileHandler} />
      <Code code={selectedFile && selectedFile.code} />
    </>
  );
};

export default Solution;
