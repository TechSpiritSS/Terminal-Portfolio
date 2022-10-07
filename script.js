const app = document.querySelector('#app');
const bodyContainer = document.querySelector('#bodyContainer');
const greenButton = document.querySelector('#greenButton');
const yellowButton = document.querySelector('#yellowButton');
const redButton = document.querySelector('#redButton');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const history = [];
const contributors = [];
var count = 0;
const commandsList = [
  'help',
  'clear',
  'about',
  'social',
  'projects',
  'cheer',
  'contributors',
];
const replyArr = [
  `Thank you! It makes my day😊😊😊`,
  `It is great to hear that way!😁😁😁`,
  `I would love to take credit😂😂😂`,
  `That's so good to hear! I'm glad😍😍😍`,
];

greenButton.addEventListener('click', () => {
  const container = document.querySelector('#screenContainer');
  container.classList.contains('maximized')
    ? container.classList.remove('maximized')
    : container.classList.add('maximized');
});

yellowButton.addEventListener('click', () => {
  bodyContainer.classList.contains('minimized')
    ? bodyContainer.classList.remove('minimized')
    : bodyContainer.classList.add('minimized');
});

redButton.addEventListener('click', () => {
  exit();
});

app.addEventListener('keydown', async function (event) {
  if (event.key === 'Enter') {
    await delay(150);
    getInputValue();
    removeInput();
    await delay(150);
    new_line();
    count = history.length;
  }
  if (event.key === 'ArrowUp') {
    if (count > 0) {
      const input = document.querySelector('input');
      input.value = history[--count];
    }
  }
  if (event.key === 'ArrowDown') {
    if (count < history.length - 1) {
      const input = document.querySelector('input');
      input.value = history[++count];
    } else {
      const input = document.querySelector('input');
      input.value = '';
    }
  }
  if (event.key === 'Tab') {
    event.preventDefault();
    const input = document.querySelector('input');
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
});

app.addEventListener('click', function () {
  const input = document.querySelector('input');
  input.focus();
});

async function openTerminal() {
  createText('Welcome to the Terminal');
  await delay(500);
  createText('Starting up...');
  await delay(800);
  createText('You can now interact with the Terminal');
  createCode('Type help', 'for a list of commands');
  await delay(500);
  new_line();
}

function new_line() {
  const p = document.createElement('p');
  const span = document.createElement('span');
  const span2 = document.createElement('span');
  p.setAttribute('class', 'path');
  p.textContent = '$Sidharth_Sethi';
  span.textContent = ' sudo';
  span2.textContent = ' ~/guest';
  p.appendChild(span);
  p.appendChild(span2);
  app.appendChild(p);
  const div = document.createElement('div');
  div.setAttribute('class', 'type');
  const i = document.createElement('i');
  i.setAttribute('class', 'fas fa-angle-right icone');
  const input = document.createElement('input');
  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
}

function removeInput() {
  const div = document.querySelector('.type');
  app.removeChild(div);
}

async function showRecentBlogs(mediumLink) {
  const rssConverter = `https://api.rss2json.com/v1/api.json?rss_url=${mediumLink}`;

  fetch(rssConverter)
    .then((response) => response.json())
    .then((data) => {
      const { items } = data;
      items.forEach((item, index) => {
        createText(
          `<a href="${item.link}" target="_blank">${index + 1}. ${
            item.title
          }</a>`
        );
      });
    });
}

async function getInputValue() {
  const value = document.querySelector('input').value;
  if (value.substring(0, 5) === 'cheer') {
    value.substring(0, 5).toLowerCase();
  } else {
    value.replace(/\s+/g, '').toLowerCase();
  }

  history.push(document.querySelector('input').value);
  count++;

  switch (value) {
    case 'help':
    case 'ls':
      trueValue(value);
      createCode('help', 'for a list of commands');
      createCode('clear', 'to clear the terminal');
      createCode('about', 'to learn more about me');
      createCode('social', 'to see my social links');
      createCode('projects', 'to see my projects');

      createCode('blogs', 'to see my recent blogs');
      createCode('contact', 'to enquire about my services');
      createCode('cheer', 'to appreciate my work');
      createCode('contributors', 'to see all the contributors');
      break;
    case 'neofetch':
      neofetch();
      break;
    case 'about':
      trueValue(value);
      createText(
        'I am a Web Developer with a good knowledge of Data Structures and Algorithms along with SQL. I am currently Google DSC Lead, CodeChef Chapter Event Lead, and Co-Founder of Algoders Community at my Campus. I have 3-star rating at CodeChef. In 2022 I am learning MERN Stack and I am planning to work as a Full-Stack Developer.'
      );
      break;

    case 'social':
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
      break;

    case 'projects':
      trueValue(value);
      createText('Projects:');
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
      break;

    case 'blogs':
      trueValue(value);
      createText('Recent Blogs:');
      // Hashnode Feed URL: https://username.hashnode.dev/rss.xml
      // Dev.to Feed URL: https://dev.to/feed/username
      // Medium Feed URL: https://medium.com/feed/@username
      // TODO: Insert your Medium/Dev/Hashnode or any blog feed URL below
      showRecentBlogs('');
      break;

    case 'contributors':
      trueValue(value);
      contributors.forEach((user) => {
        createText(
          `<a href=${user.userProfile} target="_blank">${user.username}</a>`
        );
      });
      createText(`Thanks to all the contributors 💖`);
      break;

    case 'clear':
    case 'cls':
      document
        .querySelectorAll('p')
        .forEach((e) => e.parentNode.removeChild(e));
      document
        .querySelectorAll('section')
        .forEach((e) => e.parentNode.removeChild(e));
      removeNewFetch();
      break;
    case 'contact':
      createText(
        'Hey! Would love to get in touch. Drop me a text at sidharth.sherry@gmail.com'
      );
      window.location.href = 'mailto:sidharth.sherry@gmail.com';
      break;
    case 'sudo':
      trueValue(value);
      createText('You are not authorized to use this command');
      break;

    case 'cd':
      trueValue(value);
      createText("There's no directory in this path");
      break;
    case 'exit':
      window.close();
    default:
      if (value.substring(0, 5) === 'cheer') {
        trueValue(value);
        const reply = replyArr[Math.floor(Math.random() * replyArr.length)];
        createText(reply);
      } else {
        falseValue(value);
        createText(`${value} is not a valid command`);
      }
  }
}

function trueValue(value) {
  const div = document.createElement('section');
  div.setAttribute('class', 'type2');
  const i = document.createElement('i');
  i.setAttribute('class', 'fas fa-angle-right icone');
  const msg = document.createElement('h2');
  msg.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(msg);
  app.appendChild(div);
}

function falseValue(value) {
  const div = document.createElement('section');
  div.setAttribute('class', 'type2');
  const i = document.createElement('i');
  i.setAttribute('class', 'fas fa-angle-right icone');
  const msg = document.createElement('h2');
  msg.setAttribute('class', 'error');
  msg.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(msg);
  app.appendChild(div);
}

function exit() {
  window.close();
}

function createText(text) {
  const p = document.createElement('p');
  p.innerHTML = text;
  app.appendChild(p);
}

function createCode(code, text) {
  const p = document.createElement('p');
  p.innerHTML = `<span class="code">${code} =></span> ${text}`;
  app.appendChild(p);
}

openTerminal();

// create neofetch

function neofetch() {
  const data = {
    name: 'Sherry Sidharth',
    title: 'developer',
    skills: 'Frontend, Backend',
    shell: 'zsh',
    langauges: 'Javascript, Python, CSS, DB',
  };
  const container = document.createElement('div');
  container.classList.add('fetch-container');

  const fimg = document.createElement('div');
  fimg.classList.add('fetch-img');

  const info = document.createElement('div');
  info.classList.add('info');
  container.appendChild(fimg);
  container.appendChild(info);

  for (const [key, value] of Object.entries(data)) {
    const p = document.createElement('p');
    p.innerHTML = `<span class="key">${key}</span>: <span class="value">${value}</span>`;
    info.appendChild(p);
  }

  app.appendChild(container);
}

function removeNewFetch() {
  document.querySelector('.fetch-container').remove();
}
// get the contributors list

const getContributors = async () => {
  try {
    const response = await fetch(
      'https://api.github.com/repos/TechSpiritSS/Terminal-Portfolio/contributors'
    )
      .then((response) => response.json())
      .then((data) => {
        data.forEach((user) => {
          const userDetails = { username: '', userProfile: '' };
          userDetails.username = user.login;
          userDetails.userProfile = user.html_url;
          contributors.push(userDetails);
        });
      });
  } catch (error) {
    console.log(error);
  }
};

getContributors();

// Themes Switcher

let switches = document.getElementsByClassName('switch');

let style = localStorage.getItem('style');

if (style == null) {
  setTheme('default');
} else {
  setTheme(style);
}

for (let i of switches) {
  i.addEventListener('click', function () {
    let theme = this.dataset.theme;
    setTheme(theme);
  });
}

function setTheme(theme) {
  if (theme == 'nature') {
    document.getElementById('switcher-id').href = './themes/nature.css';
  } else if (theme == 'sky') {
    document.getElementById('switcher-id').href = './themes/sky.css';
  } else if (theme == 'matrix') {
    document.getElementById('switcher-id').href = './themes/matrix.css';
  } else if (theme == 'metalic') {
    document.getElementById('switcher-id').href = './themes/metalic.css';
  } else if (theme == 'default') {
    document.getElementById('switcher-id').href = './themes/default.css';
  }

  localStorage.setItem('style', theme);
}
setTheme('default');
