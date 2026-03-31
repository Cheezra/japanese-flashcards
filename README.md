# Japanese Flashcards

A React application for practicing Japanese vocabulary. Each round displays a Japanese word (in kanji or kana) and challenges the user to identify the correct reading and English translation from multiple-choice answers.

### Necessary Knowledge

The application assumes that the user can read both types of kana (hiragana and katakana). There are several methods to learn how to read these quickly, such as Duolingo or Japanese learning textbooks.

## How It Works

- A Japanese word is displayed prominently on the flashcard. It will display in **kanji** if it exists, and in **kana** otherwise
- If the word has kanji, the user must select **both** the correct kana reading and the correct English translation from two separate sets of 5 choices
![Flashcard page showing kanji and both selection boxes](https://github.com/Cheezra/japanese-flashcards/tree/main/assets/README1.png)
- If the word is kana-only, the user selects only the correct **English translation** from one set of choices
![Flashcard page showing kana and only one selection box](https://github.com/Cheezra/japanese-flashcards/tree/main/assets/README2.png)
- Once all required answers are selected, the **Finalize Answers** button activates
- After finalizing, correct and incorrect choices are color-highlighted and the user can advance to the next question

Answer choices are randomly shuffled each round, with the correct answer placed at a random position among the incorrect answers.

## Project Structure

```
japanese-flashcards/
├── public/
├── src/
│   ├── index.js        # Game, AnswerChoices, and Word classes
│   ├── index.css       # Styles
│   └── wordList.json   # Word bank (kanji, kana, english fields per entry)
├── package.json
└── .gitignore
```

## Key Components & Classes

**`Word`** — Represents a vocabulary entry with `kanji`, `kana`, and `english` fields. Contains static helpers for:
- Parsing the word list from `wordList.json` (`loadWordsFromJSONFile`)
- Generating randomized multiple-choice answer sets (`getAnswerChoices`)
- Locating the correct answer within a choices array (`findCorrectIndex`)

**`AnswerChoices`** — Renders a set of answer buttons that visually reflect their current state: neutral, selected (pre-finalize), correct, or incorrect (post-finalize).

**`Game`** — The root React component managing all game state: the current word, chosen answers, finalization status, and advancing to the next random question.

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