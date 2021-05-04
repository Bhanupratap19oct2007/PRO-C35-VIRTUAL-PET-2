var database;
var dog, happyDog, foodS, foodStock, fedTime, lastFed, foodObj, feedDog;

function preload() {
	dogImage = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(400,200);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  
  database = firebase.database();

  //var foodStock = createSprite(200, 200);
  foodStock = database.ref('Food');
  foodStock.on("value", readstock);

  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
}

function draw() {
  background(46,139,87);

  fedTime = database.ref('feedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  drawSprites();
}

function addFood() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog() {
  dog.addImage("happyDog", happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function readstock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}