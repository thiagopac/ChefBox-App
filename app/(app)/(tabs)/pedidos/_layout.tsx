import { fontFamily } from "@/constants/Styles";
import { useSession } from "@/contexts/AuthContext";
import { useOrderContext } from "@/contexts/OrderContext";
import { Order } from "@/interfaces/order";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

const statusMap: Record<OrderStatus, { color: string; label: string }> = {
  PENDING: { color: "#FFC107", label: "Pendente" },
  ACCEPTED: { color: "#4CAF50", label: "Aceito" },
  REJECTED: { color: "#F44336", label: "Rejeitado" },
  OUT_FOR_DELIVERY: { color: "#FF9800", label: "Saiu para entrega" },
  DELIVERED: { color: "#36bfec", label: "Entregue" },
};

export default function PedidosPage() {
  const { currentUser, signOut, loadingUser } = useSession();
  const { orders, getAllOrders, setOrder, loading, error } = useOrderContext();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      getAllOrders();
    }
  }, [currentUser]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAllOrders();
    setRefreshing(false);
  }, [getAllOrders]);

  const handleReviewOrder = (order: Order) => {
    setOrder(order);
    router.push("/(app)/avaliacao");
  };

  if (loading || loadingUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#36bfec" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.headerBold}>
        MEUS PEDIDOS
      </Text>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#36bfec"]} />
        }
      >
        {orders.map((order) => (
          <Card key={order.Id} style={styles.card}>
            <Card.Content>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusCircle,
                    {
                      backgroundColor:
                        statusMap[order.Status as OrderStatus].color,
                    },
                  ]}
                />
                <Text
                  variant="titleMedium"
                  style={[
                    styles.statusLabel,
                    { color: statusMap[order.Status as OrderStatus].color },
                  ]}
                >
                  {statusMap[order.Status as OrderStatus].label}
                </Text>
              </View>

              <View style={styles.chefRow}>
                <Text variant="titleMedium" style={styles.chefNameBold}>
                  {order.ChefName} <Text style={{fontWeight: 'normal', color: '#333'}}>Pedido Nº: {order.OrderNumber}</Text>
                </Text>
              </View>

              <View style={styles.dishesList}>
                {order.Items.map((item, idx) => (
                  <Text key={idx} variant="bodyMedium" style={styles.dishText}>
                    {item.quantity}x {item.dishName}
                  </Text>
                ))}
              </View>

              <View style={styles.totalRow}>
                <Text variant="titleMedium" style={styles.totalTextBold}>
                  Total: R$ {order.TotalPrice.toFixed(2).replace(".", ",")}
                </Text>
                {order.Status === "PENDING" && (
                  <Button
                    mode="contained"
                    onPress={() => {}}
                    style={styles.actionButton}
                    textColor="#fff"
                  >
                    Cancelar pedido
                  </Button>
                )}
                {order.Status === "DELIVERED" && (
                  <Button
                    mode="contained"
                    onPress={() => handleReviewOrder(order)}
                    style={styles.actionButton}
                    textColor="#fff"
                  >
                    Avaliar pedido
                  </Button>
                )}
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  errorText: {
    color: "#F44336",
    textAlign: "center",
    fontFamily: fontFamily.medium,
  },
  scrollView: {
    flex: 1,
  },
  headerBold: {
    fontFamily: fontFamily.bold,
    textAlign: "left",
    marginVertical: 12,
    color: "#333",
    fontSize: 18,
    marginLeft: 16,
  },
  card: {
    marginHorizontal: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  statusCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusLabel: {
    fontFamily: fontFamily.medium,
    textTransform: "uppercase",
  },
  chefRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
  chefNameBold: {
    fontFamily: fontFamily.bold,
    color: "#333",
  },
  dishesList: {
    marginBottom: 8,
    marginTop: 8,
  },
  dishText: {
    fontFamily: fontFamily.regular,
    color: "#555",
    marginBottom: 2,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  totalTextBold: {
    fontFamily: fontFamily.bold,
    color: "#222",
  },
  actionButton: {
    backgroundColor: "#F44336",
    borderRadius: 8,
  },
});
