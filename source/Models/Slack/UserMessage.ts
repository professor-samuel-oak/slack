import User from "Models/Slack/User";
import SlackBotService from "Services/SlackBot";

export default class UserMessage {

    private channel: String;
    private time: String;
    public user: User;
    public text: String;
    public botID: String;
    public type: String;

    constructor (rawData: any) {
        this.channel = rawData.channel;
        this.time = rawData.time;
        this.user = SlackBotService.Instance.getUserByID (rawData.user);
        this.text = rawData.text;
        this.botID = rawData.bot_id;
        this.type = rawData.type;
    }
}