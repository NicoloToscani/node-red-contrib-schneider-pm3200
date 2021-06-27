# node-red-contrib-schneider-metsepm3200
A Node-RED node to read Schneider PM3200 series over Modbus TCP/IP
## Node-RED configurator to read Schneider PM3200 over Modbus TCP/IP through Ethernet gateway.

## Install
You can install this node directly from the "Manage Palette" menu in the Node-RED interface.

Alternatively, run the following command in your Node-RED user directory - typically `~/.node-red` on Linux or `%HOMEPATH%\.nodered` on Windows

        npm install node-red-contrib-schneider-metsepm3200 

## How to use

### pm3200 node
Use the `pm3200` node to configure which information you want to request from the gateway.

Wire the output of the `pm3200` to the input of the `Modbus Flex Getter`.

Enable check box `Keep Msg Properties` in the `Modbus Flex Getter` properties.

### converter node
Use the `converter` node to convert the values from the modbus response into human readable numbers.

Wire the second output of the `Modbus Flex Getter` to the input of the `converter`.

## Usage
List of measurements :

| Address                       | Step7 equivalent      | JS Data type  | Description |
| ----------------------------- | --------------------- | ------------- | ----------- |
| `DB5,X0.1`                    | `DB5.DBX0.1`          | Boolean       | Bit 1 of byte 0 of DB 5 |
| `DB23,B1` or `DB23,BYTE1`     | `DB23.DBB1`           | Number        | Byte 1 (0-255) of DB 23 |
| `DB100,C2` or `DB100,CHAR2`   | `DB100.DBB2`          | String        | Byte 2 of DB 100 as a Char |

### Meter data 
![data-config](docs/data-config.png)

### Sample flow
![sample-flow](docs/sample-flow.png)

## Equipment Compatibility

This module has been developed and tested on:
+ PowerLogic PM3250
+ Ethernet Gateway Link150

