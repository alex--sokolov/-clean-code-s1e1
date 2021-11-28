import HomeElement from './Home.html';
import './Home.scss';
export class Home {
  constructor() {
  }
  async render () {
    return `${HomeElement} `
  }

  async after_render () {
    const artistQuiz = document.querySelector('.artist-quiz');
    artistQuiz.addEventListener( 'click', goToArtistQuiz);
    const picturesQuiz = document.querySelector('.pictures-quiz');
    picturesQuiz.addEventListener( 'click', goToPictureQuiz);
    const settings = document.querySelector('.settings');
    settings.addEventListener( 'click', goToSettings);

    function goToArtistQuiz() {
      location.hash= '/categories?cat=1';
    }
    function goToPictureQuiz() {
      location.hash= '/categories?cat=2';
    }
    function goToSettings() {
      location.hash = '/settings';
    }
  };
}
