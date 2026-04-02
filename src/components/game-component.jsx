import '../index.css';

export default function GameComponent({children}) {
    return (
        <>
            <div className="game-component">
                {children}
            </div>
        </>
    )
}