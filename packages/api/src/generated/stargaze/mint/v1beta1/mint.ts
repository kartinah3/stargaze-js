/* eslint-disable */
import * as Long from "long";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "stargaze.mint.v1beta1";

/** Minter represents the minting state. */
export interface Minter {
  /** current annual expected provisions */
  annualProvisions: string;
}

/** Params holds parameters for the mint module. */
export interface Params {
  /** type of coin to mint */
  mintDenom: string;
  /** the time the chain starts */
  startTime?: Date;
  /** initial annual provisions */
  initialAnnualProvisions: string;
  /** factor to reduce inflation by each year */
  reductionFactor: string;
  /** expected blocks per year */
  blocksPerYear: Long;
}

const baseMinter: object = { annualProvisions: "" };

export const Minter = {
  encode(message: Minter, writer: Writer = Writer.create()): Writer {
    if (message.annualProvisions !== "") {
      writer.uint32(10).string(message.annualProvisions);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Minter {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(baseMinter) as Minter;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.annualProvisions = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Minter {
    const message = globalThis.Object.create(baseMinter) as Minter;
    if (
      object.annualProvisions !== undefined &&
      object.annualProvisions !== null
    ) {
      message.annualProvisions = String(object.annualProvisions);
    } else {
      message.annualProvisions = "";
    }
    return message;
  },

  fromPartial(object: DeepPartial<Minter>): Minter {
    const message = { ...baseMinter } as Minter;
    if (
      object.annualProvisions !== undefined &&
      object.annualProvisions !== null
    ) {
      message.annualProvisions = object.annualProvisions;
    } else {
      message.annualProvisions = "";
    }
    return message;
  },

  toJSON(message: Minter): unknown {
    const obj: any = {};
    message.annualProvisions !== undefined &&
      (obj.annualProvisions = message.annualProvisions);
    return obj;
  },
};

const baseParams: object = {
  mintDenom: "",
  initialAnnualProvisions: "",
  reductionFactor: "",
  blocksPerYear: Long.UZERO,
};

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    if (message.mintDenom !== "") {
      writer.uint32(10).string(message.mintDenom);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.startTime),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.initialAnnualProvisions !== "") {
      writer.uint32(26).string(message.initialAnnualProvisions);
    }
    if (message.reductionFactor !== "") {
      writer.uint32(34).string(message.reductionFactor);
    }
    if (!message.blocksPerYear.isZero()) {
      writer.uint32(40).uint64(message.blocksPerYear);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(baseParams) as Params;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mintDenom = reader.string();
          break;
        case 2:
          message.startTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.initialAnnualProvisions = reader.string();
          break;
        case 4:
          message.reductionFactor = reader.string();
          break;
        case 5:
          message.blocksPerYear = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    const message = globalThis.Object.create(baseParams) as Params;
    if (object.mintDenom !== undefined && object.mintDenom !== null) {
      message.mintDenom = String(object.mintDenom);
    } else {
      message.mintDenom = "";
    }
    if (object.startTime !== undefined && object.startTime !== null) {
      message.startTime = fromJsonTimestamp(object.startTime);
    } else {
      message.startTime = undefined;
    }
    if (
      object.initialAnnualProvisions !== undefined &&
      object.initialAnnualProvisions !== null
    ) {
      message.initialAnnualProvisions = String(object.initialAnnualProvisions);
    } else {
      message.initialAnnualProvisions = "";
    }
    if (
      object.reductionFactor !== undefined &&
      object.reductionFactor !== null
    ) {
      message.reductionFactor = String(object.reductionFactor);
    } else {
      message.reductionFactor = "";
    }
    if (object.blocksPerYear !== undefined && object.blocksPerYear !== null) {
      message.blocksPerYear = Long.fromString(object.blocksPerYear);
    } else {
      message.blocksPerYear = Long.UZERO;
    }
    return message;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (object.mintDenom !== undefined && object.mintDenom !== null) {
      message.mintDenom = object.mintDenom;
    } else {
      message.mintDenom = "";
    }
    if (object.startTime !== undefined && object.startTime !== null) {
      message.startTime = object.startTime;
    } else {
      message.startTime = undefined;
    }
    if (
      object.initialAnnualProvisions !== undefined &&
      object.initialAnnualProvisions !== null
    ) {
      message.initialAnnualProvisions = object.initialAnnualProvisions;
    } else {
      message.initialAnnualProvisions = "";
    }
    if (
      object.reductionFactor !== undefined &&
      object.reductionFactor !== null
    ) {
      message.reductionFactor = object.reductionFactor;
    } else {
      message.reductionFactor = "";
    }
    if (object.blocksPerYear !== undefined && object.blocksPerYear !== null) {
      message.blocksPerYear = object.blocksPerYear as Long;
    } else {
      message.blocksPerYear = Long.UZERO;
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.mintDenom !== undefined && (obj.mintDenom = message.mintDenom);
    message.startTime !== undefined &&
      (obj.startTime =
        message.startTime !== undefined
          ? message.startTime.toISOString()
          : null);
    message.initialAnnualProvisions !== undefined &&
      (obj.initialAnnualProvisions = message.initialAnnualProvisions);
    message.reductionFactor !== undefined &&
      (obj.reductionFactor = message.reductionFactor);
    message.blocksPerYear !== undefined &&
      (obj.blocksPerYear = (message.blocksPerYear || Long.UZERO).toString());
    return obj;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | undefined
  | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
