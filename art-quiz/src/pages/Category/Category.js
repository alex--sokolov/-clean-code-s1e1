import './Category.scss';
import {CategoryData} from "../../components/CategoryData";
import {Loading} from "../../components/Loading";
import Utils from '../../utils/Utils';

const categoryData = new CategoryData();

export class Category {
    constructor() {
        this.correctAnswers = [];
        this.totalRightAnswers = 0;
        this.initialResults = {
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": [],
            "8": [],
            "9": [],
            "10": [],
            "11": [],
            "12": []
        };
        if (!localStorage.getItem('pictureResults')) {
            localStorage.setItem('pictureResults', JSON.stringify(this.initialResults));
        }
        if (!localStorage.getItem('artistsResults')) {
            localStorage.setItem('artistsResults', JSON.stringify(this.initialResults));
        }
        this.pictureResults = JSON.parse(localStorage.getItem('pictureResults'));
        this.artistsResults = JSON.parse(localStorage.getItem('artistsResults'));

        this.categoryPicture = (id, num, category) => {
            return `<img src="./data/img/${category[id - 1][num].imageNum}.jpg" 
                            title="${category[id - 1][num].name}" 
                            alt="${category[id - 1][num].name}">   
                   `
        }
    };

    async render(params) {

        console.log(this.correctAnswers);
        console.log(this.totalRightAnswers);

        this.id = params.get("id") || 1;
        this.num = params.get("num") || 0;
        this.popupBtn = (this.num != 9) ? `Next` : 'The End';


        if (params.get("cat") == 'authors') {
            this.category = 'Artist Quiz';
            this.cat = 'authors';
            this.right_answer = categoryData.pageCategoriesAuthor[this.id - 1][this.num].author;

            this.categoryAnswersArtists = () => {
                const answers = [];
                let uniqueAuthor;
                answers.push(this.right_answer);
                for (let i = 0; i < 3;) {
                    uniqueAuthor = categoryData.answers.answersByAuthor[Utils.getRandom(categoryData.answers.answersByAuthor.length)]
                    if (uniqueAuthor !== this.right_answer) {
                        answers.push(uniqueAuthor);
                        i++;
                    }
                }
                Utils.shuffledArray(answers);
                return `
                    <div class="answers">
                        <div class="answer">${answers[0]}</div>
                        <div class="answer">${answers[1]}</div>
                        <div class="answer">${answers[2]}</div>
                        <div class="answer">${answers[3]}</div>
                    </div> 
                    `
            };

            this.question = 'Who is the author of this picture?';
            this.categoryPictureToRenderString = this.categoryPicture(this.id, this.num, categoryData.pageCategoriesAuthor);
            this.RightPictureTitle = categoryData.pageCategoriesAuthor[this.id - 1][this.num].name;
            this.RightPictureAuthor = categoryData.pageCategoriesAuthor[this.id - 1][this.num].author;
            this.RightPictureYear = categoryData.pageCategoriesAuthor[this.id - 1][this.num].year
            this.categoryAnswersToRenderString = this.categoryAnswersArtists();
            this.mainPictureTemplate = `<div class="picture">
                                            ${this.categoryPictureToRenderString}
                                        </div>`;
        }


        if (params.get("cat") == 'name') {
            this.category = 'Picture Quiz';
            this.cat = 'name';
            this.right_answer = categoryData.pageCategoriesName[this.id - 1][this.num].imageNum;
            this.categoryAuthor = categoryData.pageCategoriesName[this.id - 1][this.num].author;

            this.categoryAnswersName = () => {
                const answers = [];
                let uniqueAuthor;
                let uniquePictures;
                answers.push(this.right_answer);
                for (let i = 0; i < 3;) {
                    uniqueAuthor = categoryData.answers.answersByName[Utils.getRandom(categoryData.answers.answersByName.length)];
                    if (uniqueAuthor !== this.categoryAuthor) {
                        uniquePictures = (categoryData.questionsByName.filter((el) => el.author === uniqueAuthor));
                        Utils.shuffledArray(uniquePictures);
                        answers.push(uniquePictures[0].imageNum);
                        i++;
                    }
                }
                Utils.shuffledArray(answers);
                return `
                    <div class="answer-name">
                        <img src="./data/img/${answers[0]}.jpg">
                    </div>
                    <div class="answer-name">
                        <img src="./data/img/${answers[1]}.jpg">
                    </div>
                    <div class="answer-name">
                        <img src="./data/img/${answers[2]}.jpg">
                    </div>
                    <div class="answer-name">
                        <img src="./data/img/${answers[3]}.jpg">
                    </div>
                    `
            };

            this.question = `Which is ${this.categoryAuthor} picture?`;
            this.categoryPictureToRenderString = this.categoryPicture(this.id, this.num, categoryData.pageCategoriesName);
            this.RightPictureTitle = categoryData.pageCategoriesName[this.id - 1][this.num].name;
            this.RightPictureAuthor = categoryData.pageCategoriesName[this.id - 1][this.num].author;
            this.RightPictureYear = categoryData.pageCategoriesName[this.id - 1][this.num].year;
            this.categoryAnswersToRenderString = this.categoryAnswersName();
            this.mainPictureTemplate = ``;

        }


        if (localStorage.getItem('timeGame') === 'On') {
            clearInterval(this.secondsLeftInterval);
            this.secondsForAnswer = JSON.parse(localStorage.getItem('secondsForAnswer'));
            this.secondsForAnswerLeft = this.secondsForAnswer;
        }

        this.categoryTopTemplate = `<div class="category-top">
                                        <div class="category-close"></div>
                                        <div class="time-game-bar">
                                           <input type="range" value="100" min="0" max="100" step="1" class="progress-time">
                                           <div class="time">${this.secondsForAnswerLeft}</div>
                                        </div>
                                    </div>`;

        this.modalsTemplate = ` <div class="congratulations">
                                    <a href="/" class="close"></a>
                                    <div class="congrat-cup"></div>
                                    <div class="congrat-text">Congratulations!</div>
                                    <div class="congratulations-score"></div>  
                                    <div class="congratsBtns">
                                        <a href="/" class="congrats-home">Home</a>
                                        <a href="/#/category?cat=${this.cat}&id=${+this.id + 1}" class="congrats-nextQuiz">NextQuiz</a>
                                    </div>
                                </div>
                                 
                                 <div class="grandResult">
                                    <div class="close"></div>
                                    <div class="stars"></div>
                                    <div class="grand-text">Grand<br>result</div>
                                    <div class="text-small">Congratulations!</div>
                                    <div class="grand-next">Next</div>
                                </div>
                                
                                <div class="gameover">
                                    <div class="close"></div>
                                    <div class="gameover-cup"></div>
                                    <div class="go-text">Game over</div>
                                    <div class="text-small">Play again?</div>
                                    <div class="gameover-btns">
                                        <a href="/" class="gameover-home">Cancel</a>
                                        <a href="" class="gameover-playagain">Yes</a>
                                    </div>
                                </div>
                                
                                <div class="confirm-exit">
                                    <div class="close"></div>
                                    <div class="confirm-text">Do you really want to quit the game?</div>
                                    <div class="confirm-btns">
                                        <a href="/" class="confirm-cancel">Cancel</a>
                                        <a href="" class="confirm-home">Yes</a>
                                    </div>
                                </div>`;
        this.footerTemplate = `<div class="footer">
                                    <div class="rsschool"></div>
                                    <div class="madeby">App developer: Alex Sokolov</div>
                                    <div class="year">2021</div>
                                </div>`;
        this.rightAnswerFormAuthorTemplate = `<div id="rightAnswerForm" class="popup">
                                                 <div class="picture">
                                                     ${this.categoryPictureToRenderString}
                                                     <div class="right-answer"></div>
                                                     <div class="wrong-answer"></div>
                                                 </div>
                                                 
                                                 <div class="picture-title">
                                                     ${this.RightPictureTitle}
                                                 </div>
                                                 <div class="picture-author">
                                                     ${this.RightPictureAuthor}
                                                 </div>
                                                 <div class="picture-year">
                                                     ${this.RightPictureYear}
                                                 </div>
                                                 <div class="btn-next">${this.popupBtn}</div>
                                            </div>`;

        return `
            <section id="category" class="section">
                ${this.categoryTopTemplate}
                <div class="question">${this.question}</div>
                <div class="category-main-container">
                    <div class="category-container">
                            ${this.mainPictureTemplate}
                        <div class="answers">
                            ${this.categoryAnswersToRenderString}
                        </div>
                    </div>
                </div>  
                ${this.footerTemplate}
            </section>
            ${this.rightAnswerFormAuthorTemplate}
            ${this.modalsTemplate}   
      `
    }

    async after_render(params) {
        this.parentNodeForLoading = document.getElementById('page_container');
        this.loading = document.createElement('div');
        this.loadingInstance = new Loading();
        this.loading.innerHTML = await this.loadingInstance.render();
        this.answerElement = document.querySelectorAll('.answer');
        this.answerElementPictures = document.querySelectorAll('.answer-name');
        this.nextBtn = document.querySelector('.btn-next');
        this.congrats = document.querySelector('.congratulations');
        this.congratsHome = document.querySelector('.congrats-home');
        this.congratsScore = document.querySelector('.congratulations-score')
        this.nextQuiz = document.querySelector('.congrats-nextQuiz');
        this.popUp = document.querySelector('.popup');
        this.rightAnswer = document.querySelector('.right-answer');
        this.wrongAnswer = document.querySelector('.wrong-answer');
        this.overlay = document.querySelector('.overlay');
        this.gameOver = document.querySelector('.gameover');
        this.gameOverHome = document.querySelector('.gameover-home');
        this.playAgain = document.querySelector('.gameover-playagain');
        this.grandResult = document.querySelector('.grandResult');
        this.grandNext = document.querySelector('.grand-next');
        this.categoryClose = document.querySelector('.category-close');
        this.confirmExit = document.querySelector('.confirm-exit');
        this.confirmExitClose = document.querySelector('.confirm-exit > .close');
        this.confirmCancel = document.querySelector('.confirm-cancel');
        this.confirmHome = document.querySelector('.confirm-home');
        this.timeGameBar = document.querySelector('.time-game-bar');
        this.progressTime = document.querySelector('.progress-time');
        this.timeLeft = document.querySelector('.time');

        this.secondsLeft = function (seconds) {
            this.secondsLeftInterval = setInterval(() => {
                if (seconds < 0) {
                    this.showPopUp('timeViolation');
                } else {
                    this.progressTime.value = seconds / this.secondsForAnswer * 100;
                    this.progressTime.style.background = `linear-gradient(to right, 
                                                  #ffbca2 0%,
                                                  #ffbca2 ${this.progressTime.value}%, 
                                                  #a4a4a4 ${this.progressTime.value}%, 
                                                  #a4a4a4 100%)`;
                    this.timeLeft.innerHTML = seconds < 10 ? "0" + seconds : seconds;
                    this.secondsForAnswerLeft = --seconds;

                }
            }, 1000)
        };

        if (localStorage.getItem('timeGame') === 'On') {
            if (!this.timeGameBar.classList.contains('time-active')) this.timeGameBar.classList.add('time-active')
            this.secondsLeft(this.secondsForAnswer);
        }

        if (params.get("cat") == 'authors') {
            this.answerElement.forEach((el) => {
                el.addEventListener('click', this.showPopUp.bind(this, el.textContent))
            });
        } else {
            this.answerElementPictures.forEach((el) => {
                el.addEventListener('click', this.showPopUp.bind(this, el.innerHTML.trim().slice(21, 24)))
            });
        }


        this.nextBtn.addEventListener('click', this.NextQuestionOrExit);
        this.congratsHome.addEventListener('click', this.goHome);
        this.gameOverHome.addEventListener('click', this.goHome);
        this.nextQuiz.addEventListener('click', this.goNextQuiz);
        this.grandNext.addEventListener('click', this.goNextQuiz);
        this.playAgain.addEventListener('click', this.goStartAgain);
        this.categoryClose.addEventListener('click', this.goConfirmExit);
        this.confirmExitClose.addEventListener('click', this.goConfirmClose);
        this.confirmCancel.addEventListener('click', this.goConfirmClose);
        this.confirmHome.addEventListener('click', this.goHome);


    };

    showPopUp = (answer) => {
        if (localStorage.getItem('timeGame') === 'On') {
            this.secondsForAnswerLeft = this.secondsForAnswer;
            clearInterval(this.secondsLeftInterval);
        }

        if (answer === this.right_answer) {
            this.rightAnswer.classList.add('active');
            this.correctAnswers[this.num] = true;
            ++this.totalRightAnswers;
        } else {
            this.wrongAnswer.classList.add('active');
            this.correctAnswers[this.num] = false;
        }
        if (this.category === 'Artist Quiz') {
            this.correctAnswers.forEach((el, index) => {
                this.artistsResults[this.id][index] = {
                    'res': el,
                    'data': categoryData.pageCategoriesAuthor[this.id - 1][index]
                };
            });
            localStorage.setItem('artistsResults', JSON.stringify(this.artistsResults));
            console.log(this.right_answer);
            console.log(answer);
        } else {
            this.correctAnswers.forEach((el, index) => {
                this.pictureResults[this.id][index] = {
                    'res': el,
                    'data': categoryData.pageCategoriesName[this.id - 1][index]
                };
            });
            localStorage.setItem('pictureResults', JSON.stringify(this.pictureResults));
            console.log(this.right_answer);
            console.log(answer);
        }

        this.popUp.classList.add('popUp-active');
        this.overlay.classList.add('overlay-fadeIn');
        return false;
    }

    NextQuestionOrExit = async () => {

        if (this.num == 9) {
            this.popUp.classList.remove('popUp-active');
            this.rightAnswer.classList.remove('active');
            this.wrongAnswer.classList.remove('active');
            this.overlay.classList.remove('overlay-fadeIn');
            localStorage.setItem(this.cat + this.id, this.totalRightAnswers);
            if (this.totalRightAnswers === 10) {
                return this.grandResultOpen();
            } else {
                return this.congratulationsOpen();
            }
        } else {
            this.wrongAnswer.classList.remove('active');
            this.overlay.classList.remove('overlay-fadeIn');
            this.popUp.classList.remove('popUp-active');
            this.rightAnswer.classList.remove('active');
            this.popUp.after(this.loading);
            setTimeout(this.goNextQuestion, 3000);
        }
    }

    congratulationsOpen = () => {
        this.congratsScore.textContent = `${this.totalRightAnswers}/10`;
        this.congrats.classList.add('popUp-active');
        this.overlay.classList.add('overlay-fadeIn');
        return false;
    }
    grandResultOpen = () => {
        this.grandResult.classList.add('popUp-active');
        this.overlay.classList.add('overlay-fadeIn');
        return false;
    }
    gameOverOpen = () => {
        this.parentNodeForLoading.removeChild(this.loading);
        this.gameOver.classList.add('popUp-active');
    }
    goConfirmExit = () => {
        if (localStorage.getItem('timeGame') === 'On') {
            clearInterval(this.secondsLeftInterval);
        }
        this.overlay.classList.add('overlay-fadeIn');
        this.confirmExit.classList.add('popUp-active');
    }
    goConfirmClose = (e) => {
        e.preventDefault();
        if (localStorage.getItem('timeGame') === 'On') {
            this.secondsLeft(this.secondsForAnswerLeft);
        }
        this.confirmExit.classList.remove('popUp-active');
        this.overlay.classList.remove('overlay-fadeIn');
    }

    goHome = (e) => {
        e.preventDefault();
        if (localStorage.getItem('timeGame') === 'On') {
            this.secondsForAnswerLeft = this.secondsForAnswer;
        }
        this.overlay.classList.remove('overlay-fadeIn');
        if (this.gameOver.classList.contains('popUp-active')) this.gameOver.classList.remove('popUp-active');
        if (this.congrats.classList.contains('popUp-active')) this.congrats.classList.remove('popUp-active');
        if (this.confirmExit.classList.contains('popUp-active')) this.confirmExit.classList.remove('popUp-active');
        this.popUp.after(this.loading);
        setTimeout(this.goToHomePage, 3000);
    }

    goNextQuiz = (e) => {
        e.preventDefault();
        this.overlay.classList.remove('overlay-fadeIn');
        this.congrats.classList.remove('popUp-active');
        this.grandResult.classList.remove('popUp-active');
        this.popUp.after(this.loading);
        if (this.id == 12) {
            this.gameOverOpen();
        } else {
            setTimeout(this.goNextQuizLocation, 3000);
        }

    }

    goStartAgain = (e) => {
        e.preventDefault();
        this.overlay.classList.remove('overlay-fadeIn');
        this.gameOver.classList.remove('popUp-active');
        this.popUp.after(this.loading);
        setTimeout(this.goToFirst, 3000);
    }


    goNextQuizLocation = () => {
        this.correctAnswers = [];
        this.totalRightAnswers = 0;
        location.hash = `/category?cat=${this.cat}&id=${+this.id + 1}`
    }

    goNextQuestion = () => {
        location.hash = `/category?cat=${this.cat}&id=${this.id}&num=${++this.num}`
    }
    goToFirst = () => {
        this.correctAnswers = [];
        this.totalRightAnswers = 0;
        location.hash = `/category?cat=${this.cat}&id=1`
    }
    goToHomePage = () => {
        this.correctAnswers = [];
        this.totalRightAnswers = 0;
        location.hash = `/`
    }

}
