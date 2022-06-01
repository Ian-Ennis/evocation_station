import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"
import Template from "./Template";

function Writings({ setPrebuiltEvocations, writing, setWriting, image, setImage, sound, setSound }) {
    const [writings, setWritings] = useState([])

    useEffect(() => {
      console.log("in writings use effect")
        fetch("http://localhost:3000/writings").then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              console.log(data)
              setWritings(data);
            });
          } else {
            response.json();
            throw Error(response.status, response.statusText);
          }
        })
      }, [])

      const writingData = writings.map(w => {
        return (
          <p id="each_writing" onClick={() => setWriting(w.text)} key={uuid().slice(0,8)}>
            {w.text}
          </p>
        )
      })

    return (
        <div>
          <Template setPrebuiltEvocations={setPrebuiltEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />
            <p><b>Writings:</b></p>
            <div id="writings">
              {writingData}
            </div>
        </div>
    )
}

export default Writings;