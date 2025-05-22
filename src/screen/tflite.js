import Tflite from 'tflite-react-native';

const tflite = new Tflite();

tflite.loadModel({
  model:'pneumonia_model',
  labels: 'label.txt',
}, (err, res) => {
  if (err) console.log('Model loading error:', err);
  else console.log('Model loaded successfully!');
});
