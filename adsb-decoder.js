const utils  = require('../../utils')
const status = require('./config/status')


function isValidABSDData(ADSBData) {
    return (utils.nullOrUndefined(ADSBData) === false
            && ADSBData !== ''
            && ADSBData.length == 30)
            ? true : false
}

/*
    return a segment of the full ads-b binary data message based on the segment ('DF', 'CA', 'ICAO', 'TC', 'DATA', 'PI') provided
*/
function adsbBinaryDataSegment(ADBSData, segment) {

    switch(segment) {

        case 'DF':
            return ADBSData.substring(0, 5)

        case 'CA':
            return ADBSData.substring(5, 8)

        case 'ICAO':
            return ADBSData.substring(8, 32)

        case 'TYPE':
            return ADBSData.substring(32, 37)
        
        case 'EC':
            return ADBSData.substring(37, 40)

        case 'MESSAGE':
            return ADBSData.substring(40, 88)
        
        case 'PI':
            return ADBSData.substring(88, 112)

        default:
            return new Error('An invalid segment identifier was provided')
    }
}

function processTypeCodeSegment(typeCode) {

    let type = {
        "code": typeCode
    }

    switch(true) {
    
        case typeCode >= 1 && typeCode <= 4: 
            type.name = "Aircraft identification"
            break

        case typeCode >= 5 && typeCode <= 8:
            type.name = "Surface position"
            break
            
        case typeCode >= 9 && typeCode <= 18:
            type.name = "Airborne position (w/ Baro Altitude)"
            break
        
        case typeCode == 19:
            type.name = "Airborne velocities"
            break
            
        case typeCode >= 20 && typeCode <= 22:
            type.name = "Airborne position (w/ GNSS Height)"
            break

        case typeCode >=23 && typeCode <= 27:
            type.name = "Reserved"
            break
        
        case typeCode == 28:
            type.name = "Aircraft status"
            break
            
        case typeCode == 29:
            type.name = "Target state and status information"
            break

        case typeCode == 31:
            type.name = "Aircraft operation status"
            break

        default:
            type.code = 0
            type.name = "Invalid type code"
    }

    return type
}

function convertHexidecimalValuesToBinaryValues(sanitizedString) {
    
    // confirm that the value of sanitizedString is a string. Otherwise, return null
    if(typeof sanitizedString === 'string') {

        let ADSBBinaryData = ''

        // loop through each charactor in the sanitizedString
        for(let positionInString = 0; positionInString < sanitizedString.length; positionInString++) {

            // convert each charactor in sanitizedString string to 4 digit binary
            // concatinate the binary value on the ADSBBinaryData variable
            ADSBBinaryData += utils.convertHexToBinary(sanitizedString.charAt(positionInString))
        }

        return ADSBBinaryData
    } 

    return null
}

function createADSBDataObject(binaryData) {
    /*
        Reference: https://mode-s.org/decode/adsb/introduction.html

        DF: Downlink format 
            - Length: 5 bits
            - Bits: 1 - 5
            - Values: 17 or 18 representing ADS-B (17) or TIS-B (18)

        CA: Capability (additional identifier)
            - Length: 3 bits
            - Bits: 6 - 8

        ICAO: ICAO aircraft address
            - Length: 24 bits
            - Bits: 9 - 32

        DATA: Data                   |       TC: Type code             |       EC: Emitter category       |       MESSAGE: Message data
            - Length: 56 bits        -          - Length: 5 bits       -          - Length: 3 bits        -               - Length: 48 bits
            - Bits: 33 - 88          |          - Bits: 33 - 37        |          - Bits: 38 - 40         |               - Bits: 41 - 88

        PI: Parity/Interrogator ID
            - Length: 24 bits
            - Bits: 89 - 112
    */

    /* 
        NEED TO PERFORM ERROR CORRECTION AND VALIDATION ON binaryData, before if is used below
        - https://mode-s.org/decode/adsb/introduction.html
        - ADS-B Checksum
    */
    // console.log('RAW ICAO', adsbBinaryDataSegment(binaryData, 'ICAO'))
    const DF      = utils.convertBinaryToDecimal(adsbBinaryDataSegment(binaryData, 'DF'))
    const CA      = utils.convertBinaryToDecimal(adsbBinaryDataSegment(binaryData, 'CA'))
    const ICAO    = utils.convertBinaryToHex(adsbBinaryDataSegment(binaryData, 'ICAO'))
    const TYPE    = processTypeCodeSegment(utils.convertBinaryToDecimal(adsbBinaryDataSegment(binaryData, 'TYPE')))
    const EC      = utils.convertBinaryToDecimal(adsbBinaryDataSegment(binaryData, 'EC'))
    const MESSAGE = decodeMessage(adsbBinaryDataSegment(binaryData, 'MESSAGE'), TYPE.code)
    const PI      = adsbBinaryDataSegment(binaryData, 'PI') // gets correct pority bits and ocnverts into correct binary

    const ADSBDataObject = {
        "DF"  : DF,
        "CA"  : CA,
        "ICAO": ICAO,
        "DATA": {
            "TC"  : TYPE.name,
            "EC"  : EC,
            "MESSAGE": MESSAGE,
        },
        "PI"  : PI
    }

    // for testing only
    TYPE.code >= 1 && TYPE.code <= 4 ? console.log(ADSBDataObject) : null
    // ADSBDataObject.DATA.MESSAGE.includes('EZY') ? console.log(ADSBDataObject) : null
    // ADSBDataObject.DATA.MESSAGE.includes('TOM') ? console.log(ADSBDataObject) : null
    
    return ADSBDataObject
}

function adsbMessageCharator(position) {
    const charactorArray = ["#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "#", "#", "#", "#", "#", "_", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "#", "#", "#", "#", "#", "#"]

    if(position >= 0 && position <= charactorArray.length) {
        return charactorArray[position]
    }

    return new Error('An invalid position was provided')
}

/*
    TO DO
*/
function processDataSegment(ADSBData) {

}

// TO UPDATE
/*
    check typecode
        - then decode message in appropriate way depending on the type of message being recieved 
            - Aircraft Identification
            - Airborne Positions
            - Airborne Volicty 
            - .....
*/
function decodeMessage(MessageBinaryData, typeCode) {

    let startPosition = 0
    let count = 6
    let message = ''

    // loop through the message binary data
    for(let i = startPosition; i < MessageBinaryData.length; i += count) {

        // add the 'count' amount to the current 'startPosition'
        let endPosition = startPosition + count

        // get the segment of binary data
        // convert the value from binary to decimal
        // convert the decimal value to a charactor
        message += adsbMessageCharator(utils.convertBinaryToDecimal(MessageBinaryData.substring(startPosition, endPosition)))

        // update the startPosition
        startPosition += count
    }

    return message
}

function decode(ADSBData) {

    if(isValidABSDData(ADSBData)) {
        return binaryData = createADSBDataObject(convertHexidecimalValuesToBinaryValues(utils.sanitizeString(utils.convertToString(ADSBData))))
    }

    return new Error(status.INVALID_VALUE)
}


module.exports = {  
    decode                                      : decode,
    convertHexidecimalValuesToBinaryValues      : convertHexidecimalValuesToBinaryValues,
    isValidABSDData                             : isValidABSDData,
    createADSBDataObject                        : createADSBDataObject,
    adsbBinaryDataSegment                       : adsbBinaryDataSegment,
    processTypeCodeSegment                      : processTypeCodeSegment,
    processDataSegment                          : processDataSegment,
    adsbMessageCharator                         : adsbMessageCharator,
    decodeMessage                               : decodeMessage
}