import CategoryHTML from './Category.html';
import './Category.scss';
import {CategoryData} from "../../components/CategoryData";
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

        this.categoryPicture = (id, num) =>{
                return `<img src="./data/img/${categoryData.pageCategoriesAuthor[id-1][num].imageNum}.jpg" 
                            title="${categoryData.pageCategoriesAuthor[id-1][num].name}" 
                            alt="${categoryData.pageCategoriesAuthor[id-1][num].name}">   
                   `}
        this.categoryAnswers = (id, num) => {
            const answers=[];
            let uniqueAuthor;
            answers.push(this.right_answer);
            for (let i=0; i<3;){
                uniqueAuthor = categoryData.answers.answersByAuthor[getRandom(categoryData.answers.answersByAuthor.length)]
                if (uniqueAuthor !== this.right_answer){
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
            this.right_answer = categoryData.pageCategoriesAuthor[this.id-1][this.num].author;
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
                     ${categoryData.pageCategoriesAuthor[this.id-1][this.num].name}
                 </div>
                 <div class="picture-author">
                     ${categoryData.pageCategoriesAuthor[this.id-1][this.num].author}
                 </div>
                 <div class="picture-year">
                     ${categoryData.pageCategoriesAuthor[this.id-1][this.num].year}
                 </div>
                 <div class="btn-next">${this.popupBtn}</div>
            </div>
            
            <div class="congratulations">
                <a href="/" class="close"></a>
                <div class="congrat-cup"></div>
                <div class="congrat-text">Congratulations!</div>
                <div class="congratulations-score">${this.totalRightAnswers}/10</div>
                
                <div class="congratsBtns">
                    <a href="/" class="congrats-home">Home</a>
                    <a href="/#/category?cat=${this.cat}&id=${+this.id+1}" class="congrats-nextQuiz">NextQuiz</a>
                </div>
            </div>
             
             <div class="grandResult">
                <div class="close"></div>
                <div class="stars"></div>
                <div class="grand-text"></div>
                <div class="text-small"></div>
                <div class="grand-next">Next</div>
            </div>
            
            <div class="gameOver">
                <div class="close"></div>
                <div class="cup"></div>
                <div class="go-text"></div>
                <div class="text-small"></div>
                <div class="congratsBtns">
                    <a href="/" class="home">Cancel</a>
                    <a href="" class="nextQuiz">Yes</a>
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
        this.answerElement = document.querySelectorAll('.answer');
        this.nextBtn = document.querySelector('.btn-next');
        this.congratsHome = document.querySelector('.congrats-home');
        this.nextQuiz = document.querySelector('.congrats-nextQuiz');
        this.popUp = document.querySelector('.popup');
        this.rightAnswer = document.querySelector('.right-answer');
        this.wrongAnswer = document.querySelector('.wrong-answer');
        this.overlay = document.querySelector('.overlay');

        if (params.get("cat") == 'authors') {
            this.answerElement.forEach( (el) => {
                el.addEventListener('click', this.showPopUp.bind(this, el.textContent))
            })
            this.nextBtn.addEventListener('click', this.NextQuestionOrExit)
            this.congratsHome.addEventListener('click', this.goHome)
            this.nextQuiz.addEventListener('click', this.goNextQuiz)
        }
    };

    showPopUp = (answer) => {

        if (answer === this.right_answer){
            this.rightAnswer.classList.add('active');
            this.correctAnswers.push(true);
            this.totalRightAnswers++;
        }

        else {
            this.wrongAnswer.classList.add('active');
            this.correctAnswers.push(false);
        }

        this.popUp.classList.add('popUp-active');
        this.overlay.classList.add('overlay-fadeIn');
        return false;
    }

    NextQuestionOrExit = () => {
        const popUp = document.querySelector('.popup');
        const rightAnswer = document.querySelector('.right-answer');
        const wrongAnswer = document.querySelector('.wrong-answer');
        const overlay = document.querySelector('.overlay');

       if (this.num == 9){
            popUp.classList.remove('popUp-active');
            rightAnswer.classList.remove('active');
            wrongAnswer.classList.remove('active');
            overlay.classList.remove('overlay-fadeIn');
            const taskInfo = this.cat + this.id;
            Utils.setLocalStorage(taskInfo, this.totalRightAnswers);

            if (this.id === 12) {
                return this.gameOverOpen();
            }

            if (this.totalRightAnswers === 10) {
                return this.grandResultOpen();
            }
            else{
                return this.congratulationsOpen();
            }

            location.hash = `/categories?cat=${this.catNum}`;
        }
        else {
            popUp.classList.remove('popUp-active');
            rightAnswer.classList.remove('active');
            wrongAnswer.classList.remove('active');
            overlay.classList.remove('overlay-fadeIn');
            location.hash = `/category?cat=${this.cat}&id=${this.id}&num=${++this.num}`
        }
    }

    congratulationsOpen = () => {
        console.log("Congrats");
        const congrats = document.querySelector('.congratulations');
        congrats.classList.add('popUp-active');
        const overlay = document.querySelector('.overlay');
        overlay.classList.add('overlay-fadeIn');
        return false;
    }
    grandResultOpen = () => {
        const grandResult = document.querySelector('.grandResult');
        grandResult.classList.add('popUp-active');
    }
    gameOverOpen = () => {
        const gameOver = document.querySelector('.gameOver');
        gameOver.classList.add('popUp-active');
            }
    goHome = () => {
        const overlay = document.querySelector('.overlay');
        overlay.classList.remove('overlay-fadeIn');
    }
    goNextQuiz = (e) => {
        e.preventDefault()
        const overlay = document.querySelector('.overlay');
        overlay.classList.remove('overlay-fadeIn');
        const congrats = document.querySelector('.congratulations');
        congrats.classList.remove('popUp-active');
    }


}
