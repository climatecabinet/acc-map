## Climate Insights Explorer
Objective: Create an interactive database that details the climate-related data of every state legislative district in the US. <br>
* Goal #1: Demo Explorer highlighting NJ and VA. Showing health, economic, polling, and legislation data. <br>
* Goal #2: Upscale to 20 other states (list here...) <br>

## Getting Started
1. Install Node and Yarn
* Ensure you have the latest LTS version of Node installed (>= 10.16.0). node --version
* [Install](https://classic.yarnpkg.com/en/docs/install#mac-stable) the Yarn package manager
* Ensure you have the latest version of Yarn installed (>= 1.0.2). yarn --version

2. Fork and Clone the Repository
* [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) the repository
* Clone the repository locally, in the terminal, using the SSH url -- git clone git@github.com:shelbygreen/acc-map.git

3. Set up the repo and Install Dependencies
* In the root of the repo folder, run: yarn run bootstrap or npm install

4. Create an upstream remote
* Check the current configured remote repository for your fork -- git remove -v
  * you should see something like:
  > origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch) <br>
  > origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push) <br>
* Specify a new remote upstream repository that will be synced with the fork --  git remote add upstream git@github.com:shelbygreen/acc-map.git
* Verify the new upstream repository you've specified for your fork -- git remote -v
  * you should see something like:
  > origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch) <br>
  > origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push) <br>
  > upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch) <br>
  > upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push) <br>
  
5. Sync the fork
  * Fetch the branches and their commits from the upstream repository -- git fetch upstream
  * Check out your fork's local default branch (in this case, it's main) -- git checkout main
  * Merge the changes from the upstream default branch into your local default branch -- git merge upstream/main
  
6. Push commits to the repo
  * Push commits made on your local branch to the online repo -- git push origin main
    * origin = the remote name
    * main = the branch name

Now you're ready to contribute and make changes to the repo!
