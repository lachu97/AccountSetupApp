import * as Keychain from 'react-native-keychain';

export type Credentials = { username: string; passwordHash: string };

const SERVICE = 'com.accountsetupapp.credentials';

export async function saveCredentials(creds: Credentials) {
  // store username in service, passwordHash as password
  await Keychain.setGenericPassword(creds.username, creds.passwordHash, { service: SERVICE });
}

export async function getCredentials(): Promise<Credentials | null> {
  try {
    const res = await Keychain.getGenericPassword({ service: SERVICE });
    if (!res) return null;
    return { username: res.username, passwordHash: res.password };
  } catch (e) {
    return null;
  }
}

export async function clearCredentials() {
  await Keychain.resetGenericPassword({ service: SERVICE });
}
