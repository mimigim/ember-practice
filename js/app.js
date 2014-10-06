var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('location', {path: '/find-me'});
  this.resource('contacts', {path: '/contact'}, function(){
    this.resource('contact', {path:'/:type'})
    // this.resource('contact', {path:'/:contact_id'})
  });
  this.resource('messages');
});

App.IndexController = Ember.Controller.extend({
  // keyboard is a property of the index controller
  keyboard: 'images/keyboard.svg',
  time: function() {
    return(new Date()).toDateString()
  }.property()
});

App.LocationController = Ember.Controller.extend({
  where: function() {
    return ((new Date()).getDay() === 0 || (new Date()).getDay() === 6) ? 'not at Code Fellows' : 'at Code Fellows from 9 - 4';
  }.property()
});

App.CONTACTS = [
  {
    type: 'Email',
    image: 'images/mail.svg',
    info: 'mimileegim@gmail.com'
  },
  {
    type: 'LinkedIn',
    image: 'images/linkedin.svg',
    info: 'https://www.linkedin.com/in/mimigim'
  }
];

App.ContactsRoute = Ember.Route.extend({
  model: function() {
   return App.CONTACTS;
  }
});

App.ContactRoute = Ember.Route.extend({
  model: function(params) {
    return App.CONTACTS.findBy('type', params.type)
  }
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

//gets fixture data out of store
App.MessagesRoute = Ember.Route.extend({
  model: function() {
   return this.store.find('message');
  },


});

App.Message = DS.Model.extend({
  text: DS.attr('string'),
  name: DS.attr('string')
});

App.Message.FIXTURES =  [
  {
    id: 1,
    name: 'Phill',
    text: 'can you give me a call ASAP?'

  },
  {
    id: 2,
    name: 'Bob',
    text: 'meet me on 10/8 at noon.'
  }
];

App.MessagesController = Ember.ObjectController.extend({
  isEditing: false,

  saveEditing: function() {
    this.set('isEditing', false);
    // //save
    this.get('store').save();
  },
  edit: function() {
    this.set('isEditing', true);
  }
});

