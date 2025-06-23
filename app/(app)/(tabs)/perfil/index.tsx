import { colors } from "@/constants/Styles";
import { useSession } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Divider, Text } from "react-native-paper";

export default function Profile() {
  const { currentUser, signOut, loadingUser } = useSession();
  const router = useRouter();

  if (loadingUser) {
    return (
      <View style={styles.container}>
        <Text>Carregando informações do perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.avatarContainer}>
            <Avatar.Icon size={80} icon="account" />
          </View>

          <Text style={[styles.name, { color: "#222" }]}>{currentUser?.name || "Usuário"}</Text>

          <View style={styles.infoContainer}>
            <Text style={[styles.label, { color: "#222" }]}>Email:</Text>
            <Text style={[styles.value, { color: "#222" }]}>{currentUser?.email || "-"}</Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.infoContainer}>
            <Text style={[styles.label, { color: "#222" }]}>Endereço:</Text>
            <Text style={[styles.value, { color: "#222" }]}> {currentUser?.address || "Não informado"}</Text>
          </View>

          {currentUser?.about && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.infoContainer}>
                <Text style={[styles.label, { color: "#222" }]}>Sobre:</Text>
                <Text style={[styles.value, { color: "#222" }]}>{currentUser.about}</Text>
              </View>
            </>
          )}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={() => router.push("/perfil/editar")}
        buttonColor={colors.primary}
        style={styles.button}
        textColor="#fff"
      >
        Editar Perfil
      </Button>

      <Button
        mode="outlined"
        onPress={() => {
          signOut();
          router.replace("/sign-in");
        }}
        style={styles.button}
        textColor="#222"
      >
        Sair do Aplicativo
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  cardContent: {
    alignItems: "center",
    padding: 16,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  infoContainer: {
    width: "100%",
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
  },
  divider: {
    width: "100%",
    marginVertical: 12,
  },
  button: {
    marginTop: 8,
  },
});
