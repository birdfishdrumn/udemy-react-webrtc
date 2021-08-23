import React from 'react'
import InputFormLocal from "./InputFormLocal";
import InputFormRemote from "./InputFormRemote";
import RtcClient from "src/utils/RtcClient";
interface Props {
  rtcClient:RtcClient | null
}

const InputForms:React.VFC<Props>= ({rtcClient}) => {
      if(rtcClient === null) return <></>
  return (
    <div>
      <InputFormLocal
            rtcClient={rtcClient}

        />
        <InputFormRemote
            rtcClient={rtcClient}
        />
    </div>
  )
}

export default InputForms
