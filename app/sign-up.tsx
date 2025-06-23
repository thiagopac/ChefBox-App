import { Text, View } from "react-native";

import { colors } from "@/constants/Styles";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useSession } from "../contexts/AuthContext";

export default function SignUp() {
  const { signUp } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const password = watch("password");
  const onSubmit = async (dto: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
  }) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      // Registrar o usuário via AuthContext
      await signUp({
        name: dto.name,
        email: dto.email,
        password: dto.password,
        address: dto.address,
      });
      
      // Redirecionar para a tela principal
      router.push("/(app)/(tabs)");
    } catch (err) {
      setErrorMessage(err as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        gap: 12,
        width: "100%",
        padding: 32,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={require("@/assets/logo-black.png")}
        contentFit="contain"
        style={{ width: 190, height: 90, alignSelf: "center" }}
      />

      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            marginBottom: 8,
          }}
        >
          Criar Conta
        </Text>
      </View>

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 2,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Nome completo"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && (
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
        rules={{
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="E-mail"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      {errors.email && (
        <HelperText type="error" visible={true}>
          {errors.email?.type === "required" && "E-mail é obrigatório."}
          {errors.email?.type === "pattern" && "Formato de e-mail inválido."}
        </HelperText>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 48,
          minLength: 8,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Senha"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && (
        <HelperText type="error" visible={true}>
          {errors.password?.type === "required" && "Senha é obrigatória."}
          {errors.password?.type === "minLength" &&
            "Senha deve ter pelo menos 8 caracteres."}
          {errors.password?.type === "maxLength" &&
            "Senha deve ter no máximo 48 caracteres."}
        </HelperText>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          validate: (value) => value === password || "Senhas não coincidem",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Confirmar senha"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <HelperText type="error" visible={true}>
          {errors.confirmPassword?.type === "required" &&
            "Confirmação de senha é obrigatória."}
          {errors.confirmPassword?.type === "validate" &&
            "Senhas não coincidem."}
        </HelperText>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 10,
          maxLength: 200,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Endereço completo"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={true}
            numberOfLines={2}
          />
        )}
        name="address"
      />
      {errors.address && (
        <HelperText type="error" visible={true}>
          {errors.address?.type === "required" && "Endereço é obrigatório."}
          {errors.address?.type === "minLength" &&
            "Endereço deve ter pelo menos 10 caracteres."}
          {errors.address?.type === "maxLength" &&
            "Endereço deve ter no máximo 200 caracteres."}
        </HelperText>
      )}

      {!!errorMessage && !isLoading && (
        <HelperText type="error" visible={true}>
          {errorMessage}
        </HelperText>
      )}

      <Button
        onPress={handleSubmit(onSubmit)}
        mode="contained"
        buttonColor={colors.primary}
        loading={isLoading}
        style={{
          marginTop: 10,
        }}
      >
        Criar Conta
      </Button>

      <Button
        onPress={() => router.push("/sign-in")}
        mode="text"
        textColor={colors.primary}
        style={{
          marginTop: 8,
        }}
      >
        Já tem uma conta? Entrar
      </Button>
    </View>
  );
}
