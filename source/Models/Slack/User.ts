export default class User {

    public id: String;
    public displayName: String;
    public name: String;
    public isDummy: boolean;

    constructor (user: any) {
        this.id = user.id;
        this.displayName = user.real_name || user.name;
        this.name = user.name;
        this.isDummy = user.isDummy === true;
        console.log (`Initialized User for team member ${this.id} (${this.displayName})`);
    }
}