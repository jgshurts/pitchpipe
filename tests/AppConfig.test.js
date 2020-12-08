const AppConfig = require('../src/AppConfig.js')
const jsonInstrumentData = require("./instrumentTestData.json");
const jsonSampleSetData = require("./sampleSetsTestData.json");


test('AppConfig reads and parses Sample Set data correctly', () => {
    const appConfig = new AppConfig();
    const sampleSetsData = appConfig.getSampleSetData(jsonSampleSetData);

    expect(sampleSetsData.size).toBe(2);
    expect(JSON.stringify(sampleSetsData.get("guitar").sampledNotes)).toBe(JSON.stringify(["E2", "A2", "D3", "G3", "B3", "E4"]));
});

test('AppConfig reads and parses Instrument data correctly', () => {
    const appConfig = new AppConfig();
    const instrumentSetsData = appConfig.getInstrumentData(jsonInstrumentData);

    // Should be two instrument sets
    expect(instrumentSetsData.size).toBe(2);

    // Should be one instrument (guitar) in Guitars instrument set
    const instrumentSet = instrumentSetsData.get("Guitars");

    expect(instrumentSet.defaultInstrument).toBe("Guitar (Standard)");
    expect(instrumentSet.instruments.size).toBe(1);
    expect(JSON.stringify(instrumentSet.instruments.get("Guitar (Standard)").notes)).toBe(JSON.stringify(["E2", "A2", "D3", "G3", "B3", "E4"]));
});