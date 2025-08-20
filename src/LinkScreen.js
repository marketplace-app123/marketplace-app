import React, { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { View, ActivityIndicator, BackHandler } from "react-native";
import { WebView } from "react-native-webview";

const SITE = "https://marketplace.eventiefiere.com";

export default function LinkScreen({ path, fullUrl }) {
  const url = useMemo(() => fullUrl || (SITE.replace(/\/$/, "") + (path || "")), [path, fullUrl]);
  const webRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (canGoBack && webRef.current) { webRef.current.goBack(); return true; }
      return false;
    });
    return () => sub.remove();
  }, [canGoBack]);

  const onNavStateChange = useCallback((nav) => setCanGoBack(nav.canGoBack), []);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webRef}
        source={{ uri: url }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={onNavStateChange}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
        allowsBackForwardNavigationGestures
      />
      {loading && (
        <View style={{ position:"absolute", left:0, right:0, top:0, bottom:0, alignItems:"center", justifyContent:"center" }}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
}
