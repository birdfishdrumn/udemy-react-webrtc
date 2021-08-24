import React,{useEffect,useState} from "react"

export const useDimensions = (targetRef: React.MutableRefObject<null>) => {

  const defaultDimensions = {width:0,height:0}

  let [dimensions,setDimensions] = useState(defaultDimensions)
  const node = targetRef.current
  const updateDimensions = (node: any) => {

    return node === null ?
      defaultDimensions
    :
    {
      width: node.offsetWidth,
      height: node.offsetHeight
    }
  }
   dimensions = updateDimensions(node)

   useEffect(() => {
     const resizeDimensions = () => {
        setDimensions(updateDimensions(node))
     }
     window.removeEventListener("resize", resizeDimensions)
        window.addEventListener("resize",resizeDimensions)
   }, [node])
  return dimensions
}
