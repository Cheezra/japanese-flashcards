export default function ProgressBar({progress, index, numCards}) {
    // progress is an int from 0 - 100
    // represents the percentage of questions completed
    return (
        <>
            <div className="progress-counter english">
                {/* pad the index value with 0's depending on the total number of cards */}
                {String(index + 1).padStart(String(numCards).length, "0") + "/" + String(numCards).padStart(2, "0")}
            </div>
            <div className="progress-track">
                <div className="progress-fill" style={{width: `${progress}%`}} />
            </div>
        </>
    );
}