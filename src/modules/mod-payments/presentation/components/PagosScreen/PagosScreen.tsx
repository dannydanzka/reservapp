import React, { useState } from 'react';

import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import { CreditCard, DollarSign, History, TestTube } from 'lucide-react-native';

import stripeService from '../../../infrastructure/services/stripeService';

import {
  Container,
  FeatureDescription,
  FeatureIcon,
  FeatureItem,
  FeatureTitle,
  InfoText,
  PageTitle,
  SectionCard,
  SectionTitle,
} from './PagosScreen.styled';

export const PagosScreen: React.FC = () => {
  const [isTestingPayment, setIsTestingPayment] = useState(false);

  const handleTestStripePayment = async () => {
    setIsTestingPayment(true);

    try {
      // Get test card data
      const testCard = stripeService.getTestCardData('VISA_SUCCESS');
      const paymentMethodId = stripeService.getTestPaymentMethodId();

      Alert.alert(
        'Stripe Test Payment',
        `Configurado para usar:\n\n` +
          `Payment Method ID: ${paymentMethodId}\n` +
          `Tarjeta: ${testCard.brand.toUpperCase()} •••• ${testCard.last4}\n` +
          `Número: ${testCard.number}\n\n` +
          `Este pago se procesará en el Stripe Dashboard sandbox.`,
        [
          { style: 'cancel', text: 'Cancelar' },
          {
            onPress: async () => {
              try {
                console.log('🔄 Starting Stripe test payment...');

                // Create test payment intent
                const paymentIntent = await stripeService.createTestPaymentIntent(
                  'test-reservation-123',
                  5000
                );

                console.log('✅ Payment Intent created:', paymentIntent);

                Alert.alert(
                  'Test Payment Created!',
                  `Payment Intent ID: ${paymentIntent.id}\n` +
                    `Amount: ${stripeService.formatAmount(
                      paymentIntent.amount,
                      paymentIntent.currency
                    )}\n` +
                    `Status: ${paymentIntent.status}\n\n` +
                    `Revisa tu Stripe Dashboard para ver el pago procesado.`
                );
              } catch (error: any) {
                console.error('❌ Stripe test payment error:', error);
                console.error('Error details:', {
                  message: error.message,
                  name: error.name,
                  response: error.response,
                  stack: error.stack,
                });

                const errorMessage =
                  error.response?.data?.message ||
                  error.response?.message ||
                  error.message ||
                  'Error desconocido en el procesamiento del pago';

                Alert.alert(
                  'Error en Test Payment',
                  `Detalles del error:\n\n${errorMessage}\n\nRevisa la consola para más información.`
                );
              }
            },
            text: 'Procesar Test Payment',
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error setting up test payment');
    } finally {
      setIsTestingPayment(false);
    }
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PageTitle>Pagos</PageTitle>

        <SectionCard>
          <SectionTitle>Gestión de Pagos</SectionTitle>
          <InfoText>
            Aquí podrás gestionar tus métodos de pago y revisar el historial de transacciones.
          </InfoText>
        </SectionCard>

        {/* Stripe Test Section */}
        <SectionCard>
          <SectionTitle>Stripe Test Mode</SectionTitle>
          <InfoText>Prueba la integración con Stripe usando datos de prueba seguros.</InfoText>

          <TouchableOpacity
            disabled={isTestingPayment}
            style={{
              alignItems: 'center',
              backgroundColor: '#6B46C1',
              borderRadius: 8,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 16,
              opacity: isTestingPayment ? 0.6 : 1,
              padding: 16,
            }}
            onPress={handleTestStripePayment}
          >
            <TestTube color='white' size={20} style={{ marginRight: 8 }} />
            <InfoText style={{ color: 'white', fontWeight: '600' }}>
              {isTestingPayment ? 'Procesando...' : 'Test Stripe Payment (pm_card_visa_test)'}
            </InfoText>
          </TouchableOpacity>
        </SectionCard>

        <SectionCard>
          <SectionTitle>Próximamente</SectionTitle>

          <FeatureItem>
            <FeatureIcon>
              <CreditCard color='#FF8A00' size={24} />
            </FeatureIcon>
            <FeatureTitle>Métodos de Pago</FeatureTitle>
            <FeatureDescription>
              Administra tus tarjetas de crédito, débito y otros métodos de pago
            </FeatureDescription>
          </FeatureItem>

          <FeatureItem>
            <FeatureIcon>
              <History color='#FF8A00' size={24} />
            </FeatureIcon>
            <FeatureTitle>Historial de Transacciones</FeatureTitle>
            <FeatureDescription>
              Revisa todas tus transacciones y descargas facturas
            </FeatureDescription>
          </FeatureItem>

          <FeatureItem>
            <FeatureIcon>
              <DollarSign color='#FF8A00' size={24} />
            </FeatureIcon>
            <FeatureTitle>Balance y Reembolsos</FeatureTitle>
            <FeatureDescription>
              Gestiona tu balance de cuenta y solicita reembolsos
            </FeatureDescription>
          </FeatureItem>
        </SectionCard>
      </ScrollView>
    </Container>
  );
};
