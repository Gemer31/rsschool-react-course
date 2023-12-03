import { useAppSelector } from '../store/redux-hooks.ts';
import { FormCard } from '../components/form-card/form-card.tsx';
import { IStateForm } from '../types.ts';

export function MainPage() {
  const forms: IStateForm[] = useAppSelector((state) => state.data.forms);

  return (
    <section>
      {forms.length === 0 && (
        <div className="no-data">There are no saved forms</div>
      )}
      <div className="forms-list">
        {forms.map((item, index) => (
          <FormCard data={item} key={index} />
        ))}
      </div>
    </section>
  );
}
