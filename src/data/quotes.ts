/**
 * Hardcoded motivational quotes for Home tab
 */
export interface Quote {
  id: string;
  text: string;
  author: string;
}

export const MOTIVATIONAL_QUOTES: Quote[] = [
  { id: '1', text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { id: '2', text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt' },
  { id: '3', text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill' },
  { id: '4', text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { id: '5', text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
  { id: '6', text: 'Everything you\'ve ever wanted is on the other side of fear.', author: 'George Addair' },
  { id: '7', text: 'Success usually comes to those who are too busy to be looking for it.', author: 'Henry David Thoreau' },
  { id: '8', text: 'Don\'t be afraid to give up the good to go for the great.', author: 'John D. Rockefeller' },
  { id: '9', text: 'I find that the harder I work, the more luck I seem to have.', author: 'Thomas Jefferson' },
  { id: '10', text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb' },
];
