const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildIds, token } = require('./config.json');


const commands = [];

// 커맨드 파일찾기
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
    //console.log(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	guildIds.map(async (guildId) => {
	  try {
		await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
		  body: commands,
		});
		console.log(`${guildId} 서버 성공`);
	  } catch (error) {
		console.error(error);
	  }
	});
})();
// rest.put(Routes.applicationGuildCommands(clientId, guildIds), { body: commands })
// 	.then(() => console.log('Successfully registered application commands.'))
// 	.catch(console.error);

// (async () =>{
//     guildIds.map(async(guildId)=>{
//         try{
//             await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
//                 body: {},
//             });
//             console.log(`${guildId} success띠`);
//         } catch (error){
//             console.log(error);
//         }        
//     });
//     // global command
//     try{
//         rest.put(Routes.applicationCommands(clientId), {
//             body: commands,
//         });
//         console.log(`global command success`);
//     } catch (error){
//         console.log(error);
//     } 
// })();