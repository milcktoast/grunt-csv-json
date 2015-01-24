# grunt-csv-json [![Build Status][travis-image]][travis-url]

> Generate static JSON from CSV key/value data.


## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-csv-json --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-csv-json');
```


## The "csvjson" task

### Overview

This task builds JSON structures from key/value data defined in CSV format.
Multiple JSON resources can be defined per CSV document.

The following CSV document:

| key  | bob   | sue    |
| ---- | ----- | ------ |
| name | Bob   | Sue    |
| sex  | male  | female |
| age  | 54    | 24     |

Will generate two JSON resources:

```js
// dest/bob.json
{
	"name": "Bob",
	"sex": "male",
	"age": 54
}

// dest/sue.json
{
	"name": "Sue",
	"sex": "female",
	"age": 24
}
```

In your project's Gruntfile, add a section named `csvjson` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  csvjson: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
});
```


### Options

#### options.parserOptions
Type: `Object`

CSV parser options: see [node-csv-parse#parser-options](https://github.com/wdavidw/node-csv-parse#parser-options).

```js
options.parserOptions = {
	auto_parse : true
};
```


#### options.processValue
Type: `Function`

Hook to process field value.

```js
options.processValue = function (key, value) {
	return value;
};
```


## CSV format

The expected format is one row per value, with resource names defined in the first row,
and field keys in the first column.

| key     | resource-a |
| ------- | ---------- |
| key-one | value-one  |
| key-two | value-two  |


### Object hierarchy

Object hierarchy is expressed with dot notation in the key.

The following data:

| key         | bob   |
| ----------- | ----- |
| person.name | Bob   |
| person.sex  | male  |
| person.age  | 54    |

Will generate:

```json
{
	"person": {
		"name": "Bob",
		"sex": "male",
		"age": 54
	}
}
```


### Implicit array syntax

Arrays of values can be implicitly defined by duplicating keys.

The following data:

| key           | list    |
| ------------- | ------- |
| shopping.day  | Sunday  |
| shopping.list | fruit   |
| shopping.list | candy   |
| shopping.list | pasta   |
| shopping.list | spinach |

Will generate:

```json
{
	"shopping": {
		"day": "Sunday",
		"list": ["fruit", "candy", "pasta", "spinach"]
	}
}
```


### Explicit array syntax

Arrays of values can be explicitly defined by using integer keys.

The following data:

| key       | list    |
| --------- | ------- |
| list.0.0  | fruit   |
| list.0.1  | candy   |
| list.1.0  | pasta   |
| list.1.1  | spinach |

Will generate:

```json
{
	"list": [
		["fruit", "candy"],
		["pasta", "spinach"]
	]
}
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## Release History

### `0.1.0`

* Add support for generating multiple JSON resources per CSV document
* Add CSV parser options to task config
* Add field value processing hook to task config

### `0.0.1`

* Initial release


[travis-url]: http://travis-ci.org/jpweeks/grunt-csv-json
[travis-image]: http://img.shields.io/travis/jpweeks/grunt-csv-json/master.svg?style=flat
