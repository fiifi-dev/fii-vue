<template>
  <div>
    <FFormGroup v-bind="formGroupAttrs">
      <template #default>
        <div :class="['bg-gray-100', block ? 'w-full' : 'max-w-xs']">
          <label
            :class="['flex items-center m-auto', disabled ? 'opacity-60' : '']"
          >
            <div
              :class="[
                ...makeTextSize(size),
                ...makePaddingY(size),
                'bg-primary-200 px-3 text-white rounded-l-sm truncate',
                'tracking-wider uppercase',
              ]"
            >
              Browse
            </div>
            <input
              :disabled="disabled"
              :multiple="multiple"
              :accept="accept"
              type="file"
              class="hidden"
              @change="handleChange"
            />
            <span
              :class="[...makeTextSize(size), 'text-gray-600 px-4 truncate']"
            >
              {{ fileName || placeholder || "Select file" }}
            </span>
          </label>
        </div>
      </template>
    </FFormGroup>

    <div
      :class="[
        'text-gray-600 text-xs text-ellipsis p-1 inline-block',
        block ? 'w-full' : 'max-w-xs',
        url ? 'hover:cursor-pointer' : '',
      ]"
      @click="$emit('url', url)"
    >
      {{ url }}
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
  name: "FFileInput",

  props: {
    ...makeFormGroupProps(),
    ...makeMultipleProps(),
    ...makeModelValueProps(),
    ...getObjSubset(makeGeneralInputProps(), [
      "disabled",
      "placeholder",
      "block",
      "size",
    ]),

    label: {
      type: String,
      required: false,
      default: "",
    },

    url: {
      type: String,
      required: false,
      default: "",
    },

    accept: {
      type: String,
      required: false,
      default: "",
    },
  },

  emits: {
    ...makeModelValueEmits(),
    ...makeChangeEmits(),
    url: (_value?: string) => true,
  },

  setup(props, { emit }) {
    const formGroupAttrs = useFormGroup(() => props);

    const getFilenameWithoutExtension = (filename?: string) => {
      if (!filename) return "";
      return filename.replace(/\.[^/.]+$/, "");
    };

    const getFileExtension = (filename?: string) => {
      if (!filename) return "";
      return filename.split(".").pop();
    };

    const getTruncatedFilename = (filename?: string) => {
      if (!filename) return "";
      const len = 30;
      const name = getFilenameWithoutExtension(filename);
      const ext = getFileExtension(filename);
      const sliced_name = name.slice(0, len);
      const spread = sliced_name.length < name.length ? "..." : "";

      const truncatedName = `${sliced_name}${spread}${ext ? "." + ext : ""}`;

      return truncatedName;
    };

    const fileName = computed(() => {
      const files = props.modelValue;
      if (!files) return;

      if (files?.length > 1) return `${files.length} files`;
      else return getTruncatedFilename(files?.name);
    });

    const handleChange = (e: Event) => {
      const target = e?.target as HTMLInputElement;
      const files = target?.files;

      const items = props.multiple ? files : files?.[0];

      emit("update:modelValue", items);
      emit("change", items);
    };

    return {
      formGroupAttrs,
      handleChange,
      makeTextSize,
      makePaddingY,
      fileName,
    };
  },
});
</script>

<style scoped></style>
