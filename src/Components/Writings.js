import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"

function Writings({ setWriting }) {
    const [writings, setWritings] = useState([])

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

      console.log(writings)

      const writingData = writings.map(w => {
        return (
          <div onClick={() => setWriting(w.text)} key={uuid().slice(0,8)}>
            <h5>{w.text}</h5>
          </div>
        )
      })

    return (
        <div id="writings">
            Writings:
            {writingData}
        </div>
    )
}

export default Writings;