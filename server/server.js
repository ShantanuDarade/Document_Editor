const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/document_editor', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
const Model = require('./Model')

const io = require('socket.io')(3000, {
    cors: {
        origin: '*',
    }
})

async function findData(id) {
    const data = await Model.findById(id)
    if(data) return data
    else {
        return await Model.create({ _id:id, value:"" })
    }
}

io.on("connection", (socket) => {
    socket.on("get-data", async (id) => {
        const data = await findData(id)
        socket.join(id)
        socket.emit("load-data",data.value)
        socket.on("send-data", delta => {
            socket.broadcast.to(id).emit("receive-data", delta)
        })
        socket.on("save-data", async (data) => {
            await Model.findByIdAndUpdate(id, {value:data})
        })
    })
})
