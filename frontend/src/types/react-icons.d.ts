declare module 'react-icons/fa' {
  import { ComponentType } from 'react';
  
  interface IconProps {
    className?: string;
    size?: string | number;
    color?: string;
    title?: string;
    style?: React.CSSProperties;
  }
  
  export const FaCar: ComponentType<IconProps>;
  export const FaMotorcycle: ComponentType<IconProps>;
  export const FaTruck: ComponentType<IconProps>;
  export const FaSearch: ComponentType<IconProps>;
  export const FaMapMarkerAlt: ComponentType<IconProps>;
  export const FaGasPump: ComponentType<IconProps>;
  export const FaCogs: ComponentType<IconProps>;
  export const FaCalendarAlt: ComponentType<IconProps>;
  export const FaTachometerAlt: ComponentType<IconProps>;
  export const FaStar: ComponentType<IconProps>;
  export const FaList: ComponentType<IconProps>;
  export const FaTh: ComponentType<IconProps>;
}

declare module 'react-icons/md' {
  import { ComponentType } from 'react';
  
  interface IconProps {
    className?: string;
    size?: string | number;
    color?: string;
    title?: string;
    style?: React.CSSProperties;
  }
  
  export const MdElectricScooter: ComponentType<IconProps>;
}

declare module 'react-icons/gi' {
  import { ComponentType } from 'react';
  
  interface IconProps {
    className?: string;
    size?: string | number;
    color?: string;
    title?: string;
    style?: React.CSSProperties;
  }
  
  export const GiAutoRepair: ComponentType<IconProps>;
}
