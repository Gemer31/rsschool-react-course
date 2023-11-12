import './Loader.scss';

export enum LoaderColor {
  SALMON = 'salmon',
  WHITE = 'white',
}

export interface ILoaderProps {
  color?: LoaderColor;
}
export function Loader({ color }: ILoaderProps) {
  return (
    <span role="loader" className={'loader _' + (color || LoaderColor.WHITE)} />
  );
}
