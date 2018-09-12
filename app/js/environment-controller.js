class EnvironmentController {
	constructor(hvac) {
		this.hvac = hvac;
		this.timer = 0;
	}
	
	//called every minute
	tick() {
		this.timer += 1;
		let temp = this.hvac.temp();
		let tempInRange = temp > 65 && temp < 75;
		let tempTooHigh = temp >= 75;
		let tempTooLow = temp <= 65;

		if(tempInRange) {
			this.hvac.heat(false);
			this.hvac.cool(false);
			this.hvac.fan(false);
		} else if(tempTooLow) {
			this.hvac.heat(true);
			this.hvac.cool(false);
			if(this.timer > 3) {
				this.hvac.fan(true);
			}
		} else if(tempTooHigh) {
			this.hvac.heat(false);
			this.hvac.cool(true);
			if(this.timer > 5) {
				this.hvac.fan(true);
			}
		}
	}
}