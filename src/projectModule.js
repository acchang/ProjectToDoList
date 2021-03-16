import createUUID from './UUID';

// function Project(projectName, identifier) {
//     this.projectName = projectName;
//     this.identifier = identifier;
//   }

// function addProjectToList() {
//   const UUID = createUUID()
//   const projectName = document.querySelector("#projectName").value;
//   const addProject = new Project(projectName, UUID);
//   projectList.push(addProject);
//   document.querySelector("#projectName").value = "";
// };

var projectModule = {
    projectList: ['One', 'Two'],
    init: function() {
        this.cacheDom();
        this.bindEvents();
    //     this.render();
    },
    // cacheDom: function() {
    //     this.$el = $('#peopleModule');
    //     this.$button = this.$el.find('button');
    //     this.$input = this.$el.find('input');
    //     this.$ul = this.$el.find('ul');
    //     this.template = this.$el.find('#people-template').html();
    },
    // bindEvents: function() {
    //     this.$button.on('click', this.addPerson.bind(this));
    //     this.$ul.delegate('i.del', 'click', this.deletePerson.bind(this));
    // },
    // render: function() {
    //    var data = {
    //        people: this.people,
    //    };
    //    this.$ul.html(Mustache.render(this.template, data));
    // },
    // addPerson: function() {
        // this.projectList.push(this.$input.val());
        // this.projectList.push(this.$input.val());
        // this.render();
    //     this.$input.val('');
    // },
    // deletePerson: function(event) {
    //     var $remove = $(event.target).closest('li');
    //     var i = this.$ul.find('li').index($remove);

    //     this.people.splice(i, 1);
    //     this.render();
    // }

};

people.init();