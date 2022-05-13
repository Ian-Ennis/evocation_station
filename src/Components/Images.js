import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"

function Images({ setClickedImagery }) {
    const [images, setImages] = useState([])
    const rootURL = `http://localhost:3000`;

    useEffect(() => {
        fetch("http://localhost:3000/images").then((response) => {
          console.log(response);
          if (response.ok) {
            response.json().then((data) => {
              setImages(data);
              console.log(images);
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
            console.log(response);
            if (response.ok) {
              response.json().then((data) => {
                  console.log(data)
                setImages(data);
              });
            } else {
              response.json();
              throw Error(response.status, response.statusText);
            }
          })
        });
      }

      const imageData = images.map(image => {
        return (
          <div id="imageData" key={uuid().slice(0, 8)}>
            <img onClick={(e) => setClickedImagery(e.target)} src={`${rootURL}${image.image}`} />
          </div>
        );
      })

    return (
      <div>
        Images
        <form id="images" onSubmit={uploadImage}>
          <label for="image_upload">Add an image</label>
          <input type="file" name="image_upload" accept="image/png, image/jpeg, image/jpg"
          ></input>
          <button type="submit">Submit</button>
        </form>
        {imageData}
      </div>
    );
}

export default Images;