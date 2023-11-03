# Ammalgam Documentation

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to
build the website and push to the `gh-pages` branch.

### Updating docs

Currently not automated, but from the core-v1 repo run
```bash
forge doc --build
```

Copy generated docs folder `docs/src/contracts` to this docs folder here
```bash
cp -r [core-v1]/docs/contracts ./docs/
```

Change the title of each README.md from `# Content` to the name of its parent 
folder. 

Add an index to the first README.md and change the title to Overview so it
appears first.

```
---
sidebar_position: 1
---

# Overview
```

globally search and replace '(/contracts/' with '(/docs/contracts/' to fix links
