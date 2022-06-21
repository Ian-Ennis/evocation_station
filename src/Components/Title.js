import TitleImage from "./Logo/TitleImage.png";

function Title() {
  return (
    <div id="title_container">
      <img id="title_image" alt="app_title" src={TitleImage} />
    </div>
  );
}

export default Title;
