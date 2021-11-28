import SettingsElement from './Settings.html';
import './Settings.scss';

export class Settings {
  constructor() {}

  async render () {
    return SettingsElement;
  }

  async after_render () {
    this.volumeBar = document.querySelector('.volume-bar');

    // this.volumeBar.addEventListener('input', function (e) {
    //   const value = this.value;
    //   if (value <= 1) {
    //     audio.muted = true;
    //     volume.classList.add('mute')
    //   } else {
    //     audio.muted = false;
    //     volume.classList.remove('mute');
    //   }
    //   audio.volume = value / 100;
    //   this.style.background = `linear-gradient(to right, #0498bf 0%,
    // #0498bf ${value}%, #fff ${value}%, white 100%)`;
    // });


  };
}
