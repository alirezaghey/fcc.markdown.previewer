import marked from "marked";
import { useState, useEffect } from "react";
import raw from "./markdown.txt";

marked.setOptions({
  gfm: true,
  breaks: true,
});

function App() {
  const [markdown, setMarkdown] = useState("");
  const [preview, setPreview] = useState("");
  // const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    if (markdown !== "") return;
    fetch(raw)
      .then((res) => res.text())
      .then((text) => {
        setMarkdown(text);
        const result = marked(text);
        setPreview(result);
      });
  }, [markdown, preview]);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
    const result = marked(e.target.value);
    setPreview(result);
  };

  return (
    <>
      <textarea
        id="editor"
        onChange={handleChange}
        value={markdown}
        // placeholder={placeholder}
      />
      <div id="preview" dangerouslySetInnerHTML={{ __html: preview }} />
    </>
  );
}

export default App;
