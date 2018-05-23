/* Shardy discord bot by Plasmoxy */
/* he lives on my legendary Christian Minecraft Server */

// import
const Discord = require('discord.js');
const http = require('http');
require('dotenv').config();
const {VM} = require('vm2');
const express = require('express');

let GLOBAL_LOG = "";

let commands = {

  "ping": (msg, query) => {
    msg.channel.send("pong nigger!");
  },

  // JAVASCRIPPPPTT
  "js": (msg, query) => {

    clog('<Executing js command> : ' + query);
    try {
      let output = vm.run(query);
      if (output) msg.channel.send(String(output));
    } catch(error) {
      msg.channel.send("\n==== JS EXCEPTION ====\n" + error);
    }

  }

};

let adminCommands = {
  "?checkadmin": (msg, query) => {
    msg.reply('yo are the admin my nibba');
  }
};

function processCmd(msg, key, fun) {
  if (msg.content.startsWith(key)) {
    let query = msg.content.substring(key.length + 1); // + 1 space
    fun(msg, query);
  }
}

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
    for (const [key, fun] of Object.entries(adminCommands)) {
      processCmd(msg, key, fun);
    }
  }

  // --- GLOBAL COMMANDS ---
  for (const [key, fun] of Object.entries(commands)) {
    processCmd(msg, key, fun);
  }

});

clog('logging in ...');

client.login(process.env.DISCORD_KEY);

process.on('uncaughtException', (err) => {
    console.error('Asynchronous error caught.', err);
});

httpserver.listen(80);
