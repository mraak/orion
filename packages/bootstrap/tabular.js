orion.collections.onCreated(function() {
  var self = this;
  // if the collection doesn't has the tabular option, nothing to do here!
  if (!_.has(this, 'tabular')) return;

  var tabularOptions = _.extend({
    name: 'tabular_' + this.name,
    collection: this,
    columns: [
      { data: "_id", title: "ID" }
    ],
    selector: function(userId) {
      var selectors = Roles.helper(userId, 'collection.' + self.name + '.indexFilter');
      return { $or: selectors };
    }
  }, this.tabular);

  this.tabularTable = new Tabular.Table(tabularOptions);
});

orion.accounts.tabular = new Tabular.Table({
  name: 'AccountsIndex',
  collection: Meteor.users,
  columns: [
    {
      data: 'profile.name',
      title: 'Name',
      render: function(name, type) {
        if (name) {
          return '<b>' + name + '</b>';
        } else {
          return '<b>NA</b>';
        }
      }
    },
    {
      data: 'emails',
      title: 'Email',
      render: function(emails) {
        return emails.map(function(email) {
          return email.address;
        }).join(', ');
      }
    },
    {
      title: 'Enrolled',
      tmpl: Meteor.isClient && Template[ReactiveTemplates.get('accounts.index.enrolled')]
    },
    {
      data: 'roles()',
      title: 'Roles',
      render: function(roles) {
        return '<span class="label label-danger">' + roles + '</span>'
      }
    },
    {
      title: 'Actions',
      tmpl: Meteor.isClient && Template[ReactiveTemplates.get('accounts.index.buttons')]
    }
  ]
});
