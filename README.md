#Locationbot
show location of users in irc, it will speak out in the channel (quite annoying, so don't abuse it. Change it to PM you instead should also be possible but not currently implemented.)

#Setup
```npm install```

change your config in server.js to your irc server and channel. you can specify the bot name there as well

#Run
```node server.js```

the command to manually query the location in the channel is by using ```showlocation```

#Known Bugs
Memory leak from listener.