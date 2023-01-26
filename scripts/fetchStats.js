//Statistics file. All fetchStats functions & variables are defined here & exported for use.

import config from "../config.js";

//Stat variables
let connections = 0;
let githubStats = {};
let followers = 0,
    following = 0;
let ranking = 0,
    totalSolved = 0,
    easySolved = 0,
    mediumSolved = 0,
    hardSolved = 0;

//Stat functions
async function fetchGithubSocialStats() {
    const githubLink = config.social.find((c) => c.title === "Github").link;
    const githubUsername =
        githubLink.split("/")[githubLink.split("/").length - 1];
    const responseRaw = await fetch(
        `https://api.github.com/users/${githubUsername}`
    );
    const response = await responseRaw.json();
    followers = response.followers;
    following = response.following;
}

async function fetchLinkedInStats() {
    const Linkedinkink = config.social.find((c) => c.title === "LinkedIn").link;
    const LinkedinUsername =
        Linkedinkink.split("/")[Linkedinkink.split("/").length - 1];
    const responseRaw = await fetch(
        `https://api.linkedin.com/v2/connections?q=viewer&projection=(paging)`
    );
    const response = await responseRaw.json();
    connections = response.connections;
}

async function fetchLeetCodeStats() {
    const leetcodelink = config.social.find((c) => c.title === "LeetCode").link;
    const leetcodeusername =
        leetcodelink.split("/")[leetcodelink.split("/").length - 1];
    const responseRaw = await fetch(
        `https://leetcode-stats-api.herokuapp.com/${leetcodeusername}`
    );
    const response = await responseRaw.json();
    totalSolved = response.totalSolved;
    easySolved = response.easySolved;
    mediumSolved = response.mediumSolved;
    hardSolved = response.hardSolved;
    ranking = response.ranking;
}

async function fetchGithubStats() {
    try {
        const githubLink = config.social.find(
            (c) => c.title.toLowerCase() === "github"
        ).link;
        const githubUsername =
            githubLink.split("/")[githubLink.split("/").length - 1];
        const responseRaw = await fetch(
            `https://api.github.com/users/${githubUsername}`
        );
        const response = await responseRaw.json();
        githubStats = { ...response, username: githubUsername };
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
        };
    }
}

export {
    //functions exported
    fetchGithubSocialStats,
    fetchLinkedInStats,
    fetchLeetCodeStats,
    fetchGithubStats,

    //variables exported
    connections,
    githubStats,
    followers,
    following,
    ranking,
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
};
