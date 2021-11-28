import CategoryHTML from './Category.html';
import './Category.scss';
import {CategoryData} from "../../components/CategoryData";
import {Loading} from "../../components/Loading";
import Utils from '../../utils/Utils';

const categoryData = new CategoryData();
const getRandom = (max) => {
    return Math.floor(Math.random() * max);
}
const shuffledArray = (arr) => arr.sort((a, b) => 0.5 - Math.random());

export class Category {
    constructor() {
        this.num = 0;
        this.id = 1;
        this.category = 'Artist Quiz';
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
            localStorage.setItem('artistsResults', JSON.stringify(this.initialResults));
        }
        this.pictureResults = JSON.parse(localStorage.getItem('pictureResults'));
        this.artistsResults = JSON.parse(localStorage.getItem('artistsResults'));
        this.categoryPicture = (id, num) => {
            return `<img src="./data/img/${categoryData.pageCategoriesAuthor[id - 1][num].imageNum}.jpg" 
                            title="${categoryData.pageCategoriesAuthor[id - 1][num].name}" 
                            alt="${categoryData.pageCategoriesAuthor[id - 1][num].name}">   
                   `
        }
        this.categoryAnswers = (id, num) => {
            const answers = [];
            let uniqueAuthor;
            answers.push(this.right_answer);
            for (let i = 0; i < 3;) {
                uniqueAuthor = categoryData.answers.answersByAuthor[getRandom(categoryData.answers.answersByAuthor.length)]
                if (uniqueAuthor !== this.right_answer) {
                    answers.push(uniqueAuthor);
                    i++;
                }
            }
            shuffledArray(answers);
            return `
                    <div class="answers">
                        <div class="answer">${answers[0]}</div>
                        <div class="answer">${answers[1]}</div>
                        <div class="answer">${answers[2]}</div>
                        <div class="answer">${answers[3]}</div>
                    </div> 
                    `
        }
    };

    async render(params) {

        if (params.get("cat") == 'authors') {
            this.category = 'Artist Quiz';
            this.cat = 'authors';
            this.catNum = 1;
            this.id = params.get("id") || 1;
            this.num = params.get("num") || 0;
            this.popupBtn = (this.num != 9) ? `Next` : 'The End';
            this.right_answer = categoryData.pageCategoriesAuthor[this.id - 1][this.num].author;
            this.question = 'Who is the author of this picture?'
            this.categoryPictureToRenderString = this.categoryPicture(this.id, this.num);
            this.categoryAnswersToRenderString = this.categoryAnswers(this.id, this.num);

            return `
            <section id="category" class="section">
                <div class="audioplayer"></div>
                <div class="question">${this.question}</div>
                <div class="category-main-container">
                    <div class="category-container">
                        <div class="picture">
                            ${this.categoryPictureToRenderString}
                        </div>
                        <div class="answers">
                            ${this.categoryAnswersToRenderString}
                        </div>
                    </div>
                </div>  
                <div class="footer">
                    <div class="rsschool"></div>
                    <div class="madeby">App developer: Alex Sokolov</div>
                    <div class="year">2021</div>
                </div>
            </section>
            <div id="rightAnswerForm" class="popup">
                 <div class="picture">
                     ${this.categoryPictureToRenderString}
                     <div class="right-answer"></div>
                     <div class="wrong-answer"></div>
                 </div>
                 
                 <div class="picture-title">
                     ${categoryData.pageCategoriesAuthor[this.id - 1][this.num].name}
                 </div>
                 <div class="picture-author">
                     ${categoryData.pageCategoriesAuthor[this.id - 1][this.num].author}
                 </div>
                 <div class="picture-year">
                     ${categoryData.pageCategoriesAuthor[this.id - 1][this.num].year}
                 </div>
                 <div class="btn-next">${this.popupBtn}</div>
            </div>
            
            <div class="congratulations">
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
      `
        }
        if (params.get("cat") == 'name') {
            this.category = 'Picture Quiz';
            this.cat = 'name';
            this.id = params.get("id") || 1;
            this.catLink = 1;
            this.categoriesToRenderString = this.categoriesToRenderName.reduce((x, y) => x + y);
        }
    }

    async after_render(params) {
        this.parentNodeForLoading = document.getElementById('page_container');
        this.loading = document.createElement('div');
        this.loadingInstance = new Loading();
        this.loading.innerHTML = await this.loadingInstance.render();
        this.answerElement = document.querySelectorAll('.answer');
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



        if (params.get("cat") == 'authors') {
            this.answerElement.forEach((el) => {
                el.addEventListener('click', this.showPopUp.bind(this, el.textContent))
            });
            this.nextBtn.addEventListener('click', this.NextQuestionOrExit);
            this.congratsHome.addEventListener('click', this.goHome);
            this.gameOverHome.addEventListener('click', this.goHome);
            this.nextQuiz.addEventListener('click', this.goNextQuiz);
            this.grandNext.addEventListener('click', this.goNextQuiz);
            this.playAgain.addEventListener('click', this.goStartAgain);
        }
    };

    showPopUp = (answer) => {
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
                this.pictureResults[this.id][index] = {
                    'res': el,
                    'data': categoryData.pageCategoriesAuthor[this.id - 1][index]
                };
            });
            localStorage.setItem('pictureResults', JSON.stringify(this.pictureResults));
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
            const taskInfo = this.cat + this.id;
            localStorage.setItem(taskInfo, this.totalRightAnswers);
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

    goHome = (e) => {
        e.preventDefault();
        this.overlay.classList.remove('overlay-fadeIn');
        this.gameOver.classList.remove('popUp-active');
        this.congrats.classList.remove('popUp-active');
        this.popUp.after(this.loading);
        setTimeout(this.goToHomePage, 3000);
    }

    goNextQuiz = (e) => {
        e.preventDefault()
        this.overlay.classList.remove('overlay-fadeIn');
        this.congrats.classList.remove('popUp-active');
        this.grandResult.classList.remove('popUp-active');
        this.popUp.after(this.loading);
        if (this.id == 12) {
            this.gameOverOpen();
        }
        else {
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
        location.hash = `/category?cat=${this.cat}&id=${+this.id + 1}`
    }

    goNextQuestion = () => {
        location.hash = `/category?cat=${this.cat}&id=${this.id}&num=${++this.num}`
    }
    goToFirst = () => {
        location.hash = `/category?cat=${this.cat}&id=1`
    }
    goToHomePage = () => {
        location.hash = `/`
    }

}
