/* eslint-disable */
import * as Long from "long";
import { DecCoin, Coin } from "../../../cosmos/base/v1beta1/coin";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "cosmos.distribution.v1beta1";

/** Params defines the set of params for the distribution module. */
export interface Params {
  communityTax: string;
  baseProposerReward: string;
  bonusProposerReward: string;
  withdrawAddrEnabled: boolean;
}

/**
 * ValidatorHistoricalRewards represents historical rewards for a validator.
 * Height is implicit within the store key.
 * Cumulative reward ratio is the sum from the zeroeth period
 * until this period of rewards / tokens, per the spec.
 * The reference count indicates the number of objects
 * which might need to reference this historical entry at any point.
 * ReferenceCount =
 *    number of outstanding delegations which ended the associated period (and
 *    might need to read that record)
 *  + number of slashes which ended the associated period (and might need to
 *  read that record)
 *  + one per validator for the zeroeth period, set on initialization
 */
export interface ValidatorHistoricalRewards {
  cumulativeRewardRatio: DecCoin[];
  referenceCount: number;
}

/**
 * ValidatorCurrentRewards represents current rewards and current
 * period for a validator kept as a running counter and incremented
 * each block as long as the validator's tokens remain constant.
 */
export interface ValidatorCurrentRewards {
  rewards: DecCoin[];
  period: Long;
}

/**
 * ValidatorAccumulatedCommission represents accumulated commission
 * for a validator kept as a running counter, can be withdrawn at any time.
 */
export interface ValidatorAccumulatedCommission {
  commission: DecCoin[];
}

/**
 * ValidatorOutstandingRewards represents outstanding (un-withdrawn) rewards
 * for a validator inexpensive to track, allows simple sanity checks.
 */
export interface ValidatorOutstandingRewards {
  rewards: DecCoin[];
}

/**
 * ValidatorSlashEvent represents a validator slash event.
 * Height is implicit within the store key.
 * This is needed to calculate appropriate amount of staking tokens
 * for delegations which are withdrawn after a slash has occurred.
 */
export interface ValidatorSlashEvent {
  validatorPeriod: Long;
  fraction: string;
}

/** ValidatorSlashEvents is a collection of ValidatorSlashEvent messages. */
export interface ValidatorSlashEvents {
  validatorSlashEvents: ValidatorSlashEvent[];
}

/** FeePool is the global fee pool for distribution. */
export interface FeePool {
  communityPool: DecCoin[];
}

/**
 * CommunityPoolSpendProposal details a proposal for use of community funds,
 * together with how many coins are proposed to be spent, and to which
 * recipient account.
 */
export interface CommunityPoolSpendProposal {
  title: string;
  description: string;
  recipient: string;
  amount: Coin[];
}

/**
 * DelegatorStartingInfo represents the starting info for a delegator reward
 * period. It tracks the previous validator period, the delegation's amount of
 * staking token, and the creation height (to check later on if any slashes have
 * occurred). NOTE: Even though validators are slashed to whole staking tokens,
 * the delegators within the validator may be left with less than a full token,
 * thus sdk.Dec is used.
 */
export interface DelegatorStartingInfo {
  previousPeriod: Long;
  stake: string;
  height: Long;
}

/**
 * DelegationDelegatorReward represents the properties
 * of a delegator's delegation reward.
 */
export interface DelegationDelegatorReward {
  validatorAddress: string;
  reward: DecCoin[];
}

/**
 * CommunityPoolSpendProposalWithDeposit defines a CommunityPoolSpendProposal
 * with a deposit
 */
export interface CommunityPoolSpendProposalWithDeposit {
  title: string;
  description: string;
  recipient: string;
  amount: string;
  deposit: string;
}

const baseParams: object = {
  communityTax: "",
  baseProposerReward: "",
  bonusProposerReward: "",
  withdrawAddrEnabled: false,
};

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    if (message.communityTax !== "") {
      writer.uint32(10).string(message.communityTax);
    }
    if (message.baseProposerReward !== "") {
      writer.uint32(18).string(message.baseProposerReward);
    }
    if (message.bonusProposerReward !== "") {
      writer.uint32(26).string(message.bonusProposerReward);
    }
    if (message.withdrawAddrEnabled === true) {
      writer.uint32(32).bool(message.withdrawAddrEnabled);
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
          message.communityTax = reader.string();
          break;
        case 2:
          message.baseProposerReward = reader.string();
          break;
        case 3:
          message.bonusProposerReward = reader.string();
          break;
        case 4:
          message.withdrawAddrEnabled = reader.bool();
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
    if (object.communityTax !== undefined && object.communityTax !== null) {
      message.communityTax = String(object.communityTax);
    } else {
      message.communityTax = "";
    }
    if (
      object.baseProposerReward !== undefined &&
      object.baseProposerReward !== null
    ) {
      message.baseProposerReward = String(object.baseProposerReward);
    } else {
      message.baseProposerReward = "";
    }
    if (
      object.bonusProposerReward !== undefined &&
      object.bonusProposerReward !== null
    ) {
      message.bonusProposerReward = String(object.bonusProposerReward);
    } else {
      message.bonusProposerReward = "";
    }
    if (
      object.withdrawAddrEnabled !== undefined &&
      object.withdrawAddrEnabled !== null
    ) {
      message.withdrawAddrEnabled = Boolean(object.withdrawAddrEnabled);
    } else {
      message.withdrawAddrEnabled = false;
    }
    return message;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (object.communityTax !== undefined && object.communityTax !== null) {
      message.communityTax = object.communityTax;
    } else {
      message.communityTax = "";
    }
    if (
      object.baseProposerReward !== undefined &&
      object.baseProposerReward !== null
    ) {
      message.baseProposerReward = object.baseProposerReward;
    } else {
      message.baseProposerReward = "";
    }
    if (
      object.bonusProposerReward !== undefined &&
      object.bonusProposerReward !== null
    ) {
      message.bonusProposerReward = object.bonusProposerReward;
    } else {
      message.bonusProposerReward = "";
    }
    if (
      object.withdrawAddrEnabled !== undefined &&
      object.withdrawAddrEnabled !== null
    ) {
      message.withdrawAddrEnabled = object.withdrawAddrEnabled;
    } else {
      message.withdrawAddrEnabled = false;
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.communityTax !== undefined &&
      (obj.communityTax = message.communityTax);
    message.baseProposerReward !== undefined &&
      (obj.baseProposerReward = message.baseProposerReward);
    message.bonusProposerReward !== undefined &&
      (obj.bonusProposerReward = message.bonusProposerReward);
    message.withdrawAddrEnabled !== undefined &&
      (obj.withdrawAddrEnabled = message.withdrawAddrEnabled);
    return obj;
  },
};

const baseValidatorHistoricalRewards: object = { referenceCount: 0 };

export const ValidatorHistoricalRewards = {
  encode(
    message: ValidatorHistoricalRewards,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.cumulativeRewardRatio) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.referenceCount !== 0) {
      writer.uint32(16).uint32(message.referenceCount);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): ValidatorHistoricalRewards {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseValidatorHistoricalRewards
    ) as ValidatorHistoricalRewards;
    message.cumulativeRewardRatio = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cumulativeRewardRatio.push(
            DecCoin.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.referenceCount = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorHistoricalRewards {
    const message = globalThis.Object.create(
      baseValidatorHistoricalRewards
    ) as ValidatorHistoricalRewards;
    message.cumulativeRewardRatio = [];
    if (
      object.cumulativeRewardRatio !== undefined &&
      object.cumulativeRewardRatio !== null
    ) {
      for (const e of object.cumulativeRewardRatio) {
        message.cumulativeRewardRatio.push(DecCoin.fromJSON(e));
      }
    }
    if (object.referenceCount !== undefined && object.referenceCount !== null) {
      message.referenceCount = Number(object.referenceCount);
    } else {
      message.referenceCount = 0;
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<ValidatorHistoricalRewards>
  ): ValidatorHistoricalRewards {
    const message = {
      ...baseValidatorHistoricalRewards,
    } as ValidatorHistoricalRewards;
    message.cumulativeRewardRatio = [];
    if (
      object.cumulativeRewardRatio !== undefined &&
      object.cumulativeRewardRatio !== null
    ) {
      for (const e of object.cumulativeRewardRatio) {
        message.cumulativeRewardRatio.push(DecCoin.fromPartial(e));
      }
    }
    if (object.referenceCount !== undefined && object.referenceCount !== null) {
      message.referenceCount = object.referenceCount;
    } else {
      message.referenceCount = 0;
    }
    return message;
  },

  toJSON(message: ValidatorHistoricalRewards): unknown {
    const obj: any = {};
    if (message.cumulativeRewardRatio) {
      obj.cumulativeRewardRatio = message.cumulativeRewardRatio.map((e) =>
        e ? DecCoin.toJSON(e) : undefined
      );
    } else {
      obj.cumulativeRewardRatio = [];
    }
    message.referenceCount !== undefined &&
      (obj.referenceCount = message.referenceCount);
    return obj;
  },
};

const baseValidatorCurrentRewards: object = { period: Long.UZERO };

export const ValidatorCurrentRewards = {
  encode(
    message: ValidatorCurrentRewards,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.rewards) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (!message.period.isZero()) {
      writer.uint32(16).uint64(message.period);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ValidatorCurrentRewards {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseValidatorCurrentRewards
    ) as ValidatorCurrentRewards;
    message.rewards = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewards.push(DecCoin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.period = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorCurrentRewards {
    const message = globalThis.Object.create(
      baseValidatorCurrentRewards
    ) as ValidatorCurrentRewards;
    message.rewards = [];
    if (object.rewards !== undefined && object.rewards !== null) {
      for (const e of object.rewards) {
        message.rewards.push(DecCoin.fromJSON(e));
      }
    }
    if (object.period !== undefined && object.period !== null) {
      message.period = Long.fromString(object.period);
    } else {
      message.period = Long.UZERO;
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<ValidatorCurrentRewards>
  ): ValidatorCurrentRewards {
    const message = {
      ...baseValidatorCurrentRewards,
    } as ValidatorCurrentRewards;
    message.rewards = [];
    if (object.rewards !== undefined && object.rewards !== null) {
      for (const e of object.rewards) {
        message.rewards.push(DecCoin.fromPartial(e));
      }
    }
    if (object.period !== undefined && object.period !== null) {
      message.period = object.period as Long;
    } else {
      message.period = Long.UZERO;
    }
    return message;
  },

  toJSON(message: ValidatorCurrentRewards): unknown {
    const obj: any = {};
    if (message.rewards) {
      obj.rewards = message.rewards.map((e) =>
        e ? DecCoin.toJSON(e) : undefined
      );
    } else {
      obj.rewards = [];
    }
    message.period !== undefined &&
      (obj.period = (message.period || Long.UZERO).toString());
    return obj;
  },
};

const baseValidatorAccumulatedCommission: object = {};

export const ValidatorAccumulatedCommission = {
  encode(
    message: ValidatorAccumulatedCommission,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.commission) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): ValidatorAccumulatedCommission {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseValidatorAccumulatedCommission
    ) as ValidatorAccumulatedCommission;
    message.commission = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.commission.push(DecCoin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorAccumulatedCommission {
    const message = globalThis.Object.create(
      baseValidatorAccumulatedCommission
    ) as ValidatorAccumulatedCommission;
    message.commission = [];
    if (object.commission !== undefined && object.commission !== null) {
      for (const e of object.commission) {
        message.commission.push(DecCoin.fromJSON(e));
      }
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<ValidatorAccumulatedCommission>
  ): ValidatorAccumulatedCommission {
    const message = {
      ...baseValidatorAccumulatedCommission,
    } as ValidatorAccumulatedCommission;
    message.commission = [];
    if (object.commission !== undefined && object.commission !== null) {
      for (const e of object.commission) {
        message.commission.push(DecCoin.fromPartial(e));
      }
    }
    return message;
  },

  toJSON(message: ValidatorAccumulatedCommission): unknown {
    const obj: any = {};
    if (message.commission) {
      obj.commission = message.commission.map((e) =>
        e ? DecCoin.toJSON(e) : undefined
      );
    } else {
      obj.commission = [];
    }
    return obj;
  },
};

const baseValidatorOutstandingRewards: object = {};

export const ValidatorOutstandingRewards = {
  encode(
    message: ValidatorOutstandingRewards,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.rewards) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): ValidatorOutstandingRewards {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseValidatorOutstandingRewards
    ) as ValidatorOutstandingRewards;
    message.rewards = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewards.push(DecCoin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorOutstandingRewards {
    const message = globalThis.Object.create(
      baseValidatorOutstandingRewards
    ) as ValidatorOutstandingRewards;
    message.rewards = [];
    if (object.rewards !== undefined && object.rewards !== null) {
      for (const e of object.rewards) {
        message.rewards.push(DecCoin.fromJSON(e));
      }
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<ValidatorOutstandingRewards>
  ): ValidatorOutstandingRewards {
    const message = {
      ...baseValidatorOutstandingRewards,
    } as ValidatorOutstandingRewards;
    message.rewards = [];
    if (object.rewards !== undefined && object.rewards !== null) {
      for (const e of object.rewards) {
        message.rewards.push(DecCoin.fromPartial(e));
      }
    }
    return message;
  },

  toJSON(message: ValidatorOutstandingRewards): unknown {
    const obj: any = {};
    if (message.rewards) {
      obj.rewards = message.rewards.map((e) =>
        e ? DecCoin.toJSON(e) : undefined
      );
    } else {
      obj.rewards = [];
    }
    return obj;
  },
};

const baseValidatorSlashEvent: object = {
  validatorPeriod: Long.UZERO,
  fraction: "",
};

export const ValidatorSlashEvent = {
  encode(
    message: ValidatorSlashEvent,
    writer: Writer = Writer.create()
  ): Writer {
    if (!message.validatorPeriod.isZero()) {
      writer.uint32(8).uint64(message.validatorPeriod);
    }
    if (message.fraction !== "") {
      writer.uint32(18).string(message.fraction);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ValidatorSlashEvent {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseValidatorSlashEvent
    ) as ValidatorSlashEvent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorPeriod = reader.uint64() as Long;
          break;
        case 2:
          message.fraction = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorSlashEvent {
    const message = globalThis.Object.create(
      baseValidatorSlashEvent
    ) as ValidatorSlashEvent;
    if (
      object.validatorPeriod !== undefined &&
      object.validatorPeriod !== null
    ) {
      message.validatorPeriod = Long.fromString(object.validatorPeriod);
    } else {
      message.validatorPeriod = Long.UZERO;
    }
    if (object.fraction !== undefined && object.fraction !== null) {
      message.fraction = String(object.fraction);
    } else {
      message.fraction = "";
    }
    return message;
  },

  fromPartial(object: DeepPartial<ValidatorSlashEvent>): ValidatorSlashEvent {
    const message = { ...baseValidatorSlashEvent } as ValidatorSlashEvent;
    if (
      object.validatorPeriod !== undefined &&
      object.validatorPeriod !== null
    ) {
      message.validatorPeriod = object.validatorPeriod as Long;
    } else {
      message.validatorPeriod = Long.UZERO;
    }
    if (object.fraction !== undefined && object.fraction !== null) {
      message.fraction = object.fraction;
    } else {
      message.fraction = "";
    }
    return message;
  },

  toJSON(message: ValidatorSlashEvent): unknown {
    const obj: any = {};
    message.validatorPeriod !== undefined &&
      (obj.validatorPeriod = (
        message.validatorPeriod || Long.UZERO
      ).toString());
    message.fraction !== undefined && (obj.fraction = message.fraction);
    return obj;
  },
};

const baseValidatorSlashEvents: object = {};

export const ValidatorSlashEvents = {
  encode(
    message: ValidatorSlashEvents,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.validatorSlashEvents) {
      ValidatorSlashEvent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ValidatorSlashEvents {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseValidatorSlashEvents
    ) as ValidatorSlashEvents;
    message.validatorSlashEvents = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorSlashEvents.push(
            ValidatorSlashEvent.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorSlashEvents {
    const message = globalThis.Object.create(
      baseValidatorSlashEvents
    ) as ValidatorSlashEvents;
    message.validatorSlashEvents = [];
    if (
      object.validatorSlashEvents !== undefined &&
      object.validatorSlashEvents !== null
    ) {
      for (const e of object.validatorSlashEvents) {
        message.validatorSlashEvents.push(ValidatorSlashEvent.fromJSON(e));
      }
    }
    return message;
  },

  fromPartial(object: DeepPartial<ValidatorSlashEvents>): ValidatorSlashEvents {
    const message = { ...baseValidatorSlashEvents } as ValidatorSlashEvents;
    message.validatorSlashEvents = [];
    if (
      object.validatorSlashEvents !== undefined &&
      object.validatorSlashEvents !== null
    ) {
      for (const e of object.validatorSlashEvents) {
        message.validatorSlashEvents.push(ValidatorSlashEvent.fromPartial(e));
      }
    }
    return message;
  },

  toJSON(message: ValidatorSlashEvents): unknown {
    const obj: any = {};
    if (message.validatorSlashEvents) {
      obj.validatorSlashEvents = message.validatorSlashEvents.map((e) =>
        e ? ValidatorSlashEvent.toJSON(e) : undefined
      );
    } else {
      obj.validatorSlashEvents = [];
    }
    return obj;
  },
};

const baseFeePool: object = {};

export const FeePool = {
  encode(message: FeePool, writer: Writer = Writer.create()): Writer {
    for (const v of message.communityPool) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FeePool {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(baseFeePool) as FeePool;
    message.communityPool = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.communityPool.push(DecCoin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FeePool {
    const message = globalThis.Object.create(baseFeePool) as FeePool;
    message.communityPool = [];
    if (object.communityPool !== undefined && object.communityPool !== null) {
      for (const e of object.communityPool) {
        message.communityPool.push(DecCoin.fromJSON(e));
      }
    }
    return message;
  },

  fromPartial(object: DeepPartial<FeePool>): FeePool {
    const message = { ...baseFeePool } as FeePool;
    message.communityPool = [];
    if (object.communityPool !== undefined && object.communityPool !== null) {
      for (const e of object.communityPool) {
        message.communityPool.push(DecCoin.fromPartial(e));
      }
    }
    return message;
  },

  toJSON(message: FeePool): unknown {
    const obj: any = {};
    if (message.communityPool) {
      obj.communityPool = message.communityPool.map((e) =>
        e ? DecCoin.toJSON(e) : undefined
      );
    } else {
      obj.communityPool = [];
    }
    return obj;
  },
};

const baseCommunityPoolSpendProposal: object = {
  title: "",
  description: "",
  recipient: "",
};

export const CommunityPoolSpendProposal = {
  encode(
    message: CommunityPoolSpendProposal,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.recipient !== "") {
      writer.uint32(26).string(message.recipient);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): CommunityPoolSpendProposal {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseCommunityPoolSpendProposal
    ) as CommunityPoolSpendProposal;
    message.amount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.recipient = reader.string();
          break;
        case 4:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommunityPoolSpendProposal {
    const message = globalThis.Object.create(
      baseCommunityPoolSpendProposal
    ) as CommunityPoolSpendProposal;
    message.amount = [];
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = String(object.recipient);
    } else {
      message.recipient = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      for (const e of object.amount) {
        message.amount.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<CommunityPoolSpendProposal>
  ): CommunityPoolSpendProposal {
    const message = {
      ...baseCommunityPoolSpendProposal,
    } as CommunityPoolSpendProposal;
    message.amount = [];
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient;
    } else {
      message.recipient = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      for (const e of object.amount) {
        message.amount.push(Coin.fromPartial(e));
      }
    }
    return message;
  },

  toJSON(message: CommunityPoolSpendProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    return obj;
  },
};

const baseDelegatorStartingInfo: object = {
  previousPeriod: Long.UZERO,
  stake: "",
  height: Long.UZERO,
};

export const DelegatorStartingInfo = {
  encode(
    message: DelegatorStartingInfo,
    writer: Writer = Writer.create()
  ): Writer {
    if (!message.previousPeriod.isZero()) {
      writer.uint32(8).uint64(message.previousPeriod);
    }
    if (message.stake !== "") {
      writer.uint32(18).string(message.stake);
    }
    if (!message.height.isZero()) {
      writer.uint32(24).uint64(message.height);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DelegatorStartingInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseDelegatorStartingInfo
    ) as DelegatorStartingInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.previousPeriod = reader.uint64() as Long;
          break;
        case 2:
          message.stake = reader.string();
          break;
        case 3:
          message.height = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegatorStartingInfo {
    const message = globalThis.Object.create(
      baseDelegatorStartingInfo
    ) as DelegatorStartingInfo;
    if (object.previousPeriod !== undefined && object.previousPeriod !== null) {
      message.previousPeriod = Long.fromString(object.previousPeriod);
    } else {
      message.previousPeriod = Long.UZERO;
    }
    if (object.stake !== undefined && object.stake !== null) {
      message.stake = String(object.stake);
    } else {
      message.stake = "";
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Long.fromString(object.height);
    } else {
      message.height = Long.UZERO;
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<DelegatorStartingInfo>
  ): DelegatorStartingInfo {
    const message = { ...baseDelegatorStartingInfo } as DelegatorStartingInfo;
    if (object.previousPeriod !== undefined && object.previousPeriod !== null) {
      message.previousPeriod = object.previousPeriod as Long;
    } else {
      message.previousPeriod = Long.UZERO;
    }
    if (object.stake !== undefined && object.stake !== null) {
      message.stake = object.stake;
    } else {
      message.stake = "";
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = object.height as Long;
    } else {
      message.height = Long.UZERO;
    }
    return message;
  },

  toJSON(message: DelegatorStartingInfo): unknown {
    const obj: any = {};
    message.previousPeriod !== undefined &&
      (obj.previousPeriod = (message.previousPeriod || Long.UZERO).toString());
    message.stake !== undefined && (obj.stake = message.stake);
    message.height !== undefined &&
      (obj.height = (message.height || Long.UZERO).toString());
    return obj;
  },
};

const baseDelegationDelegatorReward: object = { validatorAddress: "" };

export const DelegationDelegatorReward = {
  encode(
    message: DelegationDelegatorReward,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    for (const v of message.reward) {
      DecCoin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): DelegationDelegatorReward {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseDelegationDelegatorReward
    ) as DelegationDelegatorReward;
    message.reward = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        case 2:
          message.reward.push(DecCoin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegationDelegatorReward {
    const message = globalThis.Object.create(
      baseDelegationDelegatorReward
    ) as DelegationDelegatorReward;
    message.reward = [];
    if (
      object.validatorAddress !== undefined &&
      object.validatorAddress !== null
    ) {
      message.validatorAddress = String(object.validatorAddress);
    } else {
      message.validatorAddress = "";
    }
    if (object.reward !== undefined && object.reward !== null) {
      for (const e of object.reward) {
        message.reward.push(DecCoin.fromJSON(e));
      }
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<DelegationDelegatorReward>
  ): DelegationDelegatorReward {
    const message = {
      ...baseDelegationDelegatorReward,
    } as DelegationDelegatorReward;
    message.reward = [];
    if (
      object.validatorAddress !== undefined &&
      object.validatorAddress !== null
    ) {
      message.validatorAddress = object.validatorAddress;
    } else {
      message.validatorAddress = "";
    }
    if (object.reward !== undefined && object.reward !== null) {
      for (const e of object.reward) {
        message.reward.push(DecCoin.fromPartial(e));
      }
    }
    return message;
  },

  toJSON(message: DelegationDelegatorReward): unknown {
    const obj: any = {};
    message.validatorAddress !== undefined &&
      (obj.validatorAddress = message.validatorAddress);
    if (message.reward) {
      obj.reward = message.reward.map((e) =>
        e ? DecCoin.toJSON(e) : undefined
      );
    } else {
      obj.reward = [];
    }
    return obj;
  },
};

const baseCommunityPoolSpendProposalWithDeposit: object = {
  title: "",
  description: "",
  recipient: "",
  amount: "",
  deposit: "",
};

export const CommunityPoolSpendProposalWithDeposit = {
  encode(
    message: CommunityPoolSpendProposalWithDeposit,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.recipient !== "") {
      writer.uint32(26).string(message.recipient);
    }
    if (message.amount !== "") {
      writer.uint32(34).string(message.amount);
    }
    if (message.deposit !== "") {
      writer.uint32(42).string(message.deposit);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): CommunityPoolSpendProposalWithDeposit {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseCommunityPoolSpendProposalWithDeposit
    ) as CommunityPoolSpendProposalWithDeposit;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.recipient = reader.string();
          break;
        case 4:
          message.amount = reader.string();
          break;
        case 5:
          message.deposit = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommunityPoolSpendProposalWithDeposit {
    const message = globalThis.Object.create(
      baseCommunityPoolSpendProposalWithDeposit
    ) as CommunityPoolSpendProposalWithDeposit;
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = String(object.recipient);
    } else {
      message.recipient = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = String(object.amount);
    } else {
      message.amount = "";
    }
    if (object.deposit !== undefined && object.deposit !== null) {
      message.deposit = String(object.deposit);
    } else {
      message.deposit = "";
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<CommunityPoolSpendProposalWithDeposit>
  ): CommunityPoolSpendProposalWithDeposit {
    const message = {
      ...baseCommunityPoolSpendProposalWithDeposit,
    } as CommunityPoolSpendProposalWithDeposit;
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    } else {
      message.title = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient;
    } else {
      message.recipient = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    } else {
      message.amount = "";
    }
    if (object.deposit !== undefined && object.deposit !== null) {
      message.deposit = object.deposit;
    } else {
      message.deposit = "";
    }
    return message;
  },

  toJSON(message: CommunityPoolSpendProposalWithDeposit): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.recipient !== undefined && (obj.recipient = message.recipient);
    message.amount !== undefined && (obj.amount = message.amount);
    message.deposit !== undefined && (obj.deposit = message.deposit);
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
