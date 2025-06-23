import { fontFamily } from '@/constants/Styles';
import { StyleSheet } from 'react-native';

export const StatusModalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    iconContainer: {
        marginBottom: 16,
    },
    iconBackground: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 32,
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: fontFamily.bold,
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 24,
    },
    message: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        textAlign: 'center',
        color: '#666',
        lineHeight: 22,
        marginBottom: 24,
    },
    autoCloseIndicator: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 20,
    },
    autoCloseText: {
        fontSize: 12,
        color: '#888',
        fontFamily: fontFamily.regular,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        borderRadius: 8,
        paddingVertical: 4,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: fontFamily.medium,
    },
    secondaryButton: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: 4,
        borderWidth: 1.5,
    },
});
