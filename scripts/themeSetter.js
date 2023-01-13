//Theme setter file.

function setTheme(theme) {

    const chosenTheme = "./themes/" + theme + ".css";
    document.getElementById("switcher-id").href = chosenTheme;

    localStorage.setItem("style", theme);
}

export {
    //function exported
    setTheme
}
