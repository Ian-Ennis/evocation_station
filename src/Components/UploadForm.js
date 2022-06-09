import React, { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

function UploadForm({ newEvocations, setNewEvocations }) {
  const rootURL = `https://murmuring-caverns-44222.herokuapp.com`;

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  function uploadNewEvocation(e) {
    e.preventDefault();

    const text = editorRef.current.getContent().replace(/(&nbsp;)*/g, "").replace(/(<p>)*/g, "").replace(/<(\/)?p[^>]*>/g, "");;
    // console.log(text)

    // const text = e.target.text.value;
    const picture = e.target.image_upload.files[0];
    const audio = e.target.audio_upload.files[0];

    const formData = new FormData();
    if (text) formData.append("text", text);
    if (picture) formData.append("image", picture);
    if (audio) formData.append("audio", audio);

    fetch(`${rootURL}/newevocations`, {
      method: "POST",
      body: formData
    }).then(() => {
      fetch(`${rootURL}/newevocations`).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setNewEvocations(data);
          });
        } else {
          response.json();
          throw Error(response.status, response.statusText);
        }
      })
    });
  }

  return (
    <div id="new_evocations">
      <p>
        <b>Upload your own materials</b>
      </p>
      <form id="new_evocation_form" onSubmit={uploadNewEvocation}>
        <Editor
          tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        {/* <button onClick={log}>Log editor content</button> */}
        {/* <label for="text">Writing: </label>
        <textarea id="my_text_area" name="text"></textarea> */}
        <label for="image_upload">Add an image: </label>
        <input
          type="file"
          name="image_upload"
          accept="image/png, image/jpeg, image/jpg"
        ></input>
        <label for="audio_upload">Add a sound: </label>
        <input type="file" name="audio_upload" accept="audio/*"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UploadForm;
