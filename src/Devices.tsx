import { useEffect, useState } from 'react';
import "./devices.css"

type DevicesProps = {
  token: string;
  id: string;
};

function Devices({ token, id }: DevicesProps) {
  const [info, setInfo] = useState<any[]>([]);

  useEffect(() => {
    getDevices();
  }, []);

  async function getDevices() {
    let urldevice = 'https://api.fitbit.com/1/user/' + id + '/devices.json';

    fetch(urldevice, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => {
        let modele: any[] = []
        let lastsync: any[] = []
        let type: any[] = []
        
        for (let device of data) {
          modele.push(device.deviceVersion);
          lastsync.push(device.lastSyncTime);
          type.push(device.type);
        }
        displayDevice(modele, lastsync, type);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite :', error);
      });
  }

  function displayDevice(modele: string[], lastsync: any[], type: any[]) {
    setInfo([])
    if (modele.length==0) {
    } else {
      let updatedInfo: any[] = [];
      for (let i = 0; i < modele.length; i++) {
        updatedInfo.push([modele[i], lastsync[i], type[i]]);
      }
      setInfo(updatedInfo);
    }
  }
    function formatLastSyncTime(lastSyncTime: string) {
      const date = new Date(lastSyncTime);
      const formattedDate = date.toISOString().split('T')[0];
      return formattedDate;
    }
  
  return (
    <div>
      <ul id="devices">{info.length == 0?
            <li id="nodevice">No devices found</li> :
            <> {info.map((i, index) => (
                <li id="onedevice" key={index}> <img id="imageiot" alt="IoT" src="/assets/iot.jpg"/> Version: {i[0]}, Last sync: {formatLastSyncTime(i[1])}, Type: {i[2]}</li>))}</>}
        </ul>
    </div>
  );
}

export default Devices;
