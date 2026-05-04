import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { spacing, radius } from '../theme/spacing';
import { useTheme, type ColorPalette } from '../../shared/context/ThemeContext';
import { useLanguage } from '../../shared/context/LanguageContext';
import { AnyQRPayload, decodeAnyChallenge } from '../../domain/multiplayer/FriendChallenge';

interface Props {
  onScanned: (payload: AnyQRPayload) => void;
  onBack: () => void;
}

export function FriendChallengeScanScreen({ onScanned, onBack }: Props) {
  const { colors } = useTheme();
  const { S } = useLanguage();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState(false);

  const handleBarcode = ({ data }: { data: string }) => {
    if (scanned) return;
    const payload = decodeAnyChallenge(data);
    if (payload) {
      setScanned(true);
      onScanned(payload);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{S.friendScanTitle}</Text>
          <View style={styles.backBtn} />
        </View>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionEmoji}>📷</Text>
          <Text style={styles.permissionTitle}>{S.friendPermissionTitle}</Text>
          <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission} activeOpacity={0.85}>
            <Text style={styles.permissionBtnText}>{S.friendPermissionBtn}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{S.friendScanTitle}</Text>
        <View style={styles.backBtn} />
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={handleBarcode}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        />

        <View style={styles.overlay}>
          <View style={styles.overlayTop} />
          <View style={styles.overlayMiddle}>
            <View style={styles.overlaySide} />
            <View style={styles.scanFrame}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </View>
            <View style={styles.overlaySide} />
          </View>
          <View style={styles.overlayBottom}>
            {error ? (
              <Text style={styles.errorText}>{S.friendScanError}</Text>
            ) : (
              <Text style={styles.instructionText}>{S.friendScanInstruction}</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const FRAME_SIZE = 240;
const CORNER_SIZE = 28;
const CORNER_WIDTH = 4;
const CORNER_COLOR = '#FFFFFF';

const makeStyles = (c: ColorPalette) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: spacing.lg, paddingTop: spacing.xl,
    backgroundColor: '#000000',
  },
  backBtn: { width: 40, padding: spacing.xs },
  backText: { fontSize: 22, color: '#FFFFFF' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  cameraContainer: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, flexDirection: 'column' },
  overlayTop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  overlayMiddle: { flexDirection: 'row', height: FRAME_SIZE },
  overlaySide: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  scanFrame: {
    width: FRAME_SIZE, height: FRAME_SIZE,
    backgroundColor: 'transparent',
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE, height: CORNER_SIZE,
    borderColor: CORNER_COLOR, borderWidth: CORNER_WIDTH,
  },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 4 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 4 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 4 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 4 },
  overlayBottom: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center', justifyContent: 'flex-start', paddingTop: spacing.xl,
  },
  instructionText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600', textAlign: 'center', paddingHorizontal: spacing.xl },
  errorText: {
    color: '#FF5252', fontSize: 15, fontWeight: '700', textAlign: 'center',
    backgroundColor: 'rgba(255,82,82,0.15)', paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm, borderRadius: radius.md,
  },
  permissionContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.xl, padding: spacing.xl,
  },
  permissionEmoji: { fontSize: 64 },
  permissionTitle: { fontSize: 18, fontWeight: '700', color: c.textPrimary, textAlign: 'center' },
  permissionBtn: {
    backgroundColor: c.primary, borderRadius: radius.pill,
    paddingHorizontal: spacing.xxxl, paddingVertical: spacing.lg,
  },
  permissionBtnText: { color: c.white, fontWeight: '700', fontSize: 15 },
});
