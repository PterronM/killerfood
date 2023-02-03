# FOODKILLER

## Descripcion

FoodKiller es un juego en el que el jugador tiene que ir moviendose horizontalmente por la pantalla, para poder coger las diferentes frutas que van apareciendo aleatoriamente para, poder así, aumentar su puntuación. Asi mismo, tambien dispone de varias pocimas, las cuales afectan al juego de diferente manera. El juego termina cuando el jugador coge la pocima negra. Una vez termina el juego nos muestra la pantalla final donde aparecerá, la maxima puntuación obtenida en las diferentes partidas y la puntuciaón de la partida actual.

## MVP (DOM - CANVAS)

- el juego tiene dos frutas diferentes, las cuales se mueven verticalmente
- tiene una pocima azul la cual incrementa por dos la puntuación de una fruta
- la pocima verde disminuye considerablemente la velocidad del jugador a la hora de moverse por la pantalla durante 2s.
- adquirir una pocima negra te elimina directamente del juego
- Dificultad creciente cada 100 puntos


## Data Structure

# main.js
- startGame () {}
- resetGame () {}
- movePerson () {}
- pause () {}
- mute () {}

# game.js

- scoreFinal () {}
- subirNivel () {}
- scoreMax () {}
- gameOver () {}
- comidaAparece () {}
- quitarFruta () {}
- toxicoAparece () {}
- quitarToxico () {}
- pocimaAparece () {}
- quitarPocima () {}
- pocimaSpeedAparece () {}
- quitarPocimaSpeed () {}
- colissionFrutaPerson () {}
- colissionToxicoPerson () {}
- colisionPocimaPerson () {}
- colisionPocimaSpeedPerson () {}
- drawBackground () {}
- clearCanvas () {}
- gameLoop () {}

# person.js 

- constructor () {this.x, this.y, this.w, this.h, this.speed, this.image}
- drawPerson () {}
- moveLeft () {}
- moveRight () {}


# comida.js 

- constructor () {this.x, this.y, this.w, this.h, this.speed, this.valor, this.image}
- drawComida () {}
- moveComida () {}

# pocima.js 

- constructor () {this.x, this.y, this.w, this.h, this.valor, this.speed, this.image}
- drawPocima () {}
- movePocima () {}

# pocimaSpeed.js 

- constructor () {this.x, this.y, this.w, this.h, this.speed, this.image} 
- drawPocimaSpeed () {}
- movePocimaSpeed () {}

# toxico.js 

- constructor () {this.x, this.y, this.w, this.h, this.speed, this.image}
- drawToxico () {}
- moveToxico () {}
- aumentarSpeed () {}

# nextLevel.js 

- constructor () {this.x, this.y, this.w, this.h, this.image}
- drawNextLevel () {}



## States y States Transitions
Definition of the different states and their transition (transition functions)

- startScreen
- startScreenGame
- gameOverScreen


## Links


### Git
URls for the project repo and deploy
[Link Repo](https://github.com/PterronM/killerfood.git)
[Link Deploy](https://pterronm.github.io/killerfood/)

### Slides
URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/138o01hAz-0gXepN78RsDgse12HiiuN7Fz_N_hJnI9_g/edit?usp=sharing)


