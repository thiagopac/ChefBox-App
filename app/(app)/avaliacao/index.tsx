import { useSession } from "@/contexts/AuthContext";
import { useOrderContext } from "@/contexts/OrderContext";
import { OrderItemDto } from "@/interfaces/order";
import { Rating } from "@/interfaces/orderReview";
import { orderReviewService } from "@/services/orderReviewService/orderReviewService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Toast from "react-native-toast-message";

const OrderReview = () => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const { order } = useOrderContext();
  const { currentUser } = useSession();
  const router = useRouter();
  const formatDate = order?.CreatedAt
    ? `${order.CreatedAt.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      })} às ${order.CreatedAt.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    : "";

  // const mockOrderItems: OrderItemDto[] = [
  //   { dishId: "1", dishName: "Feijoada", quantity: 3 },
  //   { dishId: "2", dishName: "Arroz", quantity: 1 },
  //   { dishId: "3", dishName: "Salada", quantity: 3 },
  //   { dishId: "4", dishName: "Suco de laranja", quantity: 1 },
  // ];

  const handleRatingChange = (value: number): void => {
    setRating(value);
  };

  // const handleSubmit = (): void => {
  //   console.log("Submitted review:", {
  //     orderId: order?.Id,
  //     rating,
  //     comment,
  //   });
  //   Toast.show({
  //     type: "success",
  //     text1: "Avaliação enviada com sucesso!",
  //   });
  //   setRating(0);
  //   setComment("");
  //   router.back();
  // };

  const handleSubmit = async (): Promise<void> => {
    if (!order?.Id || !currentUser?.id) return;
    console.log('order:', order);
    console.log('currentUser:', currentUser);

    const ratingMap: { [key: number]: Rating } = {
      1: "ONE",
      2: "TWO",
      3: "THREE",
      4: "FOUR",
      5: "FIVE",
    };

    if (rating === 0) {
      Toast.show({
        type: "info",
        text1: "Selecione uma avaliação de 1 a 5 estrelas",
      });
      return;
    }

    try {
      await orderReviewService.addReview(order?.Id, {
        rating: ratingMap[rating],
        comment,
        createdAt: new Date().toISOString(),
        customerId: currentUser.id,
      });

      Toast.show({
        type: "success",
        text1: "Avaliação enviada com sucesso!",
      });

      setRating(0);
      setComment("");
      router.back();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao enviar avaliação",
        text2: error.message,
      });
    }
  };

  const renderOrderItem: ListRenderItem<OrderItemDto> = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemImagePlaceholder}>
        {/* Substitua com <Image> real se tiver URL depois */}
        <Text style={styles.imageText}>🍽️</Text>
      </View>
      <Text style={styles.itemText}>
        <Text style={styles.itemQuantity}>{item.quantity}x </Text>
        {item.dishName}
      </Text>
    </View>
  );

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Pedido não encontrado.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AVALIAÇÃO DO PEDIDO</Text>
      <View style={styles.chefCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{order?.ChefInitials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.chefName}>
            <Text style={{ fontWeight: "bold" }}>{order?.ChefName}</Text>
            <Text> — Nº {order?.OrderNumber}</Text>
          </Text>

          <Text style={styles.orderDate}>{formatDate}</Text>
        </View>
        <Text style={styles.arrow}>{">"}</Text>
      </View>
      <View></View>
      <Text style={styles.sectionDetails}>Detalhes do pedido</Text>
      <FlatList
        // data={mockOrderItems}
        data={order?.Items}
        keyExtractor={(item) => item.dishId}
        renderItem={renderOrderItem}
        style={styles.sectionDetails}
      />
      <View style={{ alignItems: "center" }}>
        <Text style={styles.sectionTitle}>
          Escolha de 1 a 5 estrelas para avaliar
        </Text>
      </View>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRatingChange(star)}>
            <Text
              style={[
                styles.star,
                rating >= star ? styles.starFilled : styles.starEmpty,
              ]}
            >
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.commentInput}
        placeholder="Comentário..."
        placeholderTextColor="#bbb"
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar avaliação</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 8,
    fontWeight: "600",
  },
  sectionDetails: {
    fontSize: 18,
    marginTop: 20,
    marginLeft: 28,
    marginBottom: 8,
    fontWeight: "600",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  itemImagePlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  imageText: {
    fontSize: 18,
  },

  itemText: {
    fontSize: 14,
    color: "#333",
  },

  itemQuantity: {
    fontSize: 14,
    color: "#333",
  },

  itemImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 10,
  },
  itemName: {
    fontSize: 14,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  star: {
    fontSize: 32,
    marginHorizontal: 4,
  },
  starFilled: {
    color: "#f79e1b",
  },
  starEmpty: {
    color: "#ddd",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    height: 100,
    padding: 10,
    fontSize: 14,
    textAlignVertical: "top",
    backgroundColor: "#f8f8f8",
  },
  submitButton: {
    backgroundColor: "#e53935",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 24,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  chefCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  avatar: {
    backgroundColor: "#40B4FF",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarText: {
    color: "#fff",
    fontWeight: "bold",
  },

  chefName: {
    fontSize: 14,
  },

  orderDate: {
    fontSize: 12,
    color: "#666",
  },

  arrow: {
    fontSize: 18,
    marginLeft: 8,
    color: "#D32F2F",
  },
});
