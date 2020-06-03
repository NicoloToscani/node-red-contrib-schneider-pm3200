# node-red-contrib-schneider-pm3200
A Node-RED node to read Schneider PM3250 over Modbus TCP/IP
## Node-RED configurator to read Schneider PM3200 over Modbus TCP/IP through Ethernet gateway Link150.

## How to use

### pm3250 node
Use the `pm3250` node to configure which information you want to request from the gateway.

Wire the output of the `pm3250` to the input of the `Modbus Flex Getter`.

### extractor node
Use the `extractor` node to convert the values from the modbus response into human readable numbers.

Wire the second output of the `Modbus Flex Getter` to the input of the `extractor`.

## Equipment Compatibility

This module has been developed and tested on:
+ PowerLogic PM3250
+ Ethernet Gateway Link150

