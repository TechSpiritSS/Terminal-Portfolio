//Functions file. All important functions are defined here. These are used for setup & operations

//Imports done
import config from "../config.json" assert { type: "json" };
import {
    fetchGithubSocialStats, fetchLinkedInStats, fetchLeetCodeStats, fetchGithubStats,
    connections,
    githubStats,
    followers, following,
    ranking, totalSolved, easySolved, mediumSolved, hardSolved,
} from "./fetchStats.js";
import { getContributors, getBlogs, getIPDetails, getRepo, contributors, userBlogs, IpDetails, userRepos } from "./getDetails.js";
import { suggestFurtherCommand } from "./compare.js";
import { commandHistory, saveHistory, clearHistory, popInvalidCommand } from "./history.js";

const app = document.querySelector("#app");
let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const resumeUrl = "https://drive.google.com/u/0/uc?id=1J8QGMreVTsC-K-d5bpKV1BVNXxrCUYQa&export=download";

//Defining the functions
function neofetch() {
    const data = {
        name: "Sidharth Sethi",
        title: "MERN Developer",
        skills: "Frontend, Backend, Cloud",
        shell: "zsh",
        langauges: "Javascript, C++, HTML/CSS, SQL",
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

async function getInputValue(history) {
    const val = document.querySelector("input").value.trim().toLowerCase();
    saveHistory(val);
    const a = val.split(' ')
    const flag = a[1]
    const value = a[0]
    const flags = [...a]
    flags.shift(); // removes the first element
    if (value.substring(0, 5) === "cheer") {
        value.substring(0, 5).toLowerCase();
    } else {
        value.replace(/\s+/g, "").toLowerCase();
    }

    history.push(document.querySelector("input").value);
    switch (value) {
        case "help":
        case "ls":
            trueValue(value);
<<<<<<< HEAD
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
            createCode("download", "to download my pdf resume");
            createCode("calc", "to evaluate an expression, for eg: (2 + 3)");
            createCode("experience", "to see my work experience");
            createCode("skills", "to see my skills");
=======
            let listOfCreateCodes = [
            [["help"], "for a list of commands"],
            [["clear"], "to clear the terminal"],
            [["about"], "to learn more about me"],
            [["social"], "to see my social links (add flags '-l' for links and '-d' for detailed results)"],
            [["projects"], "to see my projects"],
            [["blogs"], "to see my recent blogs"],
            [["contact"], "to enquire about my services"],
            [["cheer"], "to appreciate my work"],
            [["repos"], "to see my github repositories"],
            [["ipconfig"], "to see your IP details"],
            [["github"], "to see my github stats"],
            [["contributors"], "to see all the contributors"],
            [["download"], "to download my pdf resume"],
            [["calc"], "to evaluate an expression, for eg: (2 + 3)"],
            [["experience"], "to see my work experience"],
            [["history"],"shows the last 10 valid commands performed, use --clear flag to clear the history"],
            ]
            listOfCreateCodes.sort((a,b)=>{
                if(a[0]>b[0])
                return 1;
                else
                return -1;
            });
            for(let i=0;i<listOfCreateCodes.length;++i){
                console.log
                createCode(listOfCreateCodes[i][0],listOfCreateCodes[i][1]);
            }
>>>>>>> 606b48757919cce5a8f11cfbebb15a19c6ed012b
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

<<<<<<< HEAD
        case "experience":
            trueValue(value);
            createText("My Work Experience:");
            config.experience.forEach((item) => {
                createText(`<a>${item.title}</a>`);
                createText(`${item.description}`);
            });
            break;

        case "skills":
            trueValue(value);
            config.skills.forEach((item) => {
                createText(`<a>${item.title}</a>`);
                createText(`${item.description}`);
            });
            break;

=======
>>>>>>> 606b48757919cce5a8f11cfbebb15a19c6ed012b
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
        case "download":
            trueValue(value);
            downloadFile();
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
                `Hey! Would love to get in touch.
          My linkedin profile link: <a href="mailto:${config.contact.linkedin}" </a>
          Drop me a text at <a href="mailto:${config.contact.email}" target="_blank">${config.contact.email}</a>`
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
        case "calc":
            calc(flags.join(""));
            break;
<<<<<<< HEAD
        case "exit":
            window.close();
=======
        case "history":
            if(flag === "--clear")
            clearHistory();
            else
            commandHistory();
            break;
        case "exit":
            window.close();
        case "experience":
            trueValue(value);
            createText("My Work Experience:");
            config.experience.forEach((item) => {
                // createText(
                createText(`<a>${item.title}</a>`);
                createText(`${item.description}`);
                // );
            });
            break;
>>>>>>> 606b48757919cce5a8f11cfbebb15a19c6ed012b

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
<<<<<<< HEAD
=======
                popInvalidCommand();
>>>>>>> 606b48757919cce5a8f11cfbebb15a19c6ed012b
                createText(`${value} is not a valid command`);
                let commands = suggestFurtherCommand(value);
                createText("Are you looking for this: " + commands);
            }
    }
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
    p.innerHTML = `<span class="code">${code} =></span> ${text}`;
    app.appendChild(p);
}

function downloadFile() {
    let link = document.createElement("a");
    link.href = resumeUrl;
    link.click();
    const p = document.createElement("p");

    p.innerHTML = "<span class='blink'>###############<span/>";
    app.appendChild(p);
    setTimeout(() => {
        app.removeChild(p);
    }, 2500);
    document.body.removeChild(link);
}

function calc(flag) {
    try {
        if (flag === "" || flag === " " || flag === undefined) {
            falseValue(flag);
            createText("Please Enter a Valid Expression");
        } else {
            trueValue(flag);
            createText(flag + " = " + eval(flag));
        }
    } catch (e) {
        falseValue(flag);
        createText(flag + " is an Invalid Expression");
    }
}

export {
    // all functions exported
    neofetch,
    removeNeoFetch,
    getInputValue,
    new_line,
    removeInput,
    trueValue,
    falseValue,
    createText,
    createCode,
    downloadFile,
    calc
}
