type ProjectProps = {
  files?: string[];
};

const Project = ({ files }: ProjectProps) => {
  return (
    <div id="project">
      {!files || !files.length ? (
        <div className="no-files">No files loaded</div>
      ) : (
        <div className="files">
          {files.map((file) => (
            <div key={file} className="file">
              {file}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Project;
