import Artist from './ArtistQuiz.html';

import { images } from '../../../data/images';

const splitArr = (arr, chunks) =>[
  ...Array(chunks),
].map((_, c) => arr.filter((n, index) => index % chunks === c));

const questionsByAuthor = [];
const questionsByName = [];

images.forEach((item, index) => {
  if (index % 2 === 0) {
    questionsByAuthor.push({
      ...item,
      type: 'author',
    });
  }

  if (index % 2 !== 0) {
    questionsByName.push({
      ...item,
      type: 'name',
    });
  }
});

const uniqAnswersByAuthor = [...new Set(questionsByAuthor.map(item => item.author))];
const uniqAnswersByName = [...new Set(questionsByName.map(item => item.author))];

const newQuestionsByAuthor = splitArr(questionsByAuthor, 12);
const newQuestionsByName = splitArr(questionsByName, 12);

const answers = {
  uniqAnswersByAuthor,
  uniqAnswersByName,
}

const questions = {
  questionsByAuthor: newQuestionsByAuthor,
  questionsByName: newQuestionsByName,
};
console.log(questions);
const pageCategories = questions['questionsByAuthor'];

const categoriesToRender = pageCategories.map(pageCategory => {
  console.log(pageCategory);
  return pageCategory[0].author;
});



export class ArtistQuiz {
  constructor() {};

  async render () {
    return categoriesToRender;
  }

  async after_render () {};
}
