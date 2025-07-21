declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'react-feather' {
  import { ComponentType } from 'react';
  
  type IconProps = {
    size?: string | number;
    color?: string;
  } & React.SVGProps<SVGSVGElement>;
  
  export const AlertOctagon: ComponentType<IconProps>;
  export const AlertTriangle: ComponentType<IconProps>;
  export const CheckCircle: ComponentType<IconProps>;
  export const Info: ComponentType<IconProps>;
  export const X: ComponentType<IconProps>;
} 