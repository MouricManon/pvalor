import { useEffect, useState } from 'react';

type DevicesProps = {
  token: string;
  id: string;
};

function Devices({ token, id }: DevicesProps) {
  const [info, setInfo] = useState<any[]>([]);
  const [modele, setModele] = useState<string[]>([]);
  const [lastsync, setLastsync] = useState<any[]>([]);
  const [type, setType] = useState<any[]>([]);

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
        for (let device of data) {
          setModele(prevModele => [...prevModele, device.deviceVersion]);
          setLastsync(prevLastSync => [...prevLastSync, device.lastSyncTime]);
          setType(prevType => [...prevType, device.type]);
        }
        displayDevice(modele, lastsync, type);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite :', error);
      });
  }

  function displayDevice(modele: string[] | undefined, lastsync: any[] | undefined, type: any[] | undefined) {
    if (modele == undefined || modele == null || lastsync == undefined || lastsync == null || type == undefined || type == null) {
      setInfo(['No device']);
    } else {
      let updatedInfo: any[] = [];
      for (let i = 0; i < modele.length; i++) {
        updatedInfo.push([modele[i], lastsync[i], type[i]]);
      }
      setInfo(updatedInfo);
    }
  }

  return (
    <div>
      <ul>
        {info.map(i => (
          <li>
            Version: {i[0]}, Last sync: {i[1]}, Type: {i[2]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Devices;
