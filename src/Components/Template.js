import React from "react";

function Template({ clickedImagery, clickedSound }) {

    return (
      <div>
        <b>Template</b>
        {clickedImagery}
        {/* {clickedSound !== [] ? clickedSound : null} */}
      </div>
    );
}

export default Template