import '../index.css';

export default function QuestionContainer({readyToFinalize, handleFinalize, handleNext, finalized, kana, children}) {
    
    // calculate the size of the question font
    // calculated based on text length
    // max size is 100px
    const fontSizeLarge = Math.floor(Math.min(100, 540 / children.length));
    // use a different size if on mobile
    console.log(window.innerWidth);
    const fontSizeMobile = Math.floor(Math.min(100, 300 / children.length));
    // set the actual font size based on the size of the screen
    const fontSize = (window.innerWidth < 700) ? fontSizeMobile : fontSizeLarge;
    
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