import {useEffect, useState} from 'react'
import activityimage from "./public/assets/activity.png"
import "./activity.css"
import {Activity} from "./public/types";

type ActivityProps = {
    data: Activity

    date: string
}


function ActivityC({data, date}: ActivityProps) {

    return (<div id="activity">
        <div id="titreactivity"><img id="activityimage" alt="activity
" src={activityimage}/><h1>Activity</h1></div>
        <ul>{data.active_zone_minutes.length == 0 ?
            <li id="noazm">No datas about AZM</li> :
            <> {data.active_zone_minutes.map((i, index) => (
                <li id="oneazm" key={index}>Date : {i.dateTime}
                    <ul>
                        <li> Active
 zone minutes : {i.value.activeZoneMinutes / 60 * 0.001}</li>
                        <li> Fat Burn Active
 Zone minutes : {i.value.fatBurnActiveZoneMinutes}</li>
                        <li> Peak Active

                            Zone
                            Minutes : {i.value.peakActiveZoneMinutes} </li>
                    </ul>
                </li>))}</>}
        </ul>
        <ul>{data.activity_list.length == 0 ?
            <li id="noactivity">No data about activity
</li> :
            <> {data.activity_list.map((i, index) => (
                //TODO date
                <li id="oneactivity" key={index}>Date : {date}
                    <ul>
                        <li> Activity
 duration : {Math.round(i.duration / 60 * 0.001)} min</li>
                        <li> Activity
 name : {i.activityName}</li>
                        {i.activityLevel.map((j, index) => (
                            <li id="oneactivitylevel" key={index}>Activity
 level : {j.name}
                                <ul>
                                    <li> Minutes : {j.minutes}</li>
                                    <li> Name : {j.name}</li>
                                </ul>
                            </li>))}
                        <li> Calories burned : {i.calories}kcal</li>
                        <li>Elevation gain : {i.elevationGain}</li>
                        <li> Steps : {i.steps}</li>
                        <li>Distance : {i.distance}m</li>
                    </ul>
                </li>))}</>}
        </ul>
    </div>)
}

export default ActivityC;