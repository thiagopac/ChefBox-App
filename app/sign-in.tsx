import { Text, View } from "react-native";

import { colors } from "@/constants/Styles";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useSession } from "../contexts/AuthContext";

export default function SignIn() {
  const { signIn } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "carlos@usuario.com",
      password: "12345678",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (dto: { email: string; password: string }) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      await signIn(dto);
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
          Acessar
        </Text>
      </View>

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
            style={{ backgroundColor: '#fff', color: '#222' }}
            theme={{ colors: { text: '#222', primary: '#222', placeholder: '#888' } }}
            textColor="#222"
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
            style={{ backgroundColor: '#fff', color: '#222' }}
            theme={{ colors: { text: '#222', primary: '#222', placeholder: '#888' } }}
            textColor="#222"
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
          borderRadius: 12,
          minHeight: 48,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 0,
        }}
        labelStyle={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textAlignVertical: 'center', textAlign: 'center', lineHeight: 22 }}
      >
        Entrar
      </Button>

      <Button
        onPress={() => router.push("/sign-up")}
        mode="text"
        textColor={colors.primary}
        style={{
          marginTop: 8,
        }}
      >
        Não tem uma conta? Cadastre-se
      </Button>
    </View>
  );
}
