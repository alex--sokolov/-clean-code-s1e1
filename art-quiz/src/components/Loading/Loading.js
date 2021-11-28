import './Loading.scss'
import LoadingElement from './Loading.html';

export class Loading {
   constructor() {}

  async render () {
    return LoadingElement;
  }

  async after_render () {};
}
