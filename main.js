require('dotenv').config()
import { Client, Intents } from 'discord.js';
import R6API from 'r6api.js';

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { UBI_EMAIL: email = 'fenming891564z@yahoo.com', UBI_PASSWORD: password = 'zxcvs891564' } = process.env;
const r6api = new R6API({ email, password });

exports.default = async () => {

  const username = 'FenMin-.';
  const platform = 'uplay';

  const { 0: player } = await r6api.findByUsername(platform, username);
  if (!player) return 'Player not found';

  const { 0: stats } = await r6api.getStats(platform, player.id);
  if (!stats) return 'Stats not found';
  const { pvp: { general } } = stats;

  return `${player.username} has played ${general.matches} matches.`;

};

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
}); 

bot.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

bot.login(process.env.TOKEN);