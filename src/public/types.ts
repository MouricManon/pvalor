export class UserData {
    id_user: string;
    token: string;
    refresh_token: string;
    full_name: string;
    date_of_birth: string;
    connected_devices: ConnectedDevice[];
    date: data;

    constructor() {
        this.id_user = "";
        this.token = "";
        this.refresh_token = "";
        this.full_name = "";
        this.date_of_birth = "";
        this.connected_devices = [];
        this.date = new data();
    }
}

export class ConnectedDevice {
    deviceVersion: string;
    lastSyncTime: string;
    type: string;

    constructor() {
        this.deviceVersion = "";
        this.lastSyncTime = "";
        this.type = "";
    }
}

export class data {
    date: string;
    activity: Activity;
    sleep: Sleep[];
    heart: Heart;
    body: Body;
    breath: Breath;

    /*

     saba: Saba;
     spirometer: Spirometer;
     feno: Feno;
     polluants: Polluants;
     spo2: Spo2;*/

    constructor() {
        this.date = "";
        this.activity = new Activity();
        this.sleep = [];
        this.heart = new Heart();
        this.body = new Body();
        this.breath = new Breath();
    }
}

export class Activity {
    activity_list: ActivityList[];
    active_zone_minutes: ActiveZoneMinutes[];

    constructor() {
        this.activity_list = [];
        this.active_zone_minutes = [];
    }
}

export class ActivityList {
    activeDuration: number;
    activityLevel: ActivityLevel[];
    activityName: string;
    calories: number;
    duration: number;
    elevationGain: number;
    steps: number;
    distance: number;

    constructor() {
        this.activeDuration = 0;
        this.activityLevel = [];
        this.activityName = "";
        this.calories = 0;
        this.duration = 0;
        this.elevationGain = 0;
        this.steps = 0;
        this.distance = 0;
    }
}

export class ActivityLevel {
    minutes: number;
    name: string;

    constructor() {
        this.minutes = 0;
        this.name = "";
    }
}

export class ActiveZoneMinutes {
    dateTime: string;
    value: {
        activeZoneMinutes: number;
        fatBurnActiveZoneMinutes: number;
        cardioActiveZoneMinutes: number;
        peakActiveZoneMinutes: number;
    };

    constructor() {
        this.dateTime = "";
        this.value = {
            activeZoneMinutes: 0,
            fatBurnActiveZoneMinutes: 0,
            cardioActiveZoneMinutes: 0,
            peakActiveZoneMinutes: 0,
        };
    }
}

export class Sleep {
    duration: number;
    efficiency: number;
    minutesAsleep: number;
    minutesAwake: number;
    levels: SleepSummary;

    constructor() {
        this.duration = 0;
        this.efficiency = 0;
        this.minutesAsleep = 0;
        this.minutesAwake = 0;
        this.levels = new SleepSummary();
    }
}

export class SleepSummary {
    summary: {
        asleep: {
            minutes: number;
        };
        awake: {
            minutes: number;
        };
        restless: {
            minutes: number;
        };
    };

    constructor() {
        this.summary = {
            asleep: {
                minutes: 0,
            },
            awake: {
                minutes: 0,
            },
            restless: {
                minutes: 0,
            },
        };
    }
}

export class Heart {
    hearRateZones: HeartRateZones[];
    ecg: ECG[];
    hrv: HRV[];
    spo2: Spo2;

    constructor() {
        this.hearRateZones = [];
        this.ecg = [];
        this.hrv = [];
        this.spo2 = new Spo2();
    }
}

export class HeartRateZones {
    restingHeartRate: number;

    constructor() {
        this.restingHeartRate = 0;
    }
}

export class ECG {
    startTime: string;
    averageHeartRate: number;
    resultClassification: string;
    samplingFrequencyHz: number;
    scalingFactor: number;
    numberOfWaveformSamples: number;

    constructor() {
        this.startTime = "";
        this.averageHeartRate = 0;
        this.resultClassification = "";
        this.samplingFrequencyHz = 0;
        this.scalingFactor = 0;
        this.numberOfWaveformSamples = 0;
    }
}

export class HRV {
    value: {
        dailyRmssd: number;
        deepRmssd: number;
    };
    dateTime: string;

    constructor() {
        this.value = {
            dailyRmssd: 0,
            deepRmssd: 0,
        };
        this.dateTime = "";
    }
}

export class Spo2 {
    dateTime: string;
    value: {
        avg: number;
        min: number;
        max: number;
    };

    constructor() {
        this.dateTime = "";
        this.value = {
            avg: 0,
            min: 0,
            max: 0,
        };
    }
}

export class Body {
    fat: number[];
    weight: number[];
    temp: number[];
    avgfat: number;
    avgweight: number;
    avgtemp: number;
    bmi: number[];

    constructor() {
        this.fat = [];
        this.weight = [];
        this.temp = [];
        this.avgfat = 0;
        this.avgweight = 0;
        this.avgtemp = 0;
        this.bmi = [];
    }
}

export class Breath {
    BreathingRateEntry: BreathingRateEntry[];
    CardioScoreEntry: CardioScoreEntry[];

    constructor() {
        this.BreathingRateEntry = [];
        this.CardioScoreEntry = [];
    }
}

export class BreathingRateEntry {
    value: {
        breathingRate: number;
    };
    dateTime: string;

    constructor() {
        this.value = {
            breathingRate: 0,
        };
        this.dateTime = "";
    }
}

export class CardioScoreEntry {
    dateTime: string;
    value: {
        vo2Max: string;
    };

    constructor() {
        this.dateTime = "";
        this.value = {
            vo2Max: "",
        };
    }
}



