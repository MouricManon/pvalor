import { useEffect, useState } from 'react';
import "./devices.css"
import IoTimage from "./public/assets/iot.png"
import {ConnectedDevice} from "./public/types";

type DevicesProps = {
    data: ConnectedDevice[]

    date: string
}

function DevicesC({ data, date }: DevicesProps) {
    function formatLastSyncTime(lastSyncTime: string) {
      const date = new Date(lastSyncTime);
      const formattedDate = date.toISOString().split('T')[0];
      return formattedDate;
    }

  return (
    <div id="devices">
     <div ><img id="imageiot" alt="IoT" src={IoTimage}/><h1>DEVICES</h1></div>
      <ul >{data.length == 0?
            <li id="nodevice">No devices found</li> :
            <> {data.map((i, index) => (
                <li id="onedevice" key={index}>  Version : {i.deviceVersion} <ul><li> Last sync : {formatLastSyncTime(i.lastSyncTime)}</li><li> Type : {i.type}</li></ul></li>))}</>}
        </ul>
    </div>
  );
}

export default DevicesC;
