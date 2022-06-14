import { useEffect } from "react";
import { v4 as uuid } from "uuid"

function PrebuiltEvocations({ prebuiltEvocations, setPrebuiltEvocations }) {
    const rootURL = `https://evocation-station-api.herokuapp.com`;

  useEffect(() => {
    fetch(`${rootURL}/prebuiltevocations`).then((response) => {
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

  const evocationData = prebuiltEvocations.map(evocation => {
    return (
      <div id="evocations" key={uuid().slice(0,8)}>
        {evocation.text ? <p className="labels"><b>{evocation.text}</b></p> : null}
        {evocation.image_url ? <img id="evocation_image" src={`${evocation.image_url}`}/> : null}
        {evocation.sound_url ? <audio controls>
          <source src={`${evocation.sound_url}`}/>
        </audio> : null}
      </div>
    )
  })

  return (
    <div id="prebuilt_evocations_container">
        <p className="labels"><b>Prebuilt Evocations</b></p>
      <div id="prebuilt_evocations">
        {evocationData}
      </div>
    </div>
  );
}

export default PrebuiltEvocations;
