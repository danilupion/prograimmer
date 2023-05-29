import hljs from "highlight.js";

interface CodeProps {
  code?: string;
}
const Code = ({ code }: CodeProps) => {
  return (
    <pre id="code">
      <code
        dangerouslySetInnerHTML={{
          __html: hljs.highlightAuto(code || "").value,
        }}
      />
    </pre>
  );
};

export default Code;
