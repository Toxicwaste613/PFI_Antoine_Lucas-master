const Model = require('./model');
module.exports = 
class User extends Model{
    constructor()
    {
        super();
        this.Id = 0; //int
        this.Name = ""; //string
        this.Email = ""; //string
        this.Password = ""; //string
        this.Created = 0; //int
        this.AvatarGUID = ""; //string
        this.key = "Email";
        this.VerifyCode = ""; //Code de 6 chiffes ou la constante verified//


        this.addValidator('Name','string');
        this.addValidator('Email','email');
        this.addValidator('Password','string');
        this.addValidator('Created','integer');
    }
}