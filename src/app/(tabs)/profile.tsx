import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {
    const { user, logout } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerTitle}>[ PROFIL KARAKTER ]</Text>

            <View style={styles.card}>
                <Text style={styles.name}>{user?.name ?? "Adventurer"}</Text>
                <Text style={styles.role}>{user?.role ?? "No Class"}</Text>

                <View style={styles.box}>
                    <Text style={styles.label}>UNIVERSITAS</Text>
                    <Text style={styles.val}>{user?.university}</Text>
                    <Text style={styles.label}>JURUSAN & SEMESTER</Text>
                    <Text style={styles.val}>
                        {user?.major} — Semester {user?.semester}
                    </Text>
                    <Text style={styles.label}>SKILLS</Text>
                    <Text style={styles.val}>{user?.skills?.join(", ") || "-"}</Text>
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <Text style={styles.logoutText}>LOGOUT DARI AKUN</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.bgCanvas, padding: 20, gap: 14 },
    headerTitle: { color: Colors.pixelYellow, fontSize: 18, fontWeight: "bold" },
    card: {
        backgroundColor: Colors.bgSurface,
        borderWidth: 2,
        borderColor: Colors.retroBlack,
        borderRadius: 16,
        padding: 20,
        gap: 10,
    },
    name: { color: Colors.textPrimary, fontSize: 20, fontWeight: "bold" },
    role: { color: Colors.pixelGreen, fontSize: 13, fontWeight: "bold" },
    box: {
        backgroundColor: Colors.bgSurfaceSub,
        borderWidth: 1.5,
        borderColor: Colors.retroBlack,
        borderRadius: 10,
        padding: 12,
        gap: 4,
        marginTop: 6,
    },
    label: { color: Colors.pixelYellow, fontSize: 9, fontWeight: "bold", marginTop: 4 },
    val: { color: Colors.textPrimary, fontSize: 12 },
    logoutBtn: {
        backgroundColor: Colors.pixelRed,
        borderWidth: 2,
        borderColor: Colors.retroBlack,
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 10,
    },
    logoutText: { color: Colors.textPrimary, fontWeight: "bold", fontSize: 12 },
});