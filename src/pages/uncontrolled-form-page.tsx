import { UncontrolledForm } from '../components/form/uncontrolled-form';
import { FormLayout } from '../components/form-layout/form-layout.tsx';

export function UncontrolledFormPage() {
  return (
    <FormLayout title="Uncontrolled Form">
      <UncontrolledForm />
    </FormLayout>
  );
}
