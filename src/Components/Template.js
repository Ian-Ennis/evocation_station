import React from "react";

function Template({ writing, image, sound }) {
  const rootURL = `http://localhost:3000`;

    return (
      <div id="template">
        <b>Template</b>
        <p>{writing}</p>
        <img src={`${rootURL}${image}`} />
        <audio controls>
          <source src={`${rootURL}${sound}`} />
        </audio>
      </div>
    );
}

export default Template