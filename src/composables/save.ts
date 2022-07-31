import { ref } from "vue";
import { useRoute, useRouter, type RouteLocationRaw } from "vue-router";

export const useIsUpdate = () => {
  const isUpdate = ref(false);
  const id = ref("");
  const route = useRoute();

  if (route.params.id === undefined) {
    isUpdate.value = false;
    id.value = "";
  } else {
    isUpdate.value = true;
    id.value = route.params.id as string;
  }

  return { isUpdate, id };
};

export const useGoTo = (indexRoute: RouteLocationRaw) => {
  const router = useRouter();

  return () => {
    router.push(indexRoute);
  };
};