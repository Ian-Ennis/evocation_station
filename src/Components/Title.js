import TitleImage from "./Images/TitleImage.png";

function Title() {
  return (
    <div id="title_container">
      <img id="title_image" alt="app_title" src={TitleImage} />
    </div>
  );
}

export default Title;
