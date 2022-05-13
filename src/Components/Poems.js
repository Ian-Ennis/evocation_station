import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"

function Poems() {
    const [poems, setPoems] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/poems").then(response => {
          if (response.ok) {
            response.json().then(data => {
              console.log('poems useEffect trigger')
              setPoems(data)
            })
          } else {
            response.json();
            throw Error(response.status, response.statusText)
          }
        })
      }, [])

      const poemData = poems.map(poem => {
        return (
          <div id="poems" key={uuid().slice(0,8)}>
            <p><em>{poem.text}</em></p>
          </div>
        )
      })

    return (
        <div>
            {poemData}
        </div>
    )
}

export default Poems;