<script setup lang="ts">
import { watch } from 'vue';
import { toast } from 'vue3-toastify';
import { usePage } from '@inertiajs/vue3';

const page = usePage();

// watch nas props do Inertia de forma segura
watch(
  () => page.props.value, // props é um ref
  (props) => {
    if (!props) return;

    // Checa cada tipo de toast
    // suporta flash sob `flash` (recomendado) e chaves de topo (compat)
    const success = props.success ?? props.flash?.success;
    const error = props.error ?? props.flash?.error;
    const warning = props.warning ?? props.flash?.warning;
    const info = props.info ?? props.flash?.info;

    if (success) toast.success(success);
    if (error) toast.error(error);
    if (warning) toast.warning(warning);
    if (info) toast.info(info);
  },
  { immediate: true } // dispara na primeira renderização
);
</script>

<template>
  <div /> <!-- Não precisa renderizar nada -->
</template>
