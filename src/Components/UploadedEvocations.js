import React, { useEffect } from "react";
import { v4 as uuid } from "uuid"

function UploadedEvocations({ newEvocations, setNewEvocations }) {
  const rootURL = `https://murmuring-caverns-44222.herokuapp.com/`;

  function deleteNewEvocation(e, evoc) {
    e.preventDefault();

    fetch(`${rootURL}/newevocations/${evoc.id}`, {
      method: "DELETE",
    }).then(() => {
      fetch(`${rootURL}/newevocations/`).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setNewEvocations(data);
          });
        } else {
          response.json();
          throw Error(response.status, response.statusText);
        }
      });
    });
  }

  const evocationData = newEvocations.map(evocation => {
    console.log(evocation)

    if (evocation.text) console.log(evocation.text)
    return (
      <div id="evocations" key={uuid().slice(0,8)}>
        {evocation.text ? <p>{evocation.text}</p> : null}
        {evocation.image ? <img id="evocation_image" src={`${rootURL}${evocation.image}`}/> : null}
        {evocation.audio ? <audio controls>
          <source src={`${rootURL}${evocation.audio}`}/>
        </audio> : null}
        <button onClick={(e) => deleteNewEvocation(e, evocation)}>Delete</button>
      </div>
    )
  })

  return (
    <div id="uploaded_evocations">
      <b>Custom / Uploaded Evocations</b>
      {evocationData}
    </div>
  );
}

export default UploadedEvocations;
