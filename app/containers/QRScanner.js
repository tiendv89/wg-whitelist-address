import React, {Component} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {BarCodeScanner, Permissions} from 'expo';
import ResultScreen from './ResultScreen';
import * as errors from '../errors';
import validation_str from '../validation_str';
import {emailTo} from "../utils";

export default class QRScanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            width: 200,
            height: 200,
            result: errors.ERROR_UNDEFINED
        };
    }

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = ({type, data}) => {
        if (data.length > 0) {
            if (validation_str.indexOf(data) != -1) {
                this.setState({result: errors.ERROR_NO_EROR});
            } else {
                this.setState({result: errors.ERROR_VALIDATION_FAILED});
                emailTo(['tiendv.52@gmail.com'], [], [], 'Wrong WG address: ' + data, 'Wrong WG address: ' + data);
            }
        } else {
            this.setState({result: errors.ERROR_EMPTY_STRING});
        }
    };

    render() {
        return (
            <View style={styles.container}
                  onLayout={(e) => this.setState({
                      width: e.nativeEvent.layout.width,
                      height: e.nativeEvent.layout.height
                  })}
            >
                {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                        <Text>Camera permission is not granted</Text> :
                        this.state.result === errors.ERROR_UNDEFINED ?
                            <BarCodeScanner
                                onBarCodeRead={this._handleBarCodeRead}
                                style={{width: this.state.width, height: this.state.height}}
                            />
                            :
                            <ResultScreen
                                result={this.state.result}
                                backToQR={() => this.setState({result: errors.ERROR_UNDEFINED})}
                            />
                      }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    }
});