import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface RequestState {
  loading: boolean;
  error: Error | null;
}

export const useIPAStore = defineStore('ipa', () => {
  let arr = Array.from({ length: 6 }, (_, k) => k).map(x => x + 1).map(x => {
    return '翻盘微信' + x.toString();
  });

  const ipaList = ref(arr);

  async function downloadIPA(index: number): Promise<{ url: String | null; requestState: RequestState }> {
    const requestState: RequestState = {
      loading: true,
      error: null,
    };
    
    var host = "https://fpwx.uutx.cn";
    var url = host + '/api/signature/fpwx/' + (index + 1);

    try {
      var res = await axios({
        method: 'get',
        url: url,
      });
      var url = res.data["services_url"] as string;
      requestState.loading = false;
      return { url, requestState };
    } catch (error) {
      requestState.loading = false;
      requestState.error = error as Error;
      return { url: null, requestState };
    }
  }

  return { ipaList, downloadIPA };
});