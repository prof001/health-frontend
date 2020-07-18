import {Injectable} from '@angular/core';
import {QuoteModel} from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  constructor() {}

  quotes: QuoteModel[] = [
    {
      word: 'Happiness is nothing more than good health and a bad memory.',
      author: 'Albert Schweitzer'
    },
    {
      word: 'He who has health has hope; and he who has hope has everything.',
      author: 'Arabian proverb'
    },
    {
      word: ` The foundation of success in life is good health: that is the substratum fortune;
       it is also the basis of happiness. A person cannot accumulate a fortune very well when he is sick.`,
      author: 'P.T Barnum'
    },
    {
      word: 'A good laugh and a long sleep are the best cures in the doctor’s book.',
      author: 'Irish proverb'
    },
    {
      word: 'The greatest of follies is to sacrifice health for any other kind of happiness.',
      author: 'Arthur Schopenhauer'
    },
    {
      word: 'Before healing others, heal yourself.',
      author: 'Gambian saying'
    },
    {
      word: 'Eat to live, not live to eat.',
      author: 'Socrates'
    },
    {
      word: `The only way to keep your health is to eat what you don’t want,
         drink what you don’t like, and do what you’d rather not.`,
      author: 'Mark Twain'
    },
    {
      word: 'The best doctors gives the least medicine.',
      author: 'Benjamin Franklin'
    },
    {
      word: 'Walking is the best possible exercise. Habituate yourself to walk very far.',
      author: 'Thomas Jefferson'
    },
    {
      word: `The doctor of the future will give no medicines, but will interest his patients in the care of the human
        frame, in diet, and in the causes and prevention of disease.`,
      author: 'Thomas Edison'
    },
    {
      word: 'If you keep good food in your fridge, you will eat good food.',
      author: 'Errick McAdams'
    },
    {
      word: 'When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need.',
      author: 'Ayurvedic Proverb'
    },
    {
      word: 'If it came from a plant, eat it. If it was made in a plant, don’t.',
      author: 'Michael Pollan'
    }
  ]
}
