import { ref, reactive } from "vue";
import { Repository } from "../models/models";

export default function useGetRepos() {
  const data = ref<Repository[]>([]);
  const loading = ref(false);
  const error = ref("");

  const state = reactive({ data: [], loading: false, error: "" });

  async function getRepos(name: string) {
    error.value = "";
    loading.value = true;
    data.value = [];

    try {
      const response = await fetch(
        `https://api.github.com/orgs/${name}/repos?per_page=100`
      );

      const result = await response.json();

      if (response.ok) {
        data.value = result;
        error.value = "";
      } else {
        error.value = result.message;
        data.value = [];
      }
    } catch (err) {
      error.value = err.message;
      data.value = [];
    } finally {
      loading.value = false;
    }
  }

  return { loading, data, error, getRepos };
}
