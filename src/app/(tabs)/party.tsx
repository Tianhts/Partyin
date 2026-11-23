import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../context/AuthContext";
import { fetchPartyMatchmake, MatchmakeResult } from "../../services/ai";

const MOCK_PARTIES = [
    {
        id: "PTY-01",
        title: "Tim Hackathon GDGoC ITB 2026",
        leader: "Joice",
        need: "UI/UX Designer, Backend Developer",
        members: "3/4",
    },
    {
        id: "PTY-02",
        title: "Riset AI Kampus & Mobile App",
        leader: "Alex",
        need: "Mobile Developer, Frontend Developer",
        members: "2/3",
    },
];

export default function PartyScreen() {
    const { user } = useAuth();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [aiResults, setAiResults] = useState<Record<string, MatchmakeResult>>({});

    const handleCheckAI = async (party: (typeof MOCK_PARTIES)[0]) => {
        if (!user) return;
        setLoadingId(party.id);
        try {
            const result = await fetchPartyMatchmake({
                user_name: user.name,
                user_role: user.role,
                user_skills: user.skills ?? ["React Native", "TypeScript"],
                target_party_title: party.title,
                needed_roles: party.need,
            });
            setAiResults((prev) => ({ ...prev, [party.id]: result }));
        } catch {
            alert("Pastikan server FastAPI di port 8000 sedang berjalan & 1 Wi-Fi dengan HP.");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.headerTitle}>[ GUILD PARTY ]</Text>
                <Text style={styles.headerDesc}>
                    Temukan tim kolaborasi & cek kecocokan dengan AI Matchmaker.
                </Text>

                {MOCK_PARTIES.map((p) => {
                    const ai = aiResults[p.id];
                    const isLoading = loadingId === p.id;

                    return (
                        <View key={p.id} style={styles.card}>
                            <View style={styles.cardTop}>
                                <Text style={styles.partyId}>{p.id}</Text>
                                <Text style={styles.memberBadge}>👥 {p.members}</Text>
                            </View>
                            <Text style={styles.partyTitle}>{p.title}</Text>
                            <Text style={styles.meta}>Ketua: {p.leader}</Text>
                            <Text style={styles.need}>Butuh: {p.need}</Text>

                            {/* Hasil AI Matchmaker */}
                            {ai && (
                                <View style={styles.aiBox}>
                                    <Text style={styles.aiScore}>✨ KECOCOKAN AI: {ai.match_score}%</Text>
                                    <Text style={styles.aiText}>{ai.reason}</Text>
                                    <Text style={styles.aiTip}>💡 {ai.recommended_contribution}</Text>
                                </View>
                            )}

                            <View style={styles.btnRow}>
                                <TouchableOpacity
                                    style={styles.aiBtn}
                                    onPress={() => handleCheckAI(p)}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator size="small" color={Colors.retroBlack} />
                                    ) : (
                                        <Text style={styles.aiBtnText}>✨ CEK AI</Text>
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.joinBtn}>
                                    <Text style={styles.joinBtnText}>GABUNG ➔</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
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
    aiBox: {
        backgroundColor: Colors.bgCanvas,
        borderWidth: 1.5,
        borderColor: Colors.pixelCyan,
        borderRadius: 10,
        padding: 10,
        gap: 4,
        marginTop: 6,
    },
    aiScore: { color: Colors.pixelCyan, fontSize: 12, fontWeight: "bold" },
    aiText: { color: Colors.textPrimary, fontSize: 11, lineHeight: 16 },
    aiTip: { color: Colors.pixelYellow, fontSize: 11, marginTop: 2 },
    btnRow: { flexDirection: "row", gap: 8, marginTop: 8 },
    aiBtn: {
        flex: 1,
        backgroundColor: Colors.pixelCyan,
        borderWidth: 2,
        borderColor: Colors.retroBlack,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: "center",
    },
    aiBtnText: { color: Colors.retroBlack, fontSize: 11, fontWeight: "bold" },
    joinBtn: {
        flex: 1,
        backgroundColor: Colors.pixelYellow,
        borderWidth: 2,
        borderColor: Colors.retroBlack,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: "center",
    },
    joinBtnText: { color: Colors.retroBlack, fontSize: 11, fontWeight: "bold" },
});