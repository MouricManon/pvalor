import { useEffect, useState } from 'react'
import "./profile.css"
import { UserData } from './public/types'

type ProfileProps = {
    data: UserData

}
  

function Profile({data }: ProfileProps) {


    return (<div><div id="name">{data.full_name}</div> <div id="birthdate">{data.date_of_birth}</div></div>)
}
export default Profile;