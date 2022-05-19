import React, { useEffect } from "react";
import { v4 as uuid } from "uuid"

function PrebuiltEvocations({ prebuiltEvocations, setPrebuiltEvocations }) {
  const rootURL = `http://localhost:3000`;

  useEffect(() => {
    fetch("http://localhost:3000/prebuiltevocations").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setPrebuiltEvocations(data);
        });
      } else {
        response.json();
        throw Error(response.status, response.statusText);
      }
    })
  }, [])

  function deletePrebuiltEvocation(e, evoc) {
    e.preventDefault();

    fetch(`http://localhost:3000/prebuiltevocations/${evoc.id}`, {
      method: "DELETE",
    }).then(() => {
      fetch("http://localhost:3000/prebuiltevocations").then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setPrebuiltEvocations(data);
          });
        } else {
          response.json();
          throw Error(response.status, response.statusText);
        }
      });
    });
  }

  const evocationData = prebuiltEvocations.map(evocation => {
    return (
      <div id="evocations" key={uuid().slice(0,8)}>
        {evocation.text ? <p>{evocation.text}</p> : null}
        {evocation.image_url ? <img src={`${evocation.image_url}`}/> : null}
        {evocation.audio ? <audio controls>
          <source src={`${rootURL}${evocation.audio}`}/>
        </audio> : null}
        <button onClick={(e) => deletePrebuiltEvocation(e, evocation)}>Delete</button>
      </div>
    )
  })

  function retrievePrebuiltEvocations(e) {
    e.preventDefault();

    fetch("http://localhost:3000/prebuiltevocations").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setPrebuiltEvocations(data);
        });
      } else {
        response.json();
        throw Error(response.status, response.statusText);
      }
    })
  }

  return (
    <div id="prebuiltevocations">
      {evocationData}
      {/* <button onClick={(e) => retrievePrebuiltEvocations(e)}>Retrieve prebuilts</button> */}
    </div>
  );
}

export default PrebuiltEvocations;
