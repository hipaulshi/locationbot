// Create the configuration
var config = {
    channels: ["#achannel you want to join in"], //specify the channel you want to join in here
    server: "irc.freenode.net",
    botName: "locationbot"
};

// Get the lib
var irc = require("irc")
  ,	request = require("request")
  , http = require("http");

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
    channels: config.channels
});

Object.prototype.keys = function ()
{
  var keys = [];
  for(var i in this) if (this.hasOwnProperty(i))
  {
    keys.push(i);
  }
  return keys;
}

// Listen for any message, say to him/her in the room
bot.addListener('message', function (from, to, message) {
	if (message == "showlocation")
	{
    	bot.send('NAMES', config.channels[0]);
    }

});

bot.addListener("names",function (channel, nicks) { 
	var keys = [];
	var printstringcontent=[];
	for(var i in nicks) if (nicks.hasOwnProperty(i))
	{
		keys.push(i);
		bot.whois(i,function(doc){
			//console.log("nick: ",doc.nick);
			var request_addr="http://ip-api.com/json/"+doc.host;
			//console.log("requst addr:", request_addr);
			request(request_addr, function (error, response, body) {
  				if (!error && response.statusCode == 200) {
	    			//console.log(body) // Print the google web page.
	    			var body=JSON.parse(body);
					if (("city" in body) && ("region" in body))//both must exist
					{
						var contentstring="["+doc.nick+"-"+body.city+","+body.region+"]";
					}
					else
					{
						var contentstring="["+doc.nick+"-"+"N/A"+"]";
					}
					printstringcontent.push(contentstring);
					// console.log(printstringcontent.length);
					// console.log(Object.keys(nicks).length);
					// The print statement is here istead at the end of the for loop is because the request callback is issued asynchronously. 
					// For loop basically will finish before the request calleback is issued resulting in empty printstringcontent at that time.
					if (printstringcontent.length==Object.keys(nicks).length)
					{
						console.log(printstringcontent);
						bot.say(config.channels[0],printstringcontent);
					}
  				}
			});


		});
	}
	//console.log(keys);;

})