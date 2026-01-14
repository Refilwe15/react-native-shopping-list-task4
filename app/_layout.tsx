// app/_layout.tsx
import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Slot } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#4F46E5" />
          </View>
        }
        persistor={persistor}
      >
        <Slot />
      </PersistGate>
    </Provider>
  );
}
