import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
    const { user, logout } = useAuth();

    return (
        <SafeAreaView style= { styles.container } >
        <View style={ styles.header }>
            <Text style={ styles.brand }> PARTYIN! </Text>
                < Text style = { styles.subtitle } >// GUILD HALL (BERANDA)</Text>
                    </View>

                    < View style = { styles.card } >
                        <Text style={ styles.badge }> [KARTU ADVENTURER] </Text>
                            < Text style = { styles.name } > { user?.name ?? "Adventurer"
} </Text>
    < Text style = { styles.role } > { user?.role ?? "No Class"}</Text>

        < View style = { styles.infoBox } >
            <Text style={ styles.infoText }> ID: { user?.user_id } </Text>
                < Text style = { styles.infoText } > Kampus: { user?.university } </Text>
                    < Text style = { styles.infoText } >
                        Jurusan: { user?.major } (Sem { user?.semester })
</Text>
    </View>

    < TouchableOpacity style = { styles.logoutBtn } onPress = { logout } >
        <Text style={ styles.logoutText }> KELUAR DARI GUILD(LOGOUT) </Text>
            </TouchableOpacity>
            </View>
            </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgCanvas,
        padding: 20,
        justifyContent: "center",
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    brand: {
        color: Colors.pixelGreen,
        fontSize: 26,
        fontWeight: "bold",
        letterSpacing: 2,
    },
    subtitle: {
        color: Colors.pixelYellow,
        fontSize: 10,
        fontWeight: "bold",
        marginTop: 4,
    },
    card: {
        backgroundColor: Colors.bgSurface,
        borderWidth: 2,
        borderColor: Colors.retroBlack,
        borderRadius: 16,
        padding: 20,
        gap: 10,
        shadowColor: Colors.retroBlack,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    badge: {
        color: Colors.pixelCyan,
        fontSize: 11,
        fontWeight: "bold",
    },
    name: {
        color: Colors.textPrimary,
        fontSize: 22,
        fontWeight: "bold",
    },
    role: {
        color: Colors.pixelGreen,
        fontSize: 13,
        fontWeight: "bold",
    },
    infoBox: {
        backgroundColor: Colors.bgSurfaceSub,
        borderWidth: 1.5,
        borderColor: Colors.retroBlack,
        borderRadius: 10,
        padding: 12,
        gap: 4,
        marginTop: 6,
    },
    infoText: {
        color: Colors.textSecondary,
        fontSize: 12,
    },
    logoutBtn: {
        backgroundColor: Colors.pixelRed,
        borderWidth: 2,
        borderColor: Colors.retroBlack,
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 10,
    },
    logoutText: {
        color: Colors.textPrimary,
        fontWeight: "bold",
        fontSize: 12,
    },
});