import { colors } from "@/constants/Styles";
import { useSession } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

export default function EditProfile() {
  const { currentUser, updateProfile, loadingUser } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      about: "",
    },
  });

  // Carregar os dados do usuário no formulário
  useEffect(() => {
    if (currentUser) {
      setValue("name", currentUser.name || "");
      setValue("email", currentUser.email || "");
      setValue("address", currentUser.address || "");
      setValue("about", currentUser.about || "");
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data: {
    name: string;
    email: string;
    address: string;
    about: string;
  }) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);
    try {
      const success = await updateProfile({
        name: data.name,
        email: data.email,
        address: data.address,
        about: data.about,
      });

      if (success) {
        setSuccessMessage("Perfil atualizado com sucesso!");
      } else {
        setErrorMessage("Não foi possível atualizar o perfil.");
      }
    } catch (err) {
      setErrorMessage(err as string);
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingUser) {
    return (
      <View style={styles.container}>
        <Text>Carregando informações do perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 2,
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Nome completo"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />

        {!!errors.name && (
          <HelperText type="error" visible={true}>
            {errors.name?.type === "required" && "Nome é obrigatório."}
            {errors.name?.type === "minLength" &&
              "Nome deve ter pelo menos 2 caracteres."}
            {errors.name?.type === "maxLength" &&
              "Nome deve ter no máximo 100 caracteres."}
          </HelperText>
        )}

        <Controller
          control={control}
          render={({ field: { value } }) => (
            <TextInput
              label="E-mail"
              mode="outlined"
              value={value}
              disabled={true}
            />
          )}
          name="email"
        />

        <HelperText type="info" visible={true}>
          O e-mail não pode ser alterado.
        </HelperText>

        <Controller
          control={control}
          rules={{
            required: false,
            maxLength: 200,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Endereço"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline={true}
              numberOfLines={3}
            />
          )}
          name="address"
        />

        {!!errors.address && (
          <HelperText type="error" visible={true}>
            {errors.address?.type === "maxLength" &&
              "Endereço deve ter no máximo 200 caracteres."}
          </HelperText>
        )}

        <Controller
          control={control}
          rules={{
            required: false,
            maxLength: 500,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Sobre mim"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline={true}
              numberOfLines={4}
              placeholder="Compartilhe um pouco sobre você..."
            />
          )}
          name="about"
        />

        {!!errors.about && (
          <HelperText type="error" visible={true}>
            {errors.about?.type === "maxLength" &&
              "A descrição deve ter no máximo 500 caracteres."}
          </HelperText>
        )}

        {!!errorMessage && (
          <HelperText type="error" visible={true}>
            {errorMessage}
          </HelperText>
        )}

        {!!successMessage && (
          <HelperText type="info" style={styles.successMessage} visible={true}>
            {successMessage}
          </HelperText>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          buttonColor={colors.primary}
        >
          Salvar Alterações
        </Button>

        <Button mode="outlined" onPress={() => router.back()}>
          Voltar
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 10,
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  successMessage: {
    color: "green",
  },
});
