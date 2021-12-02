import CategoriesHTML from './Categories.html';
import './Categories.scss';
import {CategoryData} from "../../components/CategoryData";
import Utils from "../../utils/Utils";

const categoryData = new CategoryData();

export class Categories {
    constructor() {
        this.num = 0;
        this.cat = 1;
        this.catLink = 2;
        this.category = 'Artist Quiz';
        this.score = {};
        this.outScore = '';
        this.passedTask = '';
        this.key = 0;

    };

    async render(params) {

        if (params.get("cat") == 1) {
            this.category = 'Artist Quiz';
            this.cat = 1;
            this.catLink = 2;
            this.categoriesToRenderAuthor = categoryData.pageCategoriesAuthor.map((pageCategory, index) => {
                this.key = index + 1;
                Utils.getLocalStorage('authors' +  this.key, this.score);
                if (this.score.value > 0){
                    this.outScore = this.score.value + '/10';
                    this.passedTask = 'passed';
                    this.score.value = 0
                }
                else {
                    this.score.value = 0
                    this.outScore = '';
                    this.passedTask = '';
                }
                return `
                    <div class="categories-container">
                        <div class="categories-info">
                            <div class="categories-title">${categoryData.artistsCategoryTitles[index]}</div>
                            <div class="categories-score">${this.outScore}</div>
                        </div>
                        <div class="categories-img ${this.passedTask}">
                          <a href="#/category?cat=authors&id=${index+1}">
                             <img src="./data/img/${pageCategory[0].imageNum}.jpg" title="${pageCategory[0].name}" alt="${pageCategory[0].name}" >
                          </a>
                        </div>
                    </div>
                    `
            });

            this.categoriesToRenderString = this.categoriesToRenderAuthor.reduce((x, y) => x + y);
        }
        if (params.get("cat") == 2) {
            this.category = 'Picture Quiz';
            this.cat = 2;
            this.catLink = 1;
            this.categoriesToRenderName = categoryData.pageCategoriesName.map((pageCategory, index) => {
                this.key = index + 1;
                Utils.getLocalStorage('names' +  this.key, this.score);
                if (this.score.value > 0){
                    this.outScore = this.score.value + '/10';
                    this.passedTask = 'passed';
                }
                else {
                    this.outScore = '';
                    this.passedTask = '';
                }
                return `
                    <div class="categories-container">
                      <div class="categories-info">
                        <div class="categories-title">${categoryData.artistsCategoryTitles[index]}</div>
                        <div class="categories-score">${this.outScore}</div>
                      </div>
                      <div class="categories-img ${this.passedTask}">
                        <a href="#/category?cat=name&id=${index+1}">
                          <img src="./data/img/${pageCategory[0].imageNum}.jpg" 
                                                                 title="${pageCategory[0].name}" 
                                                                 alt="${pageCategory[0].name}">
                        </a>
                      </div>
                    </div>
                    `
            });
            this.categoriesToRenderString = this.categoriesToRenderName.reduce((x, y) => x + y);
        }

        return `
                <section id="categories" class="section">${location.origin + location.hash}
                    <a href="#/settings?from=${location.origin + location.hash}" class="settings"></a>
                    <a href="/" class="logo2"></a>
                    <div class="categories-page-title">${this.category}</div>
                        <div class="categories-main-container">
                            ${this.categoriesToRenderString}
                        </div>
                    <div class="categories-footer">
                        <a href="/" class="btn-home"></a>
                        <a href="#/categories?cat=${this.catLink}" class="btn-categories"></a>
                        <a href="#/score" class="btn-score"></a>
                    </div>
                </section>
                `
    }

    async after_render() {
    };
}
