import FileTree from "~/components/solution/project/fileTree";

type ProjectProps = {
  files?: string[];
  onFileOpen?: (file: string) => void;
};

const Project = ({ files, onFileOpen }: ProjectProps) => {
  return (
    <div id="project">
      {!files || !files.length ? (
        <div className="no-files">No files loaded</div>
      ) : (
        <div className="files">
          <FileTree files={files} onDoubleClick={onFileOpen} />
        </div>
      )}
    </div>
  );
};

export default Project;
