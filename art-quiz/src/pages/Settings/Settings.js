import SettingsElement from './Settings.html';
import './Settings.scss';
import {Loading} from "../../components/Loading";

export class Settings {
    constructor() {

    }

    async render(params) {

        this.from = params ? params.get('from') : '/'
        return SettingsElement;
    }

    async after_render() {
        // Variables //
        const settingsBack = document.querySelector('.settings-back')
        const audio = new Audio();
        audio.volume = 0.5;
        const volumeBar = document.querySelector('.progress-volume');
        const volume = document.querySelector('.volume');
        let currentVolume = audio.volume * 100;
        const setTimeGame = document.querySelector('#set-time-game');
        const settingsTitleTime = document.querySelector('.settings-title-time');
        const secondsMinus = document.querySelector('.seconds-minus');
        const secondsPlus = document.querySelector('.seconds-plus');
        const settingsSeconds = document.querySelector('.settings-seconds');
        const settingsTimeSection = document.querySelector('.settings-time-section');
        const settingsDefaultBtn = document.querySelector('.settings-default');
        const settingsSaveBtn = document.querySelector('.settings-save');
        const footer = document.querySelector('.footer');

        this.loading = document.createElement('div');
        this.loadingInstance = new Loading();
        this.loading.innerHTML = await this.loadingInstance.render();
        const settingsHTML = document.querySelector('#settings');


        // Event handlers //
        const goHome = () => {
            location.href = this.from;
        }
        const muteUnmute = () => {
            audio.muted = !audio.muted;
            if (audio.muted) {
                volumeBar.value = 0;
                volumeBar.style.background = '#fff';
                volume.classList.add('mute');

            } else {
                volumeBar.value = currentVolume;
                volumeBar.style.background = `linear-gradient(to right, #FFBCA2 0%,
    #FFBCA2 ${volumeBar.value}%, #fff ${volumeBar.value}%, white 100%)`;
                volume.classList.remove('mute');
            }
        }

        const toggleTimeGame = () => {
            if (settingsTitleTime.textContent === 'On') {
                settingsTitleTime.textContent = 'Off';
                settingsTimeSection.classList.remove("in");
                settingsTimeSection.classList.add("out");
            }
            else {
                settingsTitleTime.textContent = 'On';
                settingsTimeSection.classList.remove("out");
                settingsTimeSection.classList.add("in");
            }

        }

        const secondsUp = () => {
            settingsSeconds.textContent = +settingsSeconds.textContent === 30
                ? +settingsSeconds.textContent
                : +settingsSeconds.textContent + 5
        }

        const secondsDown = () => {
            settingsSeconds.textContent = +settingsSeconds.textContent === 0
                ? +settingsSeconds.textContent
                : +settingsSeconds.textContent - 5
        }


        const setSettings = () => {

            volumeBar.value = localStorage.getItem('volume')
                ? +JSON.parse(localStorage.getItem('volume')) : 50;
            volumeBar.style.background = `linear-gradient(to right, #ffbca2 0%, #ffbca2 ${volumeBar.value}%, #fff ${volumeBar.value}%, #fff 100%)`;

            if (volumeBar.value == 0) {
                volume.classList.add('mute')
            }
            else if (volume.classList.contains('mute')) volume.classList.remove('mute');
            settingsTitleTime.textContent = localStorage.getItem('timeGame')
                                 ? localStorage.getItem('timeGame') : 'Off';

            settingsSeconds.textContent = localStorage.getItem('secondsForAnswer')
                ? localStorage.getItem('secondsForAnswer') : '20';
            if (settingsTitleTime.textContent === 'On'){
                settingsTimeSection.classList.remove('out');
                settingsTimeSection.classList.add('in');
            }
            else {
                setTimeGame.checked = 'true';
                settingsTimeSection.classList.remove('in');
                settingsTimeSection.classList.add('out');
            }
        }

        setSettings();

        const setDefaultSettings = () => {
            volumeBar.value = 50;
            volumeBar.style.background = `linear-gradient(to right, #FFBCA2 0%,
    #FFBCA2 50%, #fff 50%, #fff 100%)`;
            if (volume.classList.contains('mute')) volume.classList.remove('mute');
            settingsTitleTime.textContent = 'On';
            settingsSeconds.textContent = '20';
            settingsTimeSection.classList.remove("out");
            settingsTimeSection.classList.add("in");
        }

        const saveSettings = () => {
            localStorage.setItem('volume', JSON.stringify(volumeBar.value));
            localStorage.setItem('timeGame', settingsTitleTime.textContent);
            localStorage.setItem('secondsForAnswer', settingsSeconds.textContent);

            settingsHTML.after(this.loading);
            settingsHTML.classList.add('out');
            footer.classList.add('out');
            setTimeout(goHome, 3000);
        }

        // Event listeners //

        volume.addEventListener('click', muteUnmute);

        volumeBar.addEventListener('input', function (e) {
            currentVolume = this.value;
            if (this.value <= 1) {
                audio.muted = true;
                volume.classList.add('mute')
            } else {
                audio.muted = false;
                volume.classList.remove('mute');
            }
            volumeBar.style.background = `linear-gradient(to right, #FFBCA2 0%,
                                      #FFBCA2 ${this.value}%, #fff ${this.value}%, white 100%)`;
        });

        setTimeGame.addEventListener('click', toggleTimeGame)
        secondsPlus.addEventListener('click', secondsUp);
        secondsMinus.addEventListener('click', secondsDown);
        settingsDefaultBtn.addEventListener('click', setDefaultSettings)
        settingsSaveBtn.addEventListener('click', saveSettings)
        settingsBack.addEventListener('click', goHome)



    };
}
