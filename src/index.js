import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import wordList from './wordList.json';
import { Textfit } from 'react-textfit' // https://www.npmjs.com/package/react-textfit for instructions

/*TODO:
    
    Create a tracking system for the win vs lose statistics, also separated in terms of english and japanese

Other nonessential goals:
    Create a start screen
    Change layout depending on screen size and shape
    Create a screen to add new words while in the app
    Decrease the font size of the english answers when applicable **Might not be necessary** - the box already auto extends to a certain point
*/
class Word {

    constructor(kanji, kana, english) {
        this.kanji = kanji;
        this.kana = kana;
        this.english = english;
    }

    getKanji() {
        return this.kanji;
    }

    getKana() {
        return this.kana;
    }

    getEnglish() {
        return this.english;
    }

    static getAnswerChoices(Words, answerIndex, japanese, numChoices) {
        /*let result = [];
        let usedIndices = [];

        //choose a random spot for the correct answer
        let correctIndex = Math.floor(Math.random() * 5);
        result[correctIndex] = (japanese ? Words[answerIndex].getKana() : Words[answerIndex].getEnglish());
        usedIndices.push(answerIndex);

        console.log("correct index = " + correctIndex + " " + japanese);

        //fill in the other spaces
        let j = 0;
        for (let i = 0; i < 4; i++) {
            //choose a random number from the possible choices
            let currentIndex = Math.floor(Math.random() * 5);
            while (usedIndices.includes(currentIndex)) 
            {
                currentIndex = Math.floor(Math.random() * 5);
            }

            console.log("current index = " + currentIndex + " " + japanese);
            console.log(answerIndex + " = " + currentIndex);

            if (j === correctIndex) j++;
            console.log(j);
            result[j++] = (japanese ? Words[currentIndex].getKana() : Words[currentIndex].getEnglish());
            usedIndices.push(currentIndex);
        }

        return result;*/
        // ^ inefficient randomization ^
        // v much better verion v

        //create a copy of the words array
        let wordsCopy = Words.slice();
        //create an array to return
        let result = [];

        //find an index of the result array for the correct answer
        let resultAnswerIndex = Math.floor(Math.random() * numChoices);
        wordsCopy.splice(answerIndex, 1);

        //fill the rest of the result array with random values
        //taken from the wordsCopy array
        for (let i = 0; i < numChoices; i++) {

            //insert the answer at the appropriate position
            if (i === resultAnswerIndex) {
                result.push(japanese ? Words[answerIndex].getKana() : Words[answerIndex].getEnglish());
                continue;
            }

            //find a random value from the wordsCopy array
            let randomIndex = Math.floor(Math.random() * wordsCopy.length);
            //insert the value into the result array
            result.push(japanese ? wordsCopy[randomIndex].getKana() : wordsCopy[randomIndex].getEnglish());
            //remove the used value from the wordsCopy array
            wordsCopy.splice(randomIndex, 1);
        }

        return result;
    }

    static findCorrectIndex(words, answerChoices, answerIndex, japanese) {

        let correctIndex = -1;

        for (let i = 0; i < answerChoices.length; i++) {

            if ((japanese ? words[answerIndex].getKana() : words[answerIndex].getEnglish()) === answerChoices[i]) {
                correctIndex = i;
                break;
            }

        }

        return correctIndex;

    }

    static loadWordsFromJSONFile(file) {

        let words = [];

        for (let i = 0; i < file.words.length - 1; i++) {
            let newWord = new Word(file.words[i].kanji, file.words[i].kana, file.words[i].english);
            words.push(newWord);
        }

        return words;

    }

}

class AnswerChoices extends React.Component {

    render() {
        let choices = [];

        for (let i = 0; i < this.props.answers.length; i++) {

            let buttonClass = "answer";
            if (this.props.finalized) {
                if (this.props.correctIndex === i) buttonClass += "-correct";
                if (this.props.chosen === i && this.props.chosen !== this.props.correctIndex) buttonClass += "-incorrect";
            } else {
                if (this.props.chosen === i) buttonClass += "-chosen";
            }

            buttonClass += this.props.japanese ? " japanese" : " english";

            choices.push(
                <button 
                    key={this.props.answers[i]} 
                    className={buttonClass}
                    onClick={() => this.props.onClick(i, this.props.japanese)}
                >
                    {this.props.answers[i]}
                </button>
            );
        }

        return choices;
    }

}

class Game extends React.Component {

    constructor(props) {
        super(props);

        let words = Word.loadWordsFromJSONFile(wordList);
        let answerIndex = Math.floor(Math.random() * words.length);
        let answersEnglish = Word.getAnswerChoices(words, answerIndex, false, 5);
        let answersKana = Word.getAnswerChoices(words, answerIndex, true, 5);

        this.state = {
            words: words,
            answersKana: answersKana,
            answersEnglish: answersEnglish,
            answerIndex : answerIndex,
            chosenAnswers: [-1, -1],
            finalized: false,
            readyToFinalize: false,
        };
    }

    handleClick(index, japanese) {

        if (!this.state.finalized) {
            let japaneseInt = 1;
            if (japanese) japaneseInt = 0;
    
            let chosenAnswersCopy = this.state.chosenAnswers.slice();
            chosenAnswersCopy[japaneseInt] = index;
    
            let readyToFinalize = false;
            let kanji = this.state.words[this.state.answerIndex].getKanji();
            if (kanji !== "" && chosenAnswersCopy[0] !== -1 && chosenAnswersCopy[1] !== -1) readyToFinalize = true;
            if (kanji === "" && chosenAnswersCopy[1] !== -1) readyToFinalize = true;
    
            this.setState({
                chosenAnswers: chosenAnswersCopy,
                readyToFinalize: readyToFinalize,
            });
        }
    }

    finalizeAnswers() {
        this.setState({
            finalized: true,
        });
    }

    toNextQuestion() {

        let answerIndex = Math.floor(Math.random() * this.state.words.length);
        let answersEnglish = Word.getAnswerChoices(this.state.words, answerIndex, false, 5);
        let answersKana = Word.getAnswerChoices(this.state.words, answerIndex, true, 5);

        this.setState({
            answersKana: answersKana,
            answersEnglish: answersEnglish,
            answerIndex: answerIndex,
            chosenAnswers: [-1, -1],
            finalized: false,
            readyToFinalize: false,
        });

    }

    render() {

        //determine the type of question
        let kanji = this.state.words[this.state.answerIndex].getKanji();
        let kana = this.state.words[this.state.answerIndex].getKana();
        if (kanji !== "") {

            return (
                <div className="game">
                    <div className="question-container">
                        <div className="question-kanji japanese">
                            <Textfit mode="single" max="200" className="question-text">
                                {kanji}
                            </Textfit>
                        </div>
                        <button
                            id="finalize-button"
                            className={(this.state.readyToFinalize ? "ready-to-submit" : "not-ready") + " english"}
                            onClick={!this.state.finalized && this.state.readyToFinalize ? () => this.finalizeAnswers() : (this.state.finalized ? () => this.toNextQuestion() : null)}
                        >
                            {this.state.finalized ? "Continue" : "Finalize Answers"}
                        </button>
                    </div>
                    <div className="answer-container">
                        <div className="answer-box">
                            <h2 className="prompt">Choose one of these:</h2>
                            <AnswerChoices
                                answers={this.state.answersKana}
                                japanese={true}
                                onClick={(index) => this.handleClick(index, true)}
                                chosen={this.state.chosenAnswers[0]}
                                finalized={this.state.finalized}
                                correctIndex={Word.findCorrectIndex(this.state.words, this.state.answersKana, this.state.answerIndex, true)}
                            />
                        </div>
                        <div className="answer-box">
                            <h2 className="prompt">Choose one of these:</h2>
                            <AnswerChoices 
                                answers={this.state.answersEnglish}
                                japanese={false}
                                onClick={(index) => this.handleClick(index, false)}
                                chosen={this.state.chosenAnswers[1]}
                                finalized={this.state.finalized}
                                correctIndex={Word.findCorrectIndex(this.state.words, this.state.answersEnglish, this.state.answerIndex, false)}
                            />
                        </div>
                    </div>
                </div>
            );
        } else {

            return (
                <div className="game">
                    <div className="question-container">
                        <div className="question-kana japanese">
                            <Textfit mode="single" max="200" className="question-text">
                                {kana}
                            </Textfit>
                        </div>
                        <button
                            id="finalize-button"
                            className={(this.state.readyToFinalize ? "ready-to-submit" : "not-ready") + " english"}
                            onClick={!this.state.finalized && this.state.readyToFinalize ? () => this.finalizeAnswers() : (this.state.finalized ? () => this.toNextQuestion() : null)}
                        >
                            {this.state.finalized ? "Continue" : "Finalize Answer"}
                        </button>
                    </div>
                    <div className="answer-container">
                        <div className="answer-box">
                            <h2 className="prompt">Choose one of these:</h2>
                            <AnswerChoices
                                answers={this.state.answersEnglish}
                                japanese={false}
                                onClick={(index) => this.handleClick(index, false)}
                                chosen={this.state.chosenAnswers[1]}
                                finalized={this.state.finalized}
                                correctIndex={Word.findCorrectIndex(this.state.words, this.state.answersEnglish, this.state.answerIndex, false)}
                            />
                        </div>
                    </div>
                </div>
            );

        }
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById("root")
);