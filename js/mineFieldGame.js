/*
 mineFieldGame.js
 Mine Field Game
 Created by paulo on 2013-03-22.
 */
if (!mineField) {
	var mineField = ( function() {
			var field = //
			[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

			//Linhas e colunas da matriz
			var LINES = 20;
			var COLUMNS = 20;

			//Estados das casas
			var NUMBER = 0;
			var BOMB = 1;
			var POSITION_ALREADY_SELECTED = -1;

			//Quantidade de bombas por nivel
			var AMOUNT_BOMB_EASY = 60;
			var AMOUNT_BOMB_MEDIUM = 100;
			var AMOUNT_BOMB_HARD = 200;

			//Dimesões das casas
			var WIDTH_OPTION = 25;
			var HEIGHT_OPTION = 25;
			var BORDER = 1;

			//Dimesões do ranking
			var WIDTH_RANKING = 526;
			var HEIGHT_RANKING = 100;

			//Dimesões da imagem emoticon
			var WIDTH_EMOTICON = 50;
			var HEIGHT_EMOTICON = 50;

			//Cores do ranking
			var COLOR_RANKING_BOMB = "#FF0000";
			var COLOR_RANKING_TIME = "#0000FF";
			var COLOR_BACKGROUND_RANKING = "#C0C0C0";

			//Cores das casas
			var COLOR_CARD = "#C0C0C0"
			var COLOR_BOMB = "#FF0000";
			var COLOR_BACKGROUND_NUMBER = "#FFFFFF";
			var COLOR_BACKGROUND_BOB_FINDED = "#FFFFFF";
			var COLOR_NUMBER_SELECT = "#FF0000";
			var COLOR_NUMBER_AROUND = "#000000";

			//Fontes dos textos
			var FONT_NUMBER = "18px Arial";
			var FONT_RANKING = "20px Arial";

			//local das imagens
			var PATH_IMAGE_EMOTICON_LOST = "imagens/emoticon_perdeu.jpg";
			var PATH_IMAGE_EMOTICON_OK = "imagens/emoticon_acertou.jpg";
			var PATH_IMAGE_BOMB = "imagens/bomb.png";

			var MESSAGE_WINS = "Você ganhou!!! =)";
			var MESSAGE_LOST = "BOOM!!!! Game Over =(";
			var MESSAGE_VALIDATE_NAME = "Nome invalido !!!";

			//Levels
			var EASY = "Facil";
			var MEDIUM = "Moderado";
			var HARD = "Dificil";

			var LIMIT_RANKING = 10;

			//Campo auxiliar
			var auxField = [];

			//Propriedades para manipular o canvas
			var canvas;
			var context;
			var canvasRanking;
			var contextRanking;

			//Imagens
			var bombImg = new Image();
			var emoticonImg = new Image();

			//manipular o tempo
			var time = 0;
			var interval;
			var startTime = true;

			//Bombas sorteadas
			var totalBombs = 0;

			//Quantidade de jogadas
			var countNumber = 0;

			//Estados do jogo
			var running = false;
			var lost = false;

			var level;
			var bombsLevel;
			var ranking = [];

			var _start = function() {
				initialize.start();
				initialize.show();
				//initialize.debug();
			};

			var _validate = function() {
			var name = jQuery("#name").val();
				if (name == "" || name.length > 3) {
					alert(MESSAGE_VALIDATE_NAME);
					return false;
				}
				return true;
			};

			var _restart = function() {
				window.location.reload();
				//Esconde e exibe botões do jogo
				jQuery('#start').attr('style', '');
				jQuery('#usuario').attr('style', '');
				jQuery('#name').val('');
				jQuery('#restart').attr('style', 'display:none');
			};
			/**
			 * Funções para iniciar o jogo
			 */
			var initialize = {
				start : function() {
					//Exibibe campo
					jQuery("#game").slideDown();

					//Esconde e exibe botões do jogo
					jQuery('#start').attr('style', 'display:none');
					jQuery('#usuario').attr('style', 'display:none');
					jQuery('#restart').attr('style', '');

					//Nivel selecionado
					if (document.getElementById('easy').checked) {
						initializeLevels.easy();
					} else if (document.getElementById('medium').checked) {
						initializeLevels.medium();
					} else if (document.getElementById('hard').checked) {
						initializeLevels.hard();
					}
					initialize.loadImages();
					time = 0;
					emoticonImg.onload = function() {//Espera carregar imagem
						drawGame.drawRanking();
					}
					running = true;
				},
				//carrega imagens do jogo
				loadImages : function() {
					bombImg.src = PATH_IMAGE_BOMB;
					emoticonImg.src = PATH_IMAGE_EMOTICON_OK;
				},
				//Renderiza o campo
				show : function() {
					drawGame.drawCards();
				},
				//Exibi matriz
				debug : function() {
					for ( i = 0; i < COLUMNS; i++) {
						$('#game').append('<br />');
						for ( j = 0; j < LINES; j++) {
							$('#game').append(field[i][j]);
						}
					}
				},
			};
			/***
			 * Funções para desenhar o jogo na tela
			 */
			var drawGame = {
				//Construi o campo
				drawCards : function() {
					canvas = document.getElementById('scene');
					context = canvas.getContext('2d');
					var i, j, positionX = 0;
					for ( i = 0; i < COLUMNS; i++) {
						auxField[i] = new Object();
						for ( j = 0; j < LINES; j++) {
							auxField[i][j] = new Object();
							//bomba ou não de acordo com valores da matriz base!
							auxField[i][j].value = field[i][j];

							auxField[i][j].pos_x = positionX;

							//calcula posição y
							auxField[i][j].pos_y = i * (WIDTH_OPTION + BORDER);

							auxField[i][j].width = WIDTH_OPTION;
							auxField[i][j].height = HEIGHT_OPTION;
							context.fillStyle = COLOR_CARD;
							context.fillRect(auxField[i][j].pos_x, auxField[i][j].pos_y, auxField[i][j].width, auxField[i][j].height);

							//calcula posição x
							positionX = positionX + WIDTH_OPTION + BORDER;
						}
						//volta ao começo da linha
						positionX = 0;
					}
					//adiciona o evento de click na casa
					canvas.addEventListener('click', drawGame.clickReporter, false);
				},
				//Renderiza o ranking do jogo
				drawRanking : function() {
					canvasRanking = document.getElementById('ranking');
					contextRanking = canvasRanking.getContext('2d');
					contextRanking.clearRect(0, 0, contextRanking.width, contextRanking.height);
					contextRanking.fillStyle = COLOR_BACKGROUND_RANKING;
					contextRanking.fillRect(0, 0, WIDTH_RANKING, HEIGHT_RANKING);
					gameUtils.paintRanking();
				},

				clickReporter : function(event) {
					if (running) {
						//Verifica se é a primeira jogada para iniciar o time
						if (startTime) {
							gameUtils.startTime();
						}
						var x;
						var y;
						//Pega posição x,y que foi clicada
						if (event.pageX || event.pageY) {
							x = event.pageX;
							y = event.pageY;
						} else {
							x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
							y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
						}
						x -= canvas.offsetLeft;
						y -= canvas.offsetTop;
						var i = Math.floor(x / (WIDTH_OPTION + BORDER));
						var j = Math.floor(y / (HEIGHT_OPTION + BORDER));
						//Verifica a posição
						gameUtils.checkCoordinates(j, i);
						if (gameUtils.finish()) {
							alert(MESSAGE_WINS);
							gameUtils.stop();
						}
					}
				},
			};
			/***
			 * Funções para manipular o jogo
			 */
			var gameUtils = {
				//inicia o time do jogo
				startTime : function() {
					interval = setInterval(gameUtils.countTime, 1000);
					startTime = false;
				},
				//Desenha o ranking
				paintRanking : function() {
					gameUtils.paintRankingBomb();
					gameUtils.paintRankingTime();
					gameUtils.paintEmoticon();
				},

				paintRankingBomb : function() {
					contextRanking.fillStyle = COLOR_RANKING_BOMB;
					contextRanking.font = FONT_RANKING;
					contextRanking.fillText(totalBombs, 38, 50);
				},

				paintRankingTime : function() {
					contextRanking.fillStyle = COLOR_RANKING_TIME;
					contextRanking.font = FONT_RANKING;
					contextRanking.fillText(time, 460, 50);
				},

				paintEmoticon : function() {
					contextRanking.drawImage(emoticonImg, 220, 10, WIDTH_EMOTICON, HEIGHT_EMOTICON);
				},

				countTime : function() {
					time++;
					drawGame.drawRanking();
				},

				//Verifica se é o fim do jogo e o usuario ganhou !!!
				finish : function() {
					var i, j;
					for ( i = 0; i < COLUMNS; i++) {
						for ( j = 0; j < LINES; j++) {
							//Se ainda tiver bombas no campo ou o jogo tiver acabado
							if (auxField[i][j].value == BOMB || lost) {
								return false;
							}
						}
					}
					return true;
				},

				stop : function() {
					//Para contagem do time
					clearInterval(interval);

					startTime = true;
					running = false;
				},

				checkCoordinates : function(x, y) {
					//console.info(x + " " + y);
					if (auxField[x][y].value == BOMB) {
						lost = true;
						gameUtils.showBombs(x, y, COLOR_BOMB);
					} else if (auxField[x][y].value != POSITION_ALREADY_SELECTED) {
						//Caso nao tenha bomba e nem tenha sido selecionado
						gameUtils.showNumbers(x, y);
					}
				},

				showNumbers : function(x, y) {
					//Incrementa jogada
					countNumber++;

					//Verifica as 8 posições em volta da selecionada
					if (gameUtils.checkIsRange(x, y)) {
						gameUtils.showNumber(x, y, COLOR_NUMBER_SELECT);
					}
					if (gameUtils.checkIsRange(x - 1, y - 1)) {
						gameUtils.showNumber(x - 1, y - 1, COLOR_NUMBER_AROUND);
					}
					if (gameUtils.checkIsRange(x + 1, y + 1)) {
						gameUtils.showNumber(x + 1, y + 1, COLOR_NUMBER_AROUND);
					}
					if (gameUtils.checkIsRange(x - 1, y + 1)) {
						gameUtils.showNumber(x - 1, y + 1, COLOR_NUMBER_AROUND);
					}
					if (gameUtils.checkIsRange(x + 1, y - 1)) {
						gameUtils.showNumber(x + 1, y - 1, COLOR_NUMBER_AROUND);
					}
					if (gameUtils.checkIsRange(x, y - 1)) {
						gameUtils.showNumber(x, y - 1, COLOR_NUMBER_AROUND);
					}
					if (gameUtils.checkIsRange(x, y + 1)) {
						gameUtils.showNumber(x, y + 1, COLOR_NUMBER_AROUND);
					}
					if (gameUtils.checkIsRange(x - 1, y)) {
						gameUtils.showNumber(x - 1, y, COLOR_NUMBER_AROUND);
					}
					if (gameUtils.checkIsRange(x + 1, y)) {
						gameUtils.showNumber(x + 1, y, COLOR_NUMBER_AROUND);
					}

				},

				checkIsRange : function(x, y) {
					if (x < 0 || x >= LINES) {
						return false;
					}

					if (y < 0 || y >= COLUMNS) {
						return false;
					}

					if (auxField[x][y].value == BOMB) {
						gameUtils.showBomb(x, y, COLOR_BACKGROUND_BOB_FINDED);
						return false;
					}

					if (auxField[x][y].value == POSITION_ALREADY_SELECTED) {
						return false;
					}
					return true;
				},

				//exibi numero de acordo com a jogada
				showNumber : function(x, y, color) {
					context.fillStyle = COLOR_BACKGROUND_NUMBER;
					context.fillRect(BORDER + (y * (WIDTH_OPTION + BORDER)), BORDER + (x * (HEIGHT_OPTION + BORDER)), HEIGHT_OPTION - BORDER, HEIGHT_OPTION - BORDER);
					context.fillStyle = color;
					context.font = FONT_NUMBER;
					context.fillText(countNumber, BORDER + (3 + y * (WIDTH_OPTION + BORDER)), BORDER + (20 + x * (HEIGHT_OPTION + BORDER)));
					auxField[x][y].value = POSITION_ALREADY_SELECTED;
				},
				//exibi bomba
				showBomb : function(x, y, color) {
					context.fillStyle = color;
					context.fillRect(BORDER + (y * (WIDTH_OPTION + BORDER)), BORDER + (x * (HEIGHT_OPTION + BORDER)), HEIGHT_OPTION - BORDER, HEIGHT_OPTION - BORDER);
					context.drawImage(bombImg, BORDER + (y * (WIDTH_OPTION + BORDER)), BORDER + (x * (HEIGHT_OPTION + BORDER)), WIDTH_OPTION - BORDER, HEIGHT_OPTION - BORDER);
					auxField[x][y].value = POSITION_ALREADY_SELECTED;
					gameUtils.updateTotalBombs();
				},
				//atualiza ranking com total de bombas
				updateTotalBombs : function() {
					if (!lost) {
						totalBombs--;
						drawGame.drawRanking();
					}
				},
				//Exibi todas as bombas do campo
				showBombs : function(x, y) {
					var i, j;
					for ( i = 0; i < COLUMNS; i++) {
						for ( j = 0; j < LINES; j++) {
							if (auxField[i][j].value == BOMB) {
								gameUtils.showBomb(i, j, COLOR_BOMB);
							}
						}
					}
					gameUtils.gameOver();
				},

				gameOver : function() {
					emoticonImg.src = PATH_IMAGE_EMOTICON_LOST;
					drawGame.drawRanking();
					storageRanking.storage();
					gameUtils.stop();
					alert(MESSAGE_LOST);
					storageRanking.showRanking();
				},
			};

			var storageRanking = {
				//monta e exibi tabela de ranking de acordo com valores na storage
				showRanking : function() {
					if ( typeof (Storage) !== "undefined") {
						storageRanking.sortList();
						//monta tabela do ranking
						var table = "";
						table += "<table  border='1'>";
						table += "<tr>";
						table += "<td colspan='4' align='center'> Ranking </td>";
						table += "</tr>";
						table += "<tr>";
						table += "<td>Nome</td><td>Tempo</td><td>Bombas</td><td>Level</td>";
						table += "</tr>";
						for (var i = 0; i < ranking.length; i++) {
							var item = JSON.parse(localStorage.getItem(ranking[i].id));
							//console.log('item: ', item);
							if (item !== "undefined" && item != null) {
								table += "<tr>";
								table += "<td>" + item.name + "</td><td>" + item.time + "</td><td>" + item.bombsFound + "</td><td>" + item.level + "</td>";
								table += "</tr>";
							}
						}
						table += "</table>";
						document.getElementById("result").innerHTML = table;
					} else {
						document.getElementById("result").innerHTML = "Desculpe, seu browser não suporta ranking...";
					}

				},
				//ordena os ids de acordo com maior numero de bombas encontradas
				sortList : function() {
					for (var i = 0; i < localStorage.length; i++) {
						var item = JSON.parse(localStorage.getItem(i));
						if (item !== "undefined" && item != null) {
							ranking.push({
								id : item.id,
								bomb : item.bombsFound
							});
						}
					}
					ranking.sort(function(a, b) {
						return b.bomb - a.bomb;
					});
				},

				storage : function() {
					var name = document.getElementById('name').value;
					var bombs = bombsLevel - totalBombs;

					//gera id para armazenar no mapa do ranking
					if (localStorage.id) {
						id = parseInt(localStorage.id) + 1;
					} else {
						//caso seja o primeiro
						id = 0;
					}
					localStorage.id = id;

					//monta valores que seram exibidos no ranking
					var item = {
						'id' : id,
						'name' : name,
						'time' : time,
						'bombsFound' : bombs,
						'level' : level
					};

					//coloca linha na tabela do ranking
					localStorage.setItem(id, JSON.stringify(item));
				}
			};

			var initializeLevels = {
				easy : function() {
					totalBombs = AMOUNT_BOMB_EASY;
					level = EASY;
					bombsLevel = AMOUNT_BOMB_EASY;
					initializeLevels.initializeMineField(AMOUNT_BOMB_EASY);
				},

				medium : function() {
					totalBombs = AMOUNT_BOMB_MEDIUM;
					level = MEDIUM;
					bombsLevel = AMOUNT_BOMB_MEDIUM;
					initializeLevels.initializeMineField(AMOUNT_BOMB_MEDIUM);
				},

				hard : function() {
					totalBombs = AMOUNT_BOMB_HARD;
					level = HARD;
					bombsLevel = AMOUNT_BOMB_HARD;
					initializeLevels.initializeMineField(AMOUNT_BOMB_HARD);
				},

				initializeMineField : function(numberBombs) {
					var i = 0;
					while (i < numberBombs) {
						//Sorteia bombas
						var x = Math.floor(Math.random() * 20);
						var y = Math.floor(Math.random() * 20);
						if (y < COLUMNS && x < LINES) {
							if (field[x][y] == NUMBER) {
								field[x][y] = BOMB;
								i++;
							}
						}
					}
				},
			};
			/**
			 * Funções publicas
			 */
			return {
				start : function() {
					if (_validate()) {
						_start();
					}
				},

				restart : function() {
					_restart();
				}
			};
		}());
}
