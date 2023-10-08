import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

const DocumentEditor = () => {

    const { quill, quillRef } = useQuill()
    const id = useParams()
    const [socket, setSocket] = useState()

    useEffect(() => {
      const socketio = io("http://localhost:3000")
      setSocket(socketio)
    }, [])

    useEffect(() => {
      const interval = setInterval(() => {
        socket.emit("save-data",quill.getContents())
      },3000)
      return () => {
        clearInterval(interval)
      }
    },[socket,quill])

    useEffect(() => {
      if(socket && quill) {

        socket.on("load-data", document => {
          quill.setContents(document)
        })

        socket.emit("get-data",id.id)
      }
    },[quill,socket,id.id])

    useEffect(() => {
      if(socket && quill) {
        socket.on("receive-data", (delta) => {
          quill.updateContents(delta)
        })
      }
    },[quill,socket])

    useEffect(() => {
        if (quill && socket) {
          quill.on('text-change', (delta, oldDelta, source) => {
      
            if(source !== 'user') return
            socket.emit("send-data",delta)
          });
        }
      }, [quill,socket]);

  return (
    <>
      <div style={{ width: 770, height: 830 }}>
        <div ref={quillRef} />
      </div>
    </>
  )
}

export default DocumentEditor