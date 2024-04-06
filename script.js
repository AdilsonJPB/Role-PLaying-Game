// Variáveis de estado do jogador
let xp = 0; // Experiência do jogador
let health = 100; // Saúde do jogador
let gold = 50; // Ouro do jogador
let currentWeapon = 0; // Índice do armamento atual do jogador no array weapons
let fighting; // Indica se o jogador está em combate
let monsterHealth; // Saúde do monstro durante o combate
let inventory = ["stick"]; // Array que contém o inventário do jogador, começando com um "stick"

// Elementos do DOM
const button1 = document.querySelector("#button1"); // Botão 1
const button2 = document.querySelector("#button2"); // Botão 2
const button3 = document.querySelector("#button3"); // Botão 3
const text = document.querySelector("#text"); // Elemento de texto
const xpText = document.querySelector("#xpText"); // Elemento de texto para exibir a experiência
const healthText = document.querySelector("#healthText"); // Elemento de texto para exibir a saúde
const goldText = document.querySelector("#goldText"); // Elemento de texto para exibir o ouro
const monsterStats = document.querySelector("#monsterStats"); // Elemento de estatísticas do monstro
const monsterName = document.querySelector("#monsterName"); // Elemento para exibir o nome do monstro
const monsterHealthText = document.querySelector("#monsterHealth"); // Elemento para exibir a saúde do monstro

// Array de armas disponíveis para compra
const weapons = [
    { name: "stick", power: 5 }, // Bastão
    { name: "dagger", power: 30 }, // Punhal
    { name: "claw hammer", power: 50 }, // Martelo de Garra
    { name: "sword", power: 100 } // Espada
];

// Array de monstros com nome, nível e saúde
const monsters = [
  { 
    name: "slime",
    level: 2, 
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]

// Array de locais possíveis no jogo
const locations = [
    { name: "town square", 
      "button text": ["Go to Store", "Go to cave", "Fight dragon"],
      "button functions": [goStore, goCave, fightDragon],
      text: "You are in the town square. You see a sign that says \"Store\"."
    },
    { name: "store",
      "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
      "button functions": [buyHealth, buyWeapon, goTown],
      text: "You enter the store."
    },
    { name: "cave",
      "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
      "button functions": [fightSlime, fightBeast, goTown],
      text: "You enter the cave. You see some monsters."
    },
    {
      name: "fight",
      "button text": ["Attack", "Dodge", "Run"],
      "button functions": [attack, dodge, goTown],
      text: "You are fighting a monster." 
    },
    {
      name: "kill monster",
      "button text": ["Go to town square", "Go to town square", "Go to town square"],
      "button functions": [goTown, goTown, easterEgg]
    },
    {
      name: "lose",
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
      "button functions": [restart, restart, restart],
      text: "You die. ☠",
    },
    {
      name: "win", 
      "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
      "button functions": [restart, restart, restart], 
      text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
    {
      name: "easterEgg",
      "button text": ["2", "8", "Go to town square?"],
      "button functions": [pickTwo, pickEight, goTown],
      text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];

// Inicializar botões
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Função para atualizar a interface do jogo com base no local atual
function update(location) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

// Funções para navegar para diferentes locais
function goTown() {
    update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

// Função para comprar saúde
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health";
  }
}

// Função para comprar uma arma
function buyWeapon() {
  if (currentWeapon < weapons.length -1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon ++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);    
      text.innerText += "In your inventory you have: " + inventory;
    } else {
      text.innerText += "You do not have enough money to buy a weapon";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

// Função para vender uma arma
function sellWeapon() {
  if(inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText = "In your inventory you have " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

// Funções para iniciar uma luta com diferentes monstros
function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

// Função para iniciar uma luta
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

// Função para o jogador atacar o monstro
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if(isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if(health <= 0) {
    lose();
  } else if(monsterHealth <= 0) {
    if(fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if(Math.random() <= .1 && inventory.length != 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

// Função para obter o valor de ataque do monstro
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

// Função para verificar se o jogador acerta o monstro
function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

// Função para o jogador esquivar do ataque do monstro
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

// Função chamada quando o jogador derrota um monstro
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

// Função chamada quando o jogador perde a luta
function lose() {
  update(locations[5]);
}

// Função chamada quando o jogador vence o jogo
function winGame() {
  update(locations[6]);
}

// Função para reiniciar o jogo
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

// Função para acessar o easter egg do jogo
function easterEgg() {
    update(locations[7]);
}

// Função para escolher o número 2 no easter egg
function pickTwo() {
  pick(2);
}

// Função para escolher o número 8 no easter egg
function pickEight() {
  pick(8);
}

// Função para jogar o easter egg
function pick(guess) {
  const numbers = [];
  while(numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for(let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if(numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += " Wrong! You lose 10 health";
    health -= 10;
    healthText.innerText = health;
  } if (health <= 0) {
    lose();
  }
}
