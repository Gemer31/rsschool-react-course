import classes from './Loader.module.scss';

export enum LoaderColor {
  SALMON = 'salmon',
  WHITE = 'white',
}

export interface ILoaderProps {
  color?: LoaderColor;
}
export function Loader({ color }: ILoaderProps) {
  return (
    <span
      role="loader"
      className={
        classes.loader +
        ' ' +
        (color === LoaderColor.SALMON ? classes.salmon : '')
      }
    />
  );
}
