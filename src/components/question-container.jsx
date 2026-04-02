import '../index.css';

export default function QuestionContainer({readyToFinalize, handleFinalize, handleNext, finalized, children}) {
    return (
        <>
            <div className="question-container">
                <div className="question-kanji japanese">
                    <div className="question-text">{children}</div>
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
                        className={(readyToFinalize ? "ready-to-submit" : "not ready") + "english"}
                    >
                        Finalize Answers
                    </button>
                )}
                
            </div>
        </>
    );
}