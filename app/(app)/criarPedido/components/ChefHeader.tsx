import IconBack from '@/assets/IconBack';
import StarIcon from '@/assets/StarIcon';
import AppText from '@/components/AppText';
import { useChefMenuContext } from '@/contexts/MenuChefContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

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

export default function ChefHeader() {
    const { notaMediaDoChef, quantidadeAvaliacoes, chefMenuData } = useChefMenuContext();
    const chef = chefMenuData?.chef;
    const router = useRouter();
    if (!chef) return null;
    const chefIconColor = getColorFromName(chef.name);

    return (
        <View style={{ alignItems: "flex-start", marginBottom: 12, width: "100%", paddingTop: 32 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <TouchableOpacity style={{ marginRight: 6 }} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Voltar">
                    <IconBack size={22} color="#E53935" />
                </TouchableOpacity>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: chefIconColor, justifyContent: "center", alignItems: "center" }}>
                    <AppText style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>{getInitials(chef.name)}</AppText>
                </View>
                <View style={{ marginLeft: 8 }}>
                    <AppText style={{ fontSize: 16, fontWeight: "bold", color: "#222" }}>{chef.name}</AppText>
                    <AppText style={{ fontSize: 12, color: "#666", backgroundColor: "#f0f0f0", borderRadius: 5, paddingHorizontal: 8, paddingVertical: 2, alignSelf: "flex-start", marginTop: 2 }}>{chef.foodType}</AppText>
                </View>
            </View>
            {chef.about && (
                <AppText style={{ color: "#666", fontSize: 13, marginTop: 4, textAlign: "left", marginLeft: 38 }}>{chef.about}</AppText>
            )}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 2, marginTop: 8, marginLeft: 38 }}>
                <StarIcon size={14} color="#FFC107" />
                <AppText style={{ fontSize: 11, color: "#666" }}>{notaMediaDoChef}</AppText>
                <AppText style={{ fontSize: 11, color: "#666" }}>
                    {quantidadeAvaliacoes > 1
                        ? ` - ${quantidadeAvaliacoes} avaliações`
                        : ` - ${quantidadeAvaliacoes} avaliação`}
                </AppText>
            </View>
        </View>
    );
}