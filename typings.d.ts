declare module '*.css';
declare module '*.less';
declare module '*.png';

declare interface PlainObject {
  [propName: string]: any;
}

declare interface BooleanObject {
  [propName: string]: boolean;
}

declare interface StringObject {
  [propName: string]: string;
}

declare interface NumberObject {
  [propName: string]: number;
}
