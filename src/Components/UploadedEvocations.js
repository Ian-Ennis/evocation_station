import React from "react";
import { v4 as uuid } from "uuid"
import ReactHtmlParser from "react-html-parser"

function UploadedEvocations({ newEvocations, setNewEvocations }) {
  const rootURL = `https://evocation-station-api.herokuapp.com`;

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
    return (
      <div id="evocations" key={uuid().slice(0,8)}>
        {evocation.text ? <p>{ReactHtmlParser(evocation.text)}</p> : null}
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
