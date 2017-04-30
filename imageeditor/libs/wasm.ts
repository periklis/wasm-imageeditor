class WasmImageProcessor {

  public prepare = (): void => {
    FS.mkdir("/data");
    FS.mount(IDBFS, {}, "/data");
    FS.syncfs(true, () => ({}));
  }

  public resize = (filename: string, width: number, height: number): IImage => {
    const targetFilename = "/data/resized.jpg";
    this.preProcess(filename, targetFilename);

    const ip = new Module.ImageProcessor(targetFilename);

    ip.crop(0, 0, width, height);

    const results = this.postProcess(
      targetFilename,
      ip.dimensions(),
      ip.histogram(),
    );

    ip.delete();

    return results;
  }

  public zoom = (filename: string, zoomFactor: number): IImage => {
    const targetFilename = "/data/resized.jpg";
    this.preProcess(filename, targetFilename);

    const ip = new Module.ImageProcessor(targetFilename);
    const dims = ip.dimensions();
    const newWidth = dims.get("x") * (zoomFactor / 100);
    const newHeight = dims.get("y") * (zoomFactor / 100);

    ip.crop(0, 0, newWidth, newHeight);

    const results = this.postProcess(
      targetFilename,
      ip.dimensions(),
      ip.histogram(),
    );

    ip.delete();

    return results;
  }

  public save = (buffer: ArrayBuffer, filename: string): IImage => {
    FS.writeFile(
      filename,
      new Uint8Array(buffer),
      { encoding: "binary" },
    );

    const ip = new Module.ImageProcessor(filename);
    const results = this.postProcess(filename, ip.dimensions(), ip.histogram());
    ip.delete();

    return results;
  }

  private preProcess = (sourceFilename: string, targetFilename: string): void => {
    FS.writeFile(
      targetFilename,
      FS.readFile(sourceFilename, { encoding: "binary" }),
      { encoding: "binary" },
    );
  }

  private postProcess = (filename: string, dimensions: any, histogram: any): IImage => {
    const results = {
      dimensions: { width: 0, height: 0 },
      histogram: [] as number[],
      imageSrc: "",
    };

    results.dimensions.width = dimensions.get("x");
    results.dimensions.height = dimensions.get("y");

    for (let i = 0; i < histogram.size(); i++) {
      results.histogram.push(histogram.get(i));
    }

    const file = FS.readFile(filename, { encoding: "binary" });
    const blob = new Blob([new Uint8Array(file)], { type: "application/image" });
    results.imageSrc = URL.createObjectURL(blob);

    return results;
  }
}

const processor = new WasmImageProcessor();

export default processor;
