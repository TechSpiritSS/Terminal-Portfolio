# Contributing Guidelines 🤝

</br>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
&nbsp;
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/Naereen/badges/)


This documentation contains a set of guidelines to help you during the contribution process.
We are happy to welcome all the contributions from anyone willing to improve/add new ideas to this project.
Thank you for helping out and remember, **no contribution is too small.**
Being an open source contributor doesn't just mean writing code, either. You can help out by writing documentation, tests, or even giving suggestions. 🏆

</br>

### 0 : Issues

- Always check the [existing issues](https://github.com/TechSpiritSS/Terminal-Portfolio/issues) before creating your own issue.**Do not create an issue if it already exists.**
- Only start working on an issue if it has been assigned to you. **Check assignees**
- Every change in this project should/must have an associated issue. **Issue before PR**
- Do not create multiple PRs for the same issue. **One PR per issue**
- Assignee should make a PR in a time bound manner (possibly 1-2 weeks ) otherwise it maybe unassigned.
- If a PR closes the issue link it to the issue.
- If a change is requested, link the commit to the issue.



###  1 : Fork the Project

- Fork this repository. This will create a local copy of this repository on your GitHub profile.
Keep a reference to the original project in `upstream` remote.  

```bash
git clone https://github.com/<your-username>/Terminal-Portfolio.git 
cd Terminal-Portfolio 
git remote add upstream https://github.com/TechSpiritSS/Terminal-Portfolio.git  
```   

- If you have already forked the project, update your copy before working on it.

```bash
git remote update
git checkout main
git rebase upstream/main
```  

###  2 : Branch

Create a new branch after setting up the project locally before making any changes, so as to avoid merge conflicts while making PRs.
Use the name of the branch to identify the issue you're addressing; Feature , Bug Fix or Enhancement.

```bash
# It will create a new branch with name branch_name and switch to that branch 
git checkout -b branch_name
```

###  3 : Work on the issue assigned

- Work on the issue(s) assigned to you.
- Add all the files/folders needed.
- After you've made changes or made your contribution to the project, add changes to the branch you've just created:

```bash  
# To add all new files to branch branch_name  
git add .  

# To add only a few files to branch_name
git add <some files>
```

###  4 : Commit

- To commit the changes you've made, give a descriptive message for the convenience of the reviewer:

```bash
# This message get associated with all files you have changed  
git commit -m "message"  
```

- **NOTE**: A PR should have only one commit. Multiple commits should be squashed.

###  5 : Work Remotely

```bash  
# To push your work to your remote repository
git push -u origin branch_name
```

###  6 : Pull Request

- Go to your repository in the browser and click on compare and pull requests.
Then add a title and description to your pull request that explains your contribution.  


### 7 : Review

- 🎉🌟Congratulations! Sit and relax, you've made your contribution to Terminal-Portfolio project. Wait until the PR is reviewed and incorporate changes suggested by the community. After which the PR can be successfully merged.
🎉🎊


### Note : Do not add images, rather 👇 
- You can do that by hosting all you images and screenshots to any images hosting sites such as [imgur](https://imgur.com/), [imgbb](https://imgbb.com/), [postimages](https://postimages.org/).
- Then link your uploaded images to README files.
    
