import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import FormTextField from '../components/FormTextField';
import PrimaryButton from '../components/PrimaryButton';
import { sha256 } from '../utils/hash';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { control, handleSubmit } = useForm({ defaultValues: { email: '', password: '' } });
  const { login, state } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (vals: { email: string; password: string }) => {
    if (state.locked) {
      setError('Account locked due to multiple failed attempts.');
      return;
    }
    const hash = await sha256(vals.password);
    const res = await login(vals.email, hash);
    if (!res.ok) {
      setError(`Invalid credentials. Attempts: ${res.attempts}`);
    } else {
      setError(null);
    }
  };

  return (
    <View style={styles.container}>
      <Controller name="email" control={control} render={({ field }) => <FormTextField placeholder="Email" value={field.value} onChangeText={field.onChange} />} />
      <Controller name="password" control={control} render={({ field }) => <FormTextField placeholder="Password" secureTextEntry value={field.value} onChangeText={field.onChange} />} />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {state.locked ? <Text style={styles.error}>Account locked after too many attempts.</Text> : null}

      <PrimaryButton title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  error: { color: '#B00020', marginTop: 8 }
});
