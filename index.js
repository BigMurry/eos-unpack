const {
  Serialize: {
    createInitialTypes,
    getTypesFromAbi,
    SerialBuffer,
    deserializeActionData,
    getType
  }
} = require('eosjs');
const crypto = require('crypto');

const TX_ABI = require('./abis/tx.abi.json');
const EOSIO_TOKEN_ABI = require('./abis/eosio.token.abi.json');

const fromHexString = hexString =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

function getContract(abi) {
  const types = getTypesFromAbi(createInitialTypes(), abi);
  const actions = new Map();
  for (const { name, type } of abi.actions) {
    actions.set(name, getType(types, type));
  }
  return { types, actions };
}

function unpackTrx(packedTx) {
  // decode tx
  const initialTypes = createInitialTypes();
  const transactionTypes = getTypesFromAbi(initialTypes, TX_ABI);
  const txType = transactionTypes.get('transaction');
  const buf = new SerialBuffer({ array: fromHexString(packedTx) });
  const trx = txType.deserialize(buf);

  // decode action data
  const eosioContract = getContract(EOSIO_TOKEN_ABI);
  for (let i = 0; i < trx.actions.length; ++i) {
    const { account, name, data } = trx.actions[i];
    const action = deserializeActionData(eosioContract, account, name, data);
    trx.actions[i].data = action;
  }

  // tx hash
  const hash = crypto.createHash('sha256').update(packedTx, 'hex').digest('hex');
  trx.hash = hash;
  return trx;
}

module.exports = unpackTrx;
