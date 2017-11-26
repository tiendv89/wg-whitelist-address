import {Linking, Dimensions, Platform, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => Platform.OS === 'ios' ? Math.floor(width / guidelineBaseWidth * size) : size;
const verticalScale = size => Math.floor(height / guidelineBaseHeight * size);
const moderateScale = (size, factor = 0.5) => Math.floor(size + ( scale(size) - size ) * factor);


const LaunchURL = function (url) {
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            console.log('Can\'t handle url: ' + url);
        } else {
            Linking.openURL(url)
                .catch(err => {
                    if (url.includes('telprompt')) {
                        // telprompt was cancelled and Linking openURL method sees this as an error
                        // it is not a true error so ignore it to prevent apps crashing
                        // see https://github.com/anarchicknight/react-native-communications/issues/39
                    } else {
                        console.warn('openURL error', err)
                    }
                });
        }
    }).catch(err => console.warn('An unexpected error happened', err));
};

const getValidArgumentsFromArray = function(array, type) {
    let validValues = [];
    array.forEach(function(value) {
        if(isCorrectType(type, value)) {
            validValues.push(value);
        }
    });

    return validValues;
};

const isCorrectType = function(expected, actual) {
    return Object.prototype.toString.call(actual).slice(8, -1) === expected;
};


const emailTo = function (to, cc, bcc, subject, body) {
    let url = 'mailto:';
    let argLength = arguments.length;

    switch (argLength) {
        case 0:
            LaunchURL(url);
            return;
        case 5:
            break;
        default:
            console.log('you must supply either 0 or 5 arguments. You supplied ' + argLength);
            return;
    }

    // we use this Boolean to keep track of when we add a new parameter to the querystring
    // it helps us know when we need to add & to separate parameters
    let valueAdded = false;

    if (isCorrectType('Array', arguments[0])) {
        let validAddresses = getValidArgumentsFromArray(arguments[0], 'String');

        if (validAddresses.length > 0) {
            url += encodeURIComponent(validAddresses.join(','));
        }
    }

    url += '?';

    if (isCorrectType('Array', arguments[1])) {
        let validAddresses = getValidArgumentsFromArray(arguments[1], 'String');

        if (validAddresses.length > 0) {
            valueAdded = true;
            url += 'cc=' + encodeURIComponent(validAddresses.join(','));
        }
    }

    if (isCorrectType('Array', arguments[2])) {
        if (valueAdded) {
            url += '&';
        }

        let validAddresses = getValidArgumentsFromArray(arguments[2], 'String');

        if (validAddresses.length > 0) {
            valueAdded = true;
            url += 'bcc=' + encodeURIComponent(validAddresses.join(','));
        }
    }

    if (isCorrectType('String', arguments[3])) {
        if (valueAdded) {
            url += '&';
        }

        valueAdded = true;
        url += 'subject=' + encodeURIComponent(arguments[3]);
    }

    if (isCorrectType('String', arguments[4])) {
        if (valueAdded) {
            url += '&';
        }

        url += 'body=' + encodeURIComponent(arguments[4]);
    }

    LaunchURL(url);
};

export {scale, verticalScale, moderateScale, emailTo};