## Difference generator.

This CLI utility is designed to compare JSON or YAML documents. It provides a comprehensive analysis of the differences between the files, taking into account their hierarchical structure.

Using this utility, users can get comparison results in a variety of formats, including TXT, JSON, and my own stylized format called "stylish". All options output the difference to the console, so if you want to save the result you can use the utility in pipeline with touch. The stylish format, inspired by JSON.stringify, presents differences with a minimum number of characters and consistent indentation, resulting in visually pleasing output in the console. This format was my default.

Using this utility, users can easily identify and understand changes made to JSON or YAML documents and gain insight into the complex tree structure of the data. It facilitates efficient change management and tracking, improving the overall handling of JSON or YAML files.

## How to install:

Please do clone this repository and install Dependencies.
You could as well use the command below:

```
make install
```

## Guideline:

```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           output usage information
```

## Video guideline:

[![asciicast](https://asciinema.org/a/xsZfZAWP9fEbEycNNN0kkdXhU.svg)](https://asciinema.org/a/xsZfZAWP9fEbEycNNN0kkdXhU)

### Hexlet tests and linter status:

[![Actions Status](https://github.com/nesquick017/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/nesquick017/frontend-project-46/actions) 
[![project-check](https://github.com/nesquick017/frontend-project-46/actions/workflows/pr2.yaml/badge.svg)](https://github.com/nesquick017/frontend-project-46/actions/workflows/pr2.yaml)
<a href="https://codeclimate.com/github/nesquick017/frontend-project-46_2june/maintainability"><img src="https://api.codeclimate.com/v1/badges/d48f478d0ae610217832/maintainability" />
</a>
<a href="https://codeclimate.com/github/nesquick017/frontend-project-46_2june/test_coverage"><img src="https://api.codeclimate.com/v1/badges/d48f478d0ae610217832/test_coverage" /></a>