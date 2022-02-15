# todo-from-file

## Table of Contents

- [todo-from-file](#todo-from-file)
  - [Table of Contents](#table-of-contents)
  - [General info](#general-info)
  - [Screenshots](#screenshots)
  - [Technologies](#technologies)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Status](#status)
  - [Inspiration](#inspiration)


## General info

This application makes a local server that displays a todo-list from a markdown-like file.

## Screenshots

## Technologies

todo-from-file is using the following npm packages for the CLI:

- Arg (^5.0.1)
- Chalk (^5.0.0)
- Inquirer (^8.2.0)
- Nanospinner (^1.0.0)

## Installation

Since there is no npm package for this repository yet, to install you have to clone the repository on the hard drive and run `npm link` yourself:

```
$ mkdir todo-from-file
$ cd todo-from-file
$ git clone https://github.com/c0alfox/todo-from-file.git
$ npm link
```

After that you can use the command `md-todo` on your machine!

## Usage

`md-todo [path] [--port / -p] [--encoding / -e] [--help]`

Arguments:

- path (String / Path): the path to an existing *.md file. If it's not explicitly said in the arguments or if it is invalid it'll be asked once you run the app
- --port / -p (Number - Default: 5000): the port to which the local server is going to be opened
- --encoding / -e (String - Default: "utf-8"): one of the supported nodejs buffer encoding - read more at: [NodeJS Buffer.toString()](https://nodejs.org/api/buffer.html#buftostringencoding-start-end))
- --help: shows this help message

## Status

This application is still under development

## Inspiration

This project was inspired by working on a plain text to-do list after realising that having to click around to input my homework for the day was what was making me hate it.