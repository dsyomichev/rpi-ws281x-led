export default interface HardwareInfo {
  readonly type: number;
  readonly hwver: number;
  readonly periph_base: number;
  readonly videocore_base: number;
  readonly desc: string;
}
