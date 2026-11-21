import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";

const MOCK_PARTIES = [
    {
        id: "PTY-01",
        title: "Tim Hackathon GEMASTIK 2026",
        leader: "Joice",
        need: "Backend Developer, UI/UX",
        members: "3/4",
    },
    {
        id: "PTY-02",
        title: "Riset AI Kampus & Mobile App",
        leader: "Alex",
        need: "Mobile Developer",
        members: "2/3",
    },
];

export default function PartyScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.headerTitle}>[ GUILD PARTY ]</Text>
                <Text style={styles.headerDesc}>
                    Temukan tim kolaborasi lomba, riset, atau proyek akademik.
                </Text>

                {MOCK_PARTIES.map((p) => (
                    <View key={p.id} style={styles.card}>
                        <View style={styles.cardTop}>
                            <Text style={styles.partyId}>{p.id}</Text>
                            <Text style={styles.memberBadge}>👥 {p.members}</Text>
                        </View>
                        <Text style={styles.partyTitle}>{p.title}</Text>
                        <Text style={styles.meta}>Ketua: {p.leader}</Text>
                        <Text style={styles.need}>Butuh: {p.need}</Text>

                        <TouchableOpacity style={styles.joinBtn}>
                            <Text style={styles.joinBtnText}>GABUNG PARTY ➔</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.bgCanvas },
    scroll: { padding: 20, gap: 14 },
    headerTitle: { color: Colors.pixelGreen, fontSize: 18, fontWeight: "bold" },
    headerDesc: { color: Colors.textSecondary, fontSize: 12, marginBottom: 4 },
    card: {
        backgroundColor: Colors.bgSurface,
        borderWidth: 2,
        borderColor: Colors.retroBlack,
        borderRadius: 14,
        padding: 16,
        gap: 6,
    },
    cardTop: { flexDirection: "row", justifyContent: "space-between" },
    partyId: { color: Colors.pixelYellow, fontSize: 10, fontWeight: "bold" },
    memberBadge: { color: Colors.pixelCyan, fontSize: 11, fontWeight: "bold" },
    partyTitle: { color: Colors.textPrimary, fontSize: 15, fontWeight: "bold" },
    meta: { color: Colors.textSecondary, fontSize: 12 },
    need: { color: Colors.pixelGreen, fontSize: 11, fontWeight: "bold" },
    joinBtn: {
        backgroundColor: Colors.pixelYellow,
        borderWidth: 2,
        borderColor: Colors.retroBlack,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: "center",
        marginTop: 8,
    },
    joinBtnText: { color: Colors.retroBlack, fontSize: 11, fontWeight: "bold" },
});