export class Word {
    constructor(kanji, kana, english) {
        this.kanji = kanji;
        this.kana = kana;
        this.english = english;
    }

    // function to compare the equality of 2 words
    static isEqual(word1, word2) {
        // check if one of the words are null
        if (!word1 || !word2) return false;
        return (word1.kanji === word2.kanji && word1.kana === word2.kana && word1.english === word2.english);
    }
}