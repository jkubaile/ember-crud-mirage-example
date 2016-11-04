# Crud

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd crud`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

### CRUD Application Tutorial

This tutorial application is heavily inspired by https://gist.github.com/pablobm/e77a98e5f3c610953a82

It extends the main concepts with working mirage model and endpoints. You can checkout this repository or
just follow the steps below.

## Step 0: create the project

* Create a new ember project: `ember new crud`.

## Step 1: install ember addon dependencies

* Install mirage dependency: `ember install ember-cli-mirage`.
* We use semantic ui for visualisation: `ember install semantic-ui-ember`.
* Start ember with `ember s` and visit http://localhost:4200 with your browser.

## Step 2: define the model

We are going to build a small addressbook. So we need something like an address. Cause ember models are pluralized,
the model is called `addresses`.

* Create the ember model: `ember generate model addresses` - this is for your ember frontend code.
* Create the mirage model: `ember generate mirage-model addresses` - this for mirage, knowing your model.
* Create the mirage factory: `ember generate mirage-factory addresses` - so we can generate demo data with mirage factories.
* Create the ember route to display the addresses: `ember generate route addresses`.
