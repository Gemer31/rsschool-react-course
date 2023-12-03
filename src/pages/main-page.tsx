import { useAppSelector } from '../store/redux-hooks.ts';
import { FormCard } from '../components/form-card/form-card.tsx';
import { IForm } from '../types.ts';

export function MainPage() {
  const forms: IForm[] = useAppSelector((state) => state.data.forms);

  return (
    <section>
      {forms.length === 0 && (
        <div className="no-forms">There are no saved forms</div>
      )}
      <div className="forms-list">
        {forms.map((item, index) => (
          <FormCard data={item} key={index} index={index} />
        ))}
      </div>
    </section>
  );
}
