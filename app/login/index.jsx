import { View, Text, Image, Pressable } from 'react-native'
import React, { useCallback } from 'react'
import Colors from './../../constants/Colors'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
       
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <View style={{
     height: '100%',
      backgroundColor: Colors.WHITE,
    }}>
    <Image source={require('./../../assets/images/pug.jpg')}
    style={{
      width: '100%',
      height: 300,
      marginTop: 50,
      marginEnd: 10,
     
    }}
/>
<View style={{
  padding: 20,
  display: 'flex',
  alignItems: 'center',
}}>
  <Text style={{fontSize: 20,
textAlign: 'center',
fontFamily: 'nerko',
textAlign: 'center',
}}>Ready to make a new friend? 
  </Text>
  <Text style={{fontSize: 18,
textAlign: 'center',
fontFamily: 'quick',
color: Colors.GRAY,
  }}>
  Find your dream dog 🐕✨ Start your journey to a new best friend today! 🐾❤️  
  </Text>
  <Pressable onPress={onPress}
  style={{
    padding: 14,
    marginTop: 100,
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    borderRadius: 14,
  }}
  >
    <Text>
      Get Started
    </Text>
  </Pressable>
  </View>
    
    </View>
  )
}