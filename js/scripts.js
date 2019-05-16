//JS
//Przycisk zainicjowania nowej gry. Ukrywany po rozpoczęciu nowej gry.
var newGameBtn = document.getElementById('js-newGameButton');
//Ma wykonywać czynności po 'click'. Wartość napisu będzie się zmieniać.
newGameBtn.addEventListener('click', newGame); //vide :62
//Przyciski wyboru gracza, wskazanie co będzie się działo po kliknięciu:
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');
//Listener na każdy przycisk. Po kliknięciu wywołanie funkcji 'playerPick' (:75) z parametrem reprezentującym wybór gracza.
pickRock.addEventListener('click', function() {
    playerPick('rock')
});
pickPaper.addEventListener('click', function() {
    playerPick('paper')
});
pickScissors.addEventListener('click', function() {
    playerPick('scissors')
});
//Logika gry - wartości początkowe: Inicjujemy wartości, których będziemy używać w grze i nadajemy im wartości początkowe. Stan gry ustalamy na 'notStarted'. Stan gry będzie służył do ustalenia, które kontenery należy w danej chwili wyświetlać.
var gameState = 'notStarted', //vide :35
    player = {
      name: '',
      score: 0
    },
    computer = {
      score: 0
    };
//Logika gry - wyświetlanie elem. gry. Zmienne wskazują poszczególne elementy gry:
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');
//W zależności od stanu gry chcemy wyświetlić różne jej elementy (funkcja wykona różne polecenia).
function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Once Again';
        //Po zainicjowaniu ponownej gry wyświetlą się poniższe (estetyka):
        playerPickElem.innerText = 'Player selection';
        playerResultElem.innerText = 'Player Score';
        computerPickElem.innerText = "Computer selection";
        computerResultElem.innerText = "Computer Score";

    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements(); //Wywołanie funkcji
//Rozpoczęcie gry:
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');
//Funkcja odpowiadająca za rozpoczęcie gry: pobieramy imię gracza i zapisujemy w obiekcie; sprawdzymy czy gracz podał imię; jeśli pole zostało puste lub 'anuluj' instrukcja warunkowa nie zostanie wykonana; jeśli podał imię wyniki zostają wyzerowane, status gry zmieniony i wywołana funkcja ustalająca co powinno być widoczne na ekranie; ostatnia instrukcja - wpisanie imienia gracza do tablicy wyników.
function newGame() {
  player.name = prompt('Please enter your name');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints(); //funkcja ustalająca wynik - vide :126
  }

}
//Wybór (ruch) gracza - vide :12 :15 :18
function playerPick(playerPick) {
  console.log(playerPick);
}
//Losowanie wyboru komputera:
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors']; //elementy tablicy 0, 1, 2.
    return possiblePicks[Math.floor(Math.random()*3)]; //Math.random - losowa l. zmiennoprzecinkowa; Math.floor - zaokrągla w dół do l. całkowitej; wynikiem jest zwrócenie elementu tablicy,
}
//Umieszczamy otrzymany wybór gracza & komputera na stronie:
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick); //vide: 98
}
//Logika gry & przyznawanie punktów - na początku zakładamy, że to gracz wygrał, później sprawdzamy, czy to prawda:
function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) { //wybór gracza = wybór komputera
      winnerIs = 'none'; //remis
      playerResultElem.innerHTML = 'Draw';
      computerResultElem.innerHTML = 'Draw';
    } else if (
      (computerPick == 'rock' && playerPick == 'scissors') || //wygrana komputera
      (computerPick == 'scissors' && playerPick == 'paper') || //-||-
      (computerPick == 'paper' && playerPick == 'rock')) { //-||-

      winnerIs = 'computer';
    }

    if (winnerIs == 'player') { //jeżeli gracz wygrał i zmienna została nadpisana..
        playerResultElem.innerHTML = 'Win!'; //...wyświetl, że gracz wygrał...
        player.score++; //... dodaj pkt dla gracza.
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = 'Win!';
        computer.score++;
    }
    setGamePoints(); //vide :126
    gameFinish(); //wywołanie funkcji kończącej grę
}
//Aktualizacja wyniku - funkcja odp. za wyświetlanie wyników na stronie:
function setGamePoints() {
    playerPointsElem.innerHTML = player.score; //player.score - przechowyje wynik gracza
    computerPointsElem.innerHTML = computer.score;
}
//Zakończenie rozgrywki - funkcja sprawdza, czy któryś z graczy zdobył 10 pkt.
function gameFinish() {
  if (player.score == 10) {
    alert('The winner is ' + player.name);
    gameState = 'ended';
  } else if (computer.score == 10) {
    alert('The winner is computer');
    gameState = 'ended';
  }
  setGameElements(); //vide :34
}
