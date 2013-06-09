#Locationbot
Show location of users in irc, it will speak out in the channel (quite annoying, so don't abuse it. Change it to PM you instead should also be possible but not currently implemented.)

#Setup
```npm install```

Change your config in ```server.js``` to your irc server and channel. You can specify the bot name there as well

#Run
```node server.js```

The command to manually query the location in the channel is by using ```showlocation```

#Known Bugs
Memory leak from listener.