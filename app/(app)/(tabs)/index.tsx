import AppText from "@/components/AppText";
import FilterModal from "@/components/FilterModal";
import { colors, fontFamily } from "@/constants/Styles";
import api from "@/services/api";
import { translateFoodType } from "@/utils/translations";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

// Definir o tipo para Chef
type Chef = {
  id: string;
  name: string;
  initials: string;
  email: string;
  password?: string;
  type?: string;
  foodType?: string | null;
  address?: string;
  city?: string;
  about?: string;
  createdAt?: string;
  updatedAt?: string;
  isOpen?: boolean;
  operatingHours?: any[];
  paymentInfo?: any[];
  dishOptions?: number;
  dishes?: any[];
};

// Função utilitária para gerar cor baseada no nome
function getColorFromName(name: string) {
  const colors = ["#36bfec", "#f9a73e", "#8a43c9", "#e74c3c", "#2c3e50", "#27ae60", "#e67e22", "#e84393", "#00b894", "#fdcb6e"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

// Função para pegar as iniciais
function getInitials(name: string) {
  if (!name) return "--";
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function Index() {
  const router = useRouter();

  // Estado para controle do modal de filtros
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    foodType: "",
  });

  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchChefs() {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/chef");
        setChefs(response.data);
      } catch (err) {
        setError("Erro ao buscar chefs");
      } finally {
        setLoading(false);
      }
    }
    fetchChefs();
  }, []);

  // Filtrar chefs com base nos filtros aplicados
  const filteredChefs = useMemo(() => {
    return chefs.filter((chef) => {
      const matchesName = filters.name
        ? chef.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;
      const matchesCity = filters.city
        ? (chef.city || "").toLowerCase().includes(filters.city.toLowerCase())
        : true;
      const matchesFoodType = filters.foodType
        ? (chef.foodType || "").toLowerCase().includes(filters.foodType.toLowerCase())
        : true;
      return matchesName && matchesCity && matchesFoodType;
    });
  }, [chefs, filters]);

  // Contar quantos filtros estão ativos
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.name) count++;
    if (filters.city) count++;
    if (filters.foodType) count++;
    return count;
  }, [filters]);

  const handleOpenFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalVisible(false);
  };

  const handleApplyFilters = () => {
    // Os filtros já são aplicados automaticamente através do useMemo
    console.log("Filtros aplicados:", filters);
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      city: "",
      foodType: "",
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterContainer}
        onPress={handleOpenFilterModal}
      >
        <MaterialCommunityIcons name="filter-variant" size={24} color="#666" />
        <AppText style={styles.filterText}>Filtros</AppText>
        {activeFiltersCount > 0 && (
          <View style={styles.filterBadge}>
            <AppText style={styles.filterBadgeText}>
              {activeFiltersCount}
            </AppText>
          </View>
        )}
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        {loading && (
          <View style={styles.emptyState}>
            <AppText style={styles.emptyStateText}>Carregando chefs...</AppText>
          </View>
        )}
        {error && (
          <View style={styles.emptyState}>
            <AppText style={styles.emptyStateText}>{error}</AppText>
          </View>
        )}
        {!loading && !error && filteredChefs.map((chef) => (
          <React.Fragment key={chef.id}>
            <TouchableOpacity
              style={styles.chefCard}
              onPress={() => router.push({ pathname: "/criarPedido", params: { chefId: chef.id } })}
            >
              <View style={styles.chefHeader}>
                <View
                  style={[
                    styles.chefAvatar,
                    { backgroundColor: getColorFromName(chef.name) },
                  ]}
                >
                  <AppText style={styles.chefInitials}>{getInitials(chef.name)}</AppText>
                </View>

                <View style={styles.chefInfo}>
                  <AppText style={styles.chefName}>{chef.name}</AppText>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.specialtyContainer}>
                      <AppText style={styles.specialtyText}>
                        {chef.foodType ? translateFoodType(chef.foodType) : "-"}
                      </AppText>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.chefDescription}>
                <AppText style={styles.descriptionText}>
                  {chef.about}
                </AppText>
                <AppText style={styles.locationText}>{chef.city || ""}</AppText>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        ))}
        {!loading && !error && filteredChefs.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons 
              name="chef-hat" 
              size={64} 
              color="#ccc" 
            />
            <AppText style={styles.emptyStateText}>
              Nenhum chef encontrado
            </AppText>
            <AppText style={styles.emptyStateSubtext}>
              Tente ajustar os filtros para encontrar mais resultados
            </AppText>
          </View>
        )}
      </ScrollView>

      <FilterModal
        visible={isFilterModalVisible}
        onClose={handleCloseFilterModal}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filterText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
    fontFamily: fontFamily.medium,
  },
  filterBadge: {
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  filterBadgeText: {
    color: "white",
    fontSize: 12,
    fontFamily: fontFamily.medium,
  },
  scrollView: {
    flex: 1,
  },
  chefCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chefHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  chefAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  chefInitials: {
    color: "white",
    fontSize: 24,
    fontFamily: fontFamily.medium,
  },
  chefInfo: {
    flex: 1,
    justifyContent: "center",
  },
  chefName: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    marginBottom: 4,
    color: "#333",
  },
  specialtyContainer: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 12,
    color: "#666",
    fontFamily: fontFamily.regular,
  },
  dishOptions: {
    fontSize: 12,
    color: "#777",
    fontFamily: fontFamily.regular,
  },
  chefDescription: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 8,
    fontFamily: fontFamily.regular,
  },  locationText: {
    fontSize: 14,
    color: "#555",
    fontFamily: fontFamily.medium,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
    color: "#666",
    marginTop: 16,
    textAlign: "center",
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },
});
