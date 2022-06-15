import TitleImage from "./Logo/TitleImage.png";

function Title() {
  return (
    <div id="title_container">
      <img id="title_image" src={TitleImage} alt="app_title" />
    </div>
  );
}

export default Title;
