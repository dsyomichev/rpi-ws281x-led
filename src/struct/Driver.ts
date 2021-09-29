import driver, { BaseDriver } from '../core/ws281x';

process.on('SIGINT', () => {
  driver.fini();
  process.nextTick(() => process.exit(0));
});

export default abstract class Driver {
  public readonly dma: number;

  public readonly frequency: number;

  protected readonly driver: BaseDriver = driver;

  public constructor(dma: number, frequency: number) {
    Object.defineProperty(this, 'driver', { enumerable: false });

    this.driver.dmanum = dma;
    this.dma = dma;

    this.driver.freq = frequency;
    this.frequency = frequency;
  }

  public initialize(): void {
    driver.init();
  }

  public finalize(): void {
    driver.fini();
  }

  public render(): void {
    driver.render();
  }
}
