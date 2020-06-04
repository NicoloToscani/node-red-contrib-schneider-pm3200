module.exports = function(RED) {
    function converterNode(config) {
        RED.nodes.createNode(this,config);
        this.name = config.name;
        this.unitId = config.unitId;
        this.data = config.data;
        var node = this;
        node.on('input', function(msg) {
        switch(msg.format) {
            case "float32":
                msg.payload = msg.payload.buffer.readFloatBE(0,4).toFixed(2);
                if(msg.topic != "pFactorTot"){
                node.send(msg);
                } 
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
 
// Power Factor Total: convert powerfactor into 0 to 1 range 
if (msg.topic === "pFactorTot") {
    var payConv;
    // Quad 1
    if(msg.payload >= 0 && msg.payload <= 1){
        payConv = msg.payload;
        msg.payload = payConv.toFixed(2);
        msg.util = {
            loadType: "Inductive"
        }
        node.send(msg);
    }
    // Quad 2
    if(msg.payload >= -1 && msg.payload <= 0){
       payConv = msg.payload;
       msg.payload = payConv.toFixed(2);
       msg.util = {
        loadType: "Capacitive"
    }
       node.send(msg);
    }
    // Quad 3
    if(msg.payload >= -2 && msg.payload <= -1){
        payConv = msg.payload;
        msg.payload = payConv.toFixed(2);
        msg.util = {
            loadType: "Inductive"
        }
        node.send(msg);
     }

    // Quad 4
    if(msg.payload >= 1 && msg.payload <= 2){
        payConv = 2 - msg.payload;
        msg.payload = payConv.toFixed(2);
        msg.util = {
            loadType: "Capacitive"
        }
        node.send(msg);
    }
}
        });
    }
    RED.nodes.registerType("converter",converterNode);
}