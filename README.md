# Japanese Flashcards

A React application for practicing Japanese vocabulary in a flashcard format. Each round displays a Japanese word (in kanji or kana) and challenges the user to identify the correct reading and English translation from multiple-choice answers.

### Necessary Knowledge

The application assumes that the user can read both types of kana (hiragana and katakana). There are several methods to learn how to read these quickly, such as Duolingo or Japanese learning textbooks.

## How It Works

- A Japanese word is displayed prominently on the flashcard. It will display in **kanji** if it exists, and in **kana** otherwise
- If the word has kanji, the user must select **both** the correct kana reading and the correct English translation from two separate sets of 5 choices
![Flashcard page showing kanji and both selection boxes](https://github.com/Cheezra/japanese-flashcards/blob/main/assets/README1.png)
- If the word is kana-only, the user selects only the correct **English translation** from one set of choices
![Flashcard page showing kana and only one selection box](https://github.com/Cheezra/japanese-flashcards/blob/main/assets/README2.png)
- Once all required answers are selected, the **Finalize Answers** button activates
![Flashcard page showing an activated 'Finalize Answers' button](https://github.com/Cheezra/japanese-flashcards/blob/main/assets/README3.png)
- After finalizing, correct and incorrect choices are color-highlighted and the user can advance to the next question
![Flashcard page showing color-highlighted feedback](https://github.com/Cheezra/japanese-flashcards/blob/main/assets/README4.png)

Answer choices are randomly shuffled each round, with the correct answer placed at a random position among the incorrect answers.

## Project Structure

```
src/
├── index.js                  # App entry point
├── index.css                 # Global styles and CSS variables
├── wordList.json             # Current vocabulary dataset (391 words)
├── logic/
│   └── game.jsx              # Core game state and logic
├── components/
│   ├── game-component.jsx    # Root layout wrapper
│   ├── question-container.jsx # Displays the current card, Finalize, and Next buttons
│   └── answer-choices.jsx    # Renders a set of 5 answer buttons
└── data/
    └── word.jsx              # Word class with helper functions
```

## Key Components

**`Word`** — Represents a vocabulary entry with `kanji`, `kana`, and `english` fields. Contains static helpers for:
- Parsing the word list from `wordList.json` (`loadWordsFromJSONFile`)
- Generating randomized multiple-choice answer sets (`getAnswerChoices`)
- Locating the correct answer within a choices array (`findCorrectIndex`)

**`AnswerChoices`** — Renders a set of answer buttons that visually reflect their current state: neutral, selected (pre-finalize), correct, or incorrect (post-finalize).

**`Game`** — The root React component managing all game state: the current word, chosen answers, finalization status, and advancing to the next random question.

**`game.jsx`**: Handles the core game logic and passes necessary state variables to the requisite components. Tracks progression logic, the current deck, the set of answers in both `kana` and `english`, and the current card. The `readyToFinalize` and `finalized` state variables determine if all necessary answers have been selected, and if the user has locked in their choices before moving to the next question.

**`question-container.jsx`**: Renders the current Kanji or Kana to translate as well as the Finalize and Next buttons. Font size for the question is calculated dynamically based on the number of characters in the string to ensure that it fits on the screen. The Finalize button only activates once the `readyToFinalize` state is set to `true` and the Next button only shows once the answers are finalized.

**`answer-choices.jsx`**: Renders a set of 5 answer options to select from. Chooses different prompts and different fonts based on whether it is displaying English characters (`Quicksand`) or Japanese characters (`Klee One`).

## Word List Format

Words are stored in `wordList.json` with the following structure:

```json
{
  "words": [
    { "kanji": "日本語", "kana": "にほんご", "english": "Japanese" },
    { "kanji": "", "kana": "そうです", "english": "That's right." },
    ...
  ]
}
```

Words with an empty `kanji` field are treated as kana-only and show a single answer box instead of two.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v17 or later)
- npm (v8 or later)

### Installation

```bash
git clone https://github.com/Cheezra/japanese-flashcards.git
cd japanese-flashcards
npm install
```

### Running the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Planned Features

- Win/loss statistics tracking, separated by English and Japanese question types
- Start screen
- Responsive layout for different screen sizes and orientations
- In-app screen for adding new words