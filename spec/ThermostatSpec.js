'use strict';

describe("Thermostat", function() {
  var thermostat;

  describe("#temperature", function() {
    beforeEach(function() {
      thermostat = new Thermostat();
    });
      it("defaults temperature to 20 degrees", function(){
        expect(thermostat.getCurrentTemperature()).toEqual(20)
      });

      it("increase temperature by 1", function() {
        thermostat.increase();
        expect(thermostat.getCurrentTemperature()).toEqual(21)
      });

      it("decrease temperature by 1", function() {
        thermostat.decrease();
        expect(thermostat.getCurrentTemperature()).toEqual(19)
      });
      it('has a minimum of 10 degrees', function() {
        for (var i=0; i< 11; i++) {
          thermostat.decrease();
        };
        expect(thermostat.getCurrentTemperature()).toEqual(10);
      });
      it('has a power saving mode on by default', function(){
        expect(thermostat.isPowerSavingModeOn()).toBe(true);
      });
      it('can switch PSM back off', function() {
        thermostat.switchPowerSavingModeOff();
        expect(thermostat.isPowerSavingModeOn()).toBe(false);
      });
      it('can switch PSM back on', function() {
        thermostat.switchPowerSavingModeOff();
        expect(thermostat.isPowerSavingModeOn()).toBe(false);
        thermostat.switchPowerSavingModeOn();
        expect(thermostat.isPowerSavingModeOn()).toBe(true);
      });
      it('can be reset to the default temperature', function() {
        for (var i = 0; i < 6; i++) {
          thermostat.increase();
        };
        thermostat.resetTemperature();
        expect(thermostat.getCurrentTemperature()).toEqual(20);
      });
    describe('when power saving mode is on', function() {
      it('has a maximum temeprature of 25 degrees', function () {
        for (var i =0; i < 6; i++) {
          thermostat.increase();
        }
        expect(thermostat.getCurrentTemperature()).toEqual(25);
      });
    });
    describe('wehn power saving mode is off', function() {
      it('has a maximum temeprature of 32 degrees', function () {
        thermostat.switchPowerSavingModeOff();
        for (var i = 0; i < 13; i++) {
          thermostat.increase();
        }
        expect(thermostat.getCurrentTemperature()).toEqual(32);
      });
    });
    describe('displaying usage levels', function() {
      describe('when the temperature is below 18 degrees', function() {
        it('it is considered low-usage', function() {
          for (var i = 0; i < 3; i++) {
            thermostat.decrease();
          }
          expect(thermostat.energyUsage()).toEqual('low-usage');
        });
      });

      describe('when the temperature is between 18 and 25 degrees', function() {
        it('it is considered medium-usage', function() {
          expect(thermostat.energyUsage()).toEqual('medium-usage');
        });
      });

      describe('when the temperature is anything else', function() {
        it('it is considered high-usage', function() {
          thermostat.powerSavingMode = false;
          for (var i = 0; i < 6; i++) {
            thermostat.increase();
          };
          expect(thermostat.energyUsage()).toEqual('high-usage');
        });
      });
    });
  });
});
