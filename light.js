var gpioLocation = "/sys/class/gpio/gpio4/value";
var gpio = require("onoff").Gpio;
var fs = require('fs')

function switchState(i){
	var currState = parseInt(fs.readFileSync(gpioLocation));
	if(currState === i){
		console.log("light is already in that state");
	}else{
		var gpio4 = new gpio(4,"out");
		gpio4.writeSync(i);
	}
}

function main(args){

	switch(args[2].toUpperCase()){
		case "ON":
			switchState(1);
			break;
		case "OFF":
			switchState(0);
			break;
		default:
			console.log("invalid selection");
	}
	/*if(args[2].toUpperCase() === "ON"){
		if(gpio4.readSync() === 0){
	        	gpio4.writeSync(1);
	        }else{
			console.log("Light is already on");
		}
	}else if(args[2].toUpperCase() === "OFF"){
	        if(gpio4.readSync() === 1){
	                gpio4.writeSync(0);
	        }else{ 
	                console.log("Light is already off");
	        }
	}else{
		console.log("Invalid arg detected");
	}*/
}
main(process.argv);
