import React, {Component} from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    View,
    TouchableOpacity,
    Text,
    Platform,
    StatusBar
} from 'react-native';
import {Constants} from 'expo';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {scale} from "../utils";
import * as errors from "../errors";

export default class ResultScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props);
    }

    renderBackButton() {
        return (
            <TouchableOpacity
                style={{
                    width: Dimensions.get('window').width * 0.8,
                    marginTop: 4    0,
                    height: scale(44),
                    borderRadius: 5,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: '#10ADE4',
                    backgroundColor: '#10ADE4',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...Platform.select({
                        ios: {
                            shadowColor: 'rgba(0,0,0, .4)',
                            shadowOffset: { height: 1, width: 1 },
                            shadowOpacity: 1,
                            shadowRadius: 1,
                        },
                        android: {
                            elevation: 2,
                        },
                    }),
                }}
                activeOpacity={0.6}
                onPress={() => this.props.backToQR()}
            >
                <Text style={{fontSize: scale(24), color: 'white'}}>
                    Tiếp tục
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        if (this.props.result === errors.ERROR_NO_EROR) {
            return (
                <View style={{flex: 1, alignItems: 'center', paddingTop: 50}}>
                    <Ionicons name="ios-checkmark-circle" size={scale(300)} color="#4cd964"/>
                    <Text style={{fontSize: scale(24)}}>
                        Xác minh thành công
                    </Text>
                    {this.renderBackButton()}
                </View>
            )
        } else {
            return (
                <View style={{flex: 1, alignItems: 'center', paddingTop: 50}}>
                    <Ionicons name="ios-close-circle" size={scale(300)} color="#ff3b30"/>
                    <Text style={{fontSize: scale(24)}}>
                        Xác minh thất bại
                    </Text>
                    {this.renderBackButton()}
                </View>
            )
        }
    }
}