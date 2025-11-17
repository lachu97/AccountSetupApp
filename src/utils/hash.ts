import CryptoJS from "react-native-crypto-js";
export async function sha256(input: string): Promise<string> {
  return CryptoJS.SHA256(input).toString();
}
