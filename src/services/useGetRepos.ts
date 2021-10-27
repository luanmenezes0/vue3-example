import { reactive, toRefs } from "vue";
import { Repository } from "../models/models";

type State = { data: Repository[]; loading: boolean; error: string };

export default function useGetRepos() {
  const state = reactive<State>({ data: [], loading: false, error: "" });

  async function getRepos(name: string) {
    state.loading = true;
    state.data = [];
    state.error = "";

    try {
      const response = await fetch(
        `https://api.github.com/orgs/${name}/repos?per_page=100`
      );

      const result = await response.json();

      if (response.ok) {
        state.data = result;
        state.error = "";
      } else {
        state.error = result.message;
        state.data = [];
      }
    } catch (err) {
      state.error = err.message;
      state.data = [];
    } finally {
      state.loading = false;
    }
  }

  return { ...toRefs(state), getRepos };
}
