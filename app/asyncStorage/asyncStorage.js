import AsyncStorage from "@react-native-community/async-storage";

export const _storeData = async (key, val) => {
    try {
        await AsyncStorage.setItem(key, val);
    } catch (e) {
        alert("Error saving data");
    }
};

export const _retrieveData = key => {
    return AsyncStorage.getItem(key)
        .then(val => {
            const obj = JSON.parse(val);

            return obj;
        })
        .catch(e => {
            alert(e);
        });
};

export const _deleteData = async key => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (e) {
        return false;
    }
};
