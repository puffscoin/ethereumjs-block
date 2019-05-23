'use strict'
const BlockHeader = require('./header')
const puffsUtil = require('puffscoinjs-util')

module.exports = blockHeaderFromRpc

/**
 * Creates a new block header object from PUFFScoin JSON RPC.
 * @param {Object} blockParams - PUFFScoin JSON RPC of block (eth_getBlockByNumber)
 */
function blockHeaderFromRpc (blockParams) {
  const blockHeader = new BlockHeader({
    parentHash: blockParams.parentHash,
    uncleHash: blockParams.sha3Uncles,
    coinbase: blockParams.miner,
    stateRoot: blockParams.stateRoot,
    transactionsTrie: blockParams.transactionsRoot,
    receiptTrie: blockParams.receiptRoot || blockParams.receiptsRoot || puffsUtil.SHA3_NULL,
    bloom: blockParams.logsBloom,
    difficulty: blockParams.difficulty,
    number: blockParams.number,
    gasLimit: blockParams.gasLimit,
    gasUsed: blockParams.gasUsed,
    timestamp: blockParams.timestamp,
    extraData: blockParams.extraData,
    mixHash: blockParams.mixHash,
    nonce: blockParams.nonce
  })

  // override hash incase something was missing
  blockHeader.hash = function () {
    return puffsUtil.toBuffer(blockParams.hash)
  }

  return blockHeader
}
