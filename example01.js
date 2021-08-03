const brain = require ('brain.js');

const trainingData = [
  'Jane saw Doug.',
  'Doug saw Jane.',
  'Spot saw Doug and Jane looking at each other.',
  'It was love at first sight, and Spot had a frontrow seat. It was a very special moment for all.',
];

const lstmNeuralNetwork = new brain.recurrent.LSTM();
const trainingResult = lstmNeuralNetwork.train(trainingData, {
  iterations: 1500,
  log: (details) => console.log(details),
  errorThresh: 0.011,
});
console.log('Training result: ', trainingResult);

const run1 = lstmNeuralNetwork.run('Jane');
const run2 = lstmNeuralNetwork.run('Doug');
const run3 = lstmNeuralNetwork.run('Spot');
const run4 = lstmNeuralNetwork.run('It');

console.log('run 1: Jane' + run1);
console.log('run 2: Doug' + run2);
console.log('run 3: Spot' + run3);
console.log('run 4: It' + run4);

