import * as Bot from "slackbots";
import UserMessage from "Models/Slack/UserMessage";
import User from "Models/Slack/User";
import MessageService from "Services/Message";
import App from "App";

export default class SlackBotService {

    public static Instance: SlackBotService;

    private bot: Bot;
    private isReady: boolean = false;
    private users: User[] = [];
    private dummyUser: User = new User ({ name: "Dummy", isDummy: true })

    constructor () {
        SlackBotService.Instance = this;
        
        this.bot = new Bot (App.Config.slackbot.config);
        this.bot.on ("start", this.onStart.bind (this));
        this.bot.on ("message", this.onMessage.bind (this));
    }

    private onStart (): void {
        this.bot.getUsers ().then (users => {
            users.members.map (user => {
                this.users.push (new User (user)) 
            })
            this.isReady = true;
            console.log ("Slackbot is started!");
        })
    }

    private onMessage (rawData: any): void {
        let userMessage: UserMessage = new UserMessage (rawData);
        if (userMessage.type !== "message" 
         || userMessage.botID !== undefined 
         || this.isReady === false)
            return;

        MessageService.Instance.sendToUser (userMessage.user, "OK", {});
    }

    public getUsers (): User[] {
        return this.users;
    }
    
    public getUserByID (id: string): User {
        if (App.Config.slackbot.enabled === false)
            return this.dummyUser;

        let match: User;
        this.users.map (user => {
            if (user.id === id)
                match = user;
        });
        return match;
    }

    public static getBot (): Bot {
        let slackBotService = SlackBotService.Instance;
        if (slackBotService.isReady === true) 
            return slackBotService.bot;
        return null;
    }
}