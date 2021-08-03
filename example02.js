const brain = require ('brain.js');

// Amostras retiradas dos tweets oficiais dos políticos Bolsonaro e Lula.
const tweets  = [
  { input: 'Diálogo fraterno com o presidente de Portugal Marcelo Rebelo de Sousa, que chegou hoje no Brasil para participar da inauguração do Museu da Língua Portuguesa. Conversamos muito sobre as relações Brasil-Portugal e União Europeia. Um agradável encontro.', output: 'Lula' },
  { input: 'O fim de semana promete em Tóquio… E logo mais tem Brasil no arco e flecha!', output: 'Lula' },
  { input: 'Não nos esquecemos', output: 'Lula' },
  { input: 'Passando pra convidar vocês pro canal do Telegram… ', output: 'Lula' },
  { input: 'Leitura desses dias… Recomendo.', output: 'Lula' },
  { input: 'A jovem Thaíse tem uma boa notícia. Fé no futuro. Amanhã vai ter.', output: 'Lula' },
  { input: 'Sobre governar pra todos. Bom dia.', output: 'Lula' },
  { input: 'É de se impressionar a rapidez com que o Estado manda prender alguém por queimar uma estátua, mas até hoje não conseguiu descobrir quem lançou uma bomba, quem atirou contra o ônibus da caravana e quem mandou matar Marielle Franco.', output: 'Lula' },
  { input: 'Se a roça não roça, a cidade não almoça. Se a roça não planta, a cidade não janta. Feliz Dia do Agricultor!', output: 'Lula' },
  { input: 'O Brasil tem jeito. Bom dia.', output: 'Lula' },

  { input: 'Rio São Francisco / Barragem de JATI abrindo as comportas:', output: 'Bolsonaro' },
  { input: 'Com o povo, onde o povo estiver.', output: 'Bolsonaro' },
  { input: 'Parabéns ao povo brasileiro. Eleições democráticas somente com contagem pública dos votos.', output: 'Bolsonaro' },
  { input: 'Tudo tem um propósito. É agradecer a Deus, aprender com as quedas, relevar algumas claras injustiças, levantar a cabeça e seguir em frente. Desistir jamais! Esse é o espírito do nosso povo. Todo apoio e força aos atletas do Brasil que estão dando o seu melhor nas Olimpíadas.', output: 'Bolsonaro' },
  { input: 'Mais do que nunca, o momento continua sendo o da união de todos no combate ao mal comum: o vírus, que é mortal para muitos. QUE DEUS ABENÇOE O NOSSO BRASIL.', output: 'Bolsonaro' },
  { input: 'A vacina é uma realidade em nosso Governo. Fora os países produtores da mesma, o Brasil é aquele que mais investe em imunizantes e que mais vacinou sua população.', output: 'Bolsonaro' },
  { input: 'Sempre defendi, mesmo sob críticas, que o vírus e o desemprego deveriam ser combatidos de forma simultânea e com a mesma responsabilidade. A fome também mata.', output: 'Bolsonaro' },
  { input: 'Em nenhum momento este governo deixou de respeitar o sagrado direito à liberdade de expressão de todos. Cometem atos antidemocráticos exatamente os que querem, pelo uso da força, calar quem se manifesta.', output: 'Bolsonaro' },
  { input: 'O Governo Federal, por duas vezes, foi ao STF para que decretos de governadores, que violavam incisos do art. 5° da Constituição Federal, que trata das liberdades individuais, fossem declarados inconstitucionais. Lamentavelmente estas ações sequer foram analisadas.', output: 'Bolsonaro' },
  { input: 'Desta forma, o STF delegou poderes para que estados e municípios fechassem o comércio, decretassem lockdown, fechassem igrejas, prendessem homens e mulheres em praças públicas ou praias, realizassem toque de recolher, etc.', output: 'Bolsonaro' },

];
// abaixo iremos tentar advinhar o possível autor da frase ou twitter tendo como base os dados coletados anteriormente.

// Iremos checar se nossa rede consegue identificar o possível autor, através de uma amostra extra e real
// obtida de um twitte de Bolsonaro. 
 const test04 = "Veja as lindas obras na República Dominicana feitas com recursos de brasileiros (BNDES)"; 

// Faremos o mesmo que no teste anterior, porém com uma amostra extra e real de um twitte do Lula.
const test05 = "Agora a fome voltou. E no ano que temos a maior produção do agronegócio nesse país, o povo brasileiro volta a passar fome? Não falta alimento no Brasil, falta dinheiro para as pessoas comprarem alimento.";

const network = new brain.recurrent.LSTM();

network.train(tweets, {
  log: (details) => console.log(details),
  errorThresh:0.055
});

const resultadoTeste04 = network.run(test04);
const resultadoTeste05 = network.run(test05);

console.log(`
Resultados: 
  Teste 04 -  Resultado esperado: Bolsonaro, resultado obtido pela rede com LSTM: ${resultadoTeste04};
  Teste 05 -  Resultado esperado: Lula, resultado obtido pela rede com LSTM: ${resultadoTeste05};
`);