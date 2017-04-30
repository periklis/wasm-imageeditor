declare module '*.scss' {
    const content: any;
    export default content;
}

declare var module: any;
declare var Module: IEmscriptenModule | any;
declare var IDBFS: any;
declare var FS: any;

interface IEmscriptenModule  {
    arguments: string,
    environment: string,
    locateFile: Function,
    logReadFiles: boolean,
    noExitRuntime: boolean,
    noInitialRun: boolean,
    print: Function,
    printErr: Function,
    preInit: Function[],
    preRun: Function[],
    wasmBinary: ArrayBuffer
}

interface Window {
    Module: IEmscriptenModule | any
}

interface IImageDimensions {
    width: number,
    height: number
}

interface IImage {
    dimensions: IImageDimensions,
    histogram: number[],
    imageSrc: string
}

interface IToolboxProps {
    dimensions: IImageDimensions,
    histogram: number[],
    onResize(value: IImageDimensions): void,
    onSave(acceptedFiles: Array<any>): void,
    onZoom(zoomFactor: number): void
}

interface ICanvasProps {
    imageSrc: string
}

interface IAppProps extends IToolboxProps, ICanvasProps {}

interface IImageProcessorProps  {
    binArguments?: string,
    environment?: string,
    locateMemFile?: Function,
    logReadFiles?: boolean,
    noExitRuntime?: boolean,
    noInitialRun?: boolean,
    print?: Function,
    printErr?: Function,
    postRun?: Function[],
    preInit?: Function[],
    preRun?: Function[],
    shellFilename?: string,
    wasmFilename?: string
}

declare enum StreamType {STDOUT, STDERR}

interface ILogEntry {
    text: string,
    stream: StreamType
}

interface ILogProps {
    log?: ILogEntry[]
}

interface IReduxAction {
    type: string
}

interface ILogAction extends IReduxAction, ILogProps {}
interface IImageAction extends IReduxAction, IImage {}
