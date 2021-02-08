const chai           = require('chai')
const expect         = require('chai').expect
const chaiAsPromised = require('chai-as-promised')
const utils          = require('../../../utils')
const adsbDecoder    = require('../adsb-decoder')

chai.use(chaiAsPromised)

describe('ADSB Decoder', () => {

    describe('decode()', () => {

        it('should return an Object of decoded ADS-B data', () => {  
            const adsbData = '*8D4840D6202CC371C32CE0576098;'
            expect(adsbDecoder.decode(adsbData)).to.be.instanceOf(Object)
        })

        it('should return an error if a value is not provided', () => {  
            expect(adsbDecoder.decode()).to.be.instanceOf(Error).with.property('message', 'Invalid value provided')
        })

        it('should return an error if an empty string is provided', () => {  
            expect(adsbDecoder.decode('')).to.be.instanceOf(Error).with.property('message', 'Invalid value provided')
        })

        it('should return an error if an object is provided', () => {  
            expect(adsbDecoder.decode({})).to.be.instanceOf(Error).with.property('message', 'Invalid value provided')
        })

        it('should return an error if an int is provided', () => {  
            expect(adsbDecoder.decode(12345)).to.be.instanceOf(Error).with.property('message', 'Invalid value provided')
        })

        it('should return an error if a value of undefined is provided', () => {  
            expect(adsbDecoder.decode(undefined)).to.be.instanceOf(Error).with.property('message', 'Invalid value provided')
        })

        it('should return an error if a value of null is provided', () => {  
            expect(adsbDecoder.decode(null)).to.be.instanceOf(Error).with.property('message', 'Invalid value provided')
        })
    })

    describe('convertHexidecimalValuesToBinaryValues()', () => {

        it('should return a binary representation of the hexidecimal string values provided', () => {  
            const adsbData = '8D4840D6202CC371C32CE0576098'
            expect(adsbDecoder.convertHexidecimalValuesToBinaryValues(adsbData)).to.equal('1000110101001000010000001101011000100000001011001100001101110001110000110010110011100000010101110110000010011000')
        })

        it('should return null if a value is not provided', () => {  
            expect(adsbDecoder.convertHexidecimalValuesToBinaryValues()).to.be.null
        })

        it('should return null if an int value is provided', () => {  
            expect(adsbDecoder.convertHexidecimalValuesToBinaryValues(123)).to.be.null
        })

        it('should return null if an Array is provided', () => {  
            expect(adsbDecoder.convertHexidecimalValuesToBinaryValues(['a', 'b', 'c', '1', '2', '3'])).to.be.null
        })

        it('should return null if an Object is provided', () => {  
            expect(adsbDecoder.convertHexidecimalValuesToBinaryValues({})).to.be.null
        })
    })

    describe('isValidABSDData()', () => {

        it('should return true if a valid value is provided', () => {  
            expect(adsbDecoder.isValidABSDData('*8D4840D6202CC371C32CE0576098;')).to.equal(true)
        })

        it('should return false if a value is not provided', () => {  
            expect(adsbDecoder.isValidABSDData()).to.equal(false)
        })

        it('should return false if an empty string is provided', () => {  
            expect(adsbDecoder.isValidABSDData('')).to.equal(false)
        })

        it('should return false if an object is provided', () => {  
            expect(adsbDecoder.isValidABSDData({})).to.equal(false)
        })

        it('should return false if a value of undefined is provided', () => {  
            expect(adsbDecoder.isValidABSDData(undefined)).to.equal(false)
        })

        it('should return false if a value of null is provided', () => {  
            expect(adsbDecoder.isValidABSDData(null)).to.equal(false)
        })
    })

    describe('processTypeCodeSegment()', () => {
        
        it('should return the an Object containing the correct code and name when typeCode 1 is provided', () => {  
            const typeCode = 1
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 1, "name": "Aircraft identification"})
        })

        it('should return the an Object containing the correct code and name when typeCode 2 is provided', () => {  
            const typeCode = 2
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 2, "name": "Aircraft identification"})
        })

        it('should return the an Object containing the correct code and name when typeCode 3 is provided', () => {  
            const typeCode = 3
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 3, "name": "Aircraft identification"})
        })

        it('should return the an Object containing the correct code and name when typeCode 4 is provided', () => {  
            const typeCode = 4
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 4, "name": "Aircraft identification"})
        })

        it('should return the an Object containing the correct code and name when typeCode 5 is provided', () => {  
            const typeCode = 5
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 5, "name": "Surface position"})
        })

        it('should return the an Object containing the correct code and name when typeCode 6 is provided', () => {  
            const typeCode = 6
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 6, "name": "Surface position"})
        })

        it('should return the an Object containing the correct code and name when typeCode 7 is provided', () => {  
            const typeCode = 7
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 7, "name": "Surface position"})
        })

        it('should return the an Object containing the correct code and name when typeCode 8 is provided', () => {  
            const typeCode = 8
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 8, "name": "Surface position"})
        })

        it('should return the an Object containing the correct code and name when typeCode 9 is provided', () => {  
            const typeCode = 9
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 9, "name": "Airborne position (w/ Baro Altitude)"})
        })

        it('should return the an Object containing the correct code and name when typeCode 10 is provided', () => {  
            const typeCode = 10
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 10, "name": "Airborne position (w/ Baro Altitude)"})
        })

        it('should return the an Object containing the correct code and name when typeCode 11 is provided', () => {  
            const typeCode = 11
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 11, "name": "Airborne position (w/ Baro Altitude)"})
        })

        it('should return the an Object containing the correct code and name when typeCode 12 is provided', () => {  
            const typeCode = 12
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 12, "name": "Airborne position (w/ Baro Altitude)"})
        })

        it('should return the an Object containing the correct code and name when typeCode 13 is provided', () => {  
            const typeCode = 13
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 13, "name": "Airborne position (w/ Baro Altitude)"})
        })

        it('should return the an Object containing the correct code and name when typeCode 14 is provided', () => { 
            const typeCode = 14
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 14, "name": "Airborne position (w/ Baro Altitude)"})
        })

        it('should return the an Object containing the correct code and name when typeCode 15 is provided', () => {  
            const typeCode = 15
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 15, "name": "Airborne position (w/ Baro Altitude)"})
        })

        it('should return the an Object containing the correct code and name when typeCode 16 is provided', () => {  
            const typeCode = 16
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 16, "name": "Airborne position (w/ Baro Altitude)"})
        })

        it('should return the an Object containing the correct code and name when typeCode 17 is provided', () => {  
            const typeCode = 17
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 17, "name": "Airborne position (w/ Baro Altitude)"})
        })

        it('should return the an Object containing the correct code and name when typeCode 18 is provided', () => {  
            const typeCode = 18
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 18, "name": "Airborne position (w/ Baro Altitude)"})
        })

        it('should return the an Object containing the correct code and name when typeCode 19 is provided', () => {  
            const typeCode = 19
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 19, "name": "Airborne velocities"})
        })

        it('should return the an Object containing the correct code and name when typeCode 20 is provided', () => {  
            const typeCode = 20
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 20, "name": "Airborne position (w/ GNSS Height)"})
        })

        it('should return the an Object containing the correct code and name when typeCode 21 is provided', () => {  
            const typeCode = 21
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 21, "name": "Airborne position (w/ GNSS Height)"})
        })

        it('should return the an Object containing the correct code and name when typeCode 22 is provided', () => {  
            const typeCode = 22
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 22, "name": "Airborne position (w/ GNSS Height)"})
        })

        it('should return the an Object containing the correct code and name when typeCode 23 is provided', () => {  
            const typeCode = 23
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 23, "name": "Reserved"})
        })

        it('should return the an Object containing the correct code and name when typeCode 24 is provided', () => {  
            const typeCode = 24
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 24, "name": "Reserved"})
        })

        it('should return the an Object containing the correct code and name when typeCode 25 is provided', () => {  
            const typeCode = 25
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 25, "name": "Reserved"})
        })

        it('should return the an Object containing the correct code and name when typeCode 26 is provided', () => {  
            const typeCode = 26
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 26, "name": "Reserved"})
        })

        it('should return the an Object containing the correct code and name when typeCode 27 is provided', () => {  
            const typeCode = 27
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 27, "name": "Reserved"})
        })

        it('should return the an Object containing the correct code and name when typeCode 28 is provided', () => {  
            const typeCode = 28
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 28, "name": "Aircraft status"})
        })

        it('should return the an Object containing the correct code and name when typeCode 29 is provided', () => {  
            const typeCode = 29
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 29, "name": "Target state and status information"})
        })

        it('should return the an Object containing the correct code and name when typeCode 31 is provided', () => {  
            const typeCode = 31
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 31, "name": "Aircraft operation status"})
        })

        it('should return default case with provided type code updated to \'0\' and name \'Invalid type code\'', () => {  
            const typeCode = 'Invalid'
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 0, "name": "Invalid type code"})
        })
    
        it('should return default case with provided type code updated to \'0\' and name \'Invalid type code\' when a type code of \'null\' is provided', () => {  
            const typeCode = null
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 0, "name": "Invalid type code"})
        })

        it('should return default case with provided type code updated to \'0\' and name \'Invalid type code\' when a type code of \'undefined\' is provided', () => {  
            const typeCode = undefined
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 0, "name": "Invalid type code"})
        })

        it('should return default case with provided type code updated to \'0\' and name \'Invalid type code\' when a type code of \'\' is provided', () => {  
            const typeCode = ''
            expect(adsbDecoder.processTypeCodeSegment(typeCode)).to.eql({"code": 0, "name": "Invalid type code"})
        })
    })

    describe('adsbBinaryDataSegment()', () => {

        const ADBSData = adsbDecoder.convertHexidecimalValuesToBinaryValues('8D4840D6202CC371C32CE0576098')
    
        it('should return \'DF\' segment of ADS-B data provided', () => {  
            expect(adsbDecoder.adsbBinaryDataSegment(ADBSData, 'DF')).to.equal('10001')
        })

        it('should return \'CA\' segment of ADS-B data provided', () => {  
            expect(adsbDecoder.adsbBinaryDataSegment(ADBSData, 'CA')).to.equal('101')
        })

        it('should return \'ICAO\' segment of ADS-B data provided', () => {  
            expect(adsbDecoder.adsbBinaryDataSegment(ADBSData, 'ICAO')).to.equal('010010000100000011010110')
        })

        it('should return \'TYPE\' segment of ADS-B data provided', () => {  
            expect(adsbDecoder.adsbBinaryDataSegment(ADBSData, 'TYPE')).to.equal('00100')
        })

        it('should return \'EC\' segment of ADS-B data provided', () => {  
            expect(adsbDecoder.adsbBinaryDataSegment(ADBSData, 'EC')).to.equal('000')
        })

        it('should return \'MESSAGE\' segment of ADS-B data provided', () => {  
            expect(adsbDecoder.adsbBinaryDataSegment(ADBSData, 'MESSAGE')).to.equal('001011001100001101110001110000110010110011100000')
        })

        it('should return \'PI\' segment of ADS-B data provided', () => {  
            expect(adsbDecoder.adsbBinaryDataSegment(ADBSData, 'PI')).to.equal('010101110110000010011000')
        })

        it('should return an Error if an invalid segment identifier is provided', () => {  
            expect(adsbDecoder.adsbBinaryDataSegment(ADBSData, 'INVALID SEGMENT IDENTIFIER')).to.be.instanceOf(Error).with.property('message', 'An invalid segment identifier was provided')
        })
    })

    describe('createADSBDataObject()', () => {

        // const ADBSData = adsbDecoder.convertHexidecimalValuesToBinaryValues('8D4840D6202CC371C32CE0576098')
        const ADBSData = adsbDecoder.convertHexidecimalValuesToBinaryValues('ceebbf0d0abd26f7284848ed4ca6')
        
        it('should return an Object when valid binary data array is provided', () => {  
            expect(adsbDecoder.createADSBDataObject(ADBSData)).to.be.instanceOf(Object)
        })
    })

    describe('adsbMessageCharator()', () => {

        it('should return the String \'A\' when the value \'1\' is provided', () => {  
            expect(adsbDecoder.adsbMessageCharator(1)).to.equal('A')
        })

        it('should return the String \'_\' when the value \'32\' is provided', () => {  
            expect(adsbDecoder.adsbMessageCharator(32)).to.equal('_')
        })

        it('should return the String \'0\' when the value \'48\' is provided', () => {  
            expect(adsbDecoder.adsbMessageCharator(48)).to.equal('0')
        })

        it('should return the String \'#\' when a value not in the ranges (1 - 26 | 32 | 48 - 57) is provided', () => {  
            expect(adsbDecoder.adsbMessageCharator(0)).to.equal('#')
        })

        it('should return an Error when a no value is provided', () => {  
            expect(adsbDecoder.adsbMessageCharator()).to.be.instanceOf(Error).with.property('message', 'An invalid position was provided')
        })

        it('should return an Error when an invalid value is provided', () => {  
            expect(adsbDecoder.adsbMessageCharator(65)).to.be.instanceOf(Error).with.property('message', 'An invalid position was provided')
        })
    })

    describe('decodeMessage()', () => {

        const MessageBinaryData = '001011001100001101110001110000110010110011100000'
        const typeCode = 4
        it('should return the message \'KLM1023_\'', () => {  
            expect(adsbDecoder.decodeMessage(MessageBinaryData, typeCode)).to.equal('KLM1023_')
        })

        // it('should return an Error when a typecode is not provided', () => {  
        //     expect(adsbDecoder.decodeMessage(MessageBinaryData)).to.be.instanceOf(Error).with.property('message', 'AN ERROR MESSAGE HERE')
        // })
    })
})