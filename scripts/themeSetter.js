//Theme setter file.

function setTheme(theme) {
    if (theme == "nature") {
      document.getElementById("switcher-id").href = "./themes/nature.css";
    } else if (theme == "sky") {
      document.getElementById("switcher-id").href = "./themes/sky.css";
    } else if (theme == "matrix") {
      document.getElementById("switcher-id").href = "./themes/matrix.css";
    } else if (theme == "metalic") {
      document.getElementById("switcher-id").href = "./themes/metalic.css";
    } else if (theme == "default") {
      document.getElementById("switcher-id").href = "./themes/default.css";
    }
  
    localStorage.setItem("style", theme);
}

export {
    //function exported
    setTheme
}