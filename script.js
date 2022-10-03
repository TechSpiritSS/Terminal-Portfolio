const app = document.querySelector("#app");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.addEventListener("keypress", async function (event) {
  if (event.key === "Enter") {
    await delay(150);
    getInputValue();
    removeInput();
    await delay(150);
    new_line();
  }
});

app.addEventListener("click", function () {
  const input = document.querySelector("input");
  input.focus();
});

async function openTerminal() {
  createText("Welcome to the Terminal");
  await delay(500);
  createText("Stating up...");
  await delay(800);
  createText("You can now interact with the Terminal");
  createCode("Type help", "for a list of commands");
  await delay(500);
  new_line();
}

function new_line() {
  const p = document.createElement("p");
  const span = document.createElement("span");
  const span2 = document.createElement("span");
  p.setAttribute("class", "path");
  p.textContent = "$Sidharth_Sethi";
  span.textContent = " sudo";
  span2.textContent = " ~/guest";
  p.appendChild(span);
  p.appendChild(span2);
  app.appendChild(p);
  const div = document.createElement("div");
  div.setAttribute("class", "type");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const input = document.createElement("input");
  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
}

function removeInput() {
  const div = document.querySelector(".type");
  app.removeChild(div);
}

async function getInputValue() {
  const value = document
    .querySelector("input")
    .value.replace(/\s+/g, "")
    .toLowerCase();
  if (value === "help" || value === "ls") {
    trueValue(value);
    createCode("help", "for a list of commands");
    createCode("clear", "to clear the terminal");
    createCode("about", "to learn more about me");
    createCode("social", "to see my social links");
    createCode("projects", "to see my projects");
  } else if (value === "about") {
    trueValue(value);
    createText(
      "I am a Web Developer with a good knowledge of Data Structures and Algorithms along with SQL. I am currently Google DSC Lead, CodeChef Chapter Event Lead, and Co-Founder of Algoders Community at my Campus. I have 3-star rating at CodeChef. In 2022 I am learning MERN Stack and I am planning to work as a Full-Stack Developer."
    );
  } else if (value === "social") {
    trueValue(value);
    createText(
      `<a href="https://github.com/techspiritss" target="_blank">GitHub</a>`
    );
    createText(
      `<a href="https://www.linkedin.com/in/sidharthsethiss" target="_blank">LinkedIn</a>`
    );
    createText(
      `<a href="https://leetcode.com/techspiritss" target="_blank">LeetCode</a>`
    );
    createText(
      `<a href="https://www.codechef.com/users/techspiritss" target="_blank">CodeChef</a>`
    );
  } else if (value === "projects") {
    trueValue(value);
    createText("Projects:");
    createText(
      `<a href="https://techspiritss.github.io/MyChabi/" target="_blank">MyChabi</a> - MyChabi is a web application to help you out with your passwords`
    );
    createText(
      `<a href="https://github.com/TechSpiritSS/Task-C-" target="_blank">Task C++</a> - A command-line based task management application`
    );
    createText(
      `<a href="https://mohityadav0903.github.io/Notes-Insight" target="_blank">Notes Insight</a> - A note taking app for visually weak and elderly who aren't comfortable with Modern UI`
    );
    createText(
      `<a href="https://github.com/TechSpiritSS/bigInt.git" target="_blank">BigINT Library</a> - This is my own C Library for BigINT made from scratch and it supports 2700 digits`
    );
    createText(
      `<a href="https://techspiritss.github.io/50-Days-50-Projects-Web-Dev/" target="_blank">
      50 Days of Web</a> - 50 Web Apps made over the period of 50 days for learning purpose`
    );
    createText(
      `<a href="https://github.com/TechSpiritSS/Covid-Vaccine" target="_blank">
      Covid Vaccination Slot</a> - This Python Program informs about the available Covid vaccine slots at your pin code according to your age group.`
    );
  } else if (value === "clear" || value === "cls") {
    document.querySelectorAll("p").forEach((e) => e.parentNode.removeChild(e));
    document
      .querySelectorAll("section")
      .forEach((e) => e.parentNode.removeChild(e));
  } else if (value === "sudo") {
    trueValue(value);
    createText("You are not authorized to use this command");
  } else if (value === "cd") {
    trueValue(value);
    createText("There's no directory in this path");
  } else {
    falseValue(value);
    createText(`${value} is not a valid command`);
  }
}

function trueValue(value) {
  const div = document.createElement("section");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const msg = document.createElement("h2");
  msg.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(msg);
  app.appendChild(div);
}

function falseValue(value) {
  const div = document.createElement("section");
  div.setAttribute("class", "type2");
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone");
  const msg = document.createElement("h2");
  msg.setAttribute("class", "error");
  msg.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(msg);
  app.appendChild(div);
}

function createText(text) {
  const p = document.createElement("p");
  p.innerHTML = text;
  app.appendChild(p);
}

function createCode(code, text) {
  const p = document.createElement("p");
  p.innerHTML = `<span class="code">${code}</span> ${text}`;
  app.appendChild(p);
}

openTerminal();
