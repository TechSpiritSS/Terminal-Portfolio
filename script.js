import config from "./config.json" assert { type: "json" };

const app = document.querySelector("#app");
const bodyContainer = document.querySelector("#bodyContainer");
const greenButton = document.querySelector("#greenButton");
const yellowButton = document.querySelector("#yellowButton");
const redButton = document.querySelector("#redButton");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const history = [];
const contributors = [];
const userBlogs = [];
const IpDetails = [];
const userRepos = [];
let githubStats = {};
var count = 0;
var followers = 0, following = 0;
var ranking = 0, totalSolved = 0, easySolved = 0, mediumSolved = 0, hardSolved = 0;
const commandsList = [
  "help",
  "clear",
  "about",
  "social",
  "projects",
  "repos",
  "cheer",
  "ipconfig",
  "contributors",
  "neofetch",
];

greenButton.addEventListener("click", () => {
  const container = document.querySelector("#screenContainer");
  container.classList.contains("maximized")
    ? container.classList.remove("maximized")
    : container.classList.add("maximized");
});

yellowButton.addEventListener("click", () => {
  bodyContainer.classList.contains("minimized")
    ? bodyContainer.classList.remove("minimized")
    : bodyContainer.classList.add("minimized");
});

redButton.addEventListener("click", () => {
  exit();
});

app.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    await delay(150);
    getInputValue();
    removeInput();
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
      
      if (count === history.length - 1){
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

async function openTerminal() {
  createText("Welcome to the Terminal");
  await delay(500);
  createText("Starting up...");
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
  p.textContent = config.terminal.user + " ";
  span.textContent = config.terminal.host + " ";
  span2.textContent = config.terminal.path + " ";
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

async function fetchGithubStats() {
  const githubLink = config.social.find((c) => c.title === "Github").link;
  const githubUsername =
    githubLink.split("/")[githubLink.split("/").length - 1];
  const responseRaw = await fetch(
    `https://api.github.com/users/${githubUsername}`
  );
  const response = await responseRaw.json();

  createText(`Github Bio: ${response.bio}`);
  createText(`Number of repositories : ${response.public_repos}`);
  createText(`Number of gists: ${response.public_gists}`);
  createText(`Number of followers: ${response.followers}`);
  createText(`Number of following: ${response.following}`);
}
async function fetchGithubSocialStats() {
  const githubLink = config.social.find((c) => c.title === "Github").link;
  const githubUsername =
    githubLink.split("/")[githubLink.split("/").length - 1];
  const responseRaw = await fetch(
    `https://api.github.com/users/${githubUsername}`
  );
  const response = await responseRaw.json();
  followers = response.followers
  following = response.following
}
async function fetchLinkedInStats() {
  const Linkedinkink = config.social.find((c) => c.title === "LinkedIn").link;
  const LinkedinUsername =
    Linkedinkink.split("/")[Linkedinkink.split("/").length - 1];
  const responseRaw = await fetch(
    `https://api.linkedin.com/v2/connections?q=viewer&projection=(paging)`
  );
  const response = await responseRaw.json();
  connections = response.connections
}

async function fetchLeetCodeStats() {
  const leetcodelink = config.social.find((c) => c.title === "LeetCode").link;
  const leetcodeusername =
    leetcodelink.split("/")[leetcodelink.split("/").length - 1];
  const responseRaw = await fetch(
    `https://leetcode-stats-api.herokuapp.com/${leetcodeusername}`
  );
  const response = await responseRaw.json();
  totalSolved = response.totalSolved
  easySolved = response.easySolved
  mediumSolved = response.mediumSolved
  hardSolved = response.hardSolved
  ranking = response.ranking
}
fetchGithubSocialStats()
fetchLinkedInStats()
fetchLeetCodeStats()

async function getInputValue() {
  const val = document.querySelector("input").value.trim().toLowerCase();
  const a = val.split(' ')
  const flag = a[1]
  const value = a[0]
  if (value.substring(0, 5) === "cheer") {
    value.substring(0, 5).toLowerCase();
  } else {
    value.replace(/\s+/g, "").toLowerCase();
  }

  history.push(document.querySelector("input").value);
  count++;
  switch (value) {
    case "help":
    case "ls":
      trueValue(value);
      createCode("help", "for a list of commands");
      createCode("clear", "to clear the terminal");
      createCode("about", "to learn more about me");
      createCode("social", "to see my social links (add flags '-l' for links and '-d' for detailed results)");
      createCode("projects", "to see my projects");
      createCode("blogs", "to see my recent blogs");
      createCode("contact", "to enquire about my services");
      createCode("cheer", "to appreciate my work");
      createCode("repos", "to see my github repositories");
      createCode("ipconfig", "to see your IP details");
      createCode("github", "to see my github stats");
      createCode("contributors", "to see all the contributors");
      break;
    case "neofetch":
      neofetch();
      break;

    case "about":
      trueValue(value);
      createText(config.about);
      break;

    case "social":
      if (flag == '-l') {
        trueValue(val)
        config.social.forEach((item) => {
          createText(`${item.title} :- <a href=${item.link} target="_blank">${item.link}</a>
          `);
        });
        break;
      }
      else if (flag == '-d') {
        trueValue(val)
        config.social.forEach((item) => {
          createText(`${item.title} Link :- <a href=${item.link} target="_blank">${item.link}</a>
          `);
          if (item.title == "Github") {
            createText(`Number of followers: ${followers}`);
            createText(`Number of following: ${following}`);
          }
          if (item.title == "LinkedIn") {
            createText(`Connections :- ${connections}`);
          }
          if (item.title == "LeetCode") {
            createText(`Problems Solved: ${totalSolved}`);
            createText(`Distribution:- Easy:${easySolved} Medium:${mediumSolved} Hard:${hardSolved}`);
            createText(`Ranking: ${ranking}`);
          }

          if (item.title == "Codechef") {
            createText(`Rank :- ${item.rank}`);
            createText(`Rating :- ${item.rating}`);
          }
        });
        break;
      }

      trueValue(value);
      config.social.forEach((item) => {
        createText(`<a href=${item.link} target="_blank">${item.title}</a>`);
      });
      break;

    case "projects":
      trueValue(value);
      createText("Projects:");
      config.projects.forEach((item) => {
        createText(
          `<a href=${item.link} target="_blank">${item.title}</a> - ${item.description}`
        );
      });
      break;

    case "blogs":
      trueValue(value);
      createText("Recent Blogs:");
      // Hashnode Feed URL: https://username.hashnode.dev/rss.xml
      // Dev.to Feed URL: https://dev.to/feed/username
      // Medium Feed URL: https://medium.com/feed/@username
      // TODO: Insert your Medium/Dev/Hashnode or any blog feed URL below
      userBlogs.forEach((blog) => {
        createText(`${blog.site}: `);
        blog.items.forEach((item, index) => {
          createText(
            `<a href="${item.link}" target="_blank">${index + 1}. ${item.title
            }</a>`
          );
        });
      });
      break;

    case "contributors":
      trueValue(value);
      contributors.forEach((user) => {
        createText(`- <a href=${user.userProfile}>${user.username}</a>`);
      });
      createText(`- Thanks to all the contributors 💖`);
      break;

    case "ipconfig":
      trueValue(value);
      const IP = IpDetails[0];
      createText(`- Ipv6: ${IP.ip}`);
      createText(`- network: ${IP.network}`);
      createText(`- city: ${IP.city}`);
      createText(`- network org: ${IP.org}`);
      createText(`- region: ${IP.region}`);
      createText(`- postal: ${IP.postal}`);
      break;

    case "repos":
      trueValue(value);
      userRepos[0].forEach((repo, index) => {
        createText(
          `- repo_${index} name: <a href=${repo.html_url}>${repo.name
          }</a> | language: ${repo.language === null ? "no language" : repo.language
          }`
        );
        createText(
          `_ description: ${repo.description === null ? "no description." : repo.description
          }`
        );
      });
      break;

    case "clear":
    case "cls":
      document
        .querySelectorAll("p")
        .forEach((e) => e.parentNode.removeChild(e));
      document
        .querySelectorAll("section")
        .forEach((e) => e.parentNode.removeChild(e));
      removeNeoFetch();
      break;
    case "contact":
      createText(
        `Hey! Would love to get in touch. Drop me a text at <a href="mailto:${config.contact.email}" target="_blank">${config.contact.email}</a>`
      );
      window.location.href = `mailto:${config.contact.email}`;
      break;
    case "sudo":
      trueValue(value);
      createText("You are not authorized to use this command");
      break;
    case "github":
      trueValue(value);
      createText(`Github Username: ${githubStats.username}`);
      createText(`Github Bio: ${githubStats.bio}`);
      createText(`Number of repositories : ${githubStats.public_repos}`);
      createText(`Number of gists: ${githubStats.public_gists}`);
      createText(`Number of followers: ${githubStats.followers}`);
      createText(`Number of following: ${githubStats.following}`);
      break;

    case "cd":
      trueValue(value);
      createText("There's no directory in this path");
      break;
    case "exit":
      window.close();
    default:
      if (value.substring(0, 5) === "cheer") {
        trueValue(value);
        const reply =
          config.cheer.responseArray[
          Math.floor(Math.random() * config.cheer.responseArray.length)
          ];
        createText(reply);
      } else {
        falseValue(value);
        createText(`${value} is not a valid command`);
      }
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

function exit() {
  window.close();
}

function createText(text) {
  const p = document.createElement("p");
  p.innerHTML = text;
  app.appendChild(p);
}

function createCode(code, text) {
  const p = document.createElement("p");
  p.innerHTML = `<span class="code">${code} =></span> ${text}`;
  app.appendChild(p);
}

openTerminal();

//creat neofetch

function neofetch() {
  const data = {
    name: "Shethi Sidharth",
    title: "developer",
    skills: "Frontend, Backend",
    shell: "zsh",
    langauges: "Javascript, Python, CSS, DB",
  };
  const container = document.createElement("div");
  container.classList.add("fetch-container");

  const fimg = document.createElement("div");
  fimg.classList.add("fetch-img-container");
  fimg.innerHTML = "<img class='fetch-img' src='js.png' />";

  const info = document.createElement("div");
  info.classList.add("info");
  container.appendChild(fimg);
  container.appendChild(info);

  for (const [key, value] of Object.entries(data)) {
    const p = document.createElement("p");
    p.innerHTML = `<span class="key">${key}</span>: <span class="value">${value}</span>`;
    info.appendChild(p);
  }

  app.appendChild(container);
}

function removeNeoFetch() {
  document.querySelector(".fetch-container").remove();
}
// get the contributors list

const getContributors = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/TechSpiritSS/Terminal-Portfolio/contributors"
    )
      .then((response) => response.json())
      .then((data) => {
        data.forEach((user) => {
          const userDetails = { username: "", userProfile: "" };
          userDetails.username = user.login;
          userDetails.userProfile = user.html_url;
          contributors.push(userDetails);
        });
      });
  } catch (error) {
    console.log(error);
    // handling the error
    contributors.push({
      username: "__network_error __check internet connection",
      userProfile: " ",
    });
  }
};

getContributors();

const getBlogs = async () => {
  config.blogs.forEach(async (blog) => {
    try {
      const rssConverter = `https://api.rss2json.com/v1/api.json?rss_url=${blog.url}`;
      const response = await fetch(rssConverter);
      const data = await response.json();
      userBlogs.push({ site: blog.site, items: data.items });
    } catch (error) {
      console.log(error);
      // handling the error
      userBlogs.push({
        site: blog.site,
        items: ["_failed_to_fetch_"],
      });
    }
  });
};

getBlogs();

async function getGithubStats() {
  try {
    const githubLink = config.social.find((c) => c.title.toLowerCase() === "github").link;
    const githubUsername =
      githubLink.split("/")[githubLink.split("/").length - 1];
    const responseRaw = await fetch(`https://api.github.com/users/${githubUsername}`);
    const response = await responseRaw.json();
    githubStats = { ...response, username: githubUsername }
  } catch (error) {
    console.log(error);
    // handling the error
    githubStats = {
      username: githubUsername,
      bio: "_failed_to_fetch_",
      public_repos: "_failed_to_fetch_",
      public_gists: "_failed_to_fetch_",
      followers: "_failed_to_fetch_",
      following: "_failed_to_fetch_",
    }
  }
}

getGithubStats();

// ip lookup --> https://ipapi.co/json

const getIPDetails = async () => {
  try {
    const response = await fetch("https://ipapi.co/json")
      .then((response) => response.json())
      .then((data) => {
        IpDetails.push(data);
      });
  } catch (error) {
    console.log(error);
    // handling the error
    IpDetails.push({
      ip: "__network_error",
      network: "__kindly check internet connection",
      city: "",
      region: "",
      org: "",
      postal: "",
    });
  }
};

getIPDetails();

// get user github repositories

const getRepo = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/users/TechSpiritSS/repos"
    )
      .then((response) => response.json())
      .then((data) => {
        userRepos.push(data);
      });
  } catch (error) {
    console.log(error);
    userRepos.push([
      {
        name: "__network_error",
        description: "__kindly check internet connection",
        html_url: "",
      },
    ]);
  }
};

getRepo();

// Themes Switcher

let switches = document.getElementsByClassName("switch");

let style = localStorage.getItem("style");

if (style == null) {
  setTheme("default");
} else {
  setTheme(style);
}

for (let i of switches) {
  i.addEventListener("click", function () {
    let theme = this.dataset.theme;
    setTheme(theme);
  });
}

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
