declare module "*.scss" {
  const content: any;
  export default content;
}

// TODO Replace the following with @types/react-hot-loader
declare var module: any;

declare namespace Module {
  interface IImageProcessor {
    crop(x: number, y: number, width: number, height: number): void;
    dimensions(): {
      x: number;
      y: number;
      get: (coord: string) => number;
    };
    histogram(): number[];
    delete(): void;
  }

  const ImageProcessor: {
    new(filepath: string): IImageProcessor;
  };
}

interface IImageDimensions {
  height: number;
  width: number;
}

interface IImage {
  dimensions: IImageDimensions;
  histogram: number[];
  imageSrc: string;
}

interface IToolboxProps {
  dimensions: IImageDimensions;
  histogram: number[];
  onResize(value: IImageDimensions): void;
  onSave(acceptedFiles: Array<any>): void;
  onZoom(zoomFactor: number): void;
}

interface ICanvasProps {
  imageSrc: string;
}

interface IAppProps extends IToolboxProps, ICanvasProps {}

interface IImageProcessorProps  {
  binArguments?: string[];
  environment?: Module.EnvironmentType;
  locateMemFile?: (url: string) => string;
  logReadFiles?: boolean;
  noExitRuntime?: boolean;
  noInitialRun?: boolean;
  print?: (str: string) => void;
  printErr?: (str: string) => void;
  postRun?: (() => void)[];
  preInit?: (() => void)[];
  preRun?: (() => void)[];
  shellFilename?: string;
  wasmFilename?: string;
}

declare enum StreamType {STDOUT, STDERR}

interface ILogEntry {
  text: string;
  stream: StreamType;
}

interface ILogProps {
  log?: ILogEntry[];
}

interface IReduxAction {
  type: string;
}

interface ILogAction extends IReduxAction, ILogProps {}
interface IImageAction extends IReduxAction, IImage {}
