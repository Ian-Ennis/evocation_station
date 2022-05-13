import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"

function Poems() {
    const [poems, setPoems] = useState([])

    useEffect(() => {
        console.log('poems useEffect trigger')
        fetch("http://localhost:3000/poems").then(response => {

          if (response.ok) {
            response.json().then(data => {
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
          <div key={uuid().slice(0,8)}>
            <p><em>{poem.text}</em></p>
          </div>
        )
      })

    return (
        <div id="poems">
            Poems:
            {poemData}
        </div>
    )
}

export default Poems;