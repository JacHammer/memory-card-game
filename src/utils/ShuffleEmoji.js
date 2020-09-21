import shuffle from './Shuffle.js';

/**
 * create an array of Emojis for memory card game
 * @param {Number} width of the game grid
 * @param {Number} height of the game grid
 * @return {Array}  as a shuffled emoji array.
 */
const reshuffleEmojis = (width, height) => {
  const testEmojiArray = [];
  const emojiRange = [128513, 128591];
  for (let x = emojiRange[0]; x < emojiRange[1]; x++) {
    testEmojiArray.push(String.fromCodePoint(parseInt(x, 10)));
  };
  let emojis = testEmojiArray.slice(0, (width * height)/2);
  emojis.push(...emojis);
  emojis = shuffle(emojis);
  return emojis;
};

export default reshuffleEmojis;
