import Project from "~/components/solution/project";
import Code from "~/components/solution/code";
import type { SolutionFile } from "~/utils/openai";
import { useCallback, useState } from "react";

interface SolutionProps {
  solution?: SolutionFile[];
}

const Solution = ({ solution }: SolutionProps) => {
  const [openFile, setOpenFile] = useState<string>();
  const openFileHandler = useCallback(
    (file: string) => {
      setOpenFile(file);
    },
    [setOpenFile]
  );

  const selectedFile = solution && solution.find((c) => c.file === openFile);

  return (
    <>
      <Project
        files={solution && solution.map((c) => c.file)}
        onFileOpen={openFileHandler}
      />
      <Code code={selectedFile && selectedFile.code} />
    </>
  );
};

export default Solution;
