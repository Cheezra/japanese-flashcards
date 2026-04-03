import '../index.css';

export default function QuestionContainer({readyToFinalize, handleFinalize, handleNext, finalized, kana, children}) {
    
    // calculate the size of the question font
    // calculated based on text length
    // max size is 100px
    const fontSize = Math.floor(Math.min(100, 540 / children.length));
    
    return (
        <>
            <div className="question-container">
                <div className={`question-${kana ? "kana" : "kanji"} japanese`}>
                    <div className="question-text" style={{fontSize: fontSize}}>{children}</div>
                </div>
                {finalized ? (
                    <button 
                        id='next-button'
                        className='next-button english'
                        onClick={() => handleNext()}
                    >
                        Next Card
                    </button>
                ) : (
                    <button 
                        id='finalize-button'
                        onClick={() => handleFinalize()}
                        className="finalize-button english"
                        disabled={!readyToFinalize}
                    >
                        Finalize Answers
                    </button>
                )}
                
            </div>
        </>
    );
}