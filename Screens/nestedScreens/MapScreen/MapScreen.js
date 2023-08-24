import { Text, View } from "react-native";
import styles from "./MapScreenStyles";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export const MapScreen = ({ navigation, route }) => {
  const { latitude, longitude } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          title="I am here"
          coordinate={{ latitude: latitude, longitude: longitude }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};
