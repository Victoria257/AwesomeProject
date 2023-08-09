import { Text, View } from "react-native";
import styles from "./MapScreenStyles";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ navigation, route }) => {
  const { latitude, longitude } = route.params;

  return (
    <View style={styles.container}>
      {/* <Text>Location:{location}</Text> */}
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
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
