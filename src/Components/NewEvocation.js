import React from "react";

function NewEvocation() {

    function handleFileInput(e) {
      e.preventDefault();

      const file = e.target.image_upload.files[0];
      const text = e.target.text.value;

      if (file.size / 1000000 > 5) {
        console.log("too big");
      } else {
        console.log("good; size is under 5 mb");

        const formData = new FormData();
        formData.append("text", text);
        formData.append("file", file);

        // no content headers in post; they are implied as multipart/form-data by the
        // FormData object. Nor is it stringified.

        fetch("http://localhost:3000/evocations", {
          method: "POST",
          body: formData,
        }).then(
          fetch("http://localhost:3000/evocations").then((response) => {
            console.log(response);
            if (response.ok) {
              response.json().then((data) => {
                console.log(data);
              });
            } else {
              response.json();
              throw Error(response.status, response.statusText);
            }
          })
        );
      }
    }

    // turn this into a useEffect upon page load
    function retrieveEvocations(e) {
      e.preventDefault();

      fetch("http://localhost:3000/evocations").then((response) => {
        console.log(response);
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
          });
        } else {
          response.json();
          throw Error(response.status, response.statusText);
        }
      });
    }

    return (
        <>
        <form id="new_evocation" onSubmit={handleFileInput}>
            <input type="file" name="image_upload" accept="image/png, image/jpeg, image/jpg"></input>
            <input type="text" name="text"></input>
            <button type="submit">Submit</button>
        </form>
        <button onClick={retrieveEvocations}>retrieve</button>
        </>
    )
}

export default NewEvocation