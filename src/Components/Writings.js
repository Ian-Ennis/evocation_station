import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"
import Template from "./Template";

function Writings({ writing, setWriting, test }) {
    const [writings, setWritings] = useState([])

    console.log(test)

    useEffect(() => {
        console.log('writings useEffect trigger')

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
          <Template writing={writing}/>
            Writings:
            {writingData}
        </div>
    )
}

export default Writings;