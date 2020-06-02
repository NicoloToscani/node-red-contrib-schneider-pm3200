module.exports = function(RED) {
    function extractorNode(config) {
        RED.nodes.createNode(this,config);
        this.name = config.name;
        this.unitId = config.unitId;
        this.data = config.data;
        var node = this;
        node.on('input', function(msg) {
        switch(msg.format) {
            case "float32":
                msg.payload = msg.payload.buffer.readFloatBE(0,4).toFixed(2);
                node.send(msg);
            break;
            case "uint32":
                msg.payload = msg.payload.buffer.readUInt32BE(0,4).toFixed(2);
                node.send(msg);
            break;
            case "int64":
                msg.payload = (((((msg.payload.data[0] * 65536 ) + msg.payload.data[1] ) * 65536 ) + msg.payload.data[2] ) * 65536 + msg.payload.data[3])/1000;
                node.send(msg);
            break;
            default:
                node.warn("Extractor not configured for this data format: (" + msg.format + ")." );
                node.send(msg);
        }
 
// Power Factor Total:
// -2<PF<-1: Quad 2, active power negative, capacitive
// -1<PF<0: Quad 3, active power negative, inductive
// 0<PF<1: Quad 1, active power positive, inductive
// 1<PF<2: Quad 4, active power positive, capacitive
if (msg.topic === "loadRunHourCounter") {
    seconds = msg.payload;
    var secToHour = (seconds / 3600).toFixed(0);
    msg.payload = secToHour;
    return [ msg, null ];
}

        });
    }
    RED.nodes.registerType("extractor",extractorNode);
}