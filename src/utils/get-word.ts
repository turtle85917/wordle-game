import axios from "axios";

/**
 * 영어 단어를 랜덤으로 불러옵니다.
 */
export default async (): Promise<string> => {
  return (await axios.get("https://api.theturkey.dev/randomword")).data as string;
}