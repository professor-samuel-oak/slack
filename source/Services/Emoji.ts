import Emoji from "Models/Slack/Emoji";
import LoaderService from "Services/Loader";
import EmojiName from "Enums/EmojiName";

export default class EmojiService {

    private static emojis: Emoji[];

    constructor () {
        EmojiService.emojis = [];
        let emojiMap = LoaderService.loadJSON<Object[]>("emojimap")[0];
        for (const [key, value] of Object.entries(emojiMap)) {
            EmojiService.emojis.push(new Emoji(EmojiName[key], value));
        }
    }

    public static getEmojis (): Emoji[] {
        return this.emojis;
    }

    public static getEmojiByName (name: EmojiName): Emoji {
        let value = this.emojis.find((emoji) => emoji.name === name);
        return value === undefined ? null : value;
    }
}