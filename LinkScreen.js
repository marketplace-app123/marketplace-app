import React, { useMemo } from "react";
import { View, ActivityIndicator } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useFocusEffect } from "@react-navigation/native";

const SITE = "https://marketplace.eventiefiere.com";

export default function LinkScreen({ title, path, fullUrl }) {
  const url = useMemo(() => fullUrl || (SITE.replace(/\/$/, "") + (path || "")), [path, fullUrl]);

  useFocusEffect(
    React.useCallback(() => {
      const open = async () => {
        await WebBrowser.openBrowserAsync(url, { showTitle: true, toolbarColor: "#111827" });
      };
      open();
      return () => {};
    }, [url])
  );

  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
      <ActivityIndicator />
    </View>
  );
}
