$(function(){

	var Todo = Backbone.Model.extend({

		defaults:function(){
			return {
				title:'空的事情',
				order: Todos.nextOrder(),
				done: false
			};
		},

		toggle: function(){
			this.save({done: !this.get("done")});
		}
	});

	var TodoList = Backbone.Collection.extend({
		model: Todo,

		localStorage: new Backbone.LocalStorage("todos-backbone"),

		done: function(){
			return this.where({done:true});
		},

		remaining: function(){
			return this.where({done:false});
		},

		nextOrder: function(){
			if(!this.length) return 1;
			return this.last().get('order')+1;
		},

		comparator: 'order'
	});

	var Todos = new TodoList;

	var TodoView = Backbone.View.extend({

		TagName: "li",

		template: _.template($('#item-template').html()),

		events:{
			"click .toggle":"toggleDone",
			"dbclick .view":"edit",
			"click a.destroy":"clear",
			"keypress .edit":"updateOnEnter",
			"blur .edit":"close"
		},
		initialize: function(){
			alert("todoview-initialize");
			this.listenTo(this.model,'change',this.render);
			//让object监听this.model对象上的一个特定事件，允许object跟踪这个特定事件，并且以后可以一次性全部移除他们
			//set会出触发change事件，更改特定属性的事件也会触发
			this.listenTo(this.model,'destroy',this.remove);
		},
		render: function(){
			alert("TodoView-render");
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('done',this.model.get('done'));
			this.input = this.$('.edit');
			return this;
		},
		toggleDone: function(){
			alert("toggleDone");
			this.model.toggle();
		},

		edit: function(){
			alert("edit");
			this.$el.addClass('edit');
			this.input.focus();
		},
		close:function(){
			alert("close");
			var value = this.input.val();
			if(!value){
				this.clear();
			}else{
				this.model.save({title:value});
				this.$el.removeClass('edit');
			}
		},

		updateOnEnter: function(e){
			alert("updateOnEnter");
			if(e.keyCode == 13) this.close();
		},

		clear: function(){
			alert("clear");
			this.model.destroy();
		}
	});

	var AppView = Backbone.View.extend({
		el: $("#todoapp"),

		statsTemplate: _.template($('#stats-template').html()),

		events: {
			"keypress #new-todo":"createOnEnter",
			"click #clear-completed":"clearCompleted",
			"click #toggle-all":"toggleAllComplete"
		},

		initialize: function(){
			alert("AppView-initialize");
			this.input = this.$("#new-todo");
			this.allCheckbox = this.$("#toggle-all")[0];

			this.listenTo(Todos, 'add',this.addOne);
			this.listenTo(Todos,'reset',this.addAll);
			this.listenTo(Todos,'all',this.render);

			this.footer = this.$('footer');
			this.main = $("#main");

			Todos.fetch();
		},

		render: function(){
			alert("AppView-render");
			var done = Todos.done().length;
			var remaining = Todos.remaining().length;

			if(Todos.length){
				this.main.show();
				this.footer.show();
				this.footer.html(this.statsTemplate({done:done,remaining:remaining}));
			}else{
				this.main.hide();
				this.footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},
		addOne: function(todo){
			alert("addOne");
			var view = new TodoView({model: todo});//new TodoView 触发init方法
			this.$("#todo-list").append(view.render().el);
		},
		addAll:function(){
			alert("addAll");
			Todos.each(this.addOne,this);
		},

		createOnEnter: function(e){
			alert("createOnEnter");
			if(e.keyCode != 13) return ;
			if(!this.input.val()) return ;

			Todos.create({title:this.input.val()});//在集合中创建一个模型的新实例，相当于使用键值对象实例化一个模型，
			//然后将该模型保存到服务器，创建成功后将模型添加到集合中，于是触发上面的add方法
			this.input.val('');
		},
		clearCompleted: function(){
			alert("clearCompleted")
			_.invoke(Todos.done(),'destroy');
			return false;
		},
		toggleAllComplete:function(){
			alert("toggleAllComplete");
			var done = this.allCheckbox.checked;
			Todos.each(function(todo){
				todo.save({'done':done});
			});
		}

	});


	var App = new AppView;

})