import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"
import Template from "./Template";

function Images({ setPrebuiltEvocations, writing, setWriting, image, setImage, sound, setSound }) {
    const [images, setImages] = useState([])
    const rootURL = `http://localhost:3000`;

    useEffect(() => {
        fetch("http://localhost:3000/images").then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              setImages(data);
            });
          } else {
            response.json();
            throw Error(response.status, response.statusText);
          }
        });
      }, []);

    function uploadImage(e) {
        e.preventDefault();
    
        const image = e.target.image_upload.files[0];
        const formData = new FormData();
        formData.append("image", image);

        fetch("http://localhost:3000/images", {
          method: "POST",
          body: formData
        }).then(() => {
          fetch("http://localhost:3000/images").then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                setImages(data);
              });
            } else {
              response.json();
              throw Error(response.status, response.statusText);
            }
          })
        });
      }

      function deleteImage(e, i) {
        e.preventDefault();

        fetch(`http://localhost:3000/images/${i.id}`, {
          method: "DELETE",
        }).then(() => {
          fetch("http://localhost:3000/images").then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                setImages(data);
              });
            } else {
              response.json();
              throw Error(response.status, response.statusText);
            }
          });
        });
      }

      const imageData = images.map(i => {
        return (
          <div id="each_image" key={uuid().slice(0, 8)}>
            <img id="image" onClick={(e) => {e.preventDefault(); setImage(i.image)}} src={`${rootURL}${i.image}`} />
          </div>
        );
      })

    return (
      <div>
        <Template setPrebuiltEvocations={setPrebuiltEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound}/>
        <p><b>Images</b></p>
        <form onSubmit={uploadImage}>
          <label for="image_upload">Upload an image: </label>
          <input type="file" name="image_upload" accept="image/png, image/jpeg, image/jpg"
          ></input>
          <button type="submit">Submit</button>
        </form>
        <div id="images">
          {imageData}
        </div>
      </div>
    );
}

export default Images;