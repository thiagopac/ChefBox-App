import { authService, LoginDto, RegisterDto, UpdateUserDto, User } from "@/services/auth";
import { createContext, use, useCallback, useEffect, useState, type PropsWithChildren } from "react";
import { useStorageState } from "../utils/useStorageState";

const AuthContext = createContext<{
  signIn: (dto: LoginDto) => Promise<boolean>;
  signUp: (dto: RegisterDto) => Promise<boolean>;
  signOut: () => void;
  updateProfile: (dto: UpdateUserDto) => Promise<boolean>;
  currentUser: User | null;
  loadingUser: boolean;
  session?: string | null;
}>({
  signIn: () => Promise.resolve(false),
  signUp: () => Promise.resolve(false),
  signOut: () => null,
  updateProfile: () => Promise.resolve(false),
  currentUser: null,
  loadingUser: false,
  session: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[, session], setSession] = useStorageState("jwt");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  
  const loadUserProfile = useCallback(async () => {
    if (!session) return;
    
    setLoadingUser(true);
    try {
      const response = await authService().getCurrentUser();
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Failed to load user profile:", error);
    } finally {
      setLoadingUser(false);
    }
  }, [session]);
    
  useEffect(() => {
    if (session) {
      loadUserProfile();
    } else {
      setCurrentUser(null);
    }
  }, [session, loadUserProfile]);
  
  const signIn = async (dto: LoginDto) => {
    try {
      const result = await authService().login(dto);
      setSession(result.data.token);

      return true;
    } catch (err) {
      const e = err as {
        status: number;
        response: { data: { message: string } };
      };

      if (e.status === 400) {
        if (e.response.data.message === "invalid_user_type") {
          throw "Você não tem permissão para acessar este aplicativo.";
        } else {
          throw "E-mail ou senha inválidos.";
        }
      } else {
        throw "Não foi possível acessar.";
      }
    }
  };
  
  const signUp = async (dto: RegisterDto) => {
    try {
      const result = await authService().register(dto);
      setSession(result.data.token);

      return true;
    } catch (err) {
      const e = err as {
        status: number;
        response: { data: { message: string } };
      };

      if (e.status === 400) {
        throw "Dados inválidos. Verifique as informações inseridas.";
      } else if (e.status === 409) {
        throw "E-mail já está em uso.";
      } else {
        throw "Não foi possível criar a conta.";
      }
    }  };
  
  const updateProfile = async (dto: UpdateUserDto) => {
    if (!currentUser) return false;
    
    try {
      await authService().updateUser(dto, currentUser.id);
      await loadUserProfile(); // Recarregar os dados atualizados
      return true;
    } catch (error) {
      console.error("Failed to update profile:", error);
      return false;
    }
  };
  
  return (
    <AuthContext
      value={{
        signIn,
        signUp,
        updateProfile,
        currentUser,
        loadingUser,
        signOut: () => {
          setSession(null);
        },
        session,
      }}
    >
      {children}
    </AuthContext>
  );
}
