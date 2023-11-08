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

requires [rust](https://www.rust-lang.org/tools/install) and
[foundry](https://book.getfoundry.sh/) and access to [core-v1](https://github.com/Ammalgam-Protocol/core-v1)
to run.

```bash
./script/build_docs_and_transform.sh
```

Script pulls most recent version of core-v1 from github. If using a local
version core-v1 pass a folder

```bash
./script/build_docs_and_transform.sh "../core-v1"
```
