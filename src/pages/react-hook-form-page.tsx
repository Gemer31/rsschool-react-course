import { ReactHookForm } from '../components/form/react-hook-form.tsx';
import { FormLayout } from '../components/form-layout/form-layout.tsx';

export function ReactHookFormPage() {
  return (
    <FormLayout title="React Hook Form">
      <ReactHookForm />
    </FormLayout>
  );
}