import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";

const MOCK_QUESTS = [
    {
        id: "QST-101",
        title: "Lomba UI/UX National Design Fest",
        reward: "+500 EXP",
        deadline: "3 Hari Lagi",
        rank: "RANK A",
    },
    {
        id: "QST-102",
        title: "Bantu Prototype Aplikasi UMKM",
        reward: "+300 EXP",
        deadline: "7 Hari Lagi",
        rank: "RANK B",
    },
];

export default function QuestScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.headerTitle}>[ QUEST BOARD ]</Text>
                <Text style={styles.headerDesc}>
                    Ambil misi lomba dan proyek untuk menaikkan level karaktermu.
                </Text>

                {MOCK_QUESTS.map((q) => (
                    <View key={q.id} style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.rankBadge}>{q.rank}</Text>
                            <Text style={styles.reward}>{q.reward}</Text>
                        </View>
                        <Text style={styles.title}>{q.title}</Text>
                        <Text style={styles.deadline}>⏳ {q.deadline}</Text>

                        <TouchableOpacity style={styles.takeBtn}>
                            <Text style={styles.takeBtnText}>AMBIL QUEST ➔</Text>
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
    headerTitle: { color: Colors.pixelCyan, fontSize: 18, fontWeight: "bold" },
    headerDesc: { color: Colors.textSecondary, fontSize: 12, marginBottom: 4 },
    card: {
        backgroundColor: Colors.bgSurface,
        borderWidth: 2,
        borderColor: Colors.retroBlack,
        borderRadius: 14,
        padding: 16,
        gap: 6,
    },
    row: { flexDirection: "row", justifyContent: "space-between" },
    rankBadge: { color: Colors.pixelYellow, fontSize: 10, fontWeight: "bold" },
    reward: { color: Colors.pixelGreen, fontSize: 11, fontWeight: "bold" },
    title: { color: Colors.textPrimary, fontSize: 15, fontWeight: "bold" },
    deadline: { color: Colors.textSecondary, fontSize: 12 },
    takeBtn: {
        backgroundColor: Colors.pixelGreen,
        borderWidth: 2,
        borderColor: Colors.retroBlack,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: "center",
        marginTop: 8,
    },
    takeBtnText: { color: Colors.retroBlack, fontSize: 11, fontWeight: "bold" },
});