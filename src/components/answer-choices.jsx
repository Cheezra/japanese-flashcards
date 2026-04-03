import '../index.css';
import { Word } from '../data/word';

const answerState = (opt, chosen, correct, finalized) => {
    if (!finalized) {
        if (Word.isEqual(chosen, opt)) return "chosen";
    }
    else {
        if (Word.isEqual(opt, correct)) return "correct";
        if (Word.isEqual(opt, chosen) && !Word.isEqual(chosen, correct)) return "incorrect";
    }

    return "";
}

export default function AnswerChoices({answers, kana, chosen, finalized, correct, handleSelect}) {
    return(
        <div className="answer-container">
            <h2 className="prompt english">{kana ? "Select the correct kana reading" : "Select the correct english meaning"}</h2>
            <div className="answer-box">
                {answers.map((opt, i) => (
                    <button 
                        key={kana ? opt.kana : opt.english}
                        onClick={() => handleSelect(opt)}
                        className={`answer ${answerState(opt, chosen, correct, finalized)} ${kana ? " japanese" : " english"}`}
                        disabled={finalized}
                    >
                        {kana ? opt.kana : opt.english}
                    </button>
                ))}
            </div>
        </div>
    );
}