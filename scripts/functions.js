//Functions file. All important functions are defined here. These are used for setup & operations

//Imports done
import config from "../config.js";
import {
    fetchGithubSocialStats,
    fetchLinkedInStats,
    fetchLeetCodeStats,
    fetchGithubStats,
    connections,
    githubStats,
    followers,
    following,
    ranking,
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
} from "./fetchStats.js";
import {
    getContributors,
    getBlogs,
    getIPDetails,
    getRepo,
    contributors,
    userBlogs,
    IpDetails,
    userRepos,
} from "./getDetails.js";
import { suggestFurtherCommand } from "./compare.js";
import {
    commandHistory,
    saveHistory,
    clearHistory,
    popInvalidCommand,
    runSpecificHistoryCmd,
} from "./history.js";

const app = document.querySelector("#app");
let delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const resumeUrl = "https://drive.google.com/u/0/uc?id=1J8QGMreVTsC-K-d5bpKV1BVNXxrCUYQa&export=download";

//Defining the functions
function neofetch() {
    // read data from data.json
    const data = config.neofetch;
    console.log(data);

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
    const element = document.querySelector(".fetch-container")
    if (element) element.remove();
}


async function getInputValue(history, remove = false, cmd = undefined) {
    const val = cmd || document.querySelector("input").value.trim().toLowerCase();
    saveHistory(val);
    const a = val.split(" ");
    const flag = a[1];
    const value = a[0];
    const flags = [...a];

    flags.shift(); // removes the first element
    if (value.substring(0, 5) === "cheer") {
        value.substring(0, 5).toLowerCase();
    } else {
        value.replace(/\s+/g, "").toLowerCase();
    }

    history.push(cmd || document.querySelector("input").value);

    if (remove) removeInput();

    switch (value) {
        case "help":
        case "ls":
            config.help.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });

            if (flag == '-d') {
                trueValue(val)
                for (let item of config.help) {
                    await createText(`${item.title} :- ${item.description}`);
                }
                break;
            }

            if (flag) {
                trueValue(val);
                let isCmd = false;
                for (let x of config.help) {
                    if (flag === x.title) {
                        for (let i=0;i<x.info.length;i++)
                            await createText(x.info[i]);
                        isCmd = true;
                        break;
                    }
                }
            
                if (!isCmd) {
                    await createText(`${flag} is not a valid command`);
                    let commands = suggestFurtherCommand(flag);
                    await createText("Are you looking for this: " + commands);
                }
                break;
            }

            trueValue(value);
            let titles = config.help.map(item => item.title);
            let titlesString = titles.join(', ');
            await createText(titlesString);
            await createText("type -d for more description")
            await createText("write help {command name} to know about specific command like 'help github'")
            break;

        case "neofetch":
            neofetch();
            break;
        case "about":
            trueValue(value);
            await createText(config.about);
            break;

        case "reset":
            trueValue(value);
            location.reload(true);
            break;
        case "social":
            if (flag == "-l") {
                trueValue(val);
                config.social.forEach((item) => {
                    createText(`${item.title} :- <a href=${item.link} target="_blank">${item.link}</a>
            `, false);
                });
                break;
            } else if (flag == "-d") {
                trueValue(val);
                config.social.forEach(async (item) => {
                    createText(`${item.title} Link :- <a href=${item.link} target="_blank">${item.link}</a>
            `, false);
                    if (item.title == "Github") {
                         createText(`Number of followers: ${followers}`);
                         createText(`Number of following: ${following}`);
                    }
                    if (item.title == "LinkedIn") {
                         createText(`Connections : 500+`);
                    }
                    if (item.title == "LeetCode") {
                         createText(`Problems Solved: ${totalSolved}`);
                         createText(
                            `Distribution:- Easy:${easySolved} Medium:${mediumSolved} Hard:${hardSolved}`
                        );
                         createText(`Ranking: ${ranking}`);
                    }
                    if (item.title == "Codechef") {
                         createText(`Rank : ${item.rank}`);
                         createText(`Rating : ${item.rating}`);
                    }
                });
                break;
            }
            trueValue(value);
            config.social.forEach((item) => {
                createText(
                    `<a href=${item.link} target="_blank">${item.title}</a>`, false
                );
            });
            break;
        case "projects":
            trueValue(value);
            await createText("Projects:");
            config.projects.forEach(async (item) => {
                await createText(
                    `<a href=${item.link} target="_blank">${item.title}</a> - ${item.description}`, false
                );
            });
            break;
        case "blogs":
            trueValue(value);
            await createText("Recent Blogs:");
            // Hashnode Feed URL: https://username.hashnode.dev/rss.xml
            // Dev.to Feed URL: https://dev.to/feed/username
            // Medium Feed URL: https://medium.com/feed/@username
            // TODO: Insert your Medium/Dev/Hashnode or any blog feed URL below
            userBlogs.forEach(async (blog) => {
                createText(`${blog.site}: `);
                blog.items.forEach((item, index) => {
                    createText(
                        `<a href="${item.link}" target="_blank">${index + 1}. ${item.title
                        }</a>`, false
                    );
                });
            });
            break;
        case "contributors":
            trueValue(value);
            contributors.forEach((user) => {
                createText(
                    `- <a href=${user.userProfile} target="_blank">${user.username}</a>`, false
                );
            });
            await createText(`- Thanks to all the contributors 💖`);
            break;
        case "experience":
            trueValue(value);
            await createText("My Work Experience:");
            config.experience.forEach((item) => {
                createText(`${item.title}`);
                createText(`${item.description} `);
            });
            break;
        case "skills":
            trueValue(value);
            config.skills.forEach((item) => {
                createText(`${item.title}`);
                createText(`${item.description} `);
            });
            break;
        case "ipconfig":
            trueValue(value);
            const IP = IpDetails[0];
            await createText(`- Ipv6: ${IP.ip}`);
            await createText(`- network: ${IP.network}`);
            await createText(`- city: ${IP.city}`);
            await createText(`- network org: ${IP.org}`);
            await createText(`- region: ${IP.region}`);
            await createText(`- postal: ${IP.postal}`);
            break;
        case "repos":
            trueValue(value);
            userRepos[0].forEach((repo, index) => {
                createText(
                    `- repo_${index} name: <a href=${repo.html_url} target="_blank">${repo.name
                    }</a> | language: ${repo.language === null ? "no language" : repo.language
                    }`, false
                );
                createText(
                    `_ description: ${repo.description === null
                        ? "no description."
                        : repo.description
                    } `
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
            removeInput();
            await delay(150);
            break;
        case "contact":
            createText(
                `Hey! Would love to get in touch.<br>
                    My linkedin profile link: <a href="${config.social.filter((obj) => obj.title.toLowerCase() == 'linkedin')[0].link}" target="_blank"> LinkedIn</a>.<br>
                        Drop me a text at <a href="mailto:${config.contact.email}" target="_blank">${config.contact.email}</a>`, false
            );
            window.location.href = `mailto:${config.contact.email}`;
            //   window.open(`mailto:${config.contact.email}`, "_blank");
            break;
        case "sudo":
            trueValue(value);
            await createText("You are not authorized to use this command");
            break;
        case "github":
            trueValue(value);
            await createText(`Github Username: ${githubStats.username}`);
            await createText(`Github Bio: ${githubStats.bio}`);
            await createText(`Number of repositories : ${githubStats.public_repos}`);
            await createText(`Number of gists: ${githubStats.public_gists}`);
            await createText(`Number of followers: ${githubStats.followers}`);
            await createText(`Number of following: ${githubStats.following}`);
            break;
        case "cd":
            trueValue(value);
            await createText("There's no directory in this path");
            break;
        case "calc":
            calc(flags.join(""));
            break;
        case "history":
            if (flag === "--clear") {
                clearHistory();
            }
            if (Number(flag)) {
                await runSpecificHistoryCmd(Number(flag));
            } else {
                await commandHistory();
            }
            break;
        case "typing":
            await typingCmd(flag);
            break;
        case "exit":
            window.close();
        default:
            if (value.substring(0, 5) === "cheer") {
                trueValue(value);
                const reply =
                    config.cheer.responseArray[
                    Math.floor(
                        Math.random() * config.cheer.responseArray.length
                    )
                    ];
                await createText(reply);
            } else {
                falseValue(value);
                await createText(`${value} is not a valid command`);
                let commands = suggestFurtherCommand(value);
                await createText("Are you looking for this: " + commands);
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
    if (div) app.removeChild(div);
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

async function createText(text, typingOn = true) {
    const p = document.createElement("p");
    app.appendChild(p);
    p.scrollIntoView({ behavior: 'smooth' });

    const typing = localStorage.getItem("typing");

    if (!typingOn || (typing && typing === "off")) {
        p.innerHTML = text;
        return;
    }

    const typingSpeed = localStorage.getItem("typingSpeed") || 20;

    let index = 0;
    async function writeText() {
        while (index < text.length) {
            p.innerHTML += text[index++];
            await new Promise((writeText) => setTimeout(writeText, typingSpeed));
        }
        return;
    }

    await writeText();

}

async function createCode(code, text, typingOn = true) {
    const p = document.createElement("p");
    app.appendChild(p);

    const typing = localStorage.getItem("typing");

    if (!typingOn || (typing && typing === "off")) {
        p.innerHTML = `<span class="code">${code} =></span> ${text}`;
        return;
    }

    const typingSpeed = localStorage.getItem("typingSpeed") || 20;

    const span = document.createElement("span");
    span.className = "code"
    p.appendChild(span);
    p.scrollIntoView({ behavior: 'smooth' });
    let index = 0;
    async function writeCode() {
        while (index < code.length) {
            span.innerHTML += code[index++];
            await new Promise((writeCode) => setTimeout(writeCode, typingSpeed));
        }
        return;
    }
    await writeCode();

    p.innerHTML += " "

    index = 0;
    async function writeText() {
        while (index < text.length) {
            p.innerHTML += text[index++];
            await new Promise((writeText) => setTimeout(writeText, typingSpeed));
        }
        return;
    }

    await writeText();

}

function downloadFile() {
    let link = document.createElement("a");
    link.href = resumeUrl;
    link.click();
    const p = document.createElement("p");
    p.innerHTML = "<span class='blink'>###############<span />";
    app.appendChild(p);
    setTimeout(() => {
        app.removeChild(p);
    }, 2500);
    document.body.removeChild(link);
}

async function calc(flag) {
    try {
        if (flag === "" || flag === " " || flag === undefined) {
            falseValue(flag);
            await createText("Please Enter a Valid Expression");
        } else {
            trueValue(flag);
            function parse(str) {
                return Function(`'use strict'; return (${str})`)();
            }
            await createText(flag + " = " + parse(flag));
        }
    } catch (e) {
        falseValue(flag);
        await createText(flag + " is an Invalid Expression");
    }
}

// all functions exported
export {
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
    calc,
};

const typingCmd = async (flag) => {
    const typing = localStorage.getItem("typing");
    let typingSpeed = localStorage.getItem("typingSpeed");

    if (flag == "-on") {
        localStorage.setItem("typing", "on");
        createText("Typing animation is turned on");
    } else if (flag == "-off") {
        localStorage.setItem("typing", "off");
        createText("Typing animation is turned off");
    } else if (Number(flag)) {
        localStorage.setItem("typingSpeed", Number(flag));
        typingSpeed = localStorage.getItem("typingSpeed");
        await createText(`Typing animation speed is set to ${typingSpeed ? typingSpeed : 20}ms`);
    } else {
        await createText(`Typing animation is currently ${typing ? typing : "on"} and speed is set to ${typingSpeed ? typingSpeed : 20}ms`);
        await createText("Turn typing animation on and off by adding -on or -off flags respectively");
        await createText("Also u can write a number(in ms) to set typing custom animation speed");
    }
}