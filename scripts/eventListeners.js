//Event Listeners are defined in this file. These include events like - click, enter, UpArrow, etc

//Imports done
import {
    neofetch,
    removeNeoFetch,
    getInputValue,
    new_line,
    removeInput,
    trueValue,
    falseValue,
    createText,
    createCode,
    downloadFile
} from "./functions.js";
import { commandsList } from "../script.js";

const app = document.querySelector("#app");
let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let history = JSON.parse(localStorage.getItem("history")) || [];
let count = history.length;

//Event listeners added to app
app.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
        await delay(150);
        await getInputValue(history,true);
        // removeInput();
        await delay(150);
        new_line();
        count = history.length;
    }
    if (event.key === "ArrowUp") {
        if (count > 0) {
            await delay(0.005);
            const input = document.querySelector("input");
            input.value = history[--count];
            const end = input.value.length;
            input.setSelectionRange(end, end);
        }
    }
    if (event.key === "ArrowDown") {
        if (count < history.length - 1) {
            const input = document.querySelector("input");
            input.value = history[++count];
        } else {

            if (count === history.length - 1) {
                count++;
            }
            const input = document.querySelector("input");
            input.value = "";
        }
    }
    if (event.key === "Tab") {
        event.preventDefault();
        const input = document.querySelector("input");
        const toComplete = input.value;
        const completed = commandsList.find((command) =>
            command.startsWith(toComplete)
        );
        if (toComplete && completed) {
            // autocomplete if there was something typed in and it matches the start
            // of some command
            input.value = completed;
        }
    }
    if (event.ctrlKey) {
        if (event.key === "l" || event.key === "L") {
            document
                .querySelectorAll("p")
                .forEach((e) => e.parentNode.removeChild(e));
            document
                .querySelectorAll("section")
                .forEach((e) => e.parentNode.removeChild(e));
            removeInput();
            await delay(150);
            new_line();
            count = history.length;
        }
    }
});

app.addEventListener("click", function () {
    const input = document.querySelector("input");
    input.focus();
});
