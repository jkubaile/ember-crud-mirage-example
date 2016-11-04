import DS from 'ember-data';

export default DS.Model.extend({
  model() {
    return this.get('store').findAll('address');
  }
});
