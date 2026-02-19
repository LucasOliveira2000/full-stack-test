import { useForm } from '@inertiajs/vue3';

export function useCustomerForm(initialData = {}) {
    const form = useForm({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        document: initialData.document || '',
    });

    const validatePhone = (phone: string): boolean => {
        const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        return phoneRegex.test(phone);
    };

    const formatPhone = (value: string) => {
        let numbers = value.replace(/\D/g, '');
        if (numbers.length > 11) numbers = numbers.slice(0, 11);
        if (numbers.length <= 2) return `(${numbers}`;
        if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    };

    const validateDocument = (document: string): boolean => {
        const onlyNumbers = document.replace(/\D/g, '');
        return onlyNumbers.length === 11 || onlyNumbers.length === 14;
    };

    const formatDocument = (value: string) => {
        let numbers = value.replace(/\D/g, '').slice(0, 14);
        if (numbers.length <= 11) {
            return numbers
                .replace(/^(\d{3})(\d)/, '$1.$2')
                .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
                .replace(/\.(\d{3})(\d)/, '.$1-$2');
        }
        return numbers
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    };

    const submit = (url: string, method: 'post' | 'put' = 'post') => {
        form.clearErrors();

        if (form.phone && !validatePhone(form.phone)) {
            form.setError('phone', 'Phone must be in the format (00) 09999-9999');
            return;
        }

        if (form.document && !validateDocument(form.document)) {
            form.setError('document', 'Document must contain exactly 11 (CPF) or 14 (CNPJ) numbers');
            return;
        }

        if (method === 'post') form.post(url);
        else form.put(url);
    };

    return { form, validatePhone, formatPhone, validateDocument, formatDocument, submit };
}
