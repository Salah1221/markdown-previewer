import "./App.css";
import React, { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
// I copied the content of the json file from https://www.markdownguide.org/api/v1/basic-syntax.json to data.json
// since this api doesn't work anymore (it doesn't use cors)
import data from "./data.json";
import useLocalStorage from "./useLocalStorage";

const App = () => {
  const [code, setCode] = useState(useLocalStorage());
  const [compiled, setCompiled] = useState(
    DOMPurify.sanitize(marked.parse(useLocalStorage()))
  );
  const [selectedBtn, setSelectedBtn] = useState("md");

  useLocalStorage(code);

  const openMD = () => {
    console.log(0);
    setSelectedBtn("md");
  };

  const openPreview = () => {
    console.log(0);
    setSelectedBtn("preview");
  };

  const openDoc = () => {
    setSelectedBtn("doc");
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(DOMPurify.sanitize(marked.parse(e.target.value)));
  };

  return (
    <>
      <h1 className="title">MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button
            onClick={openMD}
            className={selectedBtn === "md" ? "btn" : ""}
          >
            MarkDown
          </button>
          <button
            onClick={openPreview}
            className={selectedBtn === "preview" ? "btn" : ""}
          >
            Preview
          </button>
          <button
            onClick={openDoc}
            className={selectedBtn === "doc" ? "btn" : ""}
          >
            Documentation
          </button>
        </div>
        {selectedBtn === "md" ? (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        ) : selectedBtn === "preview" ? (
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: compiled }}
          ></div>
        ) : (
          <div className="docs">
            {data.basic_syntax.map((instruction, i) => (
              <>
                <h2>{instruction.name}</h2>
                <p>{instruction.description}</p>
                {data.basic_syntax[i].examples.map((example, j) => (
                  <div className="example">
                    <h3>{`Example ${j + 1}:`}</h3>
                    <p>- Markdown:</p>
                    <pre>
                      <code>{example.markdown}</code>
                    </pre>
                    <p>- HTML:</p>
                    <pre>
                      <code>{example.html}</code>
                    </pre>
                  </div>
                ))}
                {data.basic_syntax[i].additional_examples.map((add_example) => (
                  <div className="example">
                    <h3>{add_example.name}</h3>
                    <p>{add_example.description}</p>
                    <p>- Markdown:</p>
                    <pre>
                      <code>{add_example.markdown}</code>
                    </pre>
                    <p>- HTML:</p>
                    <pre>
                      <code>{add_example.html}</code>
                    </pre>
                  </div>
                ))}
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
