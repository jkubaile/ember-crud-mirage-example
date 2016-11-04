import Ember from 'ember';

export default Ember.Route.extend({
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
