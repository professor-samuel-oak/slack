import EmojiName from "Enums/EmojiName";

export default class Emoji {

    public name: EmojiName;
    public emoji: string;

    constructor (name: EmojiName, emoji: string) {
        this.name = name;
        this.emoji = emoji;
    }
}