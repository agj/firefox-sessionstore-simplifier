
firefox-sessionstore-simplifier
===============================

I ran into a bug in Firefox that turned an amount of tabs into about:blank tabs upon launch, which meant that I lost some websites I had open from my previous session. I decided I wanted to see what was lost by comparing the current [`sessionstore.js`][sessionstore] file with a backup, but found the files much too full of detailed info to easily parse. That's why I decided to create a tool that reduces that file's JSON contents into just the URL and the title of every open tab.

[sessionstore]: https://support.mozilla.org/en-US/kb/profiles-where-firefox-stores-user-data


## Installation

Just copy this repository into your computer (from Github you can download the contents in a zip file, or use Git to clone it).

This tool uses [Node.js][node], so make sure you have it installed, and familiarize yourself with its use from the command line.

Before using, we have to install its dependencies by running this command in the command line, while in the same folder as the tool's files:

```bash
npm install
```

[node]: https://nodejs.org/


## Usage

Create an `input` folder and put any amount of Firefox sessionstore files in it. Then, run the tool from the command line with the following command:

```bash
npm run simplify
```

In the `output` folder you should see the simplified files in JSON format. You can then easily compare these contents manually or using a diff tool.

