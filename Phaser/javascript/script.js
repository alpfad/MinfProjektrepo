var game = new Phaser.Game(1000,400,Phaser.AUTO,'content',{preload: preload, create: 
create,update:update}); 

function preload(){ 
	//game.load.image('prinz', 'assert/Character1.png');
	//game.load.image('prinz', 'assert/Character2.png');
	//game.load.image('prinz', 'assert/Character3.png');
	game.load.image('Hintergrund', 'assert/Hintergrund.png');
// laden spritesheet 
	game.load.spritesheet('prinz', 'assert/StyleSheet14pic.png', 85, 48);
	game.load.image('ground', 'assert/platform.png');
} 

var richtung;
var platforms;
var player;

function create(){ 
	game.physics.startSystem(Phaser.Physics.ARCADE);

  meinZeug = game.add.sprite(0, 0, 'Hintergrund');
	platforms = game.add.group();
	platforms.enableBody = true;
	var ground = platforms.create(0, game.world.height - 64, 'ground');
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;
	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;
    player = game.add.sprite(32, game.world.height - 150, 'prinz');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;


	//meinZeug = game.add.sprite(400, 300,'prinz');
	//meinZeug.anchor.setTo(0.5, 0.5);
	// definiere animation 
	player.animations.add('left', [0, 1, 6], 10, true);
  player.animations.add('right', [7, 8, 13], 10, true);
  player.animations.add('hitRight', [11,12],5,true);
  player.animations.add('hitLeft',[4,5],5,true);
  game.camera.follow(player);
} 

function update(){
	player.body.velocity.x = 0;
  game.physics.arcade.collide(player, platforms);

	if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)==true){
		player.body.velocity.x = 150;
		richtung = true;
        player.animations.play('right');
    
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)==true){ 
	 		player.body.velocity.x = -150;
	 		richtung = false;
        player.animations.play('left');
    }
     
  else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)== true /*&& player.body.touching.down*/)
    {
        player.body.velocity.y = -350;
        player.animations.stop();
        if(richtung == true){
          player.frame = 10;
        }
        else{
          player.frame = 3;
        }
    }
  else
    {
      if (richtung == true){
        //  Stand still
        player.animations.stop();

        player.frame = 13;
      }
      else{
        player.animations.stop();
         player.frame = 6;
      }
    }


	

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) == true){
      if(richtung == true){
        player.animations.play('hitRight');
      }
      else{
        player.animations.play('hitLeft');
      }
       player.animations.stop();
    }
    
} 