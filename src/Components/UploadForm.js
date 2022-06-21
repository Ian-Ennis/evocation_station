import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function UploadForm({ setNewEvocations }) {
  const rootURL = `https://evocation-station-api.herokuapp.com`;
  const editorRef = useRef(null);

  function uploadNewEvocation(e) {
    e.preventDefault();

    const text = editorRef.current.getContent();
    const picture = e.target.image_upload.files[0];
    const audio = e.target.audio_upload.files[0];

    const formData = new FormData();
    if (text) {
      formData.append("text", text);
    }
    
    if (picture) formData.append("image", picture);
    if (audio) formData.append("audio", audio);

    fetch(`${rootURL}/newevocations`, {
      method: "POST",
      body: formData,
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
      });
    });
  }

  return (
    <div id="new_evocations">
      <p>
        <b>Upload any combination of your own materials..</b>
      </p>
      <div id="editor_uploads_container">
        <p className="labels">Writing:</p>&nbsp;
        <Editor
          id="text_editor"
          tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 300,
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
        <form id="new_evocation_form" onSubmit={uploadNewEvocation}>
          <div id="form_elements">
            <label className="form_label" htmlFor="image_upload">
              Image:{" "}
            </label>
            <input
              type="file"
              name="image_upload"
              accept="image/png, image/jpeg, image/jpg"
            ></input>
            <label className="form_label" htmlFor="audio_upload">
              Sound:{" "}
            </label>
            <input type="file" name="audio_upload" accept="audio/*"></input>
          </div>
          <button id="upload_submit_button" type="submit">
            <b>Commit Evocation</b>
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadForm;
