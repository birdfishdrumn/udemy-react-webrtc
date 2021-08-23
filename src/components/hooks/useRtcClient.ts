import React,{useState,useEffect,useReducer,useRef} from "react"
import RtcClient from "../../utils/RtcClient";
export const useRtcClient = () => {
  const [rtcClient, _setRtcClient] = useState(null);
  const remoteVideoRef = useRef(null)
    const [,forceRender] = useReducer((boolean)=> !boolean,false)

    const setRtcClient = (rtcClient:any) => {
        _setRtcClient(rtcClient)
        forceRender()
    }
    console.log(rtcClient)

  useEffect(() => {
    const init = async () => {
           const client = new RtcClient(remoteVideoRef,setRtcClient)
      await client.setMediaStream()
      }
   init()
    }, [])

  return rtcClient;

}
