import { colors, fontFamily } from "@/constants/Styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import AppText from "./AppText";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: {
    name: string;
    city: string;
    foodType: string;
  };
  onFiltersChange: (filters: {
    name: string;
    city: string;
    foodType: string;
  }) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export default function FilterModal({
  visible,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
}: FilterModalProps) {
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('window').width,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleFilterChange = (field: string, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const handleApply = () => {
    onApplyFilters();
    onClose();
  };
  const handleClear = () => {
    onClearFilters();
    onClose();
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View 
              style={[
                styles.modalContainer,
                {
                  transform: [{ translateX: slideAnim }]
                }
              ]}
            >
              <View style={styles.header}>
                <AppText style={styles.title}>Filtros</AppText>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <MaterialCommunityIcons
                    name="close"
                    size={24}
                    color="#333"                  />
                </TouchableOpacity>
              </View>

              <View style={styles.content}>
                <View style={styles.inputContainer}>
                  <AppText style={styles.label}>Nome do Chef</AppText>
                  <TextInput
                    mode="outlined"
                    value={filters.name}
                    onChangeText={(value) => handleFilterChange("name", value)}                    placeholder="Digite o nome do chef"
                    style={styles.input}
                    textColor="#000000"
                    theme={{
                      colors: {
                        primary: colors.primary,
                      },
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <AppText style={styles.label}>Cidade</AppText>
                  <TextInput
                    mode="outlined"
                    value={filters.city}
                    onChangeText={(value) => handleFilterChange("city", value)}                    placeholder="Digite a cidade"
                    style={styles.input}
                    textColor="#000000"
                    theme={{
                      colors: {
                        primary: colors.primary,
                      },
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <AppText style={styles.label}>Tipo de Comida</AppText>
                  <TextInput
                    mode="outlined"
                    value={filters.foodType}
                    onChangeText={(value) =>
                      handleFilterChange("foodType", value)
                    }
                    placeholder="Ex: Brasileira, Italiana, Saudável"
                    style={styles.input}
                    textColor="#000000"
                    theme={{
                      colors: {
                        primary: colors.primary,
                      },
                    }}                  />
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleClear}
                  style={[styles.button, styles.clearButton]}
                  activeOpacity={0.8}
                >
                  <AppText style={{ color: '#444', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Limpar</AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleApply}
                  style={[styles.button, styles.applyButton]}
                  activeOpacity={0.8}
                >
                  <AppText style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Aplicar</AppText>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  modalContainer: {
    backgroundColor: "#fff",
    height: "100%",
    width: "80%",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: "#1a1a1a",
  },
  closeButton: {
    padding: 5,
  },
  content: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: "#1a1a1a",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
  },
  clearButton: {
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  applyButton: {
    elevation: 0,
    backgroundColor: colors.primary,
  },
});
