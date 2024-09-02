import DeviceInfo from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize';

export const getDeviceInfo = async () => {
    const bestLanguage = RNLocalize.findBestLanguageTag(['en', 'fr', 'de', 'es']);
    const languageTag = bestLanguage ? bestLanguage.languageTag : 'en';

    return {
        batteryLevel: await DeviceInfo.getBatteryLevel(),
        brand: DeviceInfo.getBrand(),
        buildNumber: DeviceInfo.getBuildNumber(),
        carrier: await DeviceInfo.getCarrier(),
        deviceId: DeviceInfo.getDeviceId(),
        freeDiskStorage: await DeviceInfo.getFreeDiskStorage(),
        manufacturer: await DeviceInfo.getManufacturer(),
        readableVersion: DeviceInfo.getVersion(),
        systemVersion: DeviceInfo.getSystemVersion(),
        totalDiskCapacity: await DeviceInfo.getTotalDiskCapacity(),
        totalMemory: await DeviceInfo.getTotalMemory(),
        uniqueId: DeviceInfo.getUniqueId(),
        isEmulator: await DeviceInfo.isEmulator(),
        deviceCountry: RNLocalize.getCountry(),
        locale: 'en',
        is24hour: RNLocalize.uses24HourClock(),
        timezone: RNLocalize.getTimeZone(),
        // batteryLevel: 0.8,
        // brand: 'Samsung',
        // buildNumber: '12345',
        // carrier: 'Verizon',
        // deviceId: 'SM-G950F',
        // freeDiskStorage: 5000000000,
        // manufacturer: 'Samsung',
        // readableVersion: '1.0.0',
        // systemVersion: '9',
        // totalDiskCapacity: 64000000000,
        // totalMemory: 4000000000,
        // uniqueId: 'unique-device-id',
        // isEmulator: false,
        // deviceCountry: 'US',
        // locale: 'en',
        // is24hour: true,
        // timezone: 'America/New_York',
    };
};