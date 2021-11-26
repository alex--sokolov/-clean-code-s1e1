import CategoryElement from './CategoryData.html';
import {images} from "../../../data/images";

export class CategoryData {
    constructor() {
        // this.splitArr = (arr, chunks) => [
        //     ...Array(chunks),
        // ].map((_, c) => arr.filter((n, index) => index % chunks === c));

        this.splitArr = (arr, size) =>
            arr
                .reduce((acc, _, i) =>
                        (i % size)
                            ? acc
                            : [...acc, arr.slice(i, i + size)]
                    , [])


        this.questionsByAuthor = images.slice(0, 120);
        this.questionsByName = images.slice(120,240);
        this.artistsCategoryTitles = ['Portrait', 'Landscape', 'Still Life', 'Graphic', 'Antique', 'Avant-garde', 'Renaissance',
            'Surrealism', 'Kitch', 'Minimalism', 'Avangard', 'Industrial']
        this.uniqAnswersByAuthor = [...new Set(this.questionsByAuthor.map(item => item.author))]
        this.uniqAnswersByName = [...new Set(this.questionsByName.map(item => item.author))];

        this.newQuestionsByAuthor = this.splitArr(this.questionsByAuthor, 10);
        this.newQuestionsByName = this.splitArr(this.questionsByName, 10);
        this.answers = {
            answersByAuthor: this.uniqAnswersByAuthor,
            answersByName: this.uniqAnswersByName
        }
        this.questions = {
            questionsByAuthor: this.newQuestionsByAuthor,
            questionsByName: this.newQuestionsByName,
        }
        this.pageCategoriesAuthor = this.questions['questionsByAuthor'];
        this.pageCategoriesName = this.questions['questionsByName'];


    }
    async render() {
        return CategoryElement;
    }

    async after_render() {
    };
}
