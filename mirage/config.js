export default function() {
  this.get('/addresses');
  this.get('/addresses/:id');
  this.post('/addresses');
  this.del('/addresses/:id');
  this.patch('/addresses/:id');
}
