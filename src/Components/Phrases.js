import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"

function Phrases() {
    const [phrases, setPhrases] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/phrases").then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              console.log('phrases useEffect trigger')
              setPhrases(data);
            });
          } else {
            response.json();
            throw Error(response.status, response.statusText);
          }
        })
      }, [])

      console.log(phrases)

      const phraseData = phrases.map(phrase => {
        return (
          <div id="phrases" key={uuid().slice(0,8)}>
            <h5>{phrase.text}</h5>
          </div>
        )
      })

    return (
        <div>
            {phraseData}
        </div>
    )
}

export default Phrases;