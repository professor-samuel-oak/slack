import User from "Models/Slack/User";
import App from "App";
import SlackBotService from "Services/SlackBot";
import * as Bot from "slackbots";

export default class MessageService {

    public static Instance: MessageService;

    constructor () {
        MessageService.Instance = this;
    }

    public sendToChannel (channelName: string, message: string, params?: any, callback?: Function): void {
        if (App.Config.slackbot.enabled === false)
            return;

        SlackBotService.getBot ().postMessageToChannel (
            channelName[0] === "#" ? channelName.slice (1) : channelName, 
            message, 
            params || {},
            callback || null);
    }

    public sendToUser (user: User, message: string, params?: any, callback?: Function): void {
        if (App.Config.slackbot.enabled === false || user.isDummy === true)
            return;

        SlackBotService.getBot ().postMessageToUser (
            user.name, 
            message, 
            params || {},
            callback || null);
    }

    public update (channelID: string, timestamp: string, message: string, params?: any): void {
        if (App.Config.slackbot.enabled === false)
            return;

        SlackBotService.getBot ().updateMessage (
            channelID, 
            timestamp, 
            message, 
            params || {});
    }
}