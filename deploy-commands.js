const fs = require('node:fs');
// to use slash command
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildIds, token } = require('./config.json');


const commands = [];

// 커맨드 파일찾기
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () =>{
    guildIds.map(async(guildId)=>{
        try{
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: {},
            });
            console.log(`${guildId} success`);
        } catch (error){
            console.log(error);
        }        
    });
    // global command
    try{
        rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });
        console.log(`global command success`);
    } catch (error){
        console.log(error);
    } 
})();