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

We are going to build a small addressbook. So we need something like an address.

* Create the ember model: `ember generate model address` - this is for your ember frontend code.
* Create the mirage model: `ember generate mirage-model address` - this for mirage, knowing your model.
* Create the mirage factory: `ember generate mirage-factory address` - so we can generate demo data with mirage factories.
* Model the model - open app/models/address.js and change it to:
```
import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  street: DS.attr('string'),
  city: DS.attr('string'),
  country: DS.attr('string')
});

```

## Step 3: Prepare mirage for addresses.

* Open mirage/factories/address.js and change it to:
```
import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName() {
    return faker.name.firstName();
  },
  lastName() {
    return faker.name.lastName();
  },
  street() {
    return faker.address.streetAddress();
  },
  city() {
    return faker.address.city();
  },
  country() {
    return faker.address.country();
  }
});
```
We are using the fine faker lib to generate some random data. Alternativly you can just enter statics values.

* Next, change the default scenario in mirage/scenarios/default.js to:
```
export default function(server) {
  server.createList('address', 20);
}
```
So mirage generates 20 address entries for us with the given factory settings.

* Last, we need to define the routes, needed for the CRUD stuff to work. Open mirage/config.js and change it to:
```
export default function() {
  this.get('/addresses');
  this.get('/addresses/:id');
  this.post('/addresses');
  this.del('/addresses/:id');
  this.patch('/addresses/:id');
```

## Step 4: Show all addresses

* Create the ember route to display the addresses: `ember generate route addresses/index`.
* Open the hbs template and add:
```
<div class="ui segment">
  <table class="ui table">
    <thead>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Street</th>
      <th>City</th>
      <th>Coutnry</th>
    </thead>
    <tbody>
      {{#each model as |address|}}
        <tr>
          <td>{{address.firstName}}</td>
          <td>{{address.lastName}}</td>
          <td>{{address.street}}</td>
          <td>{{address.city}}</td>
          <td>{{address.country}}</td>
        </tr>
      {{/each}}
    </tbody>
  </table>
</div>
```

* Open the router file and change it to:
```
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('address');
  }
});
```

* Head your browser to: http://localhost/addresses to see the result: 20 generated dummy entries in our address table.

## Step 5: create a form component

Cause the form to edit and add new address are the same we make a component out of it:

* `ember g component address-form`
* Change the template content to:
```
<div class="field">
  <label>First Name</label>
  <div class="ui action input">
    {{input value=model.firstName}}
  </div>
</div>
<div class="field">
  <label>Last Name</label>
  <div class="ui action input">
    {{input value=model.lastName}}
  </div>
</div>
<div class="field">
  <label>Street</label>
  <div class="ui action input">
    {{input value=model.street}}
  </div>
</div>
<div class="field">
  <label>City</label>
  <div class="ui action input">
    {{input value=model.city}}
  </div>
</div>
<div class="field">
  <label>Country</label>
  <div class="ui action input">
    {{input value=model.country}}
  </div>
</div>
```


## Step 6: create the route to add new addresses

* `ember g route addresses/new`
* Change the template to
```
<div class="ui grid form">
  <div class="sixteen wide column">
    <form {{action 'save' model on='submit'}} >
      <div class="ui segment">
        {{address-form model=model}}
      </div>
      <button type="submit" class="ui button">Add address</button>
    </form>

    {{#link-to 'addresses' }}
      <button class="ui button icon chevron left">Go Back</button>
    {{/link-to}}
  </div>
</div>
```
* And the JS of the route to:
```
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').createRecord('address');
  },

  actions: {
    save(record) {
      record.save()
        .then(() => this.transitionTo('addresses'));
    },

    willTransition() {
      this._super(...arguments);
      const record = this.controller.get('model');
      record.rollbackAttributes();
    }
  }

});
```
* Now you can visit http://localhost:4200/addresses/new and add new entries. They will stay until you hit reload.


Step 7: Add the edit route
