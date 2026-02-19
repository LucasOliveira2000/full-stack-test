<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCustomerForm } from '@/composables/useCustomerForm';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    document?: string;
}

interface Props {
    customer: Customer;
}

const props = defineProps<Props>();
const { customer } = props; // para usar direto no template

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Customers', href: '/customers' },
    { title: customer.name, href: `/customers/${customer.id}` },
    { title: 'Edit', href: `/customers/${customer.id}/edit` },
];

const { form, formatPhone, formatDocument, submit } = useCustomerForm(customer);

const handleSubmit = () => submit(`/customers/${customer.id}`, 'put');


</script>

<template>
    <Head :title="`Edit ${customer.name}`" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="space-y-4 p-4">
            <h1 class="text-3xl font-bold">Edit {{ customer.name }}</h1>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="grid gap-4 md:grid-cols-2">

                            <!-- Name -->
                            <div class="space-y-2">
                                <Label for="name">Name *</Label>
                                <Input
                                    id="name"
                                    v-model="form.name"
                                    placeholder="John Doe"
                                    required
                                />
                                <p v-if="form.errors.name" class="text-sm text-destructive">
                                    {{ form.errors.name }}
                                </p>
                            </div>

                            <!-- Email -->
                            <div class="space-y-2">
                                <Label for="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    v-model="form.email"
                                    placeholder="john@example.com"
                                    required
                                />
                                <p v-if="form.errors.email" class="text-sm text-destructive">
                                    {{ form.errors.email }}
                                </p>
                            </div>

                            <!-- Phone -->
                            <div class="space-y-2">
                                <Label for="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    v-model="form.phone"
                                    @update:model-value="value => form.phone = formatPhone(value)"
                                    placeholder="(00) 09999-9999"
                                    maxlength="15"
                                />
                                <p v-if="form.errors.phone" class="text-sm text-destructive">
                                    {{ form.errors.phone }}
                                </p>
                            </div>

                            <!-- Document -->
                            <div class="space-y-2">
                                <Label for="document">Document / Tax ID</Label>
                                <Input
                                    id="document"
                                    v-model="form.document"
                                    @update:model-value="value => form.document = formatDocument(value)"
                                    @keypress="onlyNumbers"
                                    maxlength="18"
                                    placeholder="CPF 000.000.000-00 ou CNPJ 00.000.000/0000-00"
                                />
                                <p v-if="form.errors.document" class="text-sm text-destructive">
                                    {{ form.errors.document }}
                                </p>
                            </div>

                            <!-- Address -->
                            <div class="space-y-2 md:col-span-2">
                                <Label for="address">Address</Label>
                                <Textarea
                                    id="address"
                                    v-model="form.address"
                                    placeholder="123 Main St, Apt 4B&#10;New York, NY 10001"
                                    rows="3"
                                />
                                <p v-if="form.errors.address" class="text-sm text-destructive">
                                    {{ form.errors.address }}
                                </p>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                <!-- Buttons -->
                <div class="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        @click="router.visit(`/customers/${customer.id}`)"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" :disabled="form.processing">
                        {{ form.processing ? 'Updating...' : 'Update Customer' }}
                    </Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
