import { v4 as uuid } from "uuid";
import Title from "../Title";
import NavBar from "../NavBar"
import Template from "../Evocations/Template";

function Images({
  currentUser,
  setPrebuiltEvocations,
  writing,
  setWriting,
  image,
  setImage,
  sound,
  setSound,
}) {
  const awsImageTable = [
    {
      id: 1,
      title: "Concert Hall",
      url: "https://evocation-station.s3.amazonaws.com/Image_Symphony",
    },
    {
      id: 2,
      title: "Firefly",
      url: "https://evocation-station.s3.amazonaws.com/Image_Lightning_Bug",
    },
    {
      id: 3,
      title: "Breaking Waves",
      url: "https://evocation-station.s3.amazonaws.com/Image_Breaking_Waves",
    },
    {
      id: 4,
      title: "Volcano",
      url: "https://evocation-station.s3.amazonaws.com/Image_Volcano",
    },
    {
      id: 5,
      title: "Rising Dusk",
      url: "https://evocation-station.s3.amazonaws.com/Image_Forest_Moon+",
    },
    {
      id: 6,
      title: "Elegance",
      url: "https://evocation-station.s3.amazonaws.com/Image_Dinner_Party",
    },
    {
      id: 7,
      title: "Terra Cotta Rain",
      url: "https://evocation-station.s3.amazonaws.com/Image_Porch_Rainstorm",
    },
    {
      id: 8,
      title: "On The Town",
      url: "https://evocation-station.s3.amazonaws.com/Image_Chicago_Theatre",
    },
    {
      id: 9,
      title: "Midnight Reflections",
      url: "https://evocation-station.s3.amazonaws.com/Image_Nighttime_Bay",
    },
    {
      id: 10,
      title: "Firework",
      url: "https://evocation-station.s3.amazonaws.com/Image_Firecracker",
    },
    {
      id: 11,
      title: "Ignite",
      url: "https://evocation-station.s3.amazonaws.com/Image_Flames",
    },
    {
      id: 12,
      title: "Windmill",
      url: "https://evocation-station.s3.amazonaws.com/Image_Windmill",
    },
    {
      id: 13,
      title: "VHS",
      url: "https://evocation-station.s3.amazonaws.com/Image_VHS",
    },
    {
      id: 14,
      title: "Mandrillus sphinx",
      url: "https://evocation-station.s3.amazonaws.com/Image_Baboon",
    },
    {
      id: 15,
      title: "Train Station",
      url: "https://evocation-station.s3.amazonaws.com/Image_Train_Station",
    },
    {
      id: 16,
      title: "Boombox",
      url: "https://evocation-station.s3.amazonaws.com/Image_Boombox",
    },
    {
      id: 17,
      title: "Autumn Stream",
      url: "https://evocation-station.s3.amazonaws.com/Image_Fall_Stream",
    },
  ];

  const imageData = awsImageTable.map((image) => {
    return (
      <div id="each_image" key={uuid().slice(0, 8)}>
        <img
          id="image" alt="crafting_image"
          onClick={(e) => {
            e.preventDefault();
            setImage(image.url);
          }}
          src={`${image.url}`}
        />
      </div>
    );
  });

  return (
    <>
      <Title />
      <NavBar />
      <div className="materials">
        <Template
          currentUser={currentUser}
          setPrebuiltEvocations={setPrebuiltEvocations}
          writing={writing}
          setWriting={setWriting}
          image={image}
          setImage={setImage}
          sound={sound}
          setSound={setSound}
        />
        <p className="labels">
          <b>Images:</b>
        </p>
        <div id="images">{imageData}</div>
      </div>
    </>
  );
}

export default Images;
