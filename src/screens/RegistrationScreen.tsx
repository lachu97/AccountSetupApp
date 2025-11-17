import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import FormTextField from '../components/FormTextField';
import PrimaryButton from '../components/PrimaryButton';
import countries from '../data/countries.json';
import { sha256 } from '../utils/hash';
import { useAuth } from '../contexts/AuthContext';
import PaperDropdown from '../components/PaperDropdown';
import { usePersistedForm } from '../hooks/usePersistedForm';

type FormVals = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  country: string;
};

const FORM_KEY = 'registration_partial_v1';

export default function RegistrationScreen({ navigation }: any) {
  const methods = usePersistedForm<FormVals>(FORM_KEY, {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    country: 'IN',
  });

  const { control, handleSubmit, formState } = methods as any;
  const { errors, isValid } = formState;
  const { register } = useAuth();

  const onSubmit = async (data: FormVals) => {
    const hash = await sha256(data.password);
    await register(data.email, hash);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create your account</Text>

        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormTextField
              placeholder="First name"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}

        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormTextField
              placeholder="Last name"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <FormTextField
              placeholder="Email"
              keyboardType="email-address"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <FormTextField
              placeholder="Password"
              secureTextEntry
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormTextField
              placeholder="Confirm password"
              secureTextEntry
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword.message}</Text>
        )}

        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <FormTextField
              placeholder="Phone (optional)"
              keyboardType="phone-pad"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <PaperDropdown
              label="Country"
              value={field.value}
              onChange={field.onChange}
              items={countries.map((c: any) => ({
                label: c.name,
                value: c.code,
              }))}
              error={errors.country?.message}
            />
          )}
        />
        {errors.country && <Text style={styles.error}>{errors.country.message}</Text>}

        <PrimaryButton title="Create Account" onPress={handleSubmit(onSubmit)} disabled={!isValid} />

        <PrimaryButton
          title="Already have an account? Login"
          onPress={() => navigation.navigate('Login')}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  error: { color: '#B00020', marginBottom: 8 },
});
