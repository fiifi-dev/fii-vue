import "virtual:windi.css";
import "./style.css";

// Types
export type {
  TableHeader,
  Tab,
  Pagination,
  SelectOption,
  MenuItem,
  AppBarItem,
} from "./types";

// Composables
export { useConfirm } from "./composables/confirm";
export { useToast } from "./composables/toast";

// layouts
export { default as FAdminContent } from "./components/layouts/FAdminContent.vue";
export { default as FAdminLayout } from "./components/layouts/FAdminLayout.vue";
export { default as FAuthCenterLayout } from "./components/layouts/FAuthCenterLayout.vue";
export { default as FAuthSidedLayout } from "./components/layouts/FAuthSidedLayout.vue";
export { default as FSpace } from "./components/layouts/FSpace.vue";

// cards
export { default as FCard } from "./components/cards/FCard.vue";

// drawers
export { default as FDrawer } from "./components/drawers/FDrawer.vue";

// forms
export { default as FCheckbox } from "./components/forms/FCheckbox.vue";
export { default as FFileInput } from "./components/forms/FFileInput.vue";
export { default as FFormGroup } from "./components/forms/FFormGroup.vue";
export { default as FPasswordInput } from "./components/forms/FPasswordInput.vue";
export { default as FRadioButton } from "./components/forms/FRadioButton.vue";
export { default as FSearchInput } from "./components/forms/FSearchInput.vue";
export { default as FSelectInput } from "./components/forms/FSelectInput.vue";
export { default as FTextInput } from "./components/forms/FTextInput.vue";

// menu
export { default as FDropdown } from "./components/menu/FDropdown.vue";
export { default as FMenu } from "./components/menu/FMenu.vue";

// messages
export { default as FConfirm } from "./components/messages/FConfirm.vue";
export { default as FToast } from "./components/messages/FToast.vue";

// modals
export { default as FModal } from "./components/modals/FModal.vue";

// tables
export { default as FDataTable } from "./components/tables/FDataTable.vue";
export { default as FPagination } from "./components/tables/FPagination.vue";
export { default as FSimpleTable } from "./components/tables/FSimpleTable.vue";

// button
export { default as FBtn } from "./components/buttons/FBtn.vue";
