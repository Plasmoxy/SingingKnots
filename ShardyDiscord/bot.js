/* Shardy discord bot by Plasmoxy */
/* he lives on the legendary Christian Minecraft Server */ 

// import
const Discord = require('discord.js');
const http = require('http');
require('dotenv').config();
const {VM} = require('vm2');
const express = require('express');

let GLOBAL_LOG = "";

function clog(what) {
  console.log(what);
  GLOBAL_LOG += String(what) + '<br>';
}

clog('=== SHARDY by Plasmoxy ===');
clog('initializing ...');

// init
const client = new Discord.Client();
const vm = new VM();

const app = express();
const httpserver = http.createServer(app);

// EXPRESS routing

app.get('/', function (req, res) {
  //res.send(' <<<+=== Shardy by Plasmoxy bot log ===>>><br><br><br>' + GLOBAL_LOG);
  res.send('oi faggot');
})

// DISCORD  events

client.on('ready', () => {
  clog(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {

  if (msg.author.id == client.user.id) return; // dont talk with yourself

  const c = msg.content;

  // print to console
  clog(`${msg.channel.name} : [ ${msg.author.username} ] ${c}`);

  // --- GLOBAL ADMIN COMMANDS ---
  if (msg.author.id == parseInt(process.env.ADMIN_ID)) {
    switch (c) {
      case '?checkadmin':
        msg.reply('yo are the admin my nibba')
        break;
    }
  }

  // --- CONSOLE COMMANDS ---
  if (msg.channel.name === '_shardyconsole') {

  }

  // --- GLOBAL COMMANDS ---

  if (c === '?whatsmyid') {
    msg.reply(msg.author.id);
  }

  // JAVASCRIPPPPTT
  if (c.startsWith('js')) {

    let jscmd = c.substring(2);
    clog('<Executing js command> : ' + jscmd);
    try {
      let output = vm.run(jscmd);
      if (output) msg.channel.send(String(output));
    } catch(error) {
      msg.channel.send("\n==== JS EXCEPTION ====\n" + error);
    }

  }

  // --- GLOBAL INSPECTIONS ----

  if (c.startsWith("ping")) {
    msg.channel.send("pong nigger!");
  }

  if ( c.includes('cunt') || c.includes('nigger') || c.includes('fuck') || c.includes('bitch') ) {
    msg.reply('No swearing on our christian server,\nyou fucking nigger cunt faggot bitch just kill yourself.');
  }

});

clog('logging in ...');

client.login(process.env.DISCORD_KEY);

process.on('uncaughtException', (err) => {
    console.error('Asynchronous error caught.', err);
});

httpserver.listen(80);
