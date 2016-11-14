define([
    'jquery',
    'underscore',
    'backbone'
],function($){
    World = Backbone.Model.extend({
        //创建一个World对象拥有name属性
        name: null
    });
    Worlds = Backbone.Collection.extend({
        //World对象的集合
        /**
         * 
         * @param {Object} model
         * @param {Object} options
         */
        initialize: function (model,options) {
        	this.bind("add", options.view.addOneWorld);
        }
    });
    AppView = Backbone.View.extend({
        el: $("body"),
        initialize: function () {
            //构造函数实例化一个 World 集合类，并且以字典方式传入 AppView 的对象
            this.worlds = new Worlds(null, {view: this});
        },
        //事件绑定
        events: {
            'click #check': "checkIn",//事件绑定，绑定DOM元素中的id为check的
        },
        checkIn: function () {
            var worldName = prompt('请问您是哪星人？');
            if(!worldName){
                return;
            }
            if(worldName === ''){
                worldName = '未知星球的生物，请注意是否为入侵者！！！入侵者请尽快离开！！！';
            }
            var world = new World({name: worldName});
            this.worlds.add(world);
        },
        addOneWorld: function (world) {
            $("#world-list").append('<li>hello World！<b style="color:red">'+world.get("name")+'</b></li>');
        }
    });
    var appView = new AppView();
});