// Part 2
// HVAC Wrapper --> use the existing interface or Web service version of HVAC

describe("has temp", function(){
	let HVAC;

	beforeEach(function() {
		HVAC = {
			_temp: 70,
			heatOn: false,
			coolOn: false,
			fanOn: false,
			
			heat(isOn) { 
				this.heatOn = isOn;
			},
			cool(isOn) { 
				this.coolOn = isOn; 
			},
			fan(isOn) {
				this.fanOn = isOn;
			},
			temp() {
				return this._temp;
			},
		}
	});

	it("head is off if temp is 70", () => {
		HVAC._temp = 70;
		
		let environment = new EnvironmentController(HVAC);
		environment.tick();
		
		expect(HVAC.heatOn).toBeFalsy();
	});
	
	it("cool is off if temp is 66", () => {
		HVAC._temp = 66;
		
		let environment = new EnvironmentController(HVAC);
		environment.tick();
		
		expect(HVAC.coolOn).toBeFalsy();
	});
	
	it("heat is on is temp is 65", () => {
		HVAC._temp = 65;
		
		let environment = new EnvironmentController(HVAC);
		
		environment.tick();
		
		expect(HVAC.heatOn).toBeTruthy();
	});
	
	it("cool is on if temp is 77", () => {
		HVAC._temp = 77;
		
		let environment = new EnvironmentController(HVAC);
		environment.tick();
		
		expect(HVAC.coolOn).toBeTruthy();
		expect(HVAC.heatOn).toBeFalsy();
	});
	
	it("fan is of if temp is between 65 and 75", () => {
		HVAC._temp = 68;
		
		let environment = new EnvironmentController(HVAC);
		environment.tick();
		
		expect(HVAC.heatOn).toBeFalsy();
		expect(HVAC.coolOn).toBeFalsy();
		expect(HVAC.fanOn).toBeFalsy();
	});
	
	it("fan is off when the heat and cool is turned off", () => {
		HVAC._temp = 74;
	
		let environment = new EnvironmentController(HVAC);
		environment.tick();
	
		expect(HVAC.heatOn).toBeFalsy(); //heat is turned off
		expect(HVAC.coolOn).toBeFalsy(); //cool is turned off
		expect(HVAC.fanOn).toBeFalsy();
	});
	
	it("fan turns on when heat is on AND 3 min after cool is turned off", () => {
		HVAC._temp = 60;

		let environment = new EnvironmentController(HVAC);

		expect(environment.timer).toEqual(0);

		environment.tick();
		expect(HVAC.fanOn).toBeFalsy();

		environment.tick();
		expect(HVAC.fanOn).toBeFalsy();

		environment.tick();
		expect(HVAC.fanOn).toBeFalsy();

		environment.tick();

		expect(environment.timer).toEqual(4);
		expect(HVAC.coolOn).toBeFalsy();
		expect(HVAC.heatOn).toBeTruthy();
		expect(HVAC.fanOn).toBeTruthy();
	});
	
	it("fan truns on when cool is on AND 5 min after heat is turned off", () => {
		HVAC._temp = 76;
		
		let environment = new EnvironmentController(HVAC);
		
		expect(environment.timer).toEqual(0);
		
		environment.tick();
		expect(HVAC.fanOn).toBeFalsy();
		
		environment.tick();
		environment.tick();
		environment.tick();
		environment.tick();
		expect(HVAC.fanOn).toBeFalsy();
		expect(environment.timer).toEqual(5);
		
		environment.tick();
		expect(HVAC.heatOn).toBeFalsy();
		expect(HVAC.coolOn).toBeTruthy();
		expect(HVAC.fanOn).toBeTruthy();
	});
});
