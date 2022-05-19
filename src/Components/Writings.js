import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"
import Template from "./Template";

function Writings({ evocations, setEvocations, writing, setWriting, image, setImage, sound, setSound }) {
    const [writings, setWritings] = useState([])

    useEffect(() => {
      console.log("in writings use effect")
        fetch("http://localhost:3000/writings").then((response) => {
          if (response.ok) {
            response.json().then((data) => {
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
          <div onClick={() => setWriting(w.text)} key={uuid().slice(0,8)}>
            <h5>{w.text}</h5>
          </div>
        )
      })

    return (
        <div id="writings">
          <Template setEvocations={setEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound} />
            Writings:
            {writingData}
        </div>
    )
}

export default Writings;