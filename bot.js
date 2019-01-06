//Settings! // AlphaCodes
const Discord = require('discord.js');
const bot = new Discord.Client();

const yourID = "476503634411257858"; //Instructions on how to get this: https://redd.it/40zgse // AlphaCodes
const setupCMD = "#dorole"
let initialMessage = (`** React under This Message To Activate/prove UrSelf ! **󠀀󠀀`)
const roles = ["Activated", "", "", ""];
const reactions = ["✅", "", "", ""];
const botToken = process.env.BOT_TOKEN
//Load up the bot... // AlphaCodes
bot.login(botToken);

//If there isn't a reaction for every role, scold the user! // AlphaCodes
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings // AlphaCodes
function generateMessages(){
    var messages = [];
  const gs2 = bot.emojis.find(r => r.name === 'GS2');

    messages.push(`** React under This Message To Activate/prove UrSelf ! **󠀀󠀀`);
    for (let role of roles) messages.push(`-`); //DONT CHANGE THIS // AlphaCodes لا تغير الكلام الي هنا
    return messages;
}


bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                } 
            });
        }
    }
})


bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find('name', role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
});
