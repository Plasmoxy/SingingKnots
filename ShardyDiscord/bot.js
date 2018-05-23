/* Shardy discord bot by Plasmoxy */
/* he lives on the legendary Christian Minecraft Server */

// import
const Discord = require('discord.js');
const http = require('http');
require('dotenv').config();
const {VM} = require('vm2');
const express = require('express');

let GLOBAL_LOG = "";

let commands = {

  "ping": (msg) => {
    msg.channel.send("pong nigger!");
  },

  // JAVASCRIPPPPTT
  "js": (msg) => {

    let jscmd = msg.content.substring(2);
    clog('<Executing js command> : ' + jscmd);
    try {
      let output = vm.run(jscmd);
      if (output) msg.channel.send(String(output));
    } catch(error) {
      msg.channel.send("\n==== JS EXCEPTION ====\n" + error);
    }

  }

};

let admincommands = {
  "?checkadmin": (msg) => {
    msg.reply('yo are the admin my nibba');
  }
};

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

  // print to console
  clog(`${msg.channel.name} : [ ${msg.author.username} ] ${msg.content}`);

  // ----- COMMAND ROUTING -----

  // --- ADMIN ---
  if (msg.author.id == parseInt(process.env.ADMIN_ID)) {

  }

  // --- CONSOLE COMMANDS ---
  if (msg.channel.name === '_shardyconsole') {

  }

  // --- GLOBAL COMMANDS ---
  for (const [key, fun] of Object.entries(commands)) {
    fun(msg);
  }

});

clog('logging in ...');

client.login(process.env.DISCORD_KEY);

process.on('uncaughtException', (err) => {
    console.error('Asynchronous error caught.', err);
});

httpserver.listen(80);
