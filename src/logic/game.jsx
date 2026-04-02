import { useCallback, useEffect, useState } from 'react';
import GameComponent from '../components/game-component';
import QuestionContainer from '../components/question-container';
import AnswerChoices from '../components/answer-choices';
import wordList from '../wordList.json';

/*TODO:
    
    Create a tracking system for the win vs lose statistics, also separated in terms of english and japanese

Other nonessential goals:
    Create a start screen
    Change layout depending on screen size and shape
    Create a screen to add new words while in the app
    Decrease the font size of the english answers when applicable **Might not be necessary** - the box already auto extends to a certain point
*/

const loadWordsFromJSON = (wordList) => {
    let words = [];
    for (let i = 0; i < wordList.words.length; i++) {
        words.push(wordList.words[i]);
    }
    return words;
}

const shuffleCards = (cards) => {
    return [...cards].sort(() => Math.random() - 0.5);
}

const generateOptions = (correct, possibleChoices) => {
    const incorrect = possibleChoices.filter((choice) => choice.kana !== correct.kana && choice.english !== correct.english);
    return shuffleCards([correct, ...shuffleCards(incorrect).slice(0, 4)]);
}

const FULL_DECK = loadWordsFromJSON(wordList);

export default function Game() {

    const [numCards, setNumCards] = useState(10);
    const [deck, setDeck] = useState(shuffleCards(FULL_DECK).slice(0, numCards));
    const [answersKana, setAnswersKana] = useState([]);
    const [answersEnglish, setAnswersEnglish] = useState([]);
    const [deckIndex, setDeckIndex] = useState(0);
    const [chosenKana, setChosenKana] = useState(null);
    const [chosenEnglish, setChosenEnglish] = useState(null);
    const [hasKanji, setHasKanji] = useState(true);
    const [readyToFinalize, setReadyToFinalize] = useState(false);
    const [finalized, setFinalized] = useState(false);
    const [done, setDone] = useState(false);

    const loadCard = useCallback((i) => {
        setAnswersKana(generateOptions(deck[i], FULL_DECK));
        setAnswersEnglish(generateOptions(deck[i], FULL_DECK));
        setChosenKana(null);
        setChosenEnglish(null);
        setFinalized(false);
        setHasKanji(deck[i].kanji !== "");
    }, [deck]);

    useEffect(() => {loadCard(0);}, [loadCard]);

    useEffect(() => {
        if (!hasKanji && chosenEnglish) setReadyToFinalize(true);
        else if (hasKanji && chosenKana && chosenEnglish) setReadyToFinalize(true);
        else setReadyToFinalize(false);
    }, [hasKanji, chosenEnglish, chosenKana]);

    const handleSelectKana = (option) => {
        if (finalized) return;
        setChosenKana(option);
    }

    const handleSelectEnglish = (option) => {
        if (finalized) return;
        setChosenEnglish(option);
    }

    const finalizeAnswers = () => {
        if (readyToFinalize) setFinalized(true);
    }

    const nextCard = () => {
        if (!finalized) return;
        if (deckIndex + 1 >= deck.length) setDone(true);
        else {
            setDeckIndex(i => i + 1);
            loadCard(deckIndex + 1);
        }
    }

    const restart = () => {
        setDeck(shuffleCards(FULL_DECK).slice(0, numCards));
        loadCard(0);
    }

    return (
        <GameComponent>
            <QuestionContainer 
                readyToFinalize={readyToFinalize}
                handleFinalize={finalizeAnswers}
                handleNext={nextCard}
                finalized={finalized}
            >
                {hasKanji ? deck[deckIndex].kanji : deck[deckIndex].kana}
            </QuestionContainer>
            {hasKanji && (
                <AnswerChoices 
                    answers={answersKana}
                    kana={true}
                    chosen={chosenKana}
                    finalized={finalized}
                    correct={deck[deckIndex]}
                    handleSelect={handleSelectKana}
                />
            )}
            
            <AnswerChoices 
                answers={answersEnglish}
                kana={false}
                chosen={chosenEnglish}
                finalized={finalized}
                correct={deck[deckIndex]}
                handleSelect={handleSelectEnglish}
            />
        </GameComponent>
    );
}