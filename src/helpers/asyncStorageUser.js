import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUserData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('user', jsonValue);

    } catch (e) {
      console.error(e);
    }
  };

   const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
        
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(e)
    }
  };
 
 
  const removeUserData = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch(e) {
      console.error(e);
    }
  }

  export{
    storeUserData,
    getUserData,
    removeUserData
  }