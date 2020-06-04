# node-red-contrib-schneider-pm3200
A Node-RED node to read Schneider PM3200 series over Modbus TCP/IP
## Node-RED configurator to read Schneider PM3200 over Modbus TCP/IP through Ethernet gateway.

## How to use

### pm3200 node
Use the `pm3200` node to configure which information you want to request from the gateway.

Wire the output of the `pm3200` to the input of the `Modbus Flex Getter`.

### converter node
Use the `converter` node to convert the values from the modbus response into human readable numbers.

Wire the second output of the `Modbus Flex Getter` to the input of the `converter`.

## Equipment Compatibility

This module has been developed and tested on:
+ PowerLogic PM3250
+ Ethernet Gateway Link150

