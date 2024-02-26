/*
  Dante Sangoi, Terence Nguyen, Daniel Song, Manesh Logathas
  5/30/2023
  Game
  Holds all the code necessary for the game to run
*/

/************** Functions **************/

// Function to reset game variables
function reset() {
  maxVelocity=400;
  maxVelocity2=400;
  counter=0;
  jumps=0;
  jumps2=0;
  p1Powerup=0;
  p2Powerup=0;
  lives=3;
  lives2=3;
  p1Score=0;
  p2Score=0;
}

// Functions for calculating scores
function score(a,b) {
  let num=0;
  let score=0;
  if (b==1) { // checks if it is a kill
    num=maxVelocity-400;
    if (num<=45) {
      score=50;
    }
    else {
      score=num/90;
      score*=a
    }
  }
  else { // not a kill
    num=maxVelocity-400;
    if (num<=500) {
      score=a;
    }
    else {
      score=num/100;
      score*=a
    }
  }
  return score;
}
function score2(a,b) {
  let num=0;
  let score=0;
  if (b==1) { // checks if it is a kill
    num=maxVelocity2-400;
    if (num<=45) {
      score=50;
    }
    else {
      score=num/90;
      score*=a
    }
  }
  else { // not a kill
    num=maxVelocity2-400;
    if (num<=500) {
      score=a;
    }
    else {
      score=num/100;
      score*=a
    }
  }
  return score;
}

function sort() { // sorts scoreboard and names
  for (let x=0;x<scoreboard.length;x++) {
    for (let y=0;y<scoreboard.length-1;y++) {
      if (scoreboard[y]>scoreboard[y+1]) {
        let temp=scoreboard[y+1];
        scoreboard[y+1]=scoreboard[y];
        scoreboard[y]=temp;
        let temp2=scoreNames[y+1];
        scoreNames[y+1]=scoreNames[y];
        scoreNames[y]=temp2;
      }
    }
  }
  return scoreboard;
}
// Gets the top five scores
function topFiveScores(a) {
  let listScores=[];
  let length=scoreboard.length-1;
  if (length>=5) { // get top 5
    for (let x=length;x>length-5;x--) {
      listScores.push(scoreboard[x]);
    }
  }
  else if (length>=1) { // get top 1 - 4
    for (let x=0;x<=length;x++) {
      listScores.unshift(scoreboard[x]);
    }
    while (listScores.length<=5) {
      listScores.push(0);
    }
  }
  else { // no players in database
    for (let x=0;x<5;x++) {
      listScores.push(0);
    }
  }
  if (a>=4) {
    return listScores[4];
  }
  else if (a>=3) {
    return listScores[3];
  }
  else if (a>=2) {
    return listScores[2];
  }
  else if (a>=1) {
    return listScores[1];
  }
  else if (a>=0) {
    return listScores[0];
  }
}
// Gets the names corresponding to the top 5 scores
function topFiveNames(a) {
  let listNames=[];
  let length=scoreboard.length-1;
  if (length>=5) { // get top 5
    for (let x=length;x>length-5;x--) {
      listNames.push(scoreNames[x]);
    }
  }
  else if (length>=1) { // get top 1 - 4
    for (let x=0;x<=length;x++) {
      listNames.unshift(scoreNames[x]);
    }
    while (listNames.length<=5) {
      listNames.push("Monkey");
    }
  }
  else { // no players in database
    for (let x=0;x<5;x++) {
      listNames.push("Monkey");
    }
  }
  // Check which position
  if (a>=4) {
    return listNames[4];
  }
  else if (a>=3) {
    return listNames[3];
  }
  else if (a>=2) {
    return listNames[2];
  }
  else if (a>=1) {
    return listNames[1];
  }
  else if (a>=0) {
    return listNames[0];
  }
}

/************** Global Variables **************/

let counter=0;

// Creating Variables for key inputs
let leftKey;
let rightKey;
let aKey;
let dKey;
let upKey;
let spaceKey;
let wKey;
let downKey;
let sKey;
let eKey;
let mKey;

// Power Ups
let powerupDrop;
let p1Powerup;
let p2Powerup;
let powerupBanana;
let powerupBanana2;
let powerupDropHelp;

// Score
let p1Score=0;
let p2Score=0;

// Game Mechanics
let jumps;
let jumps2;
let maxVelocity=400;
let maxVelocity2=400;
let headBox;
let headBox2;
let bananaDrop;
let lives=3;
let lives2=3;
let emoteDisplay;
let emoteDisplay2;

// Characters
let character;
let character2;

// Character 1 HUD
let nameHud;
let healthHud;
let healthText;
let displayHealth;
let powerupHud;
let livesbar1;

// Character 2 HUD
let nameHud2;
let nameHudRight;
let healthHud2;
let healthText2;
let displayHealth2;
let powerupHud2;
let livesbar2;

//Centering Text
let winCenter;
let winCenter2;

// Sounds and Music
let menuMusic; 
let gameMusic;

// Arrays
let characterArray = [];
let character2Array = []; 
let name =[];
let scoreboard=[];
let scoreNames=[];

//artificial inteligence variables
let jumpLocation; 
let scared = false; 


//Help Screen Buttons
let displayW;
let displayD;
let displayA;
let displayS;
let displayE;
let displayUp;
let displayDown;
let displayLeft;
let displayRight;
let displayM;

//TITLESCREEN
class titleScreen extends Phaser.Scene
{
  
  constructor (config)
  {
    super(config);
  }
  preload ()
  {
    // loads images
    this.load.image("singleplayerButton", "assets/sprites/singleplayerButton.png");
    this.load.image("multiplayerButton", "assets/sprites/multiplayerButton.png");
    this.load.image("helpButton", "assets/sprites/helpButton.png"); 
    this.load.image("scoreButton", "assets/sprites/scoreButton.png");
    this.load.image("bg", "assets/backgrounds/title.png");
    this.load.image("bg2", "assets/backgrounds/title2.jpeg");
    this.load.audio("menuMusic", "assets/sounds/titleMusic.mp3");
  }//end of preload
  create (data)
  {
    let gameBackground=this.add.image(500, 300, "bg"); 
    let helpButton=this.add.image(820, 450, "helpButton"); //Ttitle screen help button
    helpButton.displayWidth=100;
    helpButton.displayHeight=100;
    helpButton.setInteractive({useHandCursor: true})
    helpButton.setScale(0.2);
    helpButton.on("pointerover",()=>{ // Pointerover is when the mouse is hovering over the button and I scale it bigger
      helpButton.setScale(0.25);
    })
    helpButton.on("pointerout",()=>{ // When the mouse is not over the button it returns to normal size
      helpButton.setScale(0.2);
    })
    helpButton.on("pointerdown",()=>{ // When the button is clicked it gets smaller
      helpButton.setScale(0.15)
      this.time.addEvent //adds a delay to switch screens
      ({
        delay: 200,
        callback: ()=>
        {
          this.scene.start("help");
        },
      })
    })
    let scoreButton=this.add.image(150,450,"scoreButton"); //title screen score button
    scoreButton.setScale(0.7);
    scoreButton.setInteractive({useHandCursor: true})
    scoreButton.on("pointerover",()=>{
      scoreButton.setScale(0.8);
    })
    scoreButton.on("pointerout",()=>{ // When the mouse is not over the button it returns to normal size
      scoreButton.setScale(0.7);
    })
    scoreButton.on("pointerdown",()=>{ // When the button is clicked it gets smaller
      scoreButton.setScale(.6);
      this.time.addEvent //adds a delay to switch screens
      ({
        delay: 200,
        callback: ()=>
        {
          this.scene.start("score");
        },
      })
    })
    let buttonSingleplayer=this.add.image(500, 400, "singleplayerButton"); //title screen singleplayer button
    buttonSingleplayer.displayWidth=600;
    buttonSingleplayer.displayHeight=110; 
    buttonSingleplayer.setInteractive({useHandCursor: true});
    buttonSingleplayer.setScale(0.7); 
    buttonSingleplayer.on("pointerover",()=>{ // Pointerover is when the mouse is hovering over the button and I scale it bigger
      buttonSingleplayer.setScale(0.75);
    })
    buttonSingleplayer.on("pointerout",()=>{ // When the mouse is not over the button it returns to normal size
      buttonSingleplayer.setScale(0.7);
    })
    buttonSingleplayer.on("pointerdown",()=>{ // When the button is clicked it gets smaller
      buttonSingleplayer.setScale(0.6);
      this.time.addEvent //adds a delay to switch screens
        ({
          delay: 200,
          callback: ()=>
          {
            menuMusic.stop();
            this.scene.start("one");
          },
        })
      })
    
    let buttonMultiplayer=this.add.image(500, 500, "multiplayerButton"); //titlescreen multiplayer button
    buttonMultiplayer.displayWidth=600; 
    buttonMultiplayer.displayHeight=110;
    buttonMultiplayer.setInteractive({useHandCursor: true})
    buttonMultiplayer.setScale(0.7); 
    buttonMultiplayer.on("pointerover",()=>{ // Pointerover is when the mouse is hovering over the button and I scale it bigger
     buttonMultiplayer.setScale(0.75);
    })
    buttonMultiplayer.on("pointerout",()=>{ // When the mouse is not over the button it returns to normal size
      buttonMultiplayer.setScale(0.7);
    })
    buttonMultiplayer.on("pointerdown",()=>{ // When the button is clicked it gets smaller
      buttonMultiplayer.setScale(0.6);
      this.time.addEvent //adds a delay to switch screens
      ({
        delay: 200,
        callback: ()=>
        {
          menuMusic.stop();
          this.scene.start("two");
        },
      })
    })
     
    menuMusic=this.sound.add("menuMusic", { loop: true });//menu music
    menuMusic.play();
  }//end of create
  update ()
  {
    
  }
}
//end of titleScreen

class inputNameOne extends Phaser.Scene
{
  constructor (config)
  {
    super(config);
  }
  //The preload function is where we write code to load all game resources into memory.
  preload ()
  {
    this.load.spritesheet("inputName","assets/backgrounds/enterName.png",{frameWidth: 1000, frameHeight: 600 });
  }//end of preload
  //The create is where we will create the game objects in code
  create (data)// SINGLE PLAYER NAME ENTRY PAGE
  {
    let txtLong;
    let txtLongTemp;
    let longCounter=0;
    this.aKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.wKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.sKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.eKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.upKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.leftKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.rightKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.mKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    this.anims.create({
        key: "player1",
        frames: [ { key: "inputName", frame: 0 } ],
        frameRate: 1
    });
    
    let gameBackground=this.add.sprite(500,300,"p1Enter");
    gameBackground.anims.play("player1");
    let input = this.add.dom(400,300).createFromHTML('<input type="text" id="nameInput" placeholder="Enter Name">');//created an HTML input tag to get the player name
     
    // Append the text box to the HTML document
    document.getElementById('game-container').appendChild(input.node);
  
    // input detection
    const inputElement = document.getElementById('nameInput');
    inputElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') 
      {
        name[1]="CPU";
        name[0] = inputElement.value;
        name[0] = name[0].toUpperCase();//makes the name the player entered uppercase
        if (name[0].length <= 10)
        {
          if (name[0]=="")//if no name was entered name the player "Yellow"
          {
            name[0]= "Yellow";
          }
          scoreNames.push(name[0]);
          scoreNames.push(name[1]);
          this.time.addEvent //adds a delay to switch screens
          ({
            delay: 200,
            callback: ()=> {
              this.scene.start("singleplayer");//starts the singleplayer scene
            },
          })
        }
        else 
        {
          longCounter++;
          if (txtLong) //this checks if txtLong exists. if it exixts txtLong dies
          {
            txtLong.destroy();
            txtLongTemp.destroy();
          }
          // adds the text (txtLong)
          txtLongTemp = this.add.text(10000, 100000, "Name is too long (" + longCounter + ")", { fontFamily: 'bradhi', fontSize: 50, color: "#e7c400" }).setOrigin(-0.25);
          let txtLongCenter=500-txtLongTemp.width/2;//this variable centeres txtLong by getting the width of txtLong dividing it by 2 than subtracting 500(the width of the screen divided by 2)
          txtLong = this.add.text(txtLongCenter, 5, "Name is too long (" + longCounter + ")", { fontFamily: 'bradhi', fontSize: 50, color: "#e7c400" });//if the player enteres thier name with too many letteres this will display whith the amount of times they they put too many letteres
        }
      }
    });
  }//end of create
  update()
  {//this checke if the player has entered "w", "a", "s", "d", "e" and "m" and puts those letters into the text box. this is necessary because it fixes an issue where after a game is finished it dosent stop detecting buttons that were previously used.
    if(Phaser.Input.Keyboard.JustDown(this.wKey)){
      document.getElementById('nameInput').value += "w";
    }
    else if(Phaser.Input.Keyboard.JustDown(this.aKey)){
      document.getElementById('nameInput').value += "a";
    }
    else if(Phaser.Input.Keyboard.JustDown(this.sKey)){
      document.getElementById('nameInput').value += "s";
    }
    else if(Phaser.Input.Keyboard.JustDown(this.dKey)){
      document.getElementById('nameInput').value += "d";
    }
    else if(Phaser.Input.Keyboard.JustDown(this.eKey)){
      document.getElementById('nameInput').value += "e";
    }
    else if(Phaser.Input.Keyboard.JustDown(this.mKey)){
      document.getElementById('nameInput').value += "m";
    }
  }//end of update
}

class inputNameTwo extends Phaser.Scene
{
  constructor (config)
  {
    super(config);
  }
  //The preload function is where we write code to load all game resources into memory
  preload ()
  {
    this.load.spritesheet("inputName","assets/backgrounds/enterName.png",{frameWidth: 1000, frameHeight: 600 });
  }//end of preload
  //The create is where we will create the game objects in code.
  create (data)
  {//MULTIPLAYER NAME SCREEN
    let txtLong;
    let txtLongTemp;
    let longCounter=0;
    
    this.aKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.wKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.sKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.eKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.upKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.leftKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.rightKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.mKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    this.anims.create({
        key: "player1",
        frames: [ { key: "inputName", frame: 0 } ],
        frameRate: 1
    });
    this.anims.create({
        key: "player2",
        frames: [ { key: "inputName", frame: 1 } ],
        frameRate: 1
    });
    
    let gameBackground=this.add.sprite(500,300,"inputName");
    gameBackground.anims.play("player1");
    let input = this.add.dom(400, 300).createFromHTML('<input style="font-family="pixel";,text-align: center;" type="text" id="nameInput" placeholder="Player 1 Enter Name">');
     
    // Append the text box to the HTML document
    document.getElementById('game-container').appendChild(input.node);

    // input detection
    const inputElement = document.getElementById('nameInput');
    inputElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') 
      {
        if(counter==0)
        {
          name[0] = inputElement.value;
          name[0] = name[0].toUpperCase();
          if (name[0].length <= 10)
          {
            if (name[0]=="")//if player dosent enter a name name they "Yellow"
            {
              name[0]= "Yellow";
            }
            counter=1;
            inputElement.placeholder = 'Player 2 Enter Name';//changes the placeholder text (the text in the box if you arent on the box)
            inputElement.value = '';//kicks you out of the box so you dont get confused when entering the seccond name
            longCounter=0;
            if (txtLong) //this checks if txtLong exists. if it exixts txtLong dies
            {
              txtLong.destroy();
              txtLongTemp.destroy();
            }
          }
          else 
          {
            longCounter++;
            if (txtLong) //this checks if txtLong exists. if it exits txtLong dies
            {
              txtLong.destroy();
              txtLongTemp.destroy();
            }
            // adds the text (txtLong)
            txtLongTemp = this.add.text(10000, 100000, "Name is too long (" + longCounter + ")", { fontFamily: 'bradhi', fontSize: 50, color: "#e7c400" }).setOrigin(-0.25);
            let txtLongCenter=500-txtLongTemp.width/2;
            txtLong = this.add.text(txtLongCenter, 5, "Name is too long (" + longCounter + ")", { fontFamily: 'bradhi', fontSize: 50, color: "#e7c400" });
          }
          gameBackground.anims.play("player2");
        }
        else if (counter==1)
        {
          name[1] = inputElement.value;
          name[1] = name[1].toUpperCase();
          if (name[1].length <= 10)
          {
            if (name[1]=="")//if player 2 dosent enter a name name them "Red"
            {
              name[1]= "Red";
            }
            scoreNames.push(name[0]);
            scoreNames.push(name[1]);
            this.time.addEvent //adds a delay to switch screens
            ({
              delay: 200,
              callback: ()=> {
                this.scene.start("multiplayer");//starts the multiplayer scene
              },
            })
          }
          else 
          {
            longCounter++;
            if (txtLong) //this checks if txtLong exists. if it exixts txtLong dies
            {
              txtLong.destroy();
              txtLongTemp.destroy();
            }
            // adds the text (txtLong)
            txtLongTemp = this.add.text(10000, 100000, "Name is too long (" + longCounter + ")", { fontFamily: 'bradhi', fontSize: 50, color: "#e7c400" }).setOrigin(-0.25);
            let txtLongCenter=500-txtLongTemp.width/2;
            txtLong = this.add.text(txtLongCenter, 5, "Name is too long (" + longCounter + ")", { fontFamily: 'bradhi', fontSize: 50, color: "#e7c400" });
          }
        }
          
      }
    });
  }//end of create
  update()
  {
    if(Phaser.Input.Keyboard.JustDown(this.wKey)){
      document.getElementById('nameInput').value += "w";
    }
    else if(Phaser.Input.Keyboard.JustDown(this.aKey)){
      document.getElementById('nameInput').value += "a";
    }
    else if(Phaser.Input.Keyboard.JustDown(this.sKey)){
      document.getElementById('nameInput').value += "s";
    }
    else if(Phaser.Input.Keyboard.JustDown(this.dKey)){
      document.getElementById('nameInput').value += "d";
    }
    else if(Phaser.Input.Keyboard.JustDown(this.eKey)){
      document.getElementById('nameInput').value += "e";
    }
    else if(Phaser.Input.Keyboard.JustDown(this.mKey)){
      document.getElementById('nameInput').value += "m";
    }
  }
}



class helpScreen extends Phaser.Scene//HELPSCREEN
{   
  constructor (config)
  {
    super(config);
  }
  preload()
  {
    // don't need to preload images and audios that have already been loaded in first scene
    this.load.image("back","assets/sprites/backButton.png");
    this.load.image("help","assets/backgrounds/help.jpeg");
    this.load.image("w","assets/sprites/WKEY.jpg");
    this.load.image("a","assets/sprites/AKEY.jpg");
    this.load.image("s","assets/sprites/SKEY.jpg");
    this.load.image("d","assets/sprites/DKEY.jpg");
    this.load.image("e","assets/sprites/EKEY.jpg");
    this.load.image("m","assets/sprites/MKEY.jpg");
    this.load.image("arrow","assets/sprites/UPKEY.jpg");
    this.load.image("pixel","assets/sprites/1x1pixel.png");
    this.load.image("powerup", "assets/sprites/powerup.png");
    this.load.image("powerupReal", "assets/sprites/bananaClipart.png");
    this.load.spritesheet("redMonkey","assets/sprites/redMonkey.png", {frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("yellowMonkey","assets/sprites/yellowMonkey.png", {frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("emote", "assets/sprites/emote.png",{frameWidth: 262, frameHeight: 262 });
  }
  create()
  {
    let background=this.add.image(500,300,"help");
    let box=this.physics.add.image(500,300,"pixel");
    box.displayHeight=20;
    box.displayWidth=1000;
    box.setImmovable();
    let box2=this.physics.add.image(0,150,"pixel");
    box2.displayHeight=300;
    box2.displayWidth=20;
    box2.setImmovable();
    let box3=this.physics.add.image(1000,150,"pixel");
    box3.displayHeight=300;
    box3.displayWidth=20;
    box3.setImmovable();
    let box4=this.physics.add.image(500,150,"pixel");
    box4.displayHeight=300;
    box4.displayWidth=20;
    box4.setImmovable();

    //The Buttons
    displayW=this.add.image(200,400,"w");
    displayA=this.add.image(100,500,"a");
    displayS=this.add.image(200,500,"s");
    displayD=this.add.image(300,500,"d");
    displayE=this.add.image(300,400,"e");

    displayUp=this.add.image(800,400,"arrow");
    displayDown=this.add.image(800,500,"arrow");
    displayDown.angle=180;
    displayLeft=this.add.image(700,500,"arrow");
    displayLeft.angle=270;
    displayRight=this.add.image(900,500,"arrow");
    displayRight.angle=90;
    displayM=this.add.image(700,400,"m");

    //adjusting size for the buttons
    displayW.displayWidth=70;
    displayW.displayHeight=70;
    displayA.displayWidth=70;
    displayA.displayHeight=70;
    displayS.displayWidth=70;
    displayS.displayHeight=70;
    displayD.displayWidth=70;
    displayD.displayHeight=70;
    displayE.displayWidth=70;
    displayE.displayHeight=70;
    displayUp.displayWidth=70;
    displayUp.displayHeight=70;
    displayDown.displayWidth=70;
    displayDown.displayHeight=70;
    displayLeft.displayWidth=70;
    displayLeft.displayHeight=70;
    displayRight.displayWidth=70;
    displayRight.displayHeight=70;
    displayM.displayWidth=70;
    displayM.displayHeight=70;

    //created the characters and powerups
    character=this.physics.add.sprite(300,100,"yellowMonkey");
    character.displayWidth=80;
    character.displayHeight=80;
    character.body.setSize(80, 65);
    character.body.setOffset(0, 13);
    character2=this.physics.add.sprite(700,100,"redMonkey");
    character2.displayWidth=80;
    character2.displayHeight=80;
    character2.body.setSize(80, 65);
    character2.body.setOffset(0, 13);
    powerupBanana=this.physics.add.image(-100,-100,'powerupReal');
    powerupBanana.displayWidth=60;
    powerupBanana.displayHeight=60;
    powerupBanana2=this.physics.add.image(-100,-100,'powerupReal');
    powerupBanana2.displayWidth=60;
    powerupBanana2.displayHeight=60;
    emoteDisplay=this.add.sprite(-100,-100,"emote");
    emoteDisplay.displayWidth=80;
    emoteDisplay.displayHeight=65;
    emoteDisplay2=this.add.sprite(-100,-100,"emote");
    emoteDisplay2.displayWidth=80;
    emoteDisplay2.displayHeight=65;
    powerupDrop=this.physics.add.sprite(40,250,"powerup");
    powerupDrop.displayWidth=50;
    powerupDrop.displayHeight=50;
    powerupDropHelp=this.physics.add.sprite(960,250,"powerup");
    powerupDropHelp.displayWidth=50;
    powerupDropHelp.displayHeight=50;

    aKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    dKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.wKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    sKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    eKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.upKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    downKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    leftKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    rightKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    mKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

     this.anims.create
    ({
        key: "idle",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("yellowMonkey", { start: 0, end: 3 }),
        repeat: -1
    });
    
    this.anims.create
    ({
        key: "idle2",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("redMonkey", { start: 0, end: 3 }),
        repeat: -1
    });
    this.anims.create
    ({
        key: "monkeyEmote",
        frameRate: 89,
        frames: this.anims.generateFrameNumbers("emote", { start: 0, end: 88 }),
        repeat: -1
    });

    

    // Collisions
    this.physics.add.collider(box, character);
    this.physics.add.collider(box, character2);
    this.physics.add.collider(box2, character);
    this.physics.add.collider(box2, character2);
    this.physics.add.collider(box3, character);
    this.physics.add.collider(box3, character2);
    this.physics.add.collider(box4, character);
    this.physics.add.collider(box4, character2);
  

    let backButton=this.add.image(120,65,"back"); // Pointerover is when the mouse is hovering over the button and I scale it bigger
    backButton.setScale(0.4);
    backButton.setInteractive({useHandCursor: true})
    backButton.on("pointerover",()=>{
      backButton.setScale(0.5);
    })
    backButton.on("pointerout",()=>{ // When the mouse is not over the button it returns to normal size
      backButton.setScale(0.4);
    })
    backButton.on("pointerdown",()=>{ // When the button is clicked it gets smaller
      backButton.setScale(.3);
      this.time.addEvent //adds a delay to switch screens
      ({
        delay: 200,
        callback: ()=>
        {
          p2Powerup=0;
          p1Powerup=0;
          reset()
          this.scene.start("title");
        },
      })
    })

    //the text naming the buttons
    let rightMove=this.add.text(350,500,"←-Move Right",{fontFamily:'pixel',fontSize:20,color:"#000000"});
    let leftMove=this.add.text(0,550,"Move Left↑\n         |",{fontFamily:'pixel',fontSize:20,color:"#000000"});
    let powerupMove=this.add.text(180,550,"↑Power Up\n|",{fontFamily:'pixel',fontSize:20,color:"#000000"});
    let emoteMove=this.add.text(350,400,"←-Emote",{fontFamily:'pixel',fontSize:20,color:"#000000"});
    let jumpMove=this.add.text(20,330,"Jump/Double Jump|\n                ↓",{fontFamily:'pixel',fontSize:20,color:"#000000"});

    let rightMove2=this.add.text(870,550,"↑Move Right\n|",{fontFamily:'pixel',fontSize:20,color:"#000000"});
    let leftMove2=this.add.text(530,500,"Move Left-→",{fontFamily:'pixel',fontSize:20,color:"#000000"});
    let powerupMove2=this.add.text(700,550,"Power Up↑\n        |",{fontFamily:'pixel',fontSize:20,color:"#000000"});
    let emoteMove2=this.add.text(560,400,"Emote-→",{fontFamily:'pixel',fontSize:20,color:"#000000"});
    let jumpMove2=this.add.text(800,330,"|Jump/Double Jump\n↓",{fontFamily:'pixel',fontSize:20,color:"#000000"});
  }//end of create
  update()
  {
    //controls for the players
    if (character.body.touching.down) {
      jumps=1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.wKey))
    {
      displayW.displayWidth=90;
      displayW.displayHeight=90;
      if (character.body.touching.down)
      {
        jumps=1;
        character.setVelocityY(-500);
        character.setMaxVelocity(400,400);
      }
      else if (!character.body.touching.down && jumps>0)
      {
        jumps=0;
        character.setVelocityY(-500);
        character.setMaxVelocity(400,400);
      }
    }
    else
    {
      displayW.displayWidth=70;
      displayW.displayHeight=70;
    }
    if (dKey.isDown)
    {
      displayD.displayWidth=90;
      displayD.displayHeight=90;
      character.anims.play("idle", true);
      character.setAccelerationX(1000);
      character.setMaxVelocity(400,400);
      character.flipX= false;
    }
    else if (aKey.isDown)
    {
      displayA.displayWidth=90;
      displayA.displayHeight=90;
      character.anims.play("idle", true);
      character.setAccelerationX(-1000);
      character.setMaxVelocity(400,400);
      character.flipX= true;
    }
    else
    {
      character.body.drag.x =700;
      character.setAccelerationX(0);
      character.anims.play("idle", true);
      character.setMaxVelocity(400,400);
    }

    
    if (!dKey.isDown)
    {
      displayD.displayWidth=70;
      displayD.displayHeight=70;
    }
    if(!aKey.isDown)
    {
      displayA.displayWidth=70;
      displayA.displayHeight=70;
    }
    if(!sKey.isDown)
    {
      displayS.displayWidth=70;
      displayS.displayHeight=70;
    }
    if(!eKey.isDown)
    {
      displayE.displayWidth=70;
      displayE.displayHeight=70;
    }
    
    if (eKey.isDown && character.body.touching.down) 
    {
      displayE.displayWidth=90;
      displayE.displayHeight=90;
      emoteDisplay.x=character.x;
      emoteDisplay.y=character.y;
      emoteDisplay.anims.play("monkeyEmote", true);
    }
    else
    {
      emoteDisplay.x=10000;
      emoteDisplay.y=10000;
    }

    if (sKey.isDown && !character.body.touching.down && p1Powerup==1)
    {
      displayS.displayWidth=90;
      displayS.displayHeight=90;
      p1Powerup=0;
      powerupBanana.setVelocityX(0);
      powerupBanana.setVelocityY(0);
      powerupBanana.x=character.x;
      powerupBanana.y=character.y;
    }

    
    // CONTROLS for character 2
    if (character2.body.touching.down) {
      jumps2=1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.upKey))
    {
      displayUp.displayWidth=90;
      displayUp.displayHeight=90;
      if (character2.body.touching.down)
      {
        jumps2=1;
        character2.setVelocityY(-500);
        character2.setMaxVelocity(maxVelocity2,maxVelocity2);
      }
      else if (jumps2>0)
      {
        jumps2=0;
        character2.setVelocityY(-500);
        character2.setMaxVelocity(maxVelocity2,maxVelocity2);
      }
    }
    else
    {
      displayUp.displayWidth=70;
      displayUp.displayHeight=70;
    }
    if (rightKey.isDown)
    {
      displayRight.displayWidth=90;
      displayRight.displayHeight=90;
      character2.anims.play("idle2", true);
      character2.setAccelerationX(1000);
      character2.setMaxVelocity(maxVelocity2,maxVelocity2);
      character2.flipX= false;
    }
    else if (leftKey.isDown)
    {
      displayLeft.displayWidth=90;
      displayLeft.displayHeight=90;
      character2.anims.play("idle2", true);
      character2.setAccelerationX(-1000);
      character2.setMaxVelocity(maxVelocity2,maxVelocity2);
      character2.flipX= true;
    }
    else
    {
      character2.body.drag.x =700;
      character2.setAccelerationX(0);
      character2.anims.play("idle2", true);
      character2.setMaxVelocity(400,400);
    }
    if (mKey.isDown && character.body.touching.down) 
    {
      displayM.displayWidth=90;
      displayM.displayHeight=90;
      emoteDisplay2.x=character2.x;
      emoteDisplay2.y=character2.y;
      emoteDisplay2.anims.play("monkeyEmote", true);
    }
    else
    {
      emoteDisplay2.x=10000;
      emoteDisplay2.y=10000;
    }

    
    if (!rightKey.isDown)
    {
      displayRight.displayWidth=70;
      displayRight.displayHeight=70;
    }
    if(!leftKey.isDown)
    {
      displayLeft.displayWidth=70;
      displayLeft.displayHeight=70;
    }
    if(!downKey.isDown)
    {
      displayDown.displayWidth=70;
      displayDown.displayHeight=70;
    }
    if(!mKey.isDown)
    {
      displayM.displayWidth=70;
      displayM.displayHeight=70;
    }
    
    if (downKey.isDown && !character2.body.touching.down && p2Powerup==1)
    {
      displayDown.displayWidth=90;
      displayDown.displayHeight=90;
      p2Powerup=0;
      powerupBanana2.x=character2.x;
      powerupBanana2.y=character2.y;
    }
    if (this.physics.world.overlap(character,powerupDrop))
    {
      p1Powerup=1;
    }
    if (this.physics.world.overlap(character2,powerupDropHelp))
    {
      p2Powerup=1;
    }
    
    character.setGravityY(1000);
    character2.setGravityY(1000);
    powerupBanana.setVelocityY(800);
    powerupBanana2.setVelocityY(800);
  }
}




class scoreboardScene extends Phaser.Scene
{
  constructor (config)
  {
    super(config);
  }
  //The preload function is where we write code to load all game resources into memory.
  preload ()
  {
    this.load.image("bg3","assets/backgrounds/title3.jpeg");
    this.load.image("black","assets/sprites/black.png");
    this.load.image("back","assets/sprites/backButton.png");
  } // End of preload
  create (data)
  {
    // Creates and starts animation for the background
    let gameBackground=this.add.image(500,300,"bg3");
    let black=this.add.image(500,350,"black");
    black.displayWidth=850;
    black.displayHeight=300;
    

    let firstName=this.add.text(100,250,"1. Name: "+topFiveNames(0),{fontFamily:'pixel',fontSize:40});
    let secondName=this.add.text(100,290,"2. Name: "+topFiveNames(1),{fontFamily:'pixel',fontSize:40});
    let thirdName=this.add.text(100,330,"3. Name: "+topFiveNames(2),{fontFamily:'pixel',fontSize:40});
    let fourthName=this.add.text(100,370,"4. Name: "+topFiveNames(3),{fontFamily:'pixel',fontSize:40});
    let fifthName=this.add.text(100,410,"5. Name: "+topFiveNames(4),{fontFamily:'pixel',fontSize:40});
    
    let firstScore=this.add.text(650,250,"Score: "+topFiveScores(0),{fontFamily:'pixel',fontSize:40});
    let secondScore=this.add.text(650,290,"Score: "+topFiveScores(1),{fontFamily:'pixel',fontSize:40});
    let thirdScore=this.add.text(650,330,"Score: "+topFiveScores(2),{fontFamily:'pixel',fontSize:40});
    let fourthScore=this.add.text(650,370,"Score: "+topFiveScores(3),{fontFamily:'pixel',fontSize:40});
    let fifthScore=this.add.text(650,410,"Score: "+topFiveScores(4),{fontFamily:'pixel',fontSize:40});


    let backButton=this.add.image(100,50,"back"); // Pointerover is when the mouse is hovering over the button and I scale it bigger
    backButton.setScale(0.4);
    backButton.setInteractive({useHandCursor: true})
    backButton.on("pointerover",()=>{
      backButton.setScale(0.5);
    })
    backButton.on("pointerout",()=>{ // When the mouse is not over the button it returns to normal size
      backButton.setScale(0.4);
    })
    backButton.on("pointerdown",()=>{ // When the button is clicked it gets smaller
      backButton.setScale(.3);
      this.time.addEvent //adds a delay to switch screens
      ({
        delay: 200,
        callback: ()=>
        {
          this.scene.start("title");
        },
      })
    })
    
  }//end of create
  update() // loops to check character movement, collision detection and game completion
  {
    
  }
}




class multiplayerGame extends Phaser.Scene//MULTIPLAYER
{   
  constructor (config)
  {
    super(config);
  }
  preload()
  {
    //don't need to preload images and audios that have already been loaded in first scene
    this.load.image("pixel", "assets/sprites/1x1pixel.png");
    this.load.image("powerup", "assets/sprites/powerup.png");
    this.load.image("powerupReal", "assets/sprites/bananaClipart.png");
    // Loading spritesheets
    this.load.spritesheet("arenaBG","assets/sprites/arenaBG.png", {frameWidth: 1000, frameHeight: 600 });
    this.load.spritesheet("redMonkey","assets/sprites/redMonkey.png", {frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("yellowMonkey","assets/sprites/yellowMonkey.png", {frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("emote", "assets/sprites/emote.png",{frameWidth: 262, frameHeight: 262 });//width: 3930px, height: 1572p
    this.load.spritesheet("banana", "assets/sprites/banana.png",{frameWidth: 466, frameHeight: 306 });
    this.load.spritesheet("livesBar", "assets/sprites/healthBar.png",{frameWidth: 250, frameHeight: 50 })
    // Loading sounds
    this.load.audio("gameMusic", "assets/sounds/gameMusic.mp3"); //all of this might be unneccary 
  }
  create()
  {
    let background=this.add.sprite(500,300,"arenaBG");
    background.displayWidth=1000;
    background.displayHeight=600;
    let floor=this.physics.add.image(492, 330, "pixel"); 
    floor.displayWidth=740;
    floor.displayHeight=20;
    floor.setImmovable();
    headBox=this.physics.add.image(1,1,'pixel');
    headBox.displayWidth=60;
    headBox.displayHeight=15;
    headBox2=this.physics.add.image(1,1,'pixel');
    headBox2.displayWidth=60;
    headBox2.displayHeight=15;

    livesbar1=this.add.sprite(135,135,"livesBar");
    livesbar2=this.add.sprite(865,135,"livesBar");
    livesbar2.flipX=true;

    powerupHud=this.add.image(500,110,"powerup");
    powerupHud.displayWidth=50;
    powerupHud.displayHeight=50;
    powerupHud2=this.add.image(500,110,"powerup");
    powerupHud2.displayWidth=50;
    powerupHud2.displayHeight=50;
    
    // Creating HUD
    nameHud=this.add.text(10,13,"",{fontFamily:'pixel',fontSize:40,color:"#000000"});
    healthHud=this.add.text(10,75,"",{fontFamily:'bitArcade',fontSize:40,color:"#000000"});
    healthText=this.add.text(10,45,"",{fontFamily:'bitArcade',fontSize:40,color:"#000000"});
    nameHud2=this.add.text(900,13,name[1],{fontFamily:'pixel',fontSize:40,color:"#000000"});
    healthHud2=this.add.text(840,75,"",{fontFamily:'bitArcade',fontSize:40,color:"#000000"});
    healthText2=this.add.text(840,45,"",{fontFamily:'bitArcade',fontSize:40,color:"#000000"});
    nameHudRight=nameHud2.width;
    nameHud2.destroy();
    nameHud2=this.add.text(990-nameHudRight,13,name[1],{fontFamily:'pixel',fontSize:40,color:"#000000"});

    character=this.physics.add.sprite(300,100,"yellowMonkey");
    character.displayWidth=80;
    character.displayHeight=80;
    character.body.setSize(80, 65);
    character.body.setOffset(0, 13);
    character2=this.physics.add.sprite(700,100,"redMonkey");
    character2.displayWidth=80;
    character2.displayHeight=80;
    character2.body.setSize(80, 65);
    character2.body.setOffset(0, 13);
    powerupBanana=this.physics.add.image(-100,-100,'powerupReal');
    powerupBanana.displayWidth=60;
    powerupBanana.displayHeight=60;
    
    powerupBanana2=this.physics.add.image(-100,-100,'powerupReal');
    powerupBanana2.displayWidth=60;
    powerupBanana2.displayHeight=60;
    emoteDisplay=this.add.sprite(0,0,"emote");
    emoteDisplay.displayWidth=80;
    emoteDisplay.displayHeight=65;
    emoteDisplay2=this.add.sprite(0,0,"emote");
    emoteDisplay2.displayWidth=80;
    emoteDisplay2.displayHeight=65;
    bananaDrop=this.physics.add.sprite(-100,-100,"banana");
    bananaDrop.displayWidth=50;
    bananaDrop.displayHeight=50;
    powerupDrop=this.physics.add.sprite(-100,-100,"powerup");
    powerupDrop.displayWidth=50;
    powerupDrop.displayHeight=50;

    
    this.sound.get('menuMusic').stop();
    gameMusic=this.sound.add("gameMusic", { loop: true });
    gameMusic.play();
    
    // Creating Monkey animations
    this.anims.create
    ({
        key: "idle",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("yellowMonkey", { start: 0, end: 3 }),
        repeat: -1
    });
    
    this.anims.create
    ({
        key: "idle2",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("redMonkey", { start: 0, end: 3 }),
        repeat: -1
    });
    this.anims.create
    ({
        key: "bananaSpin",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("banana", { start: 0, end: 7 }),
        repeat: -1
    });
    this.anims.create
    ({
        key: "monkeyEmote",
        frameRate: 89,
        frames: this.anims.generateFrameNumbers("emote", { start: 0, end: 88 }),
        repeat: -1
    });

    // Creation animations for lives bar
    this.anims.create({
        key: "live3",
        frames: [ { key: "livesBar", frame: 3 } ],
        frameRate: 1
    });
    this.anims.create({
        key: "live2",
        frames: [ { key: "livesBar", frame: 2 } ],
        frameRate: 1
    });
    this.anims.create({
        key: "live1",
        frames: [ { key: "livesBar", frame: 1 } ],
        frameRate: 1
    });
    this.anims.create({
        key: "live0",
        frames: [ { key: "livesBar", frame: 0 } ],
        frameRate: 1
    });
    
    aKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    dKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.wKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    sKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    eKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.upKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    downKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    leftKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    rightKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    mKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    // Making world bounds
    character.setCollideWorldBounds(true);
    character.body.setBoundsRectangle(new Phaser.Geom.Rectangle(-200, -500,1400, 1400));
    character2.setCollideWorldBounds(true);
    character2.body.setBoundsRectangle(new Phaser.Geom.Rectangle(-200, -500,1400, 1400));

    // Adding Colliders
    this.physics.add.collider(floor, character);
    this.physics.add.collider(floor, character2);
    this.physics.add.collider(character, character2);
    this.physics.add.collider(floor, bananaDrop);
    this.physics.add.collider(floor, powerupDrop);
    this.physics.add.collider(floor, powerupBanana);
    this.physics.add.collider(floor, powerupBanana2);

    this.time.addEvent({
        delay: 30000,
        callback: ()=>{
        bananaDrop.y=0;
        bananaDrop.x=1100;
        bananaDrop.x=Math.round(1+Math.random()*1000);
        bananaDrop.setVelocityY(0);
        bananaDrop.setVelocityX(0);
        },
        loop: true
      })
this.time.addEvent({
        delay: Math.round(25000+Math.random()*3500),
        callback: ()=>{
        powerupDrop.y=0;
        powerupDrop.x=1100;
        powerupDrop.x=Math.round(1+Math.random()*1000);
        powerupDrop.setVelocityY(0);
        powerupDrop.setVelocityX(0);
        },
        loop: true
      })
      character.body.onWorldBounds = true;//this line enables border colision to be detected on character 
      character.body.world.on('worldbounds', function (body) {
      if (body.gameObject == character) 
      {
        character.x=300;
        character.y=100;
        character.setVelocityY(0);
        character.setVelocityX(0);
        maxVelocity=400;
        if (lives>0) {
          lives--;
          p2Score+=score2(100,1);
        }
      }
    });
    character2.body.onWorldBounds = true;
    character2.body.world.on('worldbounds', function (body) {
      if (body.gameObject == character2) 
      {
        character2.x=700;
        character2.y=100;
        character2.setVelocityY(0);
        character2.setVelocityX(0);
        maxVelocity2=400;
        if (lives2>0) {
          lives2--;
          p1Score+=score(100,1);
        }
      }
    });
  }//end of create
  update()
  {
    let averageVelocity=((maxVelocity+maxVelocity2)/2)/100000;
    emoteDisplay.anims.play("monkeyEmote", true);
    emoteDisplay2.anims.play("monkeyEmote", true);
    bananaDrop.anims.play("bananaSpin", true);
    headBox.x=character.x;
    headBox.y=character.y -30;
    headBox2.x=character2.x;
    headBox2.y=character2.y -30;
    //HUD
    displayHealth=Math.round(10*maxVelocity)/10;
    nameHud.text=name[0];
    healthText.text="Health";
    healthHud.text=displayHealth-400;
    displayHealth2=Math.round(10*maxVelocity2)/10;
    nameHud2.text=name[1];
    healthText2.text="Health";
    healthHud2.text=displayHealth2-400;
    if (p1Powerup==1)
    {
      powerupHud.x=200;
      powerupHud.y=50;
    }
    else
    {
      powerupHud.x=100000;
      powerupHud.y=1000000;
    }

    if (p2Powerup==1)
    {
      powerupHud2.flipX= true;
      powerupHud2.x=800;
      powerupHud2.y=50;
    }
    else
    {
      powerupHud2.x=100000;
      powerupHud2.y=1000000;
    }
    //HEALTHBAR
    if (lives==3) {
      livesbar1.anims.play("live3", true);
    }
    else if (lives==2) {
      livesbar1.anims.play("live2", true);
    }
    else if (lives==1) {
      livesbar1.anims.play("live1", true);
    }
    else {
      livesbar1.anims.play("live0", true);
    }

    if (lives2==3) {
      livesbar2.anims.play("live3", true);
    }
    else if (lives2==2) {
      livesbar2.anims.play("live2", true);
    }
    else if (lives2==1) {
      livesbar2.anims.play("live1", true);
    }
    else {
      livesbar2.anims.play("live0", true);
    }
    
    // CONTROLS for character 1
    if (character.body.touching.down) {
      jumps=1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.wKey))
    {
      if (character.body.touching.down)
      {
        jumps=1;
        character.setVelocityY(-500);
        character.setMaxVelocity(maxVelocity,maxVelocity);
      }
      else if (!character.body.touching.down && jumps>0)
      {
        jumps=0;
        character.setVelocityY(-500);
        character.setMaxVelocity(maxVelocity,maxVelocity);
      }
    }
    if (dKey.isDown)
    {
      character.anims.play("idle", true);
      character.setAccelerationX(1000);
      character.setMaxVelocity(maxVelocity,maxVelocity);
      character.flipX= false;
    }
    else if (aKey.isDown)
    {
      character.anims.play("idle", true);
      character.setAccelerationX(-1000);
      character.setMaxVelocity(maxVelocity,maxVelocity);
      character.flipX= true;
    }
    else
    {
      character.body.drag.x =700;
      character.setAccelerationX(0);
      character.anims.play("idle", true);
      character.setMaxVelocity(maxVelocity,maxVelocity);
    }
    if (eKey.isDown && character.body.touching.down) 
    {
      emoteDisplay.x=character.x;
      emoteDisplay.y=character.y;
      emoteDisplay.anims.play("monkeyEmote", true);
    }
    else
    {
      emoteDisplay.x=10000;
      emoteDisplay.y=10000;
    }

    if (sKey.isDown && !character.body.touching.down && p1Powerup==1)
    {
      p1Powerup=0;
      powerupBanana.setVelocityX(0);
      powerupBanana.setVelocityY(0);
      powerupBanana.x=character.x;
      powerupBanana.y=character.y;
    }

    
    // CONTROLS for character 2
    if (character2.body.touching.down) {
      jumps2=1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.upKey))
    {
      if (character2.body.touching.down)
      {
        jumps2=1;
        character2.setVelocityY(-500);
        character2.setMaxVelocity(maxVelocity2,maxVelocity2);
      }
      else if (jumps2>0)
      {
        jumps2=0;
        character2.setVelocityY(-500);
        character2.setMaxVelocity(maxVelocity2,maxVelocity2);
      }
    }
    if (rightKey.isDown)
    {
      character2.anims.play("idle2", true);
      //character.setVelocityX(200);
      character2.setAccelerationX(1000);
      character2.setMaxVelocity(maxVelocity2,maxVelocity2);
      character2.flipX= false;
    }
    else if (leftKey.isDown)
    {
      character2.anims.play("idle2", true);
      //character.setVelocityX(-200);
      character2.setAccelerationX(-1000);
      character2.setMaxVelocity(maxVelocity2,maxVelocity2);
      character2.flipX= true;
    }
    else
    {
      character2.body.drag.x =700;
      //character.setVelocityX(0);
      character2.setAccelerationX(0);
      character2.anims.play("idle2", true);
      character2.setMaxVelocity(maxVelocity2,maxVelocity2);
    }
    if (mKey.isDown && character.body.touching.down) 
    {
      emoteDisplay2.x=character2.x;
      emoteDisplay2.y=character2.y;
      emoteDisplay2.anims.play("monkeyEmote", true);
    }
    else
    {
      emoteDisplay2.x=10000;
      emoteDisplay2.y=10000;
    }

    if (downKey.isDown && !character2.body.touching.down && p2Powerup==1)
    {
      p2Powerup=0;
      powerupBanana2.setVelocityX(0);
      powerupBanana2.setVelocityY(0);
      powerupBanana2.x=character2.x;
      powerupBanana2.y=character2.y;
    }
    // END OF CONTROLS

    // COLLISION DETECTION    
    character2Array.push(Math.abs(character2.body.velocity.x)); 
    characterArray.push(Math.abs(character.body.velocity.x)); 
    
    if (character.body.touching.left && character2.body.touching.right) 
    {
      if (characterArray[characterArray.length-5]>character2Array[character2Array.length-5]) 
      {
        this.cameras.main.shake(100, averageVelocity);
        characterArray = []; 
        character2Array = []; 
        maxVelocity2+=20; 
        maxVelocity+=10; 
        character2.setVelocityX(1000);
        character.setVelocityX(-1000);
        p1Score+=score(20,0);
        p2Score+=score2(5,0);
      }
      else
      {
        this.cameras.main.shake(100, averageVelocity);
        characterArray = []; 
        character2Array = []; 
        maxVelocity+=20;
        maxVelocity2+=10;
        character.setVelocityX(1000);
        character2.setVelocityX(-1000);
        p1Score+=score(5,0);
        p2Score+=score2(20,0);
      }
    }
    else if (character.body.touching.right && character2.body.touching.left) 
    {
      if (characterArray[characterArray.length-5]>character2Array[character2Array.length-5])
      {
        this.cameras.main.shake(100, averageVelocity);
        characterArray = []; 
        character2Array = []; 
        maxVelocity2+=20; 
        maxVelocity+=10; 
        character2.setVelocityX(-1000);
        character.setVelocityX(1000);
        p1Score+=score(20,0);
        p2Score+=score2(5,0);
      }
      else
      {
        this.cameras.main.shake(100, averageVelocity);
        characterArray = []; 
        character2Array = []; 
        maxVelocity+=20;
        maxVelocity2+=10;
        character.setVelocityX(-1000);
        character2.setVelocityX(1000);
        p1Score+=score(5,0);
        p2Score+=score2(20,0);
      }
    }
    
    if (this.physics.world.overlap(character2,headBox))
    {
      this.cameras.main.shake(100, averageVelocity);
      character.setVelocityY(1000);
      character2.setVelocityY(-1000);
    }
    if (this.physics.world.overlap(character,headBox2))
    {
      this.cameras.main.shake(100, averageVelocity);
      character2.setVelocityY(1000);
      character.setVelocityY(-1000);
    }

    if (this.physics.world.overlap(character,bananaDrop))
    {
      if(maxVelocity >= 450)
      {
         maxVelocity-=50;
      }
      else if(maxVelocity <= 450 && maxVelocity >= 400)
      {
        maxVelocity=400;
      }
      bananaDrop.x=1100;
      p1Score+=score(10,0);
    }
    else if (this.physics.world.overlap(character2,bananaDrop))
    {
      if(maxVelocity2 >= 450)
      {
         maxVelocity2-=50;
      }
      else if(maxVelocity2 <= 450 && maxVelocity2 >= 400)
      {
        maxVelocity2=400;
      }
      bananaDrop.x=1100;
      p2Score+=score2(10,0);
    }

    if (this.physics.world.overlap(character,powerupDrop))
    {
      powerupDrop.x=1100;
      p1Powerup=1;
    }
    if (this.physics.world.overlap(character2,powerupDrop))
    {
      powerupDrop.x=1100;
      p2Powerup=1;
    }
    
    if (this.physics.world.overlap(character,powerupBanana2))
    {
      powerupBanana2.x=10000;
      powerupBanana2.y=10000;
      character2.setVelocityY(2000);
      maxVelocity+=100;
      p2Score+=score2(50,0);
    }
    
    if (this.physics.world.overlap(character2,powerupBanana))
    {
      powerupBanana.x=10000;
      powerupBanana.y=10000;
      character2.setVelocityY(2000);
      maxVelocity2+=100;
      p1Score+=score(50,0);
    }

    if (powerupBanana.body.touching.down)
    {
      powerupBanana.x=10000;
      powerupBanana.y=10000;
    }
    if (powerupBanana2.body.touching.down)
    {
      powerupBanana2.x=10000;
      powerupBanana2.y=10000;
    }
    
    
    character.setGravityY(1000);
    character2.setGravityY(1000);
    bananaDrop.setVelocityY(Math.round(30+Math.random()*50));
    powerupDrop.setVelocityY(Math.round(30+Math.random()*50));
    powerupBanana.setVelocityY(800);
    powerupBanana2.setVelocityY(800);

    if(lives<=0 || lives2<=0)
    {
      if(lives<=0)
      {
        character.x=10000000;
        character.y=10000;
      }
      else if(lives2<=0)
      {
        character2.x=10000000;
        character2.y=10000;
      }
      this.time.addEvent// adds a delay to switch screens
      ({
        delay: 2000,
        callback: ()=> {
          gameMusic.stop();
          this.scene.start("win");
        },
      })
    }
  }
}// End of multiplayer

class singleplayerGame extends Phaser.Scene
{
  constructor (config)
  {
    super(config);
  }
  preload()
  {
    // Loading images
    this.load.image("pixel", "assets/sprites/1x1pixel.png");
    this.load.image("powerup", "assets/sprites/powerup.png");
    this.load.image("powerupReal", "assets/sprites/bananaClipart.png");
    // Loading spritesheets
    this.load.spritesheet("arenaBG","assets/sprites/arenaBG.png", {frameWidth: 1000, frameHeight: 600 });
    this.load.spritesheet("redMonkey","assets/sprites/redMonkey.png", {frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("yellowMonkey","assets/sprites/yellowMonkey.png", {frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("emote", "assets/sprites/emote.png",{frameWidth: 262, frameHeight: 262 });
    this.load.spritesheet("banana", "assets/sprites/banana.png",{frameWidth: 466, frameHeight: 306 });
    this.load.spritesheet("livesBar", "assets/sprites/healthBar.png",{frameWidth: 250, frameHeight: 50 })
    // Loading sounds
    this.load.audio("gameMusic", "assets/sounds/gameMusic.mp3"); 
  }
  create()
  {
    let background=this.add.sprite(500,300,"arenaBG");
    background.displayWidth=1000;
    background.displayHeight=600;
    let floor=this.physics.add.image(492, 330, "pixel"); 
    floor.displayWidth=740;
    floor.displayHeight=20;
    floor.setImmovable();
    headBox=this.physics.add.image(1,1,'pixel');
    headBox.displayWidth=60;
    headBox.displayHeight=15;
    headBox2=this.physics.add.image(1,1,'pixel');
    headBox2.displayWidth=60;
    headBox2.displayHeight=15;
    bananaDrop=this.physics.add.sprite(-100,-100,"banana");
    bananaDrop.displayWidth=50;
    bananaDrop.displayHeight=50;
    powerupDrop=this.physics.add.sprite(-100,-100,"powerup");
    powerupDrop.displayWidth=50;
    powerupDrop.displayHeight=50;

    livesbar1=this.add.sprite(135,135,"livesBar");
    livesbar2=this.add.sprite(865,135,"livesBar");
    livesbar2.flipX=true;

    powerupHud=this.add.image(500,110,"powerup");
    powerupHud.displayWidth=50;
    powerupHud.displayHeight=50;
    powerupHud2=this.add.image(500,110,"powerup");
    powerupHud2.displayWidth=50;
    powerupHud2.displayHeight=50;

    // HUD FOR GAME
    nameHud=this.add.text(10,13,"",{fontFamily:'pixel',fontSize:40,color:"#000000"});
    healthHud=this.add.text(10,75,"",{fontFamily:'bitArcade',fontSize:40,color:"#000000"});
    healthText=this.add.text(10,45,"",{fontFamily:'bitArcade',fontSize:40,color:"#000000"});
    nameHud2=this.add.text(900,13,name[1],{fontFamily:'pixel',fontSize:40,color:"#000000"});
    healthHud2=this.add.text(840,75,"",{fontFamily:'bitArcade',fontSize:40,color:"#000000"});
    healthText2=this.add.text(840,45,"",{fontFamily:'bitArcade',fontSize:40,color:"#000000"});
    nameHudRight=nameHud2.width;
    nameHud2.destroy();
    nameHud2=this.add.text(990-nameHudRight,13,"",{fontFamily:'pixel',fontSize:40,color:"#000000"});
    
    character=this.physics.add.sprite(300,100,"yellowMonkey");
    character.displayWidth=80;
    character.displayHeight=80;
    character.body.setSize(80, 65);
    character.body.setOffset(0, 13);
    character2=this.physics.add.sprite(700,100,"redMonkey");
    character2.displayWidth=80;
    character2.displayHeight=80;
    character2.body.setSize(80, 65);
    character2.body.setOffset(0, 13);
    emoteDisplay=this.add.sprite(0,0,"emote");
    emoteDisplay.displayWidth=80;
    emoteDisplay.displayHeight=65;
    emoteDisplay2=this.add.sprite(0,0,"emote");
    emoteDisplay2.displayWidth=80;
    emoteDisplay2.displayHeight=65;
    powerupBanana=this.physics.add.image(-100,-100,'powerupReal');
    powerupBanana.displayWidth=60;
    powerupBanana.displayHeight=60;
    powerupBanana2=this.physics.add.image(-100,-100,'powerupReal');
    powerupBanana2.displayWidth=60;
    powerupBanana2.displayHeight=60;
    
    // Animations
    
    this.sound.get('menuMusic').stop();
    gameMusic=this.sound.add("gameMusic", { loop: true });
    gameMusic.play();
    
    // Creating monkey animations
    this.anims.create
    ({
        key: "idle",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("yellowMonkey", { start: 0, end: 3 }),
        repeat: -1
    });
    
    this.anims.create
    ({
        key: "idle2",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("redMonkey", { start: 0, end: 3 }),
        repeat: -1
    });
    this.anims.create
    ({
        key: "bananaSpin",
        frameRate: 7,
        frames: this.anims.generateFrameNumbers("banana", { start: 0, end: 7 }),
        repeat: -1
    });
    this.anims.create
    ({
        key: "monkeyEmote",
        frameRate: 89,
        frames: this.anims.generateFrameNumbers("emote", { start: 0, end: 88 }),
        repeat: -1
    });

    // Creation animations for lives bar
    this.anims.create({
        key: "live3",
        frames: [ { key: "livesBar", frame: 3 } ],
        frameRate: 1
    });
    this.anims.create({
        key: "live2",
        frames: [ { key: "livesBar", frame: 2 } ],
        frameRate: 1
    });
    this.anims.create({
        key: "live1",
        frames: [ { key: "livesBar", frame: 1 } ],
        frameRate: 1
    });
    this.anims.create({
        key: "live0",
        frames: [ { key: "livesBar", frame: 0 } ],
        frameRate: 1
    });
    
    aKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    dKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.wKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    sKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    eKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.upKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    downKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    leftKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    rightKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
    mKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    character.setCollideWorldBounds(true);
    character.body.setBoundsRectangle(new Phaser.Geom.Rectangle(-200, -500,1400, 1400)); // makes custom worldbounds
    character2.setCollideWorldBounds(true);
    character2.body.setBoundsRectangle(new Phaser.Geom.Rectangle(-200, -500,1400, 1400));

    // Collision
    this.physics.add.collider(floor, character);
    this.physics.add.collider(floor, character2);
    this.physics.add.collider(character, character2);
    this.physics.add.collider(floor, bananaDrop);
    this.physics.add.collider(floor, powerupDrop);
    this.physics.add.collider(floor, powerupBanana);
    this.physics.add.collider(floor, powerupBanana2);

    this.time.addEvent({
        delay: 30000,
        callback: ()=>{
        bananaDrop.y=0;
        bananaDrop.x=1100;
        bananaDrop.x=Math.round(1+Math.random()*1000);
        bananaDrop.setVelocityY(0);
        bananaDrop.setVelocityX(0);
        },
        loop: true
      })
    this.time.addEvent({
      delay: Math.round(25000+Math.random()*3500),
      callback: ()=>{
      powerupDrop.y=0;
      powerupDrop.x=1100;
      powerupDrop.x=Math.round(1+Math.random()*1000);
      powerupDrop.setVelocityY(0);
      powerupDrop.setVelocityX(0);
      },
      loop: true
    })
    character.body.onWorldBounds = true;//this line enables border colision to be detected whey the character touches it
    character.body.world.on('worldbounds', function (body) {
      if (body.gameObject == character) 
      {
        character.x=300;
        character.y=100;
        character.setVelocityY(0);
        character.setVelocityX(0);
        maxVelocity=400;
        if (lives>0) {
          lives--;
          p2Score+=score2(100,1);
        }
      }
    });
    character2.body.onWorldBounds = true;
    character2.body.world.on('worldbounds', function (body) {
      if (body.gameObject == character2) 
      {
        character2.x=700;
        character2.y=100;
        character2.setVelocityY(0);
        character2.setVelocityX(0);
        maxVelocity2=400;
        if (lives2>0) {
          lives2--;
          p1Score+=score(100,1);
        }
      }
    });
  }//end of create
  update()
  {
    let averageVelocity=((maxVelocity+maxVelocity2)/2)/100000;
    
    emoteDisplay.anims.play("monkeyEmote", true);
    emoteDisplay2.anims.play("monkeyEmote", true);
    bananaDrop.anims.play("bananaSpin", true);
    headBox.x=character.x;
    headBox.y=character.y -30;
    headBox2.x=character2.x;
    headBox2.y=character2.y -30;
    //HUD
    displayHealth=Math.round(10*maxVelocity)/10;
    nameHud.text=name[0];
    healthText.text="Health";
    healthHud.text=displayHealth-400;
    displayHealth2=Math.round(10*maxVelocity2)/10;
    nameHud2.text=name[1];
    healthText2.text="Health";
    healthHud2.text=displayHealth2-400;
    if (p1Powerup==1)
    {
      powerupHud.x=200;
      powerupHud.y=50;
    }
    else
    {
      powerupHud.x=100000;
      powerupHud.y=1000000;
    }

    if (p2Powerup==1)
    {
      powerupHud2.flipX= true;
      powerupHud2.x=800;
      powerupHud2.y=50;
    }
    else
    {
      powerupHud2.x=100000;
      powerupHud2.y=1000000;
    }
    //HEALTHBAR
    if (lives==3) {
      livesbar1.anims.play("live3", true);
    }
    else if (lives==2) {
      livesbar1.anims.play("live2", true);
    }
    else if (lives==1) {
      livesbar1.anims.play("live1", true);
    }
    else {
      livesbar1.anims.play("live0", true);
    }

    if (lives2==3) {
      livesbar2.anims.play("live3", true);
    }
    else if (lives2==2) {
      livesbar2.anims.play("live2", true);
    }
    else if (lives2==1) {
      livesbar2.anims.play("live1", true);
    }
    else {
      livesbar2.anims.play("live0", true);
    }
    
    // CONTROLS for character 1
    if (character.body.touching.down) {
      jumps=1;
    }
    if (Phaser.Input.Keyboard.JustDown(this.wKey))
    {
      if (character.body.touching.down)
      {
        jumps=1;
        character.setVelocityY(-500);
        character.setMaxVelocity(maxVelocity,maxVelocity);
      }
      else if (jumps>0)
      {
        jumps=0;
        character.setVelocityY(-500);
        character.setMaxVelocity(maxVelocity,maxVelocity);
      }
    }
    if (dKey.isDown)
    {
      character.anims.play("idle", true);
      character.setAccelerationX(1000);
      character.setMaxVelocity(maxVelocity,maxVelocity);
      character.flipX= false;
    }
    else if (aKey.isDown)
    {
      character.anims.play("idle", true);
      character.setAccelerationX(-1000);
      character.setMaxVelocity(maxVelocity,maxVelocity);
      character.flipX= true;
    }
    else
    {
      character.body.drag.x =700;
      character.setAccelerationX(0);
      character.anims.play("idle", true);
      character.setMaxVelocity(maxVelocity,maxVelocity);
    }
    if (eKey.isDown && character.body.touching.down) 
    {
      emoteDisplay.x=character.x;
      emoteDisplay.y=character.y;
      emoteDisplay.anims.play("monkeyEmote", true);
    }
    else
    {
      emoteDisplay.x=10000;
      emoteDisplay.y=10000;
    }

    if (sKey.isDown && !character.body.touching.down && p1Powerup==1)
    {
      p1Powerup=0;
      powerupBanana.setVelocityX(0);
      powerupBanana.setVelocityY(0);
      powerupBanana.x=character.x;
      powerupBanana.y=character.y;
    }
    // END OF CONTROLS
    
    //AI FOR CHARACTER 2
    if (character2.body.touching.down) {
      jumps2=1;
    }
    if (scared==true) {
      if (character2.x<character.x+100 && character2.x>character.x-100 && character2.y-character.y>50) { //if bot is relatively above human player
        if (Math.round(1+Math.random()*1)==1) {
          if (character.x<character2.x) 
          {
            character2.anims.play("idle2", true);
            character2.setAccelerationX(-1000);
            character2.setMaxVelocity(maxVelocity2,maxVelocity2);
            character2.flipX= true;
          }
          if (character.x>character2.x) 
          {
            character2.anims.play("idle2", true);
            character2.setAccelerationX(1000);
            character2.setMaxVelocity(maxVelocity2,maxVelocity2);
            character2.flipX= false;
          }
        }
      }
      if (Math.round(1+Math.random()*1)==1) {
        
        if (character2.body.touching.down)
          {
            jumps2=1;
            character2.setVelocityY(-500);
            character2.setMaxVelocity(maxVelocity2,maxVelocity2);
          }
          else if (jumps2>0)
          {
            jumps2=0;
            character2.setVelocityY(-500);
            character2.setMaxVelocity(maxVelocity2,maxVelocity2);
          }
      }
      if (character2.x<500) 
      {
        character2.anims.play("idle2", true);
        character2.setAccelerationX(1000);
        character2.setMaxVelocity(maxVelocity2,maxVelocity2);
        character2.flipX= false;
      } 
      else 
      {
        character2.anims.play("idle2", true);
        character2.setAccelerationX(-1000);
        character2.setMaxVelocity(maxVelocity2,maxVelocity2);
        character2.flipX= true;
      }
    } else {
      jumpLocation = Math.round(1+Math.random()*1000);
      if (character.x<=jumpLocation+100 && character.x>=jumpLocation-100) 
      {
        if (Math.round(1+Math.random()*3)==1) 
        {
          //make bot jump
          if (character2.body.touching.down)
          {
            jumps2=1;
            character2.setVelocityY(-500);
            character2.setMaxVelocity(maxVelocity2,maxVelocity2);
          }
          else if (jumps2>0)
          {
            jumps2=0;
            character2.setVelocityY(-500);
            character2.setMaxVelocity(maxVelocity2,maxVelocity2);
          }
        }
      }
      if (character.x<character2.x) 
      {
        character2.anims.play("idle2", true);
        character2.setAccelerationX(-1000);
        character2.setMaxVelocity(maxVelocity2,maxVelocity2);
        character2.flipX= true;
      }
      if (character.x>character2.x) 
      {
        character2.anims.play("idle2", true);
        character2.setAccelerationX(1000);
        character2.setMaxVelocity(maxVelocity2,maxVelocity2);
        character2.flipX= false;
      }
      // Use powerup
      if (p2Powerup==1) {
        if (character.y-80 >= character2.y) {
          if (character.x-20 <= character2.x  && character2.x <= character.x+20) {
            p2Powerup=0;
            powerupBanana2.setVelocityX(0);
            powerupBanana2.setVelocityY(0);
            powerupBanana2.x=character2.x;
            powerupBanana2.y=character2.y;
          }
        }
      }
    }
    if (character2.x<240 || character2.x>720) 
    {
      scared=true; 
    } 
    else 
    {
      scared=false; 
    }

    if (character.y>350 && character2.body.touching.down)
    {
      emoteDisplay2.x=character2.x;
      emoteDisplay2.y=character2.y;
      emoteDisplay2.anims.play("monkeyEmote", true);
      character2.setVelocityX(0);
      character2.setVelocityY(0);
    }
    else
    {
      emoteDisplay2.x=10000;
      emoteDisplay2.y=10000;
    }
    

  
    // COLLISION DETECTION
    //Math.abs() returns the absolute value of a number
    
    character2Array.push(Math.abs(character2.body.velocity.x)); 
    characterArray.push(Math.abs(character.body.velocity.x)); 
    
    if (character.body.touching.left && character2.body.touching.right) 
    {
      if (characterArray[characterArray.length-5]>character2Array[character2Array.length-5]) 
      {
        this.cameras.main.shake(100, averageVelocity);
        characterArray = []; 
        character2Array = []; 
        maxVelocity2+=20; 
        maxVelocity+=10; 
        character2.setVelocityX(1000);
        character.setVelocityX(-1000);
        p1Score+=score(20,0);
        p2Score+=score2(5,0);
      }
      else
      {
        this.cameras.main.shake(100, averageVelocity);
        characterArray = []; 
        character2Array = []; 
        maxVelocity+=20;
        maxVelocity2+=10;
        character.setVelocityX(1000);
        character2.setVelocityX(-1000);
        p1Score+=score(5,0);
        p2Score+=score2(20,0);
      }
    }
    else if (character.body.touching.right && character2.body.touching.left) 
    {
      if (characterArray[characterArray.length-5]>character2Array[character2Array.length-5])
      {
        this.cameras.main.shake(100, averageVelocity);
        characterArray = []; 
        character2Array = []; 
        maxVelocity2+=20; 
        maxVelocity+=10; 
        character2.setVelocityX(-1000);
        character.setVelocityX(1000);
        p1Score+=score(20,0);
        p2Score+=score2(5,0);
      }
      else
      {
        this.cameras.main.shake(100, averageVelocity);
        characterArray = []; 
        character2Array = []; 
        maxVelocity+=20;
        maxVelocity2+=10;
        character.setVelocityX(-1000);
        character2.setVelocityX(1000);
        p1Score+=score(5,0);
        p2Score+=score2(20,0);
      }
    }
    
    if (this.physics.world.overlap(character2,headBox))
    {
      this.cameras.main.shake(100, averageVelocity);
      character.setVelocityY(1000);
      character2.setVelocityY(-1000);
    }
    if (this.physics.world.overlap(character,headBox2))
    {
      this.cameras.main.shake(100, averageVelocity);
      character2.setVelocityY(1000);
      character.setVelocityY(-1000);
    }

    if (this.physics.world.overlap(character,bananaDrop))
    {
      if(maxVelocity >= 450)
      {
         maxVelocity-=50;
      }
      else if(maxVelocity <= 450 && maxVelocity >= 400)
      {
        maxVelocity=400;
      }
      bananaDrop.x=1100;
      p1Score+=score(10,0);
    }
    else if (this.physics.world.overlap(character2,bananaDrop))
    {
      if(maxVelocity2 >= 450)
      {
         maxVelocity2-=50;
      }
      else if(maxVelocity2 <= 450 && maxVelocity2 >= 400)
      {
        maxVelocity2=400;
      }
      bananaDrop.x=1100;
      p2Score+=score2(10,0);
    }

    if (this.physics.world.overlap(character,powerupDrop))
    {
      powerupDrop.x=1100;
      p1Powerup=1;
    }
    if (this.physics.world.overlap(character2,powerupDrop))
    {
      powerupDrop.x=1100;
      p2Powerup=1;
    }

    if (this.physics.world.overlap(character2,powerupBanana))
    {
      powerupBanana.x=10000;
      powerupBanana.y=10000;
      character2.setVelocityY(2000);
      maxVelocity2+=100;
      p1Score+=score(50,0);
    }

    if (this.physics.world.overlap(character,powerupBanana2))
    {
      powerupBanana2.x=10000;
      powerupBanana2.y=10000;
      character.setVelocityY(2000);
      maxVelocity+=100;
      p2Score+=score2(50,0);
    }
    if (powerupBanana.body.touching.down)
    {
      powerupBanana.x=10000;
      powerupBanana.y=10000;
    }
    if (powerupBanana2.body.touching.down)
    {
      powerupBanana2.x=10000;
      powerupBanana2.y=10000;
    }
    
    
    character.setGravityY(1000);
    character2.setGravityY(1000);
    bananaDrop.setVelocityY(Math.round(30+Math.random()*50));
    powerupDrop.setVelocityY(Math.round(30+Math.random()*50));
    powerupBanana.setVelocityY(800);
    powerupBanana2.setVelocityY(800);

    if(lives<=0 || lives2<=0)
    {
      if(lives<=0)
      {
        character.x=10000000;
        character.y=10000;
      }
      else if(lives2<=0)
      {
        character2.x=10000000;
        character2.y=10000;
      }
      this.time.addEvent// adds a delay to switch screens
      ({
        delay: 2000,
        callback: ()=> {
          gameMusic.stop();
          this.scene.start("win");
        },
      })
    }
  }
}
//UPDATE ENDS HERE

class winScreen extends Phaser.Scene
{   
  constructor (config)
  {
    super(config);
  }
  preload()
  {
    // don't need to preload images and audios that have already been loaded in first scene
    this.load.spritesheet("win","assets/backgrounds/winBG.png",{frameWidth: 1000, frameHeight: 600})
  }
  create()
  {
    let winText;
    let bg=this.add.sprite(500,300,"win");
    bg.displayWidth=1000; 
    bg.displayHeight=600; 
    // Creating background animations
    this.anims.create
    ({
        key: "red",
        frameRate: 3,
        frames: this.anims.generateFrameNumbers("win", { start: 4, end: 7 }),
        repeat: -1
    });
    this.anims.create
    ({
        key: "yellow",
        frameRate: 3,
        frames: this.anims.generateFrameNumbers("win", { start: 0, end: 3 }),
        repeat: -1
    });
    
    if (lives<=0)
    {
      bg.anims.play("red", true);

      // Text
      winText=this.add.text(500,20,"Congratulations "+name[1]+", You Win!",{fontFamily:'pixel',fontSize:40,color:"#ffffff"});
      let winCenter=500-winText.width/2;
      winText.destroy();
      winText=this.add.text(winCenter,20,"Congratulations "+name[1]+", You Win!",{fontFamily:'pixel',fontSize:40,color:"#ffffff"});
    }
    else if (lives2<=0)
    {
      bg.anims.play("yellow", true);

      winText=this.add.text(500,20,"Congratulations "+name[0]+", You Win!",{fontFamily:'pixel',fontSize:40,color:"#ffffff"});
      let winCenter=500-winText.width/2;
      winText.destroy();
      winText=this.add.text(winCenter,20,"Congratulations "+name[0]+", You Win!",{fontFamily:'pixel',fontSize:40,color:"#ffffff"});
    }
    bg.setInteractive({useHandCursor: true})
    bg.on("pointerdown",()=>{ 
      this.time.addEvent //adds a delay to switch screens
      ({
        delay: 200,
        callback: ()=>
        {
          reset();
          this.scene.start("title");
        },
      })
    })
    
    // Sorting for leaderboard
    scoreboard.push(Math.round(p1Score));
    scoreboard.push(Math.round(p2Score));
    sort();
    
  }//end of create
  update()
  {
    
  }
}
//end of winScreen screen

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1000,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false // Turns on/off hitboxes
        
      }
    }
};
var game = new Phaser.Game(config);

// Adding scenes
game.scene.add("title",titleScreen);
game.scene.add("one",inputNameOne);
game.scene.add("two",inputNameTwo);
game.scene.add("help",helpScreen);
game.scene.add("score",scoreboardScene);
game.scene.add("win",winScreen);
game.scene.add("singleplayer",singleplayerGame);
game.scene.add("multiplayer", multiplayerGame);
game.scene.start("title");