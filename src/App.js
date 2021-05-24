import marked from "marked";
import { useState, useEffect } from "react";
import raw from "./markdown.txt";
import "./App.css";

marked.setOptions({
  gfm: true,
  breaks: true,
});

function App() {
  const [markdown, setMarkdown] = useState("");
  const [preview, setPreview] = useState("");

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
    const val = e.target.value !== "" ? e.target.value : " ";
    setMarkdown(val);
    const result = marked(val);
    setPreview(result);
  };

  return (
    <>
      <textarea
        className="w-3/4 m-10 h-72 max-w-screen-md border-black border p-2 font-mono"
        id="editor"
        onChange={handleChange}
        value={markdown}
      />
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: preview }}
        className="bg-gray-100 mx-10 p-6"
      />
    </>
  );
}

export default App;
