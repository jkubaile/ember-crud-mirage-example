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
