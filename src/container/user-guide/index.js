import React, {useEffect} from "react"

function UserGuide () {
  useEffect(() => {
    window.location.replace("/home/api-doc.pdf")
  }, [])
  return (
    <div></div>
  )
}

export default UserGuide