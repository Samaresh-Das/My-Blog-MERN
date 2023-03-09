import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const RTE = (props) => {
  const editorRef = useRef(null);

  if (editorRef.current) {
    props.description(editorRef.current.getContent());
  }

  return (
    <>
      <Editor
        className="h-[800px]"
        apiKey="whll7lk3s9rla4ced98crai92lt7i377kxf48fvbojlxjkbv"
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          selector: "textarea",
          height: 300,
          plugins: [
            "advlist autolink link image lists charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
            "table emoticons template paste help",
          ],
          toolbar:
            "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image | print preview media fullpage | code" +
            " help",
          menu: {
            favs: {
              title: "My Favorites",
              items: "code visualaid | searchreplace | emoticons",
            },
          },
          menubar: "favs file edit view insert format tools table help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};

export default RTE;
