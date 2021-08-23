import React,{useState,useEffect,useReducer} from "react"
import RtcClient from "../../utils/RtcClient";
export const useRtcClient = () => {
     const [rtcClient,_setRtcClient] = useState(null);
    const [,forceRender] = useReducer((boolean)=> !boolean,false)

    const setRtcClient = (rtcClient:any) => {
        _setRtcClient(rtcClient)
        forceRender()
    }
    console.log(rtcClient)

    useEffect(() => {
          const client = new RtcClient(setRtcClient)
    client.setRtcClient()
    }, [])

  return rtcClient;

}
