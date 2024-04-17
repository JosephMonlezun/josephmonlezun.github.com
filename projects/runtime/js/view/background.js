var background = function(window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    window.opspark.makeBackground = function(app, ground) {
        if (!app) {
            throw new Error("Invalid app argument");
        }
        if (!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        var background;
        var tree;
        var buildings = [];

        function render() {
            background.removeAllChildren();

            // TODO 1: Modify Background Color
            var backgroundFill = draw.rect(canvasWidth, canvasHeight, 'darkblue');
            background.addChild(backgroundFill);
            
            // TODO 2: Add Moon and Starfield
            var gal = draw.bitmap("img/gal.jpg");
            gal.x = 0;
            gal.y = 0;
            gal.scaleX = 50.20; 
            gal.scaleY = 50.20; 
            background.addChild(gal);
            
            var moon = draw.bitmap("img/moon.png");
            moon.x = 300;
            moon.y = 200;
            moon.scaleX = 0.20; 
            moon.scaleY = 0.20; 
            background.addChild(moon);
            
            for (var i = 0; i <= 100; ++i) {
                var circle = draw.circle(10, "white", "lightGray", 2);
                circle.x = Math.random() * canvasWidth;
                circle.y = Math.random() * groundY;
                background.addChild(circle);
            }
            
            // TODO 3: Add Tree and Move It
            tree = draw.bitmap("img/tree.png");
            tree.x = 0; 
            tree.y = groundY; 
            background.addChild(tree);

            // TODO 4: Part 1 - Add Buildings
            for (var i = 0; i < 5; ++i) {
                var buildingHeight = 300;
                var building = draw.rect(75, buildingHeight, "DarkGray", "Black", 1);
                building.x = 200 * i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
        } 
        
        function update() {
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Move the Tree
            tree.x -= 1; 
            if (tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            // TODO 4: Part 2 - Parallax
            buildings.forEach(function(building) {
                building.x -= 1; 
                if (building.x < -200) {
                    building.x = canvasWidth;
                }
            });
        } 
        
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// Export for Node.js
if ((typeof process !== 'undefined') && (typeof process.versions.node !== 'undefined')) {
    module.exports = background;
}
