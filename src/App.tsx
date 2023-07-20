import React from 'react';
import {
  ActiveZoneMinutes,
  ActivityList,
  ConnectedDevice,
  UserData,
  Sleep,
  HeartRateZones,
  ECG,
  HRV, Spo2, BreathingRateEntry, CardioScoreEntry
} from "./public/types";
import moment from 'moment';
import downloadimage from "./public/assets/download.jpg"
import {clientId, clientSecret, scope, codeverifier, codechallenge} from "./GeneratePkce";
import './App.css';
import Display from './Display'
import Profile from './Profile'
import { useEffect, useState } from 'react'
type AppProps = {
  token : string
  refreshtoken : string
}

function App({  token, refreshtoken }: AppProps) {
  const[id,setid]=useState("-")
    const [userData, setUserData] = useState<UserData>(new UserData())
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [datebeginning, setDatebegin] = useState(moment().format('YYYY-MM-DD'));
    const[accessToken,setToken]=useState(token)
    const [refreshToken, setRefreshToken] = useState(refreshtoken)
    const [error, setError] = useState(false)

    userData.token = accessToken
    userData.refresh_token = refreshToken
    userData.id_user = id
    userData.date.date = date


    function refreshTokens() {
        if (!error) {
            return
        }
        const url = "https://api.fitbit.com/oauth2/token";
        const headers = {
            'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        const data = new URLSearchParams();
        data.append('grant_type', 'refresh_token');
        data.append('client_id', clientId);
        data.append('refresh_token', refreshToken);

        fetch(url, {
            method: 'POST',
            headers: headers,
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                    setToken(data.access_token);
                    setRefreshToken(data.refresh_token);
                }
            )
            .catch((error) => {
                    console.error('Error:', error);
                }
            );
        setError(false)
    }

    useEffect(() =>
     { setToken(token)
        setRefreshToken(refreshtoken)
      //  refreshTokens()
    }, [token])

    function downloadData() {
        //Trigger le téléchargement du useState data en JSON
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(userData)], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "data.json";
        document.body.appendChild(element);
        element.click();
    }

    useEffect(() => {
        getProfile()
        getAllDataForHeart()
        getAllDataForBody()
        getAllDataForBreath()
        getDevices()
        getAllDataForActivity()
        getSleep()

    }, [date, datebeginning, accessToken])

    async function getProfile() {
        let urlprofile = "https://api.fitbit.com/1/user/" + id + "/profile.json ";

        fetch(urlprofile, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    userData.date_of_birth = data.user.dateOfBirth
                    userData.full_name = data.user.fullName
                    setUserData({...userData})
                }
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('Une erreur s\'est produite:', error);
                if (error == 401) {
                    setError(true)
                }
            });
    }

    function getAllDataForActivity() {
        getActivezone()
        getActivityList()
    }

    async function getActivezone() {
        let urlactivezonemin = "https://api.fitbit.com/1/user/" + id + "/activities/active-zone-minutes/date/" + date + "/7d.json ";
        fetch(urlactivezonemin, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    let activeZoneMinutes: ActiveZoneMinutes[] = []
                    for (let item of data["activities-active-zone-minutes"]) {
                        let activeZoneMinute = new ActiveZoneMinutes()
                        activeZoneMinute.dateTime = item.dateTime
                        activeZoneMinute.value = item.value
                        activeZoneMinutes.push(activeZoneMinute)
                    }
                    userData.date.activity.active_zone_minutes = activeZoneMinutes
                    setUserData({...userData})
                    console.log(activeZoneMinutes)
                }
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('Une erreur s\'est produite:', error);
                if (error == 401) {
                    setError(true)
                }
            });
    }

    async function getActivityList() {
        //get activity log list
        let urlactivitylist = "https://api.fitbit.com/1/user/" + id + "/activities/list.json?afterDate=" + date + "&sort=asc&offset=0&limit=2 ";

        fetch(urlactivitylist, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.activities) {
                }
                let activityList: ActivityList[] = []
                for (let item of data.activities) {
                    //item has more data than ActivityList
                    //We only keep the data that is in ActivityList
                    let activity: ActivityList = new ActivityList()
                    activity.activityLevel = item.activityLevel
                    activity.activityName = item.activityName
                    activity.activityName = item.activityName
                    activity.calories = item.calories
                    activity.distance = item.distance
                    activity.duration = item.duration
                    activity.elevationGain = item.elevationGain
                    activity.steps = item.steps
                    activityList.push(activity)
                }
                console.log(activityList)
                userData.date.activity.activity_list = activityList
                setUserData({...userData})
                console.log(activityList)
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('Une erreur s\'est produite:', error);
                if (error == 401) {
                    setError(true)
                }
            })
    }

    async function getDevices() {
        let urldevice = 'https://api.fitbit.com/1/user/' + id + '/devices.json';
        fetch(urldevice, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    let connectedDevice: ConnectedDevice[] = []
                    for (let item of data) {
                        let device: ConnectedDevice = new ConnectedDevice()
                        device.deviceVersion = item.deviceVersion
                        device.lastSyncTime = item.lastSyncTime
                        device.type = item.type
                        connectedDevice.push(device)
                    }
                    userData.connected_devices = connectedDevice
                    setUserData({...userData})
                }
            })
            .catch(error => {
                console.error('Une erreur s\'est produite :', error);
                if (error == 401) {
                    setError(true)
                }
            });
    }

    async function getSleep() {
        // get sleep log by date range
        let urlsleepbydater = "https://api.fitbit.com/1.2/user/" + id + "/sleep/date/" + date + ".json";
        fetch(urlsleepbydater, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.sleep.length != 0) {
                    let sleepData: Sleep[] = []
                    for (let [index, item] of data.sleep.entries()) {
                        let sleep: Sleep = new Sleep()
                        sleep.levels = item.levels
                        sleep.duration = item.duration
                        sleep.efficiency = item.efficiency
                        sleep.minutesAsleep = item.minutesAsleep
                        sleep.minutesAwake = item.minutesAwake
                        sleepData.push(sleep)
                    }
                    userData.date.sleep = sleepData
                    setUserData({...userData})
                }
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('Une erreur s\'est produite:', error);
                if (error == 401) {
                    setError(true)
                }
            })
    }

    function getAllDataForHeart() {
        getHeartRate()
        getEcg()
        getHrv()
        getSpo2()
    }

    async function getHeartRate() {
        //get heart rate time series by date
        let urlhrt = "https://api.fitbit.com/1/user/" + id + "/activities/heart/date/" + date + "/7d.json ";
        fetch(urlhrt, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data['activities-heart'][0].value().restingHeartRate) {
                    let heartRate: HeartRateZones[] = []
                    for (let item of data['activities-heart']) {
                        let heart: HeartRateZones = new HeartRateZones()
                        heart.restingHeartRate = item.value().restingHeartRate
                        heartRate.push(heart)
                    }
                    userData.date.heart.hearRateZones = heartRate
                    setUserData({...userData})
                }
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('Une erreur s\'est produite:', error);
                if (error == 401) {
                    setError(true)
                }
            });
    }

    async function getEcg() {
        let urlecg = "https://api.fitbit.com/1/user/" + id + "/ecg/list.json?beforeDate=" + date + "&sort=asc&limit=1&offset=0 ";

        fetch(urlecg, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.ecgReadings) {
                    let ecg: ECG[] = []
                    for (let item of data.ecgReadings) {
                        let ecgdata: ECG = new ECG()
                        ecgdata.numberOfWaveformSamples = item.numberOfWaveformSamples
                        ecgdata.scalingFactor = item.scalingFactor
                        ecgdata.samplingFrequencyHz = item.samplingFrequencyHz
                        ecgdata.resultClassification = item.resultClassification
                        ecgdata.startTime = item.startTime
                        ecgdata.averageHeartRate = item.averageHeartRate
                        ecg.push(ecgdata)
                    }
                    userData.date.heart.ecg = ecg
                    setUserData({...userData})

                }
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('Une erreur s\'est produite:', error);
                if (error == 401) {
                    setError(true)
                }
            });
    }

    async function getHrv() {
        // get hrv
        let urlhrv = "https://api.fitbit.com/1/user/" + id + "/hrv/date/" + datebeginning + "/" + date + ".json ";
        fetch(urlhrv, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.hrv) {
                    let hrv: HRV[] = []
                    for (let item of data.hrv) {
                        let hrvdata: HRV = new HRV()
                        hrvdata.dateTime = item.dateTime
                        hrvdata.value = item.value
                    }
                    userData.date.heart.hrv = hrv
                    setUserData({...userData})
                }
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('Une erreur s\'est produite:', error);
                if (error == 401) {
                    setError(true)
                }
            });
    }

    async function getSpo2() {
        // get spo2
        let urlspo = "https://api.fitbit.com/1/user/" + id + "/spo2/date/" + date + ".json ";
        console.log(urlspo)
        fetch(urlspo, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (Object.keys(data).length != 0) {
                    let spo2: Spo2 = new Spo2()
                    spo2.dateTime = data.dateTime
                    spo2.value = data.value
                    userData.date.heart.spo2 = spo2
                    setUserData({...userData})
                }
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('Une erreur s\'est produite:', error);
                if (error == 401) {
                    setError(true)
                }
            });
    }

    async function getAllDataForBody() {
        getFat()
        getWeight()
        getTemp()
    }

    async function getFat() {
        // Utilisation de l'API Fetch pour effectuer une requête HTTP GET
        let url = "https://api.fitbit.com/1/user/" + id + "/body/log/fat/date/" + date + ".json ";
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data['fat']) {
                    for (let item of data['fat']) {
                        userData.date.body.fat.push(item.fat)
                    }
                    setUserData({...userData})
                }
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('Une erreur s\'est produite:', error);
                if (error == 401) {
                    setError(true)
                }
            });
    }

    async function getWeight() {
        // Get body weight
        let urlbodyweight = "https://api.fitbit.com/1/user/" + id + "/body/log/weight/date/" + date + ".json ";
        fetch(urlbodyweight, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data['weight']) {
                    for (let item of data['weight']) {
                        userData.date.body.weight.push(item.weight)
                        userData.date.body.bmi.push(item.bmi)
                    }
                    setUserData({...userData})
                }
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('Une erreur s\'est produite:', error);
                if (error == 401) {
                    setError(true)
                }
            });

    }

    async function getTemp() {
        //get temperature skin
        let urltemp = "https://api.fitbit.com/1/user/" + id + "/temp/skin/date/" + date + ".json ";

        fetch(urltemp, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data['tempSkin']) {
                    for (let item of data['tempSkin']) {
                        userData.date.body.temp.push(item.data)
                    }
                    setUserData({...userData})
                }
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('Une erreur s\'est produite:', error);
                if (error == 401) {
                    setError(true)
                }
            });

    }

    function getAllDataForBreath() {
        getBr()
        getVo2()
    }

    async function getBr() {
        let urlbrinter = "https://api.fitbit.com/1/user/" + id + "/br/date/" + datebeginning + "/" + date + ".json ";
        fetch(urlbrinter, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.br) {
                    for (let item of data.br) {
                        let br: BreathingRateEntry = new BreathingRateEntry()
                        br.dateTime = item.dateTime
                        br.value = item.value
                        userData.date.breath.BreathingRateEntry.push(br)
                    }
                    setUserData({...userData})
                }
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('Une erreur s\'est produite:', error);
                if (error == 401) {
                    setError(true)
                }
            });
    }

    async function getVo2() {
        let urlvo2 = "https://api.fitbit.com/1/user/" + id + "/cardioscore/date/" + datebeginning + "/" + date + ".json ";
        fetch(urlvo2, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.cardioScore) {
                    for (let item of data.cardioScore) {
                        let vo2: CardioScoreEntry = new CardioScoreEntry()
                        vo2.dateTime = item.dateTime
                        vo2.value = item.value
                    }
                    setUserData({...userData})
                }
            })
            .catch(error => {
                // Gestion des erreurs
                console.error('Une erreur s\'est produite:', error);
                if (error == 401) {
                    setError(true)
                }
            });
    }

  return (
    <div className="App">
          <div className="buttonsApp">
                <img id="downloadimage" alt="click to download" src={downloadimage}onClick={() => {
                    downloadData()
                }
                }/>
                <input id="choosedate"
                       type="date"
                       value={date}
                       pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                       onChange={(event) => setDate(event.target.value)}
                />
                <h4>Choose the beginning date</h4><input
                type="date" id="datebegin"
                value={datebeginning}
                onChange={(event) => setDatebegin(event.target.value)}
            />
            </div>
<Profile data={userData}></Profile>

   <Display data={userData} date={date}></Display>
    </div>
  );
}

export default App;
