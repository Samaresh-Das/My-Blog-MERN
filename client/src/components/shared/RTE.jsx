import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const RTE = (props) => {
  const editorRef = useRef(null);

  const [value, setValue] = useState(props.value);
  useEffect(() => setValue(props.value), [props.value]);

  if (editorRef.current) {
    props.description(editorRef.current.getContent());
  }

  return (
    <>
      <Editor
        className="h-[800px]"
        apiKey="whll7lk3s9rla4ced98crai92lt7i377kxf48fvbojlxjkbv"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={props.value}
        value={value}
        onEditorChange={(newValue, editor) => setValue(newValue)}
        init={{
          height: window.innerWidth < 768 ? 450 : 300, // ← Mobile vs desktop
          plugins: [
            "advlist autolink link image lists charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
            "table emoticons template paste help",
          ],
          toolbar:
            "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image | print preview media fullpage | code | help",
          menu: {
            favs: {
              title: "My Favorites",
              items: "code visualaid | searchreplace | emoticons",
            },
          },
          menubar: "favs file edit view insert format tools table help",
          skin: "oxide-dark", // dark toolbar/chrome
          content_css: "dark", // dark editor content
          content_style: `
                          body {
                            background-color: #1F2937;
                            background-opacity: 0.2;
                            background-blur: 0px;
                            color: #f3f4f6;
                            font-family: Helvetica, Arial, sans-serif;
                            font-size: 14px;
                          }
                          a { color: #a78bfa; }
                          p { color: #f3f4f6; }
                          h1, h2, h3, h4, h5, h6 { color: #fff; }
                        `,
        }}
      />
    </>
  );
};

export default RTE;
