import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { API_BASE_URL, API_KEYS } from "./config";

/** ------- Axios preconfigurato con chiavi Woo ------- */
const api = axios.create({
  baseURL: API_BASE_URL, // es: https://marketplace.eventiefiere.com/wp-json/wc/v3
  auth: {
    username: API_KEYS.consumerKey,
    password: API_KEYS.consumerSecret,
  },
  timeout: 20000,
});

/** ------- UI base ------- */
const Header = ({ title, onBack }) => (
  <View style={styles.header}>
    {onBack ? (
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>&larr; Torna indietro</Text>
      </TouchableOpacity>
    ) : null}
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Row = ({ label, onPress, subtitle }) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <Text style={styles.rowLabel}>{label}</Text>
    {subtitle ? <Text style={styles.rowSub}>{subtitle}</Text> : null}
  </TouchableOpacity>
);

/** ------- Schermata categorie (parent = 0 o un id) ------- */
const CategoriesScreen = ({ parentId = 0, title, onSelect, onBack }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await api.get("/products/categories", {
        params: {
          per_page: 100,
          parent: parentId, // 0 = top-level
          hide_empty: false,
          orderby: "name",
        },
      });
      setItems(res.data || []);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  }, [parentId]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={title} onBack={onBack} />
      {loading ? (
        <ActivityIndicator style={styles.center} />
      ) : err ? (
        <Text style={styles.error}>Errore: {err}</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Row
              label={item.name}
              subtitle={item.slug}
              onPress={() => onSelect(item)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.muted}>Nessuna categoria trovata.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

/** ------- Schermata prodotti ------- */
const ProductsScreen = ({ category, onBack, onSelectProduct }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await api.get("/products", {
        params: {
          per_page: 20,
          category: category.id, // usa il term_id (id) della categoria
          status: "publish",
        },
      });
      setItems(res.data || []);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  }, [category?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const renderItem = ({ item }) => {
    const img = item.images?.[0]?.src;
    return (
      <TouchableOpacity style={styles.card} onPress={() => onSelectProduct(item)}>
        {img ? <Image source={{ uri: img }} style={styles.thumb} /> : null}
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.price}>
            {item.price ? `${item.price} €` : "—"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`Prodotti: ${category?.name}`} onBack={onBack} />
      {loading ? (
        <ActivityIndicator style={styles.center} />
      ) : err ? (
        <Text style={styles.error}>Errore: {err}</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          ListEmptyComponent={
            <Text style={styles.muted}>Nessun prodotto trovato.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

/** ------- Dettaglio prodotto ------- */
const ProductDetailsScreen = ({ product, onBack }) => {
  const img = product?.images?.[0]?.src;
  return (
    <SafeAreaView style={styles.container}>
      <Header title={product?.name || "Dettaglio"} onBack={onBack} />
      <View style={{ padding: 16 }}>
        {img ? <Image source={{ uri: img }} style={styles.hero} /> : null}
        <Text style={styles.priceBig}>
          {product?.price ? `${product.price} €` : ""}
        </Text>
        <Text style={styles.desc}>
          {product?.short_description
            ?.replace(/<[^>]+>/g, "")
            ?.trim() || "—"}
        </Text>
      </View>
    </SafeAreaView>
  );
};

/** ------- App: flusso categorie -> sottocategorie -> prodotti -> dettaglio ------- */
export default function App() {
  const [stack, setStack] = useState([
    { type: "categories", parentId: 0, title: "Categorie" },
  ]);
  const [current, setCurrent] = useState(stack[stack.length - 1]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setCurrent(stack[stack.length - 1]);
  }, [stack]);

  const goBack = () => {
    if (product) {
      setProduct(null);
      return;
    }
    if (stack.length > 1) {
      setStack((s) => s.slice(0, s.length - 1));
    }
  };

  const openCategory = async (cat) => {
    // Prova a caricare sottocategorie di questa categoria.
    try {
      const res = await api.get("/products/categories", {
        params: { per_page: 100, parent: cat.id, hide_empty: false },
      });
      const children = res.data || [];
      if (children.length > 0) {
        setStack((s) => [
          ...s,
          { type: "categories", parentId: cat.id, title: cat.name },
        ]);
      } else {
        // Nessuna sottocategoria: mostra i prodotti
        setStack((s) => [...s, { type: "products", category: cat }]);
      }
    } catch {
      // In caso di errore, prova comunque a mostrare i prodotti
      setStack((s) => [...s, { type: "products", category: cat }]);
    }
  };

  if (product) {
    return (
      <ProductDetailsScreen product={product} onBack={goBack} />
    );
  }

  if (current.type === "products") {
    return (
      <ProductsScreen
        category={current.category}
        onBack={goBack}
        onSelectProduct={(p) => setProduct(p)}
      />
    );
    }

  // categorie (top-level o sotto)
  return (
    <CategoriesScreen
      parentId={current.parentId}
      title={current.title}
      onBack={stack.length > 1 ? goBack : undefined}
      onSelect={openCategory}
    />
  );
}

/** ------- Stili ------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  back: { color: "#224bff", marginBottom: 8 },
  title: { fontSize: 22, fontWeight: "700" },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#eee",
  },
  rowLabel: { fontSize: 16, fontWeight: "600" },
  rowSub: { fontSize: 12, color: "#666", marginTop: 4 },
  center: { marginTop: 24 },
  error: { color: "#b00020", padding: 16 },
  muted: { color: "#666", padding: 16 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  sep: { height: StyleSheet.hairlineWidth, backgroundColor: "#eee" },
  thumb: { width: 64, height: 64, marginRight: 12, borderRadius: 8 },
  hero: { width: "100%", height: 240, borderRadius: 12, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: "600" },
  price: { marginTop: 6, fontSize: 14, fontWeight: "700" },
  priceBig: { fontSize: 22, fontWeight: "800", marginTop: 8, marginBottom: 12 },
  desc: { fontSize: 14, color: "#333", lineHeight: 20 },
});
