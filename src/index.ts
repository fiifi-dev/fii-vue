import "virtual:windi.css";
import "./style.css";

// Types
export type { TableHeader, Tab, Pagination } from "./types";

// Composables
export { useConfirm } from "./composables/confirm";
export { useToast } from "./composables/toast";

// Components

// layouts
export { default as FAdminContent } from "./components/layouts/FAdminContent.vue";
export { default as FAdminLayout } from "./components/layouts/FAdminLayout.vue";
export { default as FAuthCenterLayout } from "./components/layouts/FAuthCenterLayout.vue";
export { default as FAuthSidedLayout } from "./components/layouts/FAuthSidedLayout.vue";
export { default as FSpace } from "./components/layouts/FSpace.vue";
