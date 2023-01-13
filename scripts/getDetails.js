//Functions to fetch basic details are defined here.

//Imports done
import config from "../config.js";

let contributors = [];
let userBlogs = [];
let IpDetails = [];
let userRepos = [];

// functions defined
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

export {
    //functions exported
    getContributors,
    getBlogs,
    getIPDetails,
    getRepo,

    //variables exported
    contributors,
    userBlogs,
    IpDetails,
    userRepos,
};
