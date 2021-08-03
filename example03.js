const brain = require('brain.js');

let trainedNet;

const trainingData = [
  {
    input: 'Rio São Francisco / Barragem de JATI abrindo as comportas:',
    output: {
      bolsonaro: 1
    }
  },
  {
    input: "Agora a fome voltou. E no ano que temos a maior produção do agronegócio nesse país, o povo brasileiro volta a passar fome? Não falta alimento no Brasil, falta dinheiro para as pessoas comprarem alimento.",
    output: { lula: 1 }
  },

  {
    input: 'Diálogo fraterno com o presidente de Portugal Marcelo Rebelo de Sousa, que chegou hoje no Brasil para participar da inauguração do Museu da Língua Portuguesa. Conversamos muito sobre as relações Brasil-Portugal e União Europeia. Um agradável encontro.',
    output: {
      lula: 1
    }
  },
  {
    input: 'O fim de semana promete em Tóquio… E logo mais tem Brasil no arco e flecha!',
    output: {
      lula: 1
    }
  },
  {
    input: 'A jovem Thaíse tem uma boa notícia. Fé no futuro. Amanhã vai ter.',
    output: {
      lula: 1
    }
  },
  {
    input: 'É de se impressionar a rapidez com que o Estado manda prender alguém por queimar uma estátua, mas até hoje não conseguiu descobrir quem lançou uma bomba no Instituto Lula, quem atirou contra o ônibus da caravana e quem mandou matar Marielle Franco.',
    output: {
      lula: 1
    }
  },
  {
    input: 'E o Bolsonaro que recebeu o presidente de Portugal sem máscara... Eu vejo isso e fico pensando... Precisamos recuperar o prestígio internacional do Brasil.',
    output: {
      lula: 1
    }
  },
  {
    input: 'Quando eu tinha 14 anos meu sonho era muito simples. Era ter minha carteira de trabalho assinada, casar e construir uma família. Hoje os jovens estão sem perspectiva de futuro. Essa turma precisa voltar a sonhar. Precisamos usar a revolução digital em benefício dos nossos jovens.',
    output: {
      lula: 1
    }
  },
  {
    input: 'Se a roça não roça, a cidade não almoça. Se a roça não planta, a cidade não janta. Feliz Dia do Agricultor!',
    output: {
      lula: 1
    }
  },
  {
    input: '- Parabéns ao povo brasileiro. - Eleições democráticas somente com contagem pública dos votos.',
    output: {
      bolsonaro: 1
    }
  },
  {
    input: 'Parabéns ao povo brasileiro. Eleições democráticas somente com contagem pública dos votos.',
    output: {
      bolsonaro: 1
    }
  },
  {
    input: 'Sempre defendi, mesmo sob críticas, que o vírus e o desemprego deveriam ser combatidos de forma simultânea e com a mesma responsabilidade. A fome também mata.',
    output: {
      bolsonaro: 1
    }
  },
  {
    input: ' Tudo tem um propósito. É agradecer a Deus, aprender com as quedas, relevar algumas claras injustiças, levantar a cabeça e seguir em frente. Desistir jamais! Esse é o espírito do nosso povo. Todo apoio e força aos atletas do Brasil que estão dando o seu melhor nas Olimpíadas.',
    output: {
      bolsonaro: 1
    }
  },
  {
    input: 'Em nenhum momento este governo deixou de respeitar o sagrado direito à liberdade de expressão de todos. Cometem atos antidemocráticos exatamente os que querem, pelo uso da força, calar quem se manifesta.',
    output: {
      bolsonaro: 1
    }
  },
  {
    input: '- @PRFBrasil em ação com a @policiafederal e o Grupo Especial de Segurança de Fronteira do MT (GEFRON) apreendem cerca de 1 T de Cocaína em Altamira/PA. - Apreensão ruma para a incineração com prejuízo estimado de mais de R$ 41 milhões para o crime organizado. @JusticaGovBR',
    output: {
      bolsonaro: 1
    }
  },
  {
    input: 'O Governo Federal, por duas vezes, foi ao STF para que decretos de governadores, que violavam incisos do art. 5° da Constituição Federal, que trata das liberdades individuais, fossem declarados inconstitucionais. Lamentavelmente estas ações sequer foram analisadas.',
    output: {
      bolsonaro: 1
    }
  },
  {
    input: 'Desta forma, o STF delegou poderes para que estados e municípios fechassem o comércio, decretassem lockdown, fechassem igrejas, prendessem homens e mulheres em praças públicas ou praias, realizassem toque de recolher, etc.',
    output: {
      bolsonaro: 1
    }
  },
];


function encode(setence) {
  return setence.split('').map(character => (character.charCodeAt(0) / 256));
}

function processTrainingData(data) {
  return data.map(tweetData => {
    return {
      input: encode(tweetData.input),
      output: tweetData.output
    }
  })
}

function train(data) {
  let net = new brain.NeuralNetwork({ activation: "sigmoid" });
  net.train(processTrainingData(data),
    {
      log: (traningStatus) => console.log(traningStatus),
    });
  trainedNet = net.toFunction();
};

function execute(input) {
  let results = trainedNet(encode(input));
  console.log(results)
  let author;
  let certainty;
  if (results.bolsonaro > results.lula) {
    author = 'bolsonaro'
    certainty = Math.floor(results.bolsonaro * 100)
  } else {
    author = 'lula'
    certainty = Math.floor(results.lula * 100)
  }

  return "I'm " + certainty + "% sure that tweet was written by " + author;
}

train(trainingData);

const bolsonaroTweet = "Fake news desestimularam o tratamento inicial da doença, desrespeitando, inclusive,  parecer do Conselho Federal de Medicina que atribui ao médico a decisão de receitar, com aquiescência do paciente ou familiar, o tratamento off-label (fora da bula).";
// fonte : https://twitter.com/jairbolsonaro?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor

const lulaTweet = "Bolsonaro não governa o país. Prefere ficar passeando de moto e xingando o Lula. Ele desrespeita as instituições e a sociedade. Não leva em consideração a fome, o desemprego, o aumento do custo de vida, o desmonte da ciência... Por isso fica discutindo coisa que não tem nexo.";
// fonte : https://twitter.com/LulaOficial?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor
console.log(execute(bolsonaroTweet));

console.log(execute(lulaTweet));