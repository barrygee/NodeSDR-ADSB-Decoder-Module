# Project: NodeSDR - ADS-B Decoder Module

<strong>Tech:</strong> JavaScript (ES6), Node.js, Express.js, Mocha.js, Chai.js

<strong>Status:</strong> In development

<br>

## Overview

ADS-B Decoder module for <a href="https://github.com/barrygee/NodeSDR">NodeSDR</a>

<br>

## Setup

To add this module to NodeSDR:

- Clone the module source code from Github

    - `git clone ` 

    - Copy the cloned repository into the **NodeSDR > app > modules** directory

    - Require adsb-decoder module router in **NodeSDR > app > api > v1 > routers > router.js**  
        `const adsbDecoderModuleRouter = require('../../../modules/adsb-decoder/router')`
        
    - Add a module router to **NodeSDR > app > api > v1 > routers > router.js**  
        `router.use('/adsb', adsbDecoderModuleRouter.routes(tcpServer))`

<br>

## Testing

Unit tests can be run by:

<br>

## Dependencies

The module has the following dependencies:

- NodeSDR tcp-server.js file
- ExpressJS

The dependencies detailed are used throughout the NodeSDR application and are installed by default by NodeSDR.  
The tcp-server.js file is passed into the module via the module router within NodeSDR > app > app.js

<br>

## Recieve raw ADS-B data

- **Install RTL-SDR drivers and dependencies on the host**

    Reference: https://osmocom.org/projects/rtl-sdr/wiki/Rtl-sdr

- **Start receiving ADS-B data and make it available over the network**

    On the host with SDR connected run: `rtl_adsb | netcat -klp 8080`

<br>

## API

The module exposes the follwing APIs:

**api details**

- **functionality 1**

    `http://localhost:1234/api/v1/adsb-decoder`

    Example:

    `http://localhost:1234/api/v1/adsb-decoder`

<br> 

- **functionality 2**

    `http://localhost:1234/api/v1/adsb-decoder/decode:data`

    Example:

    `http://localhost:1234/api/v1/adsb-decoder/decode:data`

<br>

## Raw data structure

An ADS-B message is 112 bits long, and consists of 5 parts.

Raw message in hexadecimal: 8D4840D6202CC371C32CE0576098

[00100]0000010110011
00001101110001110000
110010110011100000

| nBits  | Bits      | Abbr.  | Name  
|--------|-----------|--------|-----
| 5      | 1 - 5     | DF     | Downlink Format 
| 3      | 6 - 8     | CA     | Capability (additional identifier)
| 24     | 9 - 32    | ICAO   | ICAO aircraft address
| 56     | 33 - 88   | DATA   | Data
|        | [33 - 37] | [TC]   | Type code
| 24     | 89 - 112  | PI     | Parity/Interrogator ID

Reference: https://mode-s.org/decode/adsb/introduction.html                        
