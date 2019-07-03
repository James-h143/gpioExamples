var gpio = require("onoff").Gpio;
var gpio4 = new gpio(4,"out");
var sleep = require("sleep")
var args = process.argv;
var millis;

if(typeof args[2] === "undefined"){
	millis = 500;
}else{
	millis = parseInt(args[2]);
}

if(gpio4.readSync() !== 0){
        gpio4.writeSync(0);
}
var state = 0
while(true){
        switch(state){
                case 0:
                        process.stdout.write("\u001b[2J\u001b[0;0H");
                        console.log("on");
                        gpio4.writeSync(1);
                        sleep.msleep(millis);
                        state = 1;
                break;
                case 1:
                        process.stdout.write("\u001b[2J\u001b[0;0H");
                        console.log("off");
                        gpio4.writeSync(0);
                        sleep.msleep(millis)
                        state = 0;
                break;
                default:
                        //do nothing
        }
}
