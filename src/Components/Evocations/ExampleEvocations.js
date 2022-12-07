import { v4 as uuid } from "uuid";

function ExampleEvocations() {

    const examples = [
        {
          sound_url: `https://evocation-station.s3.amazonaws.com/Audio_Train_Station`,
          image_url: `https://evocation-station.s3.amazonaws.com/Image_Train_Station`,
        },
        {
            text: `Two roads diverged in a yellow wood; I took the one less traveled by, and that has made all the difference.`,
            image_url: `https://evocation-station.s3.amazonaws.com/Image_Roads_Diverged`,
          },
      {
        image_url: `https://evocation-station.s3.amazonaws.com/Image_Chicago_Theatre`,
        sound_url: `https://evocation-station.s3.amazonaws.com/Audio_Cheering`,
      },
    ];

    const exampleEvocations = examples.map((evocation) => {
        return (
          <div id="evocations" key={uuid().slice(0, 8)}>
            {evocation.image_url ? (
              <img id="evocation_image" alt="evocation_image" src={`${evocation.image_url}`} />
            ) : null}
            {evocation.sound_url ? (
              <audio controls className="audio_controls">
                <source src={`${evocation.sound_url}`} />
              </audio>
            ) : null}
            {evocation.text ? (
              <p className="labels">
                <b>{evocation.text}</b>
              </p>
            ) : null}
            &nbsp;<div className="bottom_aligner"></div>
          </div>
        );
      });
    
      return (
        <div id="prebuilt_evocations_container">
          <p className="labels">
            <b>Examples to get you going:</b>
          </p>
          <div id="prebuilt_evocations">{exampleEvocations}</div>
        </div>
      );
}

export default ExampleEvocations