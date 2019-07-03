var gpio = require("onoff").Gpio;
var gpio4 = new gpio(4,"out");
var sleep = require("sleep")
const readline = require("readline");

async function prompt(str){
	process.stdout.write("\u001b[2J\u001b[0;0H");
	var result;
	if(str.split("")[str.length-1]!=="\n"){
		str += "\n";
	}
	const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout,
	  terminal: false/*this stops duplication of chars during prompt*/
	});
	result = await new Promise((resolve,reject)=>{
		rl.question(str,bloop=>{
			resolve(bloop);
		});
	});
	return parseInt(result);

}

async function wait(iMillis){
	const startTime = Date.now();
	const endTime = startTime+iMillis;
	let currTime = startTime;
//	console.log(typeof iMillis)
//	console.log("\n\ncurrTime: "+currTime+"\nendTime"+endTime)
	while(currTime < endTime){
		currTime = Date.now();
		sleep.msleep(200);
	}
}

async function main(){
	while(true){
		var answer = await prompt("Please enter time in seconds to illuminate\n");
		//convert to millis
		answer = answer * 1000
		if(gpio4.readSync() !== 0){
	                gpio4.writeSync(0);
	        }
		gpio4.writeSync(1);
		await wait(answer);
		gpio4.writeSync(0);
	}

/*
	var millis = 250
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
	}*/
}
main();
