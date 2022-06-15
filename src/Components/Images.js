import { v4 as uuid } from "uuid"
import Title from "./Title";
import Menu from "./Menu";
import Template from "./Template";

function Images({ setPrebuiltEvocations, writing, setWriting, image, setImage, sound, setSound }) {

  const awsImageTable = [
    {
      id: 1,
      title: "Concert Hall",
      url: "https://evocation-station.s3.amazonaws.com/pioilpsr893oo5ucmfczdc7qvk7a"
    },
    {
      id: 2,
      title: "Firefly",
      url: "https://evocation-station.s3.amazonaws.com/o4xbv1030h6h2yfhwcu8uuqo1q27"
    },
    {
      id: 3,
      title: "Breaking Waves",
      url: "https://evocation-station.s3.amazonaws.com/lefg1onaa56yr0zh6gn049hjnf31"
    },
    {
      id: 4,
      title: "Volcano",
      url: "https://evocation-station.s3.amazonaws.com/laotc5on7xsxghqd6iixce627rs1"
    },
    {
      id: 5,
      title: "Rising Dusk",
      url: "https://evocation-station.s3.amazonaws.com/kxmwva61suofvt7jsv91wqnusuh8"
    },
    {
      id: 6,
      title: "Elegance",
      url: "https://evocation-station.s3.amazonaws.com/iqbjmbo5dzrimwgxa766d5r7viqf"
    },
    {
      id: 7,
      title: "Terra Cotta Rain",
      url: "https://evocation-station.s3.amazonaws.com/hkerd5ybj5cvo5bvane72xivfwy9"
    },
    {
      id: 8,
      title: "On The Town",
      url: "https://evocation-station.s3.amazonaws.com/hevd0u0jdxg698rom2hc3zjgifde"
    },
    {
      id: 9,
      title: "Midnight Reflections",
      url: "https://evocation-station.s3.amazonaws.com/g7xm1drxocy3s1yxz0bkpponuqof"
    },
    {
      id: 10,
      title: "Firework",
      url: "https://evocation-station.s3.amazonaws.com/2zk0l9i5q3qilc0zvu1qnpm92y3t"
    },
    {
      id: 11,
      title: "Ignite",
      url: "https://evocation-station.s3.amazonaws.com/zq3di5xzjarvne2g8h4uui0gw8ry"
    },
    {
      id: 12,
      title: "Windmill",
      url: "https://evocation-station.s3.amazonaws.com/ze7ophk6cb9kiw3bguq8l5hdkl2h"
    },
    {
      id: 13,
      title: "VHS",
      url: "https://evocation-station.s3.amazonaws.com/y68b1z7ek7r8hg2q0mjddvqswcvb"
    },
    {
      id: 14,
      title: "Mandrillus sphinx",
      url: "https://evocation-station.s3.amazonaws.com/xjl1k97vbu2f4ebkp3watx2ggreu"
    },
    {
      id: 15,
      title: "Train Station",
      url: "https://evocation-station.s3.amazonaws.com/x0xp2wrs5iqq749oh087pofsgu52"
    },
    {
      id: 16,
      title: "Boombox",
      url: "https://evocation-station.s3.amazonaws.com/vpnrhjvs7i3f07tm6w3zjcs5kdug"
    },
    {
      id: 17,
      title: "Autumn Stream",
      url: "https://evocation-station.s3.amazonaws.com/q4dskxcfgqua5j5zxtu7wh4h8m2p",
    }
  ]

  const imageData = awsImageTable.map(image => {
    return (
      <div id="each_image" key={uuid().slice(0, 8)}>
        <img id="image" onClick={(e) => {e.preventDefault(); console.log(image.url); setImage(image.url)}} src={`${image.url}`} />
      </div>
    )
  })

    return (
      <>
        <Title />
        <Menu />
        <div className="materials">
          <Template setPrebuiltEvocations={setPrebuiltEvocations} writing={writing} setWriting={setWriting} image={image} setImage={setImage} sound={sound} setSound={setSound}/>
          <p className="labels"><b>Images:</b></p>
          <div id="images">
            {imageData}
          </div>
        </div>
      </>
    );
}

export default Images;