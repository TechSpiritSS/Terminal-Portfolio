//Theme setter file.


function setTheme(theme) {
    const chosenTheme = "./themes/" + theme + ".css";
    document.getElementById("switcher-id").href = chosenTheme;
    
    localStorage.setItem("style", theme);
    if (theme === "default") {
        document.documentElement.setAttribute("data-theme", "default");
    } else if (theme === "nature") {
        document.documentElement.setAttribute("data-theme", "nature");
    } else if (theme === "metalic") {
        document.documentElement.setAttribute("data-theme", "metalic");
    } else if (theme === "matrix") {
        document.documentElement.setAttribute("data-theme", "matrix");
    } else if (theme === "sky") {
        document.documentElement.setAttribute("data-theme", "sky");
    } else if (theme === "dracula") {
        document.documentElement.setAttribute("data-theme", "dracula");
    } else if (theme === "vibrant") {
        document.documentElement.setAttribute("data-theme", "vibrant");
    } else if (theme === "galaxy") {
        document.documentElement.setAttribute("data-theme", "galaxy");
    }
    localStorage.setItem("style", theme);
}

export {
    //function exported
    setTheme
}
